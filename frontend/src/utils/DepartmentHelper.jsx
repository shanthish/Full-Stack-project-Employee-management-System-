import { useNavigate } from "react-router-dom";
import axios from "axios";

export const columns = [
    {
        name:"S No",
        selector:(row) =>  row.sno
    },
    {
        name:"Department Name",
        selector:(row) =>  row.dep_name,
        sortable:true,
    },
    {
        name:"Action",
        selector:(row) =>  row.action
    }
]

export const DepartmentButtons = ({Id,onDepartmentDelete})=>{
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this department?");
        if (confirmDelete) {
        try {
            const response = await axios.delete(`http://localhost:3000/api/department/${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            // console.log(response.data);
            if (response.data.success) {
                onDepartmentDelete(id);
                // alert("Department Deleted Successfully");
                // navigate("/admin-dashboard/departments");
            }
        }
        catch (error) {
            if (error.response && !error.response.data.success) {
                // alert("Inga dhaan problm");
                alert(error.response.data.error);
            }
        }
    }
    }


    return (
        <div className="flex space-x-3">
            <button className="px-3 py-1 bg-teal-600 text-white"
                onClick={()=> navigate(`/admin-dashboard/department/${Id}`)}
            >Edit</button>
            <button className="px-3 py-1 bg-red-600 text-white" 
            onClick={()=>handleDelete(Id)}
            >Delete</button>
        </div>
    )
}