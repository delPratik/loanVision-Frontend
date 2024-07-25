import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../component/Footer";
import Headers from "../component/Headers";
import logo from "../Image/logo.png"; // Import the logo image

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    useremail: "",
    userpassword: "",
  });
  const [errmsg, setErrMsg] = useState(null);
  const [successmsg, setSuccessMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Ensure both email and password fields are filled
    if (!formData.useremail || !formData.userpassword) {
      setErrMsg("Please input all the fields");
      setTimeout(() => {
        setErrMsg("");
      }, 2000); // Show error message for 2 seconds
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/admin_login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.admin_token) {
        localStorage.setItem("admin_token", response.data.admin_token);
        setSuccessMsg("Login successful. Redirecting...");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000); // Redirect after 2 seconds
      } else {
        setErrMsg("Invalid email or password");
        setTimeout(() => {
          setErrMsg("");
        }, 2000); // Show error message for 2 seconds
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrMsg("Error logging in. Please try again later.");
      setTimeout(() => {
        setErrMsg("");
      }, 2000); // Show error message for 2 seconds
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Headers />
      <main className="flex flex-col flex-grow items-center justify-center pt-6 pb-12">
        <div className="bg-white shadow-lg rounded-lg p-12 max-w-xl w-full">
          <div className="flex flex-col items-center">
            <img src={logo} alt="LoanVision Logo" className="w-32 h-32 mb-6" />
            <h1 className="text-5xl font-bold mb-6">LoanVision</h1>
            {errmsg && <h1 className="font-bold text-red-500 mb-4">{errmsg}</h1>}
            {successmsg && (
              <h1 className="font-bold text-green-500 mb-4">{successmsg}</h1>
            )}
            <div className="bg-blue-100 p-6 rounded-md w-full mb-8">
              <h1 className="text-center text-4xl font-bold mb-8">Admin Login</h1>
              <form
                className="w-full"
                onSubmit={handleSubmit}
              >
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-lg font-bold mb-2"
                    htmlFor="useremail"
                  >
                    UserEmail
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
                    id="useremail"
                    name="useremail"
                    type="email"
                    placeholder="Enter your Email"
                    value={formData.useremail}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-8">
                  <label
                    className="block text-gray-700 text-lg font-bold mb-2"
                    htmlFor="userpassword"
                  >
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline text-lg"
                    id="userpassword"
                    name="userpassword"
                    type="password"
                    placeholder="Enter your Password"
                    value={formData.userpassword}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center justify-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminLogin;
