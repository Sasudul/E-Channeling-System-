import { Route, Routes } from "react-router-dom"

import Appointment from "./Appointment"
import Doctor from "./Doctor"
import DoctorAppointments from "./DoctorAppointments"
import DoctorLogin from "./DoctorLogin"
import Home from "./Home"
import Login from "./Login"
import Navbar from "./Navbar"
import PatientAppointments from "./PatientAppointments"
import Profile from "./Profile"
import Signup from "./Signup"

function App() {


  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/doctor" element={<Doctor />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element = {<Signup />}/>
      <Route path ="/appointment" element ={<Appointment/>}/>
      <Route path ="/Pappointments" element={<PatientAppointments/>}/>
      <Route path="/Dlogin" element={<DoctorLogin/>}/>
      <Route path="/Dappointments" element={<DoctorAppointments/>}/>
    </Routes>
  </>
    
  )
}

export default App
