import React, { useEffect, useState } from 'react';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { FaRegEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const RegisterDashboard = () => {
    const [registeredData, setRegisteredData] = useState([]);
    const navigate = useNavigate();

    const iconClass = "text-xl";
    const heading = "py-4 text-xl font-bold text-gray-800 bg-blue-100 text-center"; // Centered the heading text
    const tableData = "border-b border-[#eee] py-3 px-4";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://127.0.0.1:5000/registered_users');
                const data = await res.json();
                setRegisteredData(data);
            } catch (error) {
                console.error("Error fetching registered users:", error);
            }
        };
        fetchData();
    }, []);

    const handleEdit = (id) => {
        try {
            const userToEdit = registeredData.find(user => user.id === id);
            if (userToEdit) {
                navigate(`/editregister/${id}`, { state: userToEdit });
            } else {
                console.log("User not found for id:", id);
            }
        } catch (error) {
            console.log("Error navigating:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/registered_users/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                const updatedData = registeredData.filter(user => user.id !== id);
                setRegisteredData(updatedData);
            } else {
                console.error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="py-4 px-6 mt-20 mx-auto max-w-6xl">
            <h2 className={heading}>Registered Users</h2>
            <div className="overflow-x-auto border border-gray-100 rounded-lg">
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="py-4 text-xl font-bold text-gray-800 pl-4 p-10 bg-blue-100">Username</th>
                            <th className="py-4 text-xl font-bold text-gray-800 pl-4 p-10 bg-blue-100">Email</th>
                            <th className="py-4 text-xl font-bold text-gray-800 pl-4 p-10 bg-blue-100">Phone</th>
                            <th className="py-4 text-xl font-bold text-gray-800 pl-4 p-10 bg-blue-100">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registeredData.map((user, index) => (
                            <tr key={user.id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                <td className={tableData}>{user.username}</td>
                                <td className={tableData}>{user.useremail}</td>
                                <td className={tableData}>{user.userphone}</td>
                                <td className={tableData}>
                                    <div className="flex items-center space-x-3">
                                        <button
                                            onClick={() => handleEdit(user.id)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            <FaRegEye className={iconClass} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <MdOutlineDeleteOutline className={iconClass} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
