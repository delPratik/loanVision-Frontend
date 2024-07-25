import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import axios from 'axios';
import { Inputs } from "../component/Inputs";
import { useNavigate } from "react-router-dom";
import { Footer } from "../component/Footer";
import Headers from "../component/Header";
import logo from "../Image/logo.png"; // Import the logo image

export default function Register() {
  const navigate = useNavigate();

  const initialForm = {
    username: "",
    userpassword: "",
    useremail: "",
    userphone: "",
    confirmpassword: "",
  };

  const [form, setForm] = useState(initialForm);
  const [errorMessages, setErrorMessages] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateInputs = () => {
    const errors = {};

    if (!form.username.trim()) {
      errors.username = "Full Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(form.username.trim())) {
      errors.username = "Name should contain only letters and spaces";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.useremail)) {
      errors.useremail = "Invalid email address";
    }

    if (!form.userphone.trim()) {
      errors.userphone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(form.userphone)) {
      errors.userphone = "Phone number must be exactly 10 digits and positive";
    }

    if (form.userpassword !== form.confirmpassword) {
      errors.confirmpassword = "Password and Confirm Password do not match";
    } else if (form.userpassword.length < 6) {
      errors.userpassword = "Password should be at least 6 characters long";
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(form.userpassword)) {
      errors.userpassword = "Password should contain at least one letter, one number, and one special character";
    }

    return errors;
  };

  const handleBlur = (field) => {
    const errors = validateInputs();
    if (errors[field]) {
      setErrorMessages((prev) => ({ ...prev, [field]: errors[field] }));
      setTimeout(() => setErrorMessages((prev) => ({ ...prev, [field]: '' })), 1500);
    } else {
      setErrorMessages((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    handleBlur(name);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const errors = validateInputs();
    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/registers', form, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        const responseData = response.data;
        setErrorMessages({ success: responseData.message });
        setTimeout(() => navigate('/logins'), 3000);
      } else {
        setErrorMessages({ error: response.statusText });
        setTimeout(() => setErrorMessages({}), 3000);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessages({ error: "Email already exists. Please use a different email." });
      } else {
        setErrorMessages({ error: "An error occurred. Please try again." });
      }
      setTimeout(() => setErrorMessages({}), 3000);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Headers />
      <main className="flex flex-1 flex-col items-center justify-center pt-12">
        <div className="flex flex-col items-center w-full max-w-2xl p-12 bg-gray-30 shadow-lg rounded-lg mb-8">
          <img
            src={logo}
            alt="LoanVision Logo"
            className="w-32 h-32 mb-6"
          />
          <h1 className="text-4xl font-bold mb-6">LoanVision</h1>
          {errorMessages.success && (
            <div className="bg-green-200 text-green-700 p-4 mb-6 rounded">{errorMessages.success}</div>
          )}
          {errorMessages.error && (
            <div className="bg-red-200 text-red-700 p-4 mb-6 rounded">{errorMessages.error}</div>
          )}
          <form onSubmit={submitForm} className="w-full max-w-2xl">
            <div className="mb-8">
              <Inputs
                name="username"
                value={form.username}
                type="text"
                placeH="Full Name"
                onChange={handleChange}
                onBlur={() => handleBlur('username')}
              />
              {errorMessages.username && (
                <div className="text-red-700">{errorMessages.username}</div>
              )}
            </div>
            <div className="mb-8">
              <Inputs
                name="useremail"
                value={form.useremail}
                type="email"
                placeH="Email"
                onChange={handleChange}
                onBlur={() => handleBlur('useremail')}
              />
              {errorMessages.useremail && (
                <div className="text-red-700">{errorMessages.useremail}</div>
              )}
            </div>
            <div className="mb-8">
              <Inputs
                name="userphone"
                value={form.userphone}
                type="number"
                placeH="Phone Number"
                onChange={handleChange}
                onBlur={() => handleBlur('userphone')}
              />
              {errorMessages.userphone && (
                <div className="text-red-700">{errorMessages.userphone}</div>
              )}
            </div>
            <div className="mb-8 relative">
              <Inputs
                name="userpassword"
                value={form.userpassword}
                type={showPassword ? "text" : "password"}
                placeH="Password"
                onChange={handleChange}
                onBlur={() => handleBlur('userpassword')}
              />
              <button type="button" className="absolute top-1/2 right-4 transform -translate-y-1/2" onClick={togglePassword}>
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </button>
              {errorMessages.userpassword && (
                <div className="text-red-700">{errorMessages.userpassword}</div>
              )}
            </div>
            <div className="mb-12 relative">
              <Inputs
                name="confirmpassword"
                value={form.confirmpassword}
                type={showConfirmPassword ? "text" : "password"}
                placeH="Confirm Password"
                onChange={handleChange}
                onBlur={() => handleBlur('confirmpassword')}
              />
              <button type="button" className="absolute top-1/2 right-4 transform -translate-y-1/2" onClick={toggleConfirmPassword}>
                {showConfirmPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </button>
              {errorMessages.confirmpassword && (
                <div className="text-red-700">{errorMessages.confirmpassword}</div>
              )}
            </div>
            <div className="flex justify-center">
              <button className="w-full py-4 text-xl rounded-full text-white bg-blue-500 hover:bg-blue-600 transition" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
