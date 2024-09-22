import mongoose from "mongoose";

const oauthUserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    }, 
    name: {
        type: String,
        required: true,
        unique: true
    }
})

const oauthUser = mongoose.model('oauthUser', oauthUserSchema);
export default oauthUser;