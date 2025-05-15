import React from "react";
import { useAuth } from "../context/authcontext";
import AdminSidebar from "../components/dashboard/AdminSidebar";
import NavBar from "../components/dashboard/NavBar";
import AdminSummary from "../components/dashboard/AdminSummary";
import { Outlet } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import 
const AdminDashboard = () => {
    const {user} =useAuth()
    // const navigate=useNavigate()
    // console.log(user );
    return (
        <div className="flex">
        <AdminSidebar />
        <div className="flex-1 ml-64 bg-gray-100 h-screen">
            <NavBar />
            <Outlet />
        </div>
        </div>
    )
        
    
    };  
export default AdminDashboard;