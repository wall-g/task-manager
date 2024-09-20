import Header from "./Header"
import Body from "./Body"
import AddTodo from "./AddTodo"
import Auth from "./Auth"
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Header/>
      <Auth/>
      <ToastContainer/>
    </>
  )
}

export default App