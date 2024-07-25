import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../component/Footer";
import Headers from "../component/Header";
import logo from "../Image/logo.png"; // Import the logo image

const Login = () => {
  const navigate = useNavigate();

  const LoginForm = () => {
    const [user, setUser] = useState({
      useremail: "",
      userpassword: "",
    });
    const [alldata, setAllData] = useState([]);
    const [successmessage, setSuccessMessage] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleInput = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      setUser({
        ...user,
        [name]: value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        if (!user.useremail || !user.userpassword) {
          setErrMsg("Please input all the fields");
          setTimeout(() => {
            setErrMsg("");
          }, 2000);
          setIsLoading(false);
          return;
        }

        const response = await axios.post(
          "http://127.0.0.1:5000/logintoken",
          user,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data && response.data.access_token) {
          localStorage.setItem("auth-token", response.data.access_token);
          localStorage.setItem("email", user.useremail);
          navigate("/");
        }

        if (response.status === 201) {
          const responseData = response.data;
          setAllData([...alldata, responseData]);
          setSuccessMessage(responseData.message);
        } else {
          setErrMsg(response.data.message);
          setSuccessMessage("");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setErrMsg("Authentication failed: Wrong Email or Password");
          setSuccessMessage("");
          setTimeout(() => {
            setErrMsg("");
          }, 2000);
        } else {
          console.log("error", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="p-8 space-y-6">
        {errMsg && <p className="text-red-600 text-center text-xl">{errMsg}</p>}
        {successmessage && <p className="text-green-600 text-center text-xl">{successmessage}</p>}

        <div className="flex flex-col items-center gap-6">
          <input
            className="w-full max-w-6xl rounded border border-gray-300 bg-transparent py-5 px-8 text-black outline-none text-xl focus:border-blue-600"
            autoComplete="off"
            name="useremail"
            type="email"
            placeholder="Enter your Email"
            onChange={handleInput}
          />
          <input
            className="w-full max-w-6xl rounded border border-gray-300 bg-transparent py-5 px-8 text-black outline-none text-xl focus:border-blue-600"
            autoComplete="off"
            name="userpassword"
            type="password"
            placeholder="Enter your Password"
            onChange={handleInput}
          />

          <button
            className={`w-full max-w-6xl rounded bg-blue-600 py-5 px-40 text-white font-bold text-xl ${isLoading ? "bg-blue-500" : "hover:bg-blue-700"} transition`}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
          
          <p
            className="text-blue-600 cursor-pointer text-lg mt-4"
            onClick={() => navigate('/forgot-password')} // Navigate to forgot password page
          >
            Forgot Password?
          </p>
        </div>
        <p className="text-center text-gray-700 text-lg">Don't have an account?</p>
        <p
          className="text-center text-blue-600 text-lg cursor-pointer"
          onClick={() => navigate('/register')}
        >
          Create a New Account
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white"> {/* Set background of entire page to white */}
      <Headers />
      <main className="flex flex-1 flex-col items-center justify-center pt-12">
        <div className="flex flex-col items-center w-full max-w-lg p-12 bg-gray-30 shadow-lg rounded-lg mb-8"> {/* Set background of login container to grey */}
          <img
            src={logo}
            alt="LoanVision Logo"
            className="w-32 h-32 mb-6"
          />
          <h1 className="text-4xl font-bold mb-6">LoanVision</h1>
          <LoginForm />
        </div>
        <div className="w-full max-w-6xl px-6 py-8 bg-blue-100 rounded-lg shadow-md mb-12 text-center mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Why Choose LoanVision?</h2>
          <ul className="list-disc list-inside text-lg text-gray-700 mx-auto space-y-2">
            <li>Quick and easy loan eligibility assessment</li>
            <li>Secure and confidential handling of your data</li>
            <li>Access to personalized loan recommendations</li>
            <li>24/7 customer support to assist you anytime</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
