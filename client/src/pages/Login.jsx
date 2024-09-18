import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [redirect,setRedirect] = useState(false);

    const URL = import.meta.env.VITE_BASE_URL;
    async function loginHandler(e){
        e.preventDefault();
        const getResponse = await fetch(`${URL}/admin/login`, {
            method: "POST",
            body: JSON.stringify({email,password}),
            headers: {
                "Content-Type": "application/json",
            }
            });
        if(getResponse.ok){
            const {token} = await getResponse.json();
        localStorage.setItem('authToken', token);
        setRedirect(true);
        alert("Login successful")
        }else{
            alert("Invalid Credentials");
            setRedirect(false);
        }
    }
    if(redirect){
        return <Navigate to={"/dashboard"}/>
    }
    return(
        <div className="container">
            <p>Login as Admin</p>
            <form onSubmit={loginHandler} >
                <input type="enail" required placeholder="Email@gmail.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" required  placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button  value="Submit" className="submit">Submit</button>
            </form>
        </div>
    )
}