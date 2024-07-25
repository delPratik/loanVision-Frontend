import React from "react";
import { Footer } from "../component/Footer";
import Headers from "../component/Header";
import { FaRegLightbulb, FaHandshake, FaCogs, FaClock, FaSearchDollar, FaChartLine } from "react-icons/fa";
export const About = () => {
  return (
    <>
      <Headers />
      <div className="flex flex-col min-h-screen">
        
        {/* Company Overview */}
        <section className="relative bg-gradient-to-r from-blue-200 to-blue-100 py-16 px-6">
          <div className="container mx-auto text-center">
            <h2 className="text-5xl font-extrabold text-gray-800 mb-8 leading-snug">
              Welcome to <span className="text-blue-600">LoanVision</span>
            </h2>
            <div className="flex flex-col items-center gap-8">
              <div className="flex items-start gap-4">
                <FaChartLine size={32} className="text-blue-600 mt-1" />
                <p className="text-xl text-gray-700 leading-relaxed">
                  At LoanVision, we're revolutionizing the financial landscape with cutting-edge technology and personalized solutions. Our platform is crafted to help you explore loan options effortlessly, making financial decision-making clear and accessible.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <FaSearchDollar size={32} className="text-blue-600 mt-1" />
                <p className="text-xl text-gray-700 leading-relaxed">
                  Utilizing advanced algorithms, we provide precise predictions and insights, ensuring you have all the information necessary to make well-informed financial choices. Join us in transforming the approach to securing loans.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Core Values */}
        <section className="py-16 px-6 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-12">Our Core Values</h2>
            <div className="flex flex-wrap justify-center gap-10">
              <div className="bg-gray-50 p-10 rounded-lg shadow-xl max-w-xs flex flex-col items-center transform hover:scale-105 transition-transform">
                <FaRegLightbulb size={48} className="text-blue-600 mb-6" />
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Innovation</h3>
                <p className="text-gray-600">
                  We're dedicated to pushing the boundaries of technology to offer you the most advanced and effective solutions.
                </p>
              </div>
              <div className="bg-gray-50 p-10 rounded-lg shadow-xl max-w-xs flex flex-col items-center transform hover:scale-105 transition-transform">
                <FaHandshake size={48} className="text-blue-600 mb-6" />
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Trust</h3>
                <p className="text-gray-600">
                  We build lasting relationships with our users based on transparency and reliability, ensuring peace of mind in every interaction.
                </p>
              </div>
              <div className="bg-gray-50 p-10 rounded-lg shadow-xl max-w-xs flex flex-col items-center transform hover:scale-105 transition-transform">
                <FaCogs size={48} className="text-blue-600 mb-6" />
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Excellence</h3>
                <p className="text-gray-600">
                  Our commitment to excellence drives us to continuously improve and deliver top-notch solutions tailored to your needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-800 py-16 text-white mb-16"> {/* Added mb-16 for margin-bottom */}
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-extrabold mb-12">Features</h2>
            <div className="flex flex-wrap justify-center gap-10">
              <div className="bg-gray-700 p-8 rounded-lg shadow-xl max-w-xs flex flex-col items-center transform hover:scale-105 transition-transform">
                <FaChartLine size={40} className="text-yellow-400 mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Loan Eligibility Checker</h3>
                <p className="text-gray-200">
                  Easily determine your eligibility for various loan options with our intuitive checker.
                </p>
              </div>
              <div className="bg-gray-700 p-8 rounded-lg shadow-xl max-w-xs flex flex-col items-center transform hover:scale-105 transition-transform">
                <FaSearchDollar size={40} className="text-yellow-400 mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Interest Rate Calculator</h3>
                <p className="text-gray-200">
                  Calculate potential interest rates and see how they impact your loan repayments.
                </p>
              </div>
              <div className="bg-gray-700 p-8 rounded-lg shadow-xl max-w-xs flex flex-col items-center transform hover:scale-105 transition-transform">
                <FaClock size={40} className="text-yellow-400 mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Track and Review</h3>
                <p className="text-gray-200">
                  Monitor your loan status and review your financial progress with ease.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
};
