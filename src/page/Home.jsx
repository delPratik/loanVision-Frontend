import React from "react";
import Headers from "../component/Header";
import { Myloan } from "../component/Myloan";
import { Footer } from "../component/Footer";
import { FaCommentAlt, FaInstagram, FaFacebookF, FaTwitter, FaLinkedin, FaPhone, FaEnvelope } from "react-icons/fa";
import logoImage from "../Image/home.jpg"; // Import the local image

export default function Home() {
  return (
    <>
      <Headers />
      <div className="flex flex-col min-h-screen pt-16"> {/* Added pt-16 to account for the fixed header */}

        {/* Hero Section */}
        <section className="relative text-black py-24 flex flex-col items-center">
          <img
            src={logoImage}
            alt="Bank giving Loan"
            className="w-full h-auto object-contain max-h-[50vh] -mt-5" // Move image up by 20 pixels
          />
          <div className="mt-12 px-6 md:px-12 text-center">
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333', marginBottom: '1rem' }}>
              Welcome to LoanVision
            </h1>
            <h1 style={{ fontSize: '4rem', fontWeight: 'bold', color: '#111', marginBottom: '1rem', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
              Transform Your Financial Future
            </h1>
            <h4 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#555', marginBottom: '2rem' }}>
              With Our Advanced Loan Prediction Technology
            </h4>
          </div>
        </section>

        {/* Myloan Component */}
        <Myloan />

        {/* Client Experiences Section */}
        <section className="my-12 px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Client Experiences</h2>
          <div className="flex flex-wrap justify-center gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md flex flex-col items-center relative">
              <FaCommentAlt size={40} className="text-blue-500 mb-4" />
              <p className="text-lg mb-4 text-center">"This loan prediction tool was a game-changer for me. It made finding the right loan so much easier!"</p>
              <p className="font-semibold text-blue-600">Pratik Poudel</p>
              <p className="text-sm text-gray-500">Business Owner</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md flex flex-col items-center relative">
              <FaCommentAlt size={40} className="text-blue-500 mb-4" />
              <p className="text-lg mb-4 text-center">"I was impressed by the accuracy of the predictions. The tool is user-friendly and very effective."</p>
              <p className="font-semibold text-blue-600">Prince Kumar Yadav</p>
              <p className="text-sm text-gray-500">Entrepreneur</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md flex flex-col items-center relative">
              <FaCommentAlt size={40} className="text-blue-500 mb-4" />
              <p className="text-lg mb-4 text-center">"The predictions provided by this tool were incredibly accurate and saved me a significant amount of time!"</p>
              <p className="font-semibold text-blue-600">Sailesh Acharya</p>
              <p className="text-sm text-gray-500">Freelancer</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md flex flex-col items-center relative">
              <FaCommentAlt size={40} className="text-blue-500 mb-4" />
              <p className="text-lg mb-4 text-center">"A fantastic tool with excellent support. It exceeded my expectations!"</p>
              <p className="font-semibold text-blue-600">Shishir Kaphle</p>
              <p className="text-sm text-gray-500">Consultant</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-blue-100 py-16 text-gray-800 mb-16"> {/* Changed to light gray and added bottom margin */}
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-lg mb-8">
              Have any questions or need assistance? We're here to help. Reach out to us via the contact methods below.
            </p>
            <div className="flex justify-center gap-8 flex-wrap mb-8">
              <a href="/" className="flex items-center gap-2 text-gray-800">
                <FaInstagram size={20} />
                <p>LoanVision</p>
              </a>
              <a href="/" className="flex items-center gap-2 text-gray-800">
                <FaFacebookF size={20} />
                <p>LoanVision</p>
              </a>
              <a href="/" className="flex items-center gap-2 text-gray-800">
                <FaTwitter size={20} />
                <p>LoanVision</p>
              </a>
              <a href="/" className="flex items-center gap-2 text-gray-800">
                <FaLinkedin size={20} />
                <p>LoanVision</p>
              </a>
              <div className="flex items-center gap-2 text-gray-800">
                <FaPhone size={20} />
                <p>(123) 456-7890</p>
              </div>
            </div>
            <div className="flex justify-center">
              <a href="/" className="flex items-center gap-2 text-gray-800">
                <FaEnvelope size={20} />
                <p>info@loanvision.com</p>
              </a>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}
