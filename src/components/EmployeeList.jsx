// import api from "../api";
// import { useState } from "react";

// export default function EmployeeList({ employees, fetchEmployees, setEditingEmployee }) {
//   const handleDelete = async (id) => {
//     const isConfirmed = window.confirm("Are you sure you want to delete this employee?");
//     if (!isConfirmed) return;
//     try {
//       await api.delete(`/employees/${id}`);
//       fetchEmployees();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDownload = async (id, employee_id) => {
//     try {
//       const res = await api.get(`/employees/${id}/pdf`, { responseType: "blob" });
//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", `${employee_id}.pdf`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="mb-6">
//       <h2 className="text-xl font-bold mb-2">Employee List</h2>
//       <table className="table-auto w-full border">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border px-2">Photo</th>
//             <th className="border px-2">ID</th>
//             <th className="border px-2">Name</th>
//             <th className="border px-2">Department</th>
//             <th className="border px-2">District</th>
//             <th className="border px-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map((emp) => (
//             <tr key={emp._id}>
//               <td className="border px-2">
//                 {emp.photo ? (
//                   <img
//                     src={`http://localhost:5000/${emp.photo}`}
//                     alt="emp"
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                 ) : (
//                   <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded">
//                     No Photo
//                   </div>
//                 )}
//               </td>
//               <td className="border px-2">{emp.employee_id}</td>
//               <td className="border px-2">{emp.name}</td>
//               <td className="border px-2">{emp.department}</td>
//               <td className="border px-2">{emp.district}</td>
//               <td className="border px-2 flex gap-2">
//                 <button
//                   onClick={() => setEditingEmployee(emp)}
//                   className="bg-yellow-500 text-white px-2 rounded"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(emp._id)}
//                   className="bg-red-500 text-white px-2 rounded"
//                 >
//                   Delete
//                 </button>
//                 <button
//                   onClick={() => handleDownload(emp._id, emp.employee_id)}
//                   className="bg-blue-500 text-white px-2 rounded"
//                 >
//                   Download PDF
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// import api from "../api";

// export default function EmployeeList({ employees, fetchEmployees, setEditingEmployee }) {
//   const handleDelete = async (id) => {
//     const isConfirmed = window.confirm("Are you sure you want to delete this employee?");
//     if (!isConfirmed) return;
//     try {
//       await api.delete(`/employees/${id}`);
//       fetchEmployees();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDownload = async (id, employee_id) => {
//     try {
//       const res = await api.get(`/employees/${id}/pdf`, { responseType: "blob" });
//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", `${employee_id}.pdf`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="mb-6">
//       <h2 className="text-xl font-bold mb-2">Employee List</h2>
//       <table className="table-auto w-full border">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border px-2">Photo</th>
//             <th className="border px-2">ID</th>
//             <th className="border px-2">Name</th>
//             <th className="border px-2">Department</th>
//             <th className="border px-2">District</th>
//             <th className="border px-2">Skills</th>
//             <th className="border px-2">Document</th>
//             <th className="border px-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map((emp) => (
//             <tr key={emp._id}>
//               {/* Photo */}
//               <td className="border px-2">
//                 {emp.photo ? (
//                   <img
//                     src={`http://localhost:5000/uploads/${emp.photo}`}
//                     alt="emp"
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                 ) : (
//                   <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded">
//                     No Photo
//                   </div>
//                 )}
//               </td>

//               {/* Basic Info */}
//               <td className="border px-2">{emp.employee_id}</td>
//               <td className="border px-2">{emp.name}</td>
//               <td className="border px-2">{emp.department}</td>
//               <td className="border px-2">{emp.district}</td>

//               {/* Skills */}
//               <td className="border px-2">
//                 {emp.skills && emp.skills.length > 0 ? (
//                   <ul className="list-disc pl-4">
//                     {emp.skills.map((s, i) => (
//                       <li key={i}>
//                         <strong>{s.name}</strong>
//                         {s.description ? ` - ${s.description}` : ""}
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   "No Skills"
//                 )}
//               </td>

//               {/* Document */}
//               <td className="border px-2">
//                 {emp.document ? (
//                   <a
//                     href={`http://localhost:5000/uploads/${emp.document}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-500 underline"
//                   >
//                     View Document
//                   </a>
//                 ) : (
//                   "No Document"
//                 )}
//               </td>

//               {/* Actions */}
//               <td className="border px-2 flex gap-2">
//                 <button
//                   onClick={() => setEditingEmployee(emp)}
//                   className="bg-yellow-500 text-white px-2 rounded"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(emp._id)}
//                   className="bg-red-500 text-white px-2 rounded"
//                 >
//                   Delete
//                 </button>
//                 <button
//                   onClick={() => handleDownload(emp._id, emp.employee_id)}
//                   className="bg-blue-500 text-white px-2 rounded"
//                 >
//                   Download PDF
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


import { useState } from "react";
import api from "../api";

export default function EmployeeList({ employees, fetchEmployees, setEditingEmployee }) {
  const [searchId, setSearchId] = useState("");
  const [searchDept, setSearchDept] = useState("");
  const [searchDistrict, setSearchDistrict] = useState("");

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this employee?");
    if (!isConfirmed) return;
    try {
      await api.delete(`/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = async (id, employee_id) => {
    try {
      const res = await api.get(`/employees/${id}/pdf`, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${employee_id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
    }
  };

  // ফিল্টার লজিক
  const filteredEmployees = employees.filter((emp) => {
    return (
      (searchId === "" || emp.employee_id.toLowerCase().includes(searchId.toLowerCase())) &&
      (searchDept === "" || emp.department.toLowerCase().includes(searchDept.toLowerCase())) &&
      (searchDistrict === "" || emp.district.toLowerCase().includes(searchDistrict.toLowerCase()))
    );
  });

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">Employee List</h2>

      {/* Search Inputs */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Employee ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="border px-2 py-1 rounded w-1/3"
        />
        <input
          type="text"
          placeholder="Search by Department"
          value={searchDept}
          onChange={(e) => setSearchDept(e.target.value)}
          className="border px-2 py-1 rounded w-1/3"
        />
        <input
          type="text"
          placeholder="Search by District"
          value={searchDistrict}
          onChange={(e) => setSearchDistrict(e.target.value)}
          className="border px-2 py-1 rounded w-1/3"
        />
      </div>

      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2">Photo</th>
            <th className="border px-2">ID</th>
            <th className="border px-2">Name</th>
            <th className="border px-2">Department</th>
            <th className="border px-2">District</th>
            <th className="border px-2">Skills</th>
            <th className="border px-2">Document</th>
            <th className="border px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((emp) => (
            <tr key={emp._id}>
              {/* Photo */}
              <td className="border px-2">
                {emp.photo ? (
                  <img
                    src={`http://localhost:5000/uploads/${emp.photo}`}
                    alt="emp"
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded">
                    No Photo
                  </div>
                )}
              </td>

              {/* Basic Info */}
              <td className="border px-2">{emp.employee_id}</td>
              <td className="border px-2">{emp.name}</td>
              <td className="border px-2">{emp.department}</td>
              <td className="border px-2">{emp.district}</td>

              {/* Skills */}
              <td className="border px-2">
                {emp.skills && emp.skills.length > 0 ? (
                  <ul className="list-disc pl-4">
                    {emp.skills.map((s, i) => (
                      <li key={i}>
                        <strong>{s.name}</strong>
                        {s.description ? ` - ${s.description}` : ""}
                      </li>
                    ))}
                  </ul>
                ) : (
                  "No Skills"
                )}
              </td>

              {/* Document */}
              <td className="border px-2">
                {emp.document ? (
                  <a
                    href={`http://localhost:5000/uploads/${emp.document}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Document
                  </a>
                ) : (
                  "No Document"
                )}
              </td>

              {/* Actions */}
              <td className="border px-2 flex gap-2">
                <button
                  onClick={() => setEditingEmployee(emp)}
                  className="bg-yellow-500 text-white px-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(emp._id)}
                  className="bg-red-500 text-white px-2 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleDownload(emp._id, emp.employee_id)}
                  className="bg-blue-500 text-white px-2 rounded"
                >
                  Download PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
