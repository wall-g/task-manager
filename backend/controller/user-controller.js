import User from "../model/user.js";
import Token from "../model/token.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import oauth2client from "../utils/googleConfig.js";
import oauthUser from "../model/oauthUser.js";

dotenv.config()

export const signupUser = async (request, response) => {
    try {
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const user = { username: request.body.username, email: request.body.email, password: hashedPassword };
        const newUser = new User(user);
        await newUser.save();
        return response.status(200).json({ msg: "signup successfull" })
    } catch (error) {
        return response.status(500).json({ msg: "error while signup" });
    }
}


export const loginUser = async (request, response) => {
    let user = await User.findOne({ email: request.body.email });
    if (!user) {
        return response.status(400).json({ msg: "email doest not match" });
    }
    try {
        let match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '12h' });
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
            const newToken = new Token({ token: refreshToken });
            await newToken.save();
            return response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, email: user.email, username: user.username })
        } else {
            return response.status(400).json({ msg: "password does not match" });
        }
    } catch (error) {
        return response.status(500).json({ msg: "error while login in user" })
    }
}

export const googleLogin = async (request, response) => {
    try {
        const { code } = request.query;
        const googleRes = await oauth2client.getToken(code);
        oauth2client.setCredentials(googleRes.tokens);
        const userRes = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`);
        const data = await userRes.json();
        const {email, name} = data;
        let user = await oauthUser.findOne({ email });
        if (!user) {
            user = await oauthUser.create({
                email, name
            })
        }
        const { _id } = user;
        const accessToken = jwt.sign({ _id, email }, process.env.ACCESS_SECRET_KEY, { expiresIn: '12h' });
        return response.status(200).json({ accessToken: accessToken, user: user });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ msg: "error while login in user" })
    }
}