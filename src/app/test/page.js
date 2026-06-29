"use client";
import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";

function Page() {
  const [studentData, setStudentData] = useState({
    name: "",
    age: "",
    grade: "",
    email: "",
  });
  const [students, setStudents] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();

  
    if (
      !studentData.name.trim() ||
      !studentData.email.trim() ||
      !studentData.age ||
      !studentData.grade
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const studentToSubmit = {
        ...studentData,
        age: parseInt(studentData.age, 10) || 0,
        grade: parseInt(studentData.grade, 10) || 0,
      };

      const response = await fetch("http://localhost:5000/api/create-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentToSubmit),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Student added successfully!");
        setStudentData({
          name: "",
          age: "",
          grade: "",
          email: "",
        });
        fetch("http://localhost:5000/api/students",
          {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               "X-Api-Key": "a94900debc1e85d1f366b693bea395f318b8d8556c4ecfae7003479cacbbaee9"
        }})
        .then((response) => response.json())
        .then((data) => setStudents(data.students || []))
        .catch((error) => console.error("Error fetching students:", error));

        alert("Student addded successfully!");
      } else {
        alert(`Error: ${data.message || "Failed to add student"}`);
      }
      console.log("Student added:", data);
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Network error. Please try again.");
    }
  }; 


  useEffect(() => {
    fetch("http://localhost:5000/api/students",
          {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               "x-api-key": "a94900debc1e85d1f366b693bea395f318b8d8556c4ecfae7003479cacbbaee9"
        }})
        .then((response) => response.json())
        .then((data) => setStudents(data.students || []))
        .catch((error) => console.error("Error fetching students:", error));
  }, []);


  // Edit student function (example, you can modify as needed)
  const editStudent = async (studentId) => {
    const response = await fetch(`http://localhost:5000/api/edit-student/${studentId}`, {
      method: "PUT",
      headers: {  
  }} )
  
  const data = await response.json();
  if (response.ok) {
    fetch("http://localhost:5000/api/students",
          {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               "X-Api-Key": "a94900debc1e85d1f366b693bea395f318b8d8556c4ecfae7003479cacbbaee9"
        }})
        .then((response) => response.json())
        .then((data) => setStudents(data.students || []))
        .catch((error) => console.error("Error fetching students:", error));

    alert("Student updated successfully!");
  
  } else {
    alert(`Error: ${data.message || "Failed to update student"}`);
  }}

  // delete student function (example, you can modify as needed)
  const deleteStudent = async (id) => {
    const response = await fetch(`http://localhost:5000/api/delete-student/${id}`, {
      method: "DELETE",
      headers: {  
  }} )
  
  const data = await response.json();
  if (response.ok) {
    fetch("http://localhost:5000/api/students",
          {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               "X-Api-Key": "a94900debc1e85d1f366b693bea395f318b8d8556c4ecfae7003479cacbbaee9"
        }})
        .then((response) => response.json())
        .then((data) => setStudents(data.students || []))
        .catch((error) => console.error("Error fetching students:", error));

    alert("Student deleted successfully!");
  
  } else {
    alert(`Error: ${data.message || "Failed to delete student"}`);
  }
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="tfext-4xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">Manage and search for students</p>
        </div>

        <div className="mb-12 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
          <input
            type="number"
            placeholder="Age..."
            className="max-w-[90vw] sm:w-72 px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black placeholder-slate-400 transition shadow-sm hover:border-slate-300"
          />
          <input
            type="text"
            placeholder="Grade..."
            className="max-w-[90vw] sm:w-72 px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black placeholder-slate-400 transition shadow-sm hover:border-slate-300"
          />
          <input
            type="email"
            placeholder="Email..."
            className="max-w-[90vw] sm:w-72 px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black placeholder-slate-400 transition shadow-sm hover:border-slate-300"
          />
          <button className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 active:bg-blue-800 transition font-semibold shadow-md hover:shadow-lg">
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Add Student
              </h2>
              <form className="space-y-4">
                <div className="gap-4 mb-4 border-b border-slate-200">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Student Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter name..."
                    value={studentData.name}
                    className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 text-black placeholder-slate-400 transition mb-5"
                    onChange={handleInputChange}
                    name="name"
                  />
                  <input
                    type="email"
                    placeholder="Enter email..."
                    value={studentData.email}
                    className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 text-black placeholder-slate-400 transition mb-5"
                    onChange={handleInputChange}
                    name="email"
                  />
                  <input
                    type="number"
                    placeholder="Enter age..."
                    value={studentData.age}
                    className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 text-black placeholder-slate-400 transition mb-5"
                    onChange={handleInputChange}
                    name="age"
                  />
                  <input
                    type="number"
                    placeholder="Enter grade..."
                    value={studentData.grade}
                    className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 text-black placeholder-slate-400 transition mb-5"
                    onChange={handleInputChange}
                    name="grade"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 active:bg-green-800 transition font-semibold shadow-md hover:shadow-lg"
                  onClick={handleStudentSubmit}
                >
                  Add Student
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Students
              </h2>
              <div className="space-y-4">
                <div className="p-6 hover:shadow-md transition">
                  {students.map((student) => (
                    <div key={student._id} className="flex justify-between items-start bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl border border-slate-200 gap-4 p-4 mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">
                          {student.name}
                        </h3>
                      <div className="mt-3 space-y-2">
                        <p className="text-slate-600">
                          <span className="font-semibold">Age:</span> {student.age}
                        </p>
                        <p className="text-slate-600">
                          <span className="font-semibold">Grade:</span> {student.grade}
                        </p>
                        <p className="text-slate-600">
                          <span className="font-semibold">Email:</span> {student.email}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4"> 
                        <span className="text-red-500 hover:text-red-700 cursor-pointer">
                          <MdDelete 
                            onClick={() => deleteStudent(student._id)}
                            size={24}
                          />
                        </span>
                    </div>
                  </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;