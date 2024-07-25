import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Headers from '../component/Header';
import { Footer } from '../component/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBank, faPercent } from '@fortawesome/free-solid-svg-icons';

const banks = [
  { id: 1, name: 'Nepal Bank Limited', interestRate: 11.79 },
  { id: 2, name: 'Rastriya Banijya Bank', interestRate: 10.50 },
  { id: 3, name: 'Nabil Bank', interestRate: 11.86 },
  { id: 4, name: 'Nepal Investment Mega Bank', interestRate: 12.32 },
  { id: 5, name: 'Standard Chartered Bank', interestRate: 12.75 },
  { id: 6, name: 'Himalayan Bank', interestRate: 11.58 },
  { id: 7, name: 'Nepal SBI Bank', interestRate: 11.52 },
  { id: 8, name: 'Everest Bank', interestRate: 10.58 },
  { id: 9, name: 'NIC Asia Bank', interestRate: 12.13 },
  { id: 10, name: 'Machhapuchhre Bank', interestRate: 11.99 },
  { id: 11, name: 'Kumari Bank', interestRate: 12.73 },
  { id: 12, name: 'Laxmi Sunrise Bank', interestRate: 12.99 },
  { id: 13, name: 'Siddhartha Bank', interestRate: 10.47 },
  { id: 14, name: 'Agriculture Development Bank', interestRate: 13.38 },
  { id: 15, name: 'Global IME Bank', interestRate: 12.67 },
  { id: 16, name: 'Citizens Bank International', interestRate: 10.47 },
  { id: 17, name: 'Prime Commercial Bank', interestRate: 13.00 },
  { id: 18, name: 'NMB Bank', interestRate: 12.92 },
  { id: 19, name: 'Prabhu Bank', interestRate: 13.35 },
  { id: 20, name: 'Sanima Bank', interestRate: 11.53 },
];

export const Interest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const loanAmount = searchParams.get('loanAmount');
  const loanAmountTerm = searchParams.get('loanAmountTerm');

  const defaultBank = banks.find((bank) => bank.name === 'Nepal Bank Limited');

  const [selectedBank, setSelectedBank] = useState(defaultBank);
  const [simpleInterest, setSimpleInterest] = useState(0);
  const [timePeriod, setTimePeriod] = useState(1);
  const [principal, setPrincipal] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    if (loanAmount && loanAmountTerm) {
      const principalAmount = parseFloat(loanAmount);
      const timePeriodYears = parseFloat(loanAmountTerm) / 12;

      setPrincipal(principalAmount);
      setTimePeriod(timePeriodYears);

      const interestRate = defaultBank.interestRate / 100;
      const totalInterest = (principalAmount * interestRate * timePeriodYears).toFixed(2);
      const monthlyInterest = (totalInterest / (timePeriodYears * 12)).toFixed(2);

      setSimpleInterest(parseFloat(totalInterest));
      setMonthlyPayment(parseFloat(monthlyInterest));
    }
  }, [loanAmount, loanAmountTerm, defaultBank]);

  const handleBankHover = (index) => {
    const hoveredBank = banks[index];
    setSelectedBank(hoveredBank);

    const interestRate = hoveredBank.interestRate / 100;
    const totalInterest = (principal * interestRate * timePeriod).toFixed(2);
    const monthlyInterest = (totalInterest / (timePeriod * 12)).toFixed(2);

    setSimpleInterest(parseFloat(totalInterest));
    setMonthlyPayment(parseFloat(monthlyInterest));
  };

  const clickAnalysis = () => {
    navigate('/analysispage', { state: { banks, selectedBank, loanAmount, loanAmountTerm } });
  };

  const showComparison = () => {
    navigate('/comparisonpage', { state: { banks, loanAmount, loanAmountTerm } });
  };

  return (
    <>
      <Headers />
      <div className="rounded overflow-hidden mx-10 mt-20 shadow-lg m-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {banks.map((item, index) => (
            <div
              className="rounded-lg overflow-hidden shadow-md w-full cursor-pointer transition-transform transform hover:scale-105"
              key={index}
              onMouseEnter={() => handleBankHover(index)}
            >
              <div className="px-6 py-4 bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 transition-all">
                <div className="flex items-center mb-3">
                  <FontAwesomeIcon icon={faBank} className="text-blue-600 text-2xl mr-3" />
                  <div className="font-bold text-xl text-gray-800">{item.name}</div>
                </div>
                <p className="text-gray-700 text-base flex items-center">
                  <FontAwesomeIcon icon={faPercent} className="text-gray-600 mr-2" />
                  Rate: {item.interestRate}%
                </p>
              </div>
            </div>
          ))}
        </div>

        {selectedBank && (
          <div className="flex items-center justify-center mt-32 mb-20">
            <div className="px-8 py-6 w-full sm:w-[32rem] lg:w-[36rem] text-center h-auto shadow-xl bg-blue-100 border border-blue-300 rounded-lg space-y-4">
              <p className="font-bold text-2xl text-gray-800 mb-2">
                Bank: <span className="text-blue-600">{selectedBank.name}</span>
              </p>
              <p className="font-semibold text-gray-700 text-xl">
                Total Interest Amount: <span className="text-blue-800">{simpleInterest.toFixed(2)} Rs</span>
              </p>
              <p className="font-semibold text-gray-700 text-xl">
                Monthly Interest Payment: <span className="text-blue-800">{monthlyPayment.toFixed(2)} Rs</span>
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-center mb-10 space-x-4">
          <button
            className="bg-blue-500 p-6 text-xl text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition-all"
            onClick={clickAnalysis}
          >
            Show Analysis
          </button>
          <button
            className="bg-blue-500 p-6 text-xl text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition-all"
            onClick={showComparison}
          >
            Show Comparison
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};
