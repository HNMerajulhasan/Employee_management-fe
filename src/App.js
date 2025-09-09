// // import React, { useState, useEffect } from 'react' // axios instance ধরে নিলাম
// // import EmployeeList from '@/components/EmployeeList'
// // import DistrictChart from '@/components/DistrictChart'
// // import MapView from '@/components/MapView'
// // import EmployeeForm from './components/EmployeeForm'
// // import api from './api'

// // const EmployeeManagement = () => {
// //   const [employees, setEmployees] = useState([])
// //   const [loading, setLoading] = useState(false)
// //   const [editingEmployee, setEditingEmployee] = useState(null)

// //   const fetchEmployees = async (filters) => {
// //     setLoading(true)
// //     try {
// //       const { data } = await api.get('/employees', { params: filters })
// //       setEmployees(data)
// //     } catch (err) {
// //       console.error(err)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   useEffect(() => {
// //     fetchEmployees()
// //   }, [])

// //   const handleCreateOrUpdate = async (formData, updateId) => {
// //     try {
// //       if (updateId) {
// //         await api.put(`/employees/${updateId}`, formData, {
// //           headers: { 'Content-Type': 'multipart/form-data' },
// //         })
// //       } else {
// //         await api.post('/employees', formData, {
// //           headers: { 'Content-Type': 'multipart/form-data' },
// //         })
// //       }
// //       await fetchEmployees()
// //       setEditingEmployee(null)
// //       return { success: true }
// //     } catch (err) {
// //       console.error(err)
// //       return {
// //         success: false,
// //         message: err?.response?.data?.message || err.message,
// //       }
// //     }
// //   }

// //   const handleEdit = (employee) => {
// //     setEditingEmployee(employee)
// //     window.scrollTo({ top: 0, behavior: 'smooth' })
// //   }

// //   const handleDelete = async (id) => {
// //     if (!confirm('Are you sure to delete this employee?')) return
// //     try {
// //       await api.delete(`/employees/${id}`)
// //       await fetchEmployees()
// //       alert('Deleted')
// //     } catch (err) {
// //       console.error(err)
// //       alert('Delete failed')
// //     }
// //   }

// //   const handleDownloadPdf = (id) => {
// //     // open pdf in new tab
// //     window.open(
// //       `${api.defaults.baseURL.replace('/api', '')}/employees/${id}/pdf`,
// //       '_blank'
// //     )
// //   }

// //   const handleSearch = (filters) => {
// //     fetchEmployees(filters)
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-6">
// //       <div className="max-w-7xl mx-auto">
// //         <h1 className="text-2xl font-bold mb-4">Employee Management</h1>

// //         <EmployeeForm onSubmit={handleCreateOrUpdate} editing={editingEmployee} />

// //         <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
// //           <div className="lg:col-span-2">
// //             <EmployeeList
// //               employees={employees}
// //               loading={loading}
// //               onEdit={handleEdit}
// //               onDelete={handleDelete}
// //               onDownload={handleDownloadPdf}
// //               onSearch={handleSearch}
// //             />
// //           </div>

// //           <div className="space-y-6">
// //             <DistrictChart employees={employees} />
// //             <MapView employees={employees} />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default EmployeeManagement


// import { useEffect, useState } from "react";
// import api from "./api";
// import EmployeeForm from "./components/EmployeeForm";
// import EmployeeList from "./components/EmployeeList";
// import DistrictChart from "./components/DistrictChart";
// import MapView from "./components/MapView";

// export default function App() {
//   const [employees, setEmployees] = useState([]);

//   const fetchEmployees = async () => {
//     try {
//       const res = await api.get("/employees");
//       setEmployees(res.data.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4 text-center">Employee Management</h1>
//       <EmployeeForm fetchEmployees={fetchEmployees} />
//       <EmployeeList employees={employees} fetchEmployees={fetchEmployees} />
//       <DistrictChart employees={employees} />
//       <MapView employees={employees} />
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import api from "./api";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import DistrictChart from "./components/DistrictChart";
import MapView from "./components/MapView";

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employees");
      setEmployees(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Employee Management</h1>
      <EmployeeForm
        fetchEmployees={fetchEmployees}
        editingEmployee={editingEmployee}
        setEditingEmployee={setEditingEmployee}
      />
      <EmployeeList
        employees={employees}
        fetchEmployees={fetchEmployees}
        setEditingEmployee={setEditingEmployee}
      />
      <DistrictChart employees={employees} />
      <MapView employees={employees} />
    </div>
  );
}
