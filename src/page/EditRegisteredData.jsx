import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Footer } from "../component/Footer";
import Headers from "../component/Headers";

export const EditRegisteredData = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userData, setUserData] = useState(location.state || {});

    // useEffect to update userData when location.state changes
    useEffect(() => {
        setUserData(location.state || {});
    }, [location.state]);
    console.log(userData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://127.0.0.1:5000/registered_users/${userData.id}`, userData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data);
            navigate("/dashboard");
        } catch (err) {
            console.log('error updating user', err);
        }
    };

    return (
        <>
            <Headers />
            <div className="flex flex-col items-center min-h-[100vh] p-4 mt-2">
                <div className="w-full max-w-lg mt-4">
                    <h1 className="text-center font-bold mb-4 text-xl">
                        Edit Registered Data
                    </h1>
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="username"
                                type="text"
                                placeholder="Username"
                                value={userData.username || ''}
                                onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="useremail">
                                User Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="useremail"
                                type="email"
                                placeholder="User Email"
                                value={userData.useremail || ''}
                                onChange={(e) => setUserData({ ...userData, useremail: e.target.value })}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userphone">
                                Phone Number
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                name="userphone"
                                type="tel"
                                placeholder="Phone Number"
                                value={userData.userphone || ''}
                                onChange={(e) => setUserData({ ...userData, userphone: e.target.value })}
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};
