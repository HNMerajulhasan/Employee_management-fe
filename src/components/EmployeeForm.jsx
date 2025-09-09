

// import { useState, useEffect } from "react";
// import api from "../api";
// import SkillInput from "./SkillInput";

// export default function EmployeeForm({ fetchEmployees, editingEmployee, setEditingEmployee }) {
//   const [form, setForm] = useState({
//     employee_id: "",
//     name: "",
//     department: "",
//     district: "",
//     description: "",
//   });
//   const [skills, setSkills] = useState([]);
//   const [photo, setPhoto] = useState(null);
//   const [document, setDocument] = useState(null);

//   useEffect(() => {
//     if (editingEmployee) {
//       setForm({
//         employee_id: editingEmployee.employee_id,
//         name: editingEmployee.name,
//         department: editingEmployee.department,
//         district: editingEmployee.district,
//         description: editingEmployee.description,
//       });
//       setSkills(editingEmployee.skills || []);
//       setPhoto(null);
//       setDocument(null);
//     }
//   }, [editingEmployee]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       Object.entries(form).forEach(([k, v]) => formData.append(k, v));
//       formData.append("skills", JSON.stringify(skills));
//       if (photo) formData.append("photo", photo);
//       if (document) formData.append("document", document);

//       if (editingEmployee) {
//         await api.put(`/employees/${editingEmployee._id}`, formData);
//         setEditingEmployee(null);
//       } else {
//         await api.post("/employees", formData);
//       }

//       setForm({ employee_id: "", name: "", department: "", district: "", description: "" });
//       setSkills([]);
//       setPhoto(null);
//       setDocument(null);
//       fetchEmployees();
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Error saving employee");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="border p-4 rounded mb-6 relative">
//       <h2 className="text-xl font-bold mb-2">
//         {editingEmployee ? "Edit Employee" : "Add Employee"}
//       </h2>

//       {/* Right-top photo preview */}
//       <div className="absolute top-4 right-4 w-20 h-20 border rounded overflow-hidden flex items-center justify-center">
//         {photo ? (
//           <img src={URL.createObjectURL(photo)} alt="preview" className="w-full h-full object-cover" />
//         ) : editingEmployee?.photo ? (
//           <img src={`http://localhost:5000/${editingEmployee.photo}`} alt="preview" className="w-full h-full object-cover" />
//         ) : (
//           <span className="text-xs text-gray-500">Photo</span>
//         )}
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <input
//           className="border p-2"
//           placeholder="Employee ID"
//           value={form.employee_id}
//           onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
//         />
//         <input
//           className="border p-2"
//           placeholder="Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />
//         <input
//           className="border p-2"
//           placeholder="Department"
//           value={form.department}
//           onChange={(e) => setForm({ ...form, department: e.target.value })}
//         />
//         <input
//           className="border p-2"
//           placeholder="District"
//           value={form.district}
//           onChange={(e) => setForm({ ...form, district: e.target.value })}
//         />
//         <textarea
//           className="border p-2 col-span-2"
//           placeholder="Description"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//         />

//         <div>
//           <label className="block">Upload Photo</label>
//           <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />
//         </div>
//         <div>
//           <label className="block">Upload Document</label>
//           <input type="file" accept="application/pdf" onChange={(e) => setDocument(e.target.files[0])} />
//         </div>
//       </div>

//       <h3 className="text-lg font-bold mt-4">Skills</h3>
//       {skills.map((s, i) => (
//         <SkillInput
//           key={i}
//           skill={s}
//           onChange={(updated) =>
//             setSkills(skills.map((sk, idx) => (idx === i ? updated : sk)))
//           }
//           onRemove={() => setSkills(skills.filter((_, idx) => idx !== i))}
//         />
//       ))}
//       <button
//         type="button"
//         onClick={() => setSkills([...skills, { name: "", description: "" }])}
//         className="bg-blue-500 text-white px-4 py-1 rounded"
//       >
//         + Add Skill
//       </button>

//       <button
//         type="submit"
//         className="block mt-4 bg-green-500 text-white px-4 py-2 rounded"
//       >
//         {editingEmployee ? "Update Employee" : "Save Employee"}
//       </button>
//     </form>
//   );
// }

import { useState, useEffect } from "react";
import api from "../api";
import SkillInput from "./SkillInput";

