import { Route, Routes } from "react-router-dom";
import AddDoctor from "./AddDoctor";
import Admin from "./Admin";
import AdminLogin from "./AdminLogin";
import UpdateDoctor from "./UpdateDoctor";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLogin />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/add-doctor" element={<AddDoctor />} />
      <Route path="/update-doctor" element={<UpdateDoctor />} />
    </Routes>
  );
}

export default App;
