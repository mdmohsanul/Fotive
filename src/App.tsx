

import { createBrowserRouter, Outlet } from 'react-router-dom'
import './App.css'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import PageNotFound from './pages/Page-Not-Found'

function App() {
 

  return (
    <>
     <Outlet/>
    </>
  )
}
const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<LogIn/>
      },
      {
        path:"/login",
        element:<LogIn/>
      },
      {
        path:"/login",
        element:<SignUp/>
      },
      {
        path:"/dashboard",
        element:<Dashboard/>
      },
      {
        path:"*",
        element:<PageNotFound/>
      }

    ]
  }
])

export default appRouter
