import { Link } from "react-router-dom";
import "../css/header.css"
export default function Header(){
    return(
        <div className="header">
            <h1>Admin Dasboard</h1>
            <div className="navbar">
                <ul className="navbar-links">
                    <li><Link to='/dashboard'>Dashboard</Link></li>
                    <li><Link to='/customers'>Customers</Link></li>
                    <li><Link to='/service-providers'>Service Providers</Link></li>
                    <li><Link to='/services'>Services</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/register'>Register</Link></li>
                </ul>
            </div>
        </div>
    )
}