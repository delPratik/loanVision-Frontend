import React from 'react'
import logo from "../Image/logo.png"

export const Footer = () => {
  return (
    <>
      <footer className="bg-blue-500 text-white py-4 shadow-lg border-t border-blue-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Logo and Brand Name */}
            <div className="flex items-center mb-4 md:mb-0">
              <img src={logo} className="h-10" alt="Logo" />
              <span className="text-2xl font-bold ml-3">LoanVision</span>
            </div>

            {/* Centered Copyright Message */}
            <div className="text-center md:text-center mb-4 md:mb-0 w-full md:w-auto">
              <span className="block text-sm">© 2024 <a href="/" className="hover:text-gray-300 transition">LoanVision</a>. All Rights Reserved.</span>
            </div>

            {/* Contact Information */}
            <div className="text-center md:text-right">
              <span className="block text-sm">Contact: <a href="mailto:support@loanvision.com" className="hover:text-gray-300 transition">support@loanvision.com</a></span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
