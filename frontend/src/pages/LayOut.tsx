import { Outlet } from "react-router-dom"

export default function LayOut() {
  return (
    <div className="App">
      <Outlet></Outlet>
    </div>
  )
}