import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PageNotFound from './pages/PageNotFound'
import Verify from './pages/Verify'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Chat from './pages/Chat'
import './App.css'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='auth' element={<Auth></Auth>}></Route>
          <Route path='verify' element={<Verify></Verify>}></Route>
          <Route path='c' element={<Chat></Chat>}></Route>
          <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
