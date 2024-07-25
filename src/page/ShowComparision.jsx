// src/page/ShowComparison.jsx
import React, { useState, useEffect, useCallback } from 'react';
import Plotly from 'plotly.js-dist-min';
import Headers from '../component/Header';
import { Footer } from '../component/Footer';
import { useLocation } from 'react-router-dom';

const ShowComparison = () => {
    const [error, setError] = useState(null);
    const [banks, setBanks] = useState([]);

    const location = useLocation();
    const { banks: fetchedBanks } = location.state || {};

    useEffect(() => {
        if (fetchedBanks) {
            setBanks(fetchedBanks);
        } else {
            setError('No bank data available');
        }
    }, [fetchedBanks]);

    const renderInterestRatesComparison = useCallback(() => {
        if (!banks || banks.length === 0) return;

        const bankNames = banks.map(bank => bank.name);
        const interestRates = banks.map(bank => bank.interestRate);

        const data = [{
            x: bankNames,
            y: interestRates,
            type: 'bar',
            marker: {
                color: 'rgba(55, 128, 191, 0.6)',
                line: {
                    color: 'rgba(55, 128, 191, 1.0)',
                    width: 1
                }
            }
        }];

        const layout = {
            title: 'Bank Interest Rates Comparison',
            xaxis: {
                title: {
                    text: 'Banks',
                    standoff: 20
                },
                titlefont: {
                    size: 14,
                    family: 'Arial, sans-serif'
                },
                tickangle: -45,
                tickfont: {
                    size: 12
                },
                automargin: true
            },
            yaxis: {
                title: 'Interest Rate (%)'
            },
            margin: {
                b: 150
            }
        };

        const config = {
            displayModeBar: false
        };

        Plotly.newPlot('interestRatesComparisonChart', data, layout, config);
    }, [banks]);

    useEffect(() => {
        renderInterestRatesComparison();
    }, [renderInterestRatesComparison]);

    return (
        <>
            <Headers />
            <div className='p-28 flex justify-center'>
                <div className='w-[80rem] h-[50rem]'>
                    {error && <p>Error: {error}</p>}
                    <div id="interestRatesComparisonChart" className='w-full h-full'></div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ShowComparison;
