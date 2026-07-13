"use client";
import React, { useState, useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

function Page() {
  const [studentData, setStudentData] = useState({
    name: "",
    age: "",
    grade: "",
    email: "",
  });
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    age: "",
    grade: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchStudents = () =>
    fetch("http://localhost:5000/api/students", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": "a94900debc1e85d1f366b693bea395f318b8d8556c4ecfae7003479cacbbaee9",
      },
    })
      .then((response) => response.json())
      .then((data) => setStudents(data.students || []))
      .catch((error) => console.error("Error fetching students:", error));

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
          "X-Api-Key": "a94900debc1e85d1f366b693bea395f318b8d8556c4ecfae7003479cacbbaee9",
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
        fetchStudents();
      } else {
        alert(`Error: "Failed to add student"}`);
      }
      console.log("Student added:", data);
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Network error. Please try again.");
    }
  };

  // Start editing a student
  const startEditing = (student) => {
    setEditingStudent(student._id);
    setEditFormData({
      name: student.name,
      age: student.age,
      grade: student.grade,
      email: student.email,
    });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingStudent(null);
    setEditFormData({
      name: "",
      age: "",
      grade: "",
      email: "",
    });
  };

  // Save edited student
  const saveEditedStudent = async (studentId) => {
    if (
      !editFormData.name.trim() ||
      !editFormData.email.trim() ||
      !editFormData.age ||
      !editFormData.grade
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const updatedStudent = {
        ...editFormData,
        age: parseInt(editFormData.age, 10) || 0,
        grade: parseInt(editFormData.grade, 10) || 0,
        id: studentId,
      };

      const response = await fetch("http://localhost:5000/api/edit-student", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "a94900debc1e85d1f366b693bea395f318b8d8556c4ecfae7003479cacbbaee9",
        },
        body: JSON.stringify(updatedStudent),
      });

      const data = await response.json();
      if (response.ok) {
        fetchStudents();
        cancelEditing();
        alert("Student updated successfully!");
      } else {
        alert(`Error: ${data.message || "Failed to update student"}`);
      }
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Network error. Please try again.");
    }
  };

  // Delete student function
  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    const response = await fetch(`http://localhost:5000/api/delete-student`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": "a94900debc1e85d1f366b693bea395f318b8d8556c4ecfae7003479cacbbaee9",
      },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();
    if (response.ok) {
      fetchStudents();
      alert("Student deleted successfully!");
    } else {
      alert(`Error: ${data.message || "Failed to delete student"}`);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Dashboard</h1>
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
                    <div
                      key={student._id}
                      className="flex justify-between items-start bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl border border-slate-200 gap-4 p-4 mb-6"
                    >
                      {editingStudent === student._id ? (
                        // Edit Mode
                        <div className="w-full">
                          <div className="space-y-3">
                            <input
                              type="text"
                              placeholder="Name..."
                              value={editFormData.name}
                              onChange={handleEditInputChange}
                              name="name"
                              className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                            />
                            <input
                              type="email"
                              placeholder="Email..."
                              value={editFormData.email}
                              onChange={handleEditInputChange}
                              name="email"
                              className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                            />
                            <input
                              type="number"
                              placeholder="Age..."
                              value={editFormData.age}
                              onChange={handleEditInputChange}
                              name="age"
                              className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                            />
                            <input
                              type="number"
                              placeholder="Grade..."
                              value={editFormData.grade}
                              onChange={handleEditInputChange}
                              name="grade"
                              className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                            />
                          </div>
                          <div className="flex gap-2 mt-3">
                            <button
                              onClick={() => saveEditedStudent(student._id)}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-semibold"
                            >
                              Save
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition font-semibold"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        // View Mode
                        <>
                          <div>
                            <h3 className="text-xl font-bold text-slate-900">
                              {student.name}
                            </h3>
                            <div className="mt-3 space-y-2">
                              <p className="text-slate-600">
                                <span className="font-semibold">Age:</span>{" "}
                                {student.age}
                              </p>
                              <p className="text-slate-600">
                                <span className="font-semibold">Grade:</span>{" "}
                                {student.grade}
                              </p>
                              <p className="text-slate-600">
                                <span className="font-semibold">Email:</span>{" "}
                                {student.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span
                              className="text-blue-500 hover:text-blue-700 cursor-pointer"
                              onClick={() => startEditing(student)}
                            >
                              <MdEdit size={24} />
                            </span>
                            <span
                              className="text-red-500 hover:text-red-700 cursor-pointer"
                              onClick={() => deleteStudent(student._id)}
                            >
                              <MdDelete size={24} />
                            </span>
                          </div>
                        </>
                      )}
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