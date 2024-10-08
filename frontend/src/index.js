import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Body from './components/Body';
import Auth from './components/Auth';
import AddTodo from './components/AddTodo';
import Header from './components/Header';
import Error from './components/Error';
import Protected from './components/Protected';
import EditTodo from './components/EditTodo';
import { GoogleOAuthProvider } from '@react-oauth/google';

function AppLayout() {
    return (
        <>
            <Header />
            <GoogleOAuthProvider clientId='990753456544-5en61esrpticqognd1v4b09duculerk9.apps.googleusercontent.com'>
                <Protected Component={Outlet}/>
            </GoogleOAuthProvider>
            <ToastContainer />
        </>
    )
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Body />
            },
            {
                path: '/auth',
                element: <Auth />
            },
            {
                path: '/addTodo',
                element: <AddTodo />
            },
            {
                path: '/editTodo/:id',
                element: <EditTodo/>
            }
        ]
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);


