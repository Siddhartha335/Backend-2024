import { About } from "./components/About"
import { Home } from "./components/Home"
import { Login } from "./components/Login"
import { Routes,Route, Link } from "react-router-dom"

function App() {

  return (
    <>
    <ul style={{listStyle:"none",fontSize:"20px"}}>
        <Link to='/home'> <li style={{display:"inline-block",marginRight:'25px', color:"black"}}>Home</li> </Link>
        <Link to='/about'><li style={{display:"inline-block", color:"black"}}>About</li> </Link>
      </ul>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}

export default App
