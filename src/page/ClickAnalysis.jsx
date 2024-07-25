import React, { useState, useEffect, useCallback } from 'react';
import Chart from 'chart.js/auto';
import Headers from '../component/Header';

export const ClickAnalysis = () => {
    const [accuracy, setAccuracy] = useState(null);
    const [confusionMatrix, setConfusionMatrix] = useState([]);
    const [error, setError] = useState(null);

    const fetchAccuracy = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/getdata');
            if (!response.ok) {
                throw new Error('Failed to fetch accuracy');
            }
            const data = await response.json();
            console.log('Fetched Data:', data); // Debugging
            setAccuracy(data.Accuracy || null);
            setConfusionMatrix(data.Confusion_Matrix || []);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchAccuracy();
    }, []);

    const renderConfusionMatrixChart = useCallback(() => {
        if (!confusionMatrix || confusionMatrix.length === 0) return;

        const labels = ['True Negative', 'False Positive', 'False Negative', 'True Positive'];
        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Confusion Matrix',
                    data: confusionMatrix.flat(),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                    borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
                    borderWidth: 1,
                },
            ],
        };

        const existingChart = Chart.getChart('confusionMatrixChart');
        if (existingChart) {
            existingChart.destroy();
        }

        const ctx = document.getElementById('confusionMatrixChart');
        new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }, [confusionMatrix]);

    useEffect(() => {
        renderConfusionMatrixChart();
    }, [renderConfusionMatrixChart]);

    return (
        <>
            <Headers />
            <div className='p-28'>
                <div>
                    {error && <p>Error: {error}</p>}
                    {accuracy !== null ? (
                        <div className='flex-col'>
                            <p>Accuracy: {accuracy}</p>
                            <div className='flex gap-4'>
                                <p className='font-bold'>Confusion matrix:</p>
                                <p className=''>
                                    {confusionMatrix.length > 0 ? (
                                        confusionMatrix.map((row, rowIndex) => (
                                            <div key={rowIndex}>
                                                {row.map((cell, colIndex) => (
                                                    <span key={colIndex}>{cell}&nbsp;</span>
                                                ))}
                                                <br />
                                            </div>
                                        ))
                                    ) : (
                                        <p>No data available</p>
                                    )}
                                </p>
                            </div>
                            <div className='mt-4'>
                                <canvas id="confusionMatrixChart" className='w-[60rem] h-[40rem]'></canvas> {/* Adjusted size */}
                            </div>
                        </div>
                    ) : (
                        <p>Loading ...</p>
                    )}
                </div>
            </div>
        </>
    );
};
