import {Routes,Route} from "react-router-dom";
import Layout from "./utils/Layout";
import IndexPage from "./pages/IndexPage";
import RegisterPage from "./pages/RegisterPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index path="/" element={<IndexPage />}/>
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
