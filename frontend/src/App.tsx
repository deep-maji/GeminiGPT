import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PageNotFound from './pages/PageNotFound'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Chat from './pages/Chat'
import './App.css'
import LayOut from './pages/LayOut'
import ProtectedRoute from './utils/ProtectedRoute'
import IsVerify from './utils/IsVerify'
import Verify from "../src/pages/Verify"
import PersistentLogin from './utils/PersistentLogin'
import IsAuthRequired from './utils/IsAuthRequired'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [
      { index: true, element: <Home /> },

      // Protected routes group
      {
        element: <PersistentLogin />,
        children: [
          {
            element: <ProtectedRoute />,
            children: [
              { path: "c/", element: <Chat /> },
              { path: "c/:id", element: <Chat /> },
            ]
          },
          {
            element: <IsAuthRequired />,
            children: [{ path: "auth", element: <Auth /> }]
          },
        ]
      },
      {
        element: <IsVerify />,
        children: [
          { path: "verify", element: <Verify /> }
        ]
      },
      { path: "*", element: <PageNotFound /> }
    ]
  }
]);

function App() {

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