export default function EmployeeForm({ fetchEmployees, editingEmployee, setEditingEmployee }) {
  const [form, setForm] = useState({
    employee_id: "",
    name: "",
    department: "",
    district: "",
    description: "",
  });
  const [skills, setSkills] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [document, setDocument] = useState(null);
  const [photoError, setPhotoError] = useState("");
  const [docError, setDocError] = useState("");

  useEffect(() => {
    if (editingEmployee) {
      setForm({
        employee_id: editingEmployee.employee_id,
        name: editingEmployee.name,
        department: editingEmployee.department,
        district: editingEmployee.district,
        description: editingEmployee.description,
      });
      setSkills(editingEmployee.skills || []);
      setPhoto(null);
      setDocument(null);
      setPhotoError("");
      setDocError("");
    }
  }, [editingEmployee]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setPhotoError("You can only upload image files!");
      setPhoto(null);
      return;
    }
    setPhoto(file);
    setPhotoError("");
  };

  const handleDocumentChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      setDocError("You can only upload PDF files!");
      setDocument(null);
      return;
    }
    setDocument(file);
    setDocError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      formData.append("skills", JSON.stringify(skills));
      if (photo) formData.append("photo", photo);
      if (document) formData.append("document", document);

      if (editingEmployee) {
        await api.put(`/employees/${editingEmployee._id}`, formData);
        setEditingEmployee(null);
      } else {
        await api.post("/employees", formData);
      }

      setForm({ employee_id: "", name: "", department: "", district: "", description: "" });
      setSkills([]);
      setPhoto(null);
      setDocument(null);
      setPhotoError("");
      setDocError("");
      fetchEmployees();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error saving employee");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-6 rounded mb-6 relative bg-white shadow-md">
      <h2 className="text-2xl font-bold mb-4">{editingEmployee ? "Edit Employee" : "Add Employee"}</h2>

      {/* Photo upload box top-right */}
      <div className="absolute top-6 right-6 w-24 h-24 border rounded overflow-hidden cursor-pointer flex items-center justify-center bg-gray-50 hover:bg-gray-100">
        <input
          type="file"
          accept="image/*"
          className="absolute w-full h-full opacity-0 cursor-pointer"
          onChange={handlePhotoChange}
        />
        {photo ? (
          <img src={URL.createObjectURL(photo)} alt="preview" className="w-full h-full object-cover" />
        ) : editingEmployee?.photo ? (
          <img
            src={`http://localhost:5000/${editingEmployee.photo}`}
            alt="preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-xs text-gray-500 text-center">Click to upload Photo</span>
        )}
      </div>
      {photoError && <p className="text-red-500 mt-1 text-sm absolute top-32 right-6">{photoError}</p>}

      <div className="grid grid-cols-2 gap-4">
        {/* Employee ID */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Employee ID</label>
          <input
            className="border p-2 rounded"
            placeholder="Employee ID"
            value={form.employee_id}
            onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
          />
        </div>

        {/* Name */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Name</label>
          <input
            className="border p-2 rounded"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* Department */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Department</label>
          <input
            className="border p-2 rounded"
            placeholder="Department"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          />
        </div>

        {/* District */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">District</label>
          <input
            className="border p-2 rounded"
            placeholder="District"
            value={form.district}
            onChange={(e) => setForm({ ...form, district: e.target.value })}
          />
        </div>

        {/* Description */}
        <div className="flex flex-col col-span-2">
          <label className="font-semibold mb-1">Description</label>
          <textarea
            className="border p-2 rounded"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        {/* Document upload */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Upload Document (PDF)</label>
          <input type="file" accept="application/pdf" onChange={handleDocumentChange} />
          {docError && <p className="text-red-500 text-sm mt-1">{docError}</p>}
        </div>
      </div>

      {/* Skills Section */}
      <h3 className="text-lg font-bold mt-4 mb-2">Skills</h3>
      {skills.map((s, i) => (
        <SkillInput
          key={i}
          skill={s}
          onChange={(updated) => setSkills(skills.map((sk, idx) => (idx === i ? updated : sk)))}
          onRemove={() => setSkills(skills.filter((_, idx) => idx !== i))}
        />
      ))}
      <button
        type="button"
        onClick={() => setSkills([...skills, { name: "", description: "" }])}
        className="bg-blue-500 text-white px-4 py-1 rounded mt-2"
      >
        + Add Skill
      </button>

      <button
        type="submit"
        className="block mt-4 bg-green-500 text-white px-4 py-2 rounded font-semibold"
      >
        {editingEmployee ? "Update Employee" : "Save Employee"}
      </button>
    </form>
  );
}
