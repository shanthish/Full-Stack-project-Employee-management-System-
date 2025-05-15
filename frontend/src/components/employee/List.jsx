// import React from "react";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useEffect } from "react";
// import axios from "axios";
// import DataTable from "react-data-table-component";
// import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// const generatePDF = () => {
//     const input = document.getElementById("employeeTable");

//     html2canvas(input, { scale: 2 }).then((canvas) => {
//         const imgData = canvas.toDataURL("image/png");
//         const pdf = new jsPDF("p", "mm", "a4");
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//         pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//         pdf.save("employee-list.pdf");
//     });
// };




// const List = () => {
//     const [employees, setEmployees] = useState([]);
//     const [empLoading, setEmpLoading] = useState(false);
//     const [filteredEmployees, setFilteredEmployees] = useState([]);

//     useEffect(() => {
//         const fetchEmployees = async () => {
//             setEmpLoading(true);
//             try {
//                 const response = await axios.get('http://localhost:3000/api/employee',
//                     {
//                         headers: {
//                             "Authorization": `Bearer ${localStorage.getItem("token")}`
//                         }
//                     })
//                 if (response.data.success) {
//                     let sno = 1;
//                     const data = await response.data.employees.map((emp) => (
//                         {
//                             _id: emp._id,
//                             sno: sno++,
//                             dep_name: emp.department.dep_name,
//                             name: emp.userId.name,
//                             dob: new Date(emp.dob).toLocaleDateString(),
//                             profileImage: <img src={`http://localhost:3000/${emp.userId.profileImage}`} alt="profile" className="w-10 h-10 rounded-full" />,
//                             action: (<EmployeeButtons Id={emp._id} />),
//                         }
//                     ));
//                     setEmployees(data);
//                     setFilteredEmployees(data);
//                     // setFilteredDepartments(data);
//                 }
//             } catch (error) {
//                 // console.error("Error fetching departments:", error);
//                 if (error.response && !error.response.data.success) {
//                     alert("Inga dhaan problm");
//                     alert(error.response.data.error);
//                 }
//             } finally {
//                 setEmpLoading(false);
//             }
//         }
//         fetchEmployees();
//     }, []);

//     const handleFilter = (e) => {
//         // const value = e.target.value.toLowerCase();
//         const records = employees.filter((emp) =>
//             emp.name.toLowerCase().includes(e.target.value.toLowerCase())
//         );
//         setFilteredEmployees(records);
//     };

//     return (
//         <div className="p-6">
//             <div className="text-center">
//                 <h3 className="text-2xl font-bold">Manage Employees</h3>
//             </div>
//             <div className="flex justify-between items-center">
//                 <input type="text"
//                     placeholder="Search department"
//                     className="px-4 py-0.5 border"
//                     onChange={handleFilter}
//                 />
//                 <div className="flex gap-2">
//                     <button
//                         onClick={generatePDF}
//                         className="px-4 py-1 bg-blue-600 text-white rounded"
//                     >
//                         Download PDF
//                     </button>

//                     <Link to="/admin-dashboard/add-employee"
//                         className="px-4 py-1 bg-teal-600 rounded text-white">
//                         Add New Employee</Link>
//                 </div>
//             </div>
//             <div className="mt-6">
//                 <div id="employeeTable" className="mt-6 bg-white p-4 rounded shadow">
//                     <DataTable columns={columns} data={filteredEmployees} pagination />
//                 </div>


//                 {/* <DataTable columns={columns} data={filteredEmployees} pagination /> */}
//             </div>
//         </div>
//     );
// };
// export default List;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const List = () => {
    const [employees, setEmployees] = useState([]);
    const [empLoading, setEmpLoading] = useState(false);
    const [filteredEmployees, setFilteredEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            setEmpLoading(true);
            try {
                const response = await axios.get("http://localhost:3000/api/employee", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.data.success) {
                    let sno = 1;
                    const data = response.data.employees.map((emp) => ({
                        _id: emp._id,
                        sno: sno++,
                        dep_name: emp.department.dep_name,
                        name: emp.userId.name,
                        dob: new Date(emp.dob).toLocaleDateString(),
                        profileImage: (
                            <img
                                src={`http://localhost:3000/${emp.userId.profileImage}`}
                                alt="profile"
                                className="w-10 h-10 rounded-full"
                            />
                        ),
                        action: <EmployeeButtons Id={emp._id} />,
                    }));
                    setEmployees(data);
                    setFilteredEmployees(data);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert("Inga dhaan problm");
                    alert(error.response.data.error);
                }
            } finally {
                setEmpLoading(false);
            }
        };
        fetchEmployees();
    }, []);

    const handleFilter = (e) => {
        const records = employees.filter((emp) =>
            emp.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredEmployees(records);
    };

    const generatePDF = () => {
        const input = document.getElementById("employeeTable");

        input.style.display = "block"; // Show hidden table

        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("employee-list.pdf");

            input.style.display = "none"; // Hide table again
        });
    };

    return (
        <div className="p-6">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Employees</h3>
            </div>

            <div className="flex justify-between items-center mt-4">
                <input
                    type="text"
                    placeholder="Search employee"
                    className="px-4 py-0.5 border"
                    onChange={handleFilter}
                />
                <div className="flex gap-2">
                    <button
                        onClick={generatePDF}
                        className="px-4 py-1 bg-blue-600 text-white rounded"
                    >
                        Download PDF
                    </button>
                    <Link
                        to="/admin-dashboard/add-employee"
                        className="px-4 py-1 bg-teal-600 rounded text-white"
                    >
                        Add New Employee
                    </Link>
                </div>
            </div>

            <div className="mt-6">
                <DataTable
                    columns={columns}
                    data={filteredEmployees}
                    pagination
                />
            </div>

            {/* Hidden table for PDF export */}
            {/* <div id="employeeTable" style={{ display: "none" }}>
                <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Date of Birth</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((emp) => (
                            <tr key={emp._id}>
                                <td>{emp.sno}</td>
                                <td>{emp.name}</td>
                                <td>{emp.dep_name}</td>
                                <td>{emp.dob}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}
            <div id="employeeTable" style={{ display: "none", padding: "20px", fontFamily: "Arial, sans-serif" }}>
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        textAlign: "left",
                        fontSize: "14px",
                    }}
                    border="1"
                    cellPadding="8"
                >
                    <thead style={{ backgroundColor: "#f2f2f2" }}>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Date of Birth</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((emp) => (
                            <tr key={emp._id}>
                                <td>{emp.sno}</td>
                                <td>{emp.name}</td>
                                <td>{emp.dep_name}</td>
                                <td>{emp.dob}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default List;
