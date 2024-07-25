import React, { useState, useEffect } from 'react';
import { Inputs } from '../component/Inputs';
import { Dashboard_Layout } from '../component/DashboardLayout';

export const EditRegister = ({ location }) => {
    const [form, setForm] = useState({
        username: '',
        useremail: '',
        userphone: ''
    });

    useEffect(() => {
        // Retrieve the user data passed from the RegisterDashboard component
        const editData = location.state?.editData;
        if (editData) {
            // Populate the form fields with the user's existing data
            setForm({
                username: editData.username || '',
                useremail: editData.useremail || '',
                userphone: editData.userphone || ''
            });
        }
    }, [location.state?.editData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Perform the edit operation by sending the updated data to the backend
            const response = await fetch(`http://127.0.0.1:5000/registered_users/${location.state.editData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });
            if (response.ok) {
                // Handle successful edit (e.g., show success message, redirect to dashboard)
            } else {
                console.error('Failed to edit user');
            }
        } catch (error) {
            console.error('Error editing user:', error);
        }
    };

    return (
        <>
        <Dashboard_Layout />
            <div>EditRegister</div>
            <form className=" " onSubmit={handleSubmit}>
                <div className="flex flex-col items-center p-10 justify-center gap-4">
                    <Inputs
                        basis={100}
                        value={form.username}
                        type="text"
                        placeholder="Full Name"
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                    />
                    <Inputs
                        basis={100}
                        value={form.useremail}
                        type="email"
                        placeholder="User Email"
                        onChange={(e) => setForm({ ...form, useremail: e.target.value })}
                    />
                    <Inputs
                        basis={100}
                        value={form.userphone}
                        type="tel"
                        placeholder="Phone Number"
                        pattern="[0-9]{10}"
                        onChange={(e) => setForm({ ...form, userphone: e.target.value })}
                    />
                </div>
                <div className="w-full flex items-center justify-center">
                    <button className="w-[60%] cursor-pointer rounded-lg font-bold border border-primary p-4 text-white bg-black transition hover:bg-opacity-90" type="submit">Update</button>
                </div>
            </form>
        </>
    );
};
