import React, { useEffect, useState } from "react";
import "../../src/index.css";
import {  useNavigate } from "react-router-dom";
import { MdError } from "react-icons/md";
import axios from "axios";
import Headers from "../component/Header";
import { Footer } from "../component/Footer";

function Predictions() {
  const label=" block mb-2 text-sm font-medium text-gray-900 "
  const divs="w-full md:w-1/3 px-3 mb-6 md:mb-10 "
  const inputs="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  const navigate=useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertmsg, setAlertMsg] = useState("");
  const [isLoading,setIsLoading]=useState(false);
  useEffect(() => {
    // Check if access token exists in localStorage
    const isAuthenticated = !!localStorage.getItem("auth-token");
    if (!isAuthenticated) {
      // If not authenticated, navigate to the login page
      navigate("/logins");
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  // function openModal() {
  //   setIsDisable(true);
  // }

  // function closeModal() {
  //   setIsDisable(false);
  // }

  //all the initial state are set to null
  const [data, setData] = useState("");
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  //this is for Number Field
  function handleChange(event) {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  }

  //this is for Dropdown
  function handleChange0(event) {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  }
  //used for radio button
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [selectedOption3, setSelectedOption3] = useState("");

  //Radio Buttons
  function handleChange1(event) {
    const { name, value } = event.target;
    switch (name) {
      case "married":
        setSelectedOption1(value);
        break;
      case "dependents":
        setSelectedOption2(value);
        break;
      case "selfEmployed":
        setSelectedOption3(value);
        break;
      default:
        break;
    }
    setData((prevData) => ({ ...prevData, [name]: value }));
  }

  function iconInvalid() {
    if (data.creditHistory > 9 || data.creditHistory < 0) {
      return "Credit History should be between 0 to 9";
    } else {
      return "";
    }
  }

  function iconInvalid2() {
    if (data.loanAmount > 10000000)
      return " The loan amount cannot be greater than 10 million ";
    else if (data.loanAmount < 100) {
      return "The loan amount cannot be less than 1000";
    } else {
      return "";
    }
  }

  function iconInvalid3() {
    if (data.loanAmountTerm > 120 || data.loanAmountTerm < 12)
      return "The loan amount term should be between 1 to 60 months";
    else {
      return "";
    }
  }
  function iconInvalid4() {
    if (data.applicantIncome < 100)
      return "Applicant income cannot be less than 1000";
    else if (data.applicantIncome > 10000000) {
      return "The income amount is unrealistically high"
    }else{
      return "";
    }
  }

  function iconInvalid5() {
    if (data.totalIncome && data.applicantIncome) {
      if (parseInt(data.totalIncome) < parseInt(data.applicantIncome)) {
        return "Total family income should be more than Applicant Income";
      } else {
        return "";
      }
    } else {
      return "";
    }
  }
  function validateName() {
    if (/[^a-zA-Z\s]/.test(data.name)) {
      return "Please enter a valid Name";
    } else {
      return "";
    }
  }
  
  // useEffect(() => {
  //   const accessToken = localStorage.getItem("auth_token");
  //   setIsAuthenticated(!!accessToken);
  // }, []);
  // This function handles the submission of a form by sending data to a server API endpoint
  function handleSubmit(event) {
    event.preventDefault();
    const isAuthenticated = !!localStorage.getItem("auth-token");
    if (!isAuthenticated) {
      // If not authenticated, navigate to the login page
      navigate("/logins");
    } else {
      setIsLoading(true);
      // If authenticated, proceed with form submission
      let headersList = {
        "Accept": "*/*",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      };
  
      let bodyContent = JSON.stringify({
        "data": data
      });
  
      let reqOptions = {
        url: "http://127.0.0.1:5000/api/send-data",
        method: "POST",
        headers: headersList,
        data: bodyContent,
      };
  
      axios.request(reqOptions)
        .then((response) => {
          setIsLoading(false);
          const apiResponse = response.data;
          console.log(apiResponse);
          const { loanAmountTerm, loanAmount } = data;
          console.log(data);
          setAlertMsg(`Remarks: ${apiResponse["Remarks"]}, Accuracy: ${apiResponse["Accuracy"]}`);
          openModal();
          if (apiResponse["Remarks"] === 'Loan is acceptable!') {
            setTimeout(() => {
              closeModal();
              // Navigate to the interest page with loan amount and amount term as parameters
              navigate(`/interest/:data?loanAmount=${loanAmount}&loanAmountTerm=${loanAmountTerm}&apiresposne=${apiResponse}`);
            }, 4000); // 4000 milliseconds = 4 seconds
          } else {
            navigate("/notaccept"); // Corrected typo and replaced "/other page" with "/other-page"
          }
          // Clear form fields after submission
          setData({
            name: "",
            Gender: "",
            married: "",
            dependents: "",
            education: "",
            selfEmployed: "",
            Area: "",
            applicantIncome: "",
            totalIncome: "",
            loanAmount: "",
            loanAmountTerm: "",
            creditHistory: ""
          });
        })
        .catch((error) => {
          setIsLoading(false);
          console.error(error);
          setAlertMsg("Error occurred while processing the request.");
        });
    }
  }


  

  const isInvalid =
    iconInvalid() ||
    iconInvalid2() ||
    iconInvalid3() ||
    iconInvalid4() ||
    iconInvalid5();
    validateName();
  const isFormValid =
    data.name &&
    data.Gender &&
    selectedOption1 &&
    selectedOption2 &&
    data.education &&
    selectedOption3 &&
    data.Area &&
    data.applicantIncome &&
    data.totalIncome &&
    data.loanAmount &&
    data.loanAmountTerm &&
    data.creditHistory &&
    !isInvalid 
    

  return (
    <>
    <Headers/>
      <div className=" container overflow-x-hidden mx-auto  p-4">
      <h1 className="text-3xl font-bold mt-20 text-center  mb-4">Fill up the form to check your Loan Eligibility</h1>
      <div className="">
      {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <p>{alertmsg}</p>
            </div>
          </div>
        )}
        </div>
      <form onSubmit={handleSubmit} className="w-[80rem] border  shadow-xl justify-center p-20  mx-auto">
      
      <div className="flex flex-wrap -mx-3 mb-6">
        <label className={`${divs}`}>
          <h3 className={`${label}`}>Name</h3>
          <input
            type="text"
            title="Please enter your full name"
            name="name"
            className={`${inputs}`}
            placeholder="Full Name"
            onChange={handleChange}
            value={data.name || ""}
         />
        {validateName() && <MdError color="red" size={20} />}
        <span>{validateName()}</span>
        </label>

    
        <label className={`${divs}`}>
          <h3 className={`${label}`}>Applicant Income(Monthly) </h3>
          <input
             className={`${inputs}`}
            type="number"
            name="applicantIncome"
            placeholder="Applicant Income "
            onChange={handleChange}
            required
          />
          {iconInvalid4() && <MdError color="red" size={20} />}
          <span>{iconInvalid4()}</span>
        </label>
   
        <label className={`${divs}`}>
          <h3 className={`${label}`}>Loan Amount </h3>
          <input
             className={`${inputs}`}
            type="number"
            name="loanAmount"
            value={data.loanAmount}
            placeholder="Loan Amount "
            onChange={handleChange}
            required
          />
          {iconInvalid2() && <MdError color="red" size={20} />}
          <span>{iconInvalid2()}</span>
        </label>
     
        <label className={`${divs}`}>
        
          <h3 className={`${label}`}>Loan Amount Term (Months) </h3>
          <input
             className={`${inputs}`}
            type="number"
            name="loanAmountTerm"
            value={data.loanAmountTerm}
            placeholder="Loan Amount Term "
            onChange={handleChange}
            required
            min="1"
            max="480"
          />
          {iconInvalid3() && <MdError color="red" size={20} />}
          <span>{iconInvalid3()}</span>
        </label>
     
        <label className={`${divs}`}>
          <h3 className={`${label}`}>Total Family Income(Monthly) </h3>
          <input
             className={`${inputs}`}
            type="number"
            name="totalIncome"
            placeholder="Total Income "
            onChange={handleChange}
            required
          />
          {iconInvalid5() && <MdError color="red" size={20} />}
          <span>{iconInvalid5()}</span>
        </label>
     
        <label className={`${divs}`}>
          <h3 className={`${label}`}>Credit History</h3>
          <input
             className={`${inputs}`}
            type="number"
            name="creditHistory"
            placeholder="Credit History"
            onChange={handleChange}
            required
            min="0"
          />
          {iconInvalid() && (
            <div>
              <MdError color="red" size={20} />
              <span>{iconInvalid()}</span>
            </div>
          )}
        </label>
      
        <label className={`${divs}`}>
          <h3 className={`${label}`}>Gender</h3>
          <select name="Gender" onChange={handleChange0}>
            <option default value="">
              Select
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
     
        <div className={`${divs}`}>
          <h3 className={`${label}`}>Marital Status</h3>
          <label className="mb-[0.125rem] inline-block min-h-[1.5rem]">
            <input
              type="radio"
              name="married"
              value="Yes"
              checked={selectedOption1 === "Yes"}
              onChange={handleChange1}
            />
            &nbsp; Yes
          </label>
        
          <label className="mb-[0.125rem] inline-block min-h-[1.5rem] ps-[1.5rem]">
            <input
              type="radio"
              name="married"
              value="No"
              checked={selectedOption1 === "No"}
              onChange={handleChange1}
            />
            &nbsp; No
          </label>
        </div>
     
     <div className={`${divs}`}>
        <h3 className={`${label}`}>Dependents</h3>
        <label className="mb-[0.125rem] inline-block min-h-[1.5rem] ">
          <input
            type="radio"
            name="dependents"
            value="0"
            checked={selectedOption2 === "0"}
            onChange={handleChange1}
          />
          &nbsp;0
        </label>
       
        <label className="mb-[0.125rem] inline-block min-h-[1.5rem] ps-[1.5rem]">
          <input
            type="radio"
            name="dependents"
            value="1"
            checked={selectedOption2 === "1"}
            onChange={handleChange1}
          />
          &nbsp; 1
        </label>
     
        <label className="mb-[0.125rem] inline-block min-h-[1.5rem] ps-[1.5rem]">
          <input
            type="radio"
            name="dependents"
            value="2"
            checked={selectedOption2 === "2"}
            onChange={handleChange1}
          />
          &nbsp; 2
        </label>
       
        <label className="mb-[0.125rem] inline-block min-h-[1.5rem] ps-[1.5rem]">
          <input
            type="radio"
            name="dependents"
            value="3 or 3+"
            checked={selectedOption2 === "3 or 3+"}
            onChange={handleChange1}
          />
          &nbsp; 3 or 3+
        </label>
        </div>
      
        <label className={`${divs}`}>
          <h3 className={`${label}`}>Education</h3>
          <select name="education" onChange={handleChange0}>
            <option default value="">
              Select
            </option>
            <option value="Graduate">Graduate</option>
            <option value="Not Graduate">Not Graduate</option>
          </select>
        </label>
     
     <div className={`${divs}`}>
        <h3 className={`${label}`}>Self Employed</h3>
        <label className="mb-[0.125rem] inline-block min-h-[1.5rem] ">
          <input
            type="radio"
            name="selfEmployed"
            value="Yes"
            checked={selectedOption3 === "Yes"}
            onChange={handleChange1}
          />
          &nbsp; Yes
        </label>
      
        <label className="mb-[0.125rem] inline-block min-h-[1.5rem] ps-[1.5rem]">
          <input
            type="radio"
            name="selfEmployed"
            value="No"
            checked={selectedOption3 === "No"}
            onChange={handleChange1}
          />
          &nbsp; No
        </label>
        </div>
     
       
        <label className={`${divs}`}>
          <h3 className={`${label}`}>AreaProperty </h3>
          <select name="Area" onChange={handleChange0}>
            <option default value="">
              Select
            </option>
            <option value="Urban">Urban</option>
            <option value="semiUrban">Semi Urban</option>
            <option value="Rural">Rural</option>
          </select>
        </label>
        </div>
      
      

        <div className="mt-4">
        
            {/* {isDisable && (
              <div id="style-one">
                <div id="style-two" className="bg-white p-4 rounded-md shadow-md">
                  <h3>{alertmsg}</h3>
                  <h2 className="text-lg font-semibold">
                    See Information about banks?
                  </h2>
                  <p>
                    Visit our <Link to="/Blog">Blog</Link> content to know more!
                  </p>
                  <button
                    onClick={closeModal}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                  >
                    Close
                  </button>
                </div>
              </div>
            )} */}
<div className="flex justify-center items-center ">
            <button
              className={`${
                isFormValid
                  ? "text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  : "text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-not-allowed"
              } text-white px-4 py-2 w-56 rounded-md mt-4`}
              onClick={openModal}
              type="submit"
              disabled={!isFormValid}
            >
              {isLoading ? "Calculating............":"Check Eligibility"}
            </button>
            </div>
          </div>
      </form>
  

      <div>
      
      </div>
          {/* Additional Content About Predictions */}
            <section className="mt-20 bg-blue-100 p-8 rounded-lg shadow-lg mb-20">
              <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
                 About Predictions
              </h2>
            <p className="text-lg text-gray-700 text-center">
                At LoanVision, we leverage advanced algorithms and historical data to
                provide accurate predictions for loan eligibility. Our prediction
                model takes various factors into account, including credit history,
                applicant income, and loan amount, to give you a reliable assessment
                of your loan eligibility. By using our prediction tool, you can get
                a preliminary idea of your chances of getting a loan approved.
            </p>
            </section>


      </div>
      <Footer />
    </>
  );
}

export default Predictions;
