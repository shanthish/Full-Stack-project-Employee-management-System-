import React from "react";
import { useAuth } from "../../context/authcontext";
const NavBar = () => {
    const {user,logout} = useAuth();
    return (
        <div className="flex items-center text-white justify-between bg-teal-600 px-7 h-12">
            <p>Welcome {user.name}</p>
            <button className="px-4 py-1 bg-teal-700 hover:bg-teal-800" onClick={logout}> Logout</button>
        </div>
    );
}
export default NavBar;