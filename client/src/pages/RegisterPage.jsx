import { useState } from "react"
import "../css/Register.css"
import { Navigate } from "react-router-dom";
export default function RegisterPage(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [redirect,setRedirect] = useState(false);

    const URL = import.meta.env.VITE_BASE_URL;
    async function registerHandler(event){
        event.preventDefault();
        const bodyToSend = {
            email,password
        }
        const getResponse = await fetch(`${URL}/admin/register`,{
            method: "POST",
            body: JSON.stringify(bodyToSend),
            headers: {
                "Content-Type": "application/json",
                }
        })
        if(getResponse.ok){
            alert("Registration Successful");
            setRedirect(true);
        }else{
            alert("Registration Failed");
        }
    }
    if(redirect){
        return <Navigate to={"/login"} />
    }
    return(
        <div className="container">
            <p>Register as Admin</p>
            <form onSubmit={registerHandler} >
                <input type="enail" required placeholder="Email@gmail.com"  value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" required placeholder="Enter your password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                <button  value="Submit" className="submit">Submit</button>
            </form>
        </div>
    )
}