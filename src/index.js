import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();














// 🛠️ Step-by-Step Replacement
// 1. Install the serialport package
// bash
// npm install serialport
// 2. Replace readFromPhSensor() with USB Serial Logic
// Here’s a basic version assuming your sensor sends pH values as plain text over serial:

// js
// const SerialPort = require('serialport');
// const Readline = require('@serialport/parser-readline');

// const port = new SerialPort({
//   path: '/dev/ttyUSB0', // Change this to match your USB device path (e.g., COM3 on Windows)
//   baudRate: 9600        // Match the baud rate of your sensor
// });

// const parser = port.pipe(new Readline({ delimiter: '\n' }));

// parser.on('data', (line) => {
//   const phValue = parseFloat(line.trim());
//   const timestamp = new Date();

//   if (!isNaN(phValue)) {
//     phData.push({ timestamp, phValue });
//     console.log(`Stored pH value: ${phValue} at ${timestamp}`);
//   } else {
//     console.warn(`Invalid data received: ${line}`);
//   }
// });
// 🧠 Notes
// /dev/ttyUSB0 is typical for Linux. On Windows, it might be COM3, COM4, etc.

// Your sensor must send data in a readable format (e.g., 7.23\n)

// You don’t need setInterval() anymore—data is pushed as it arrives

// ✅ What You Gain
// Real-time data from your USB-connected pH sensor

// Accurate readings replacing simulated values

// Seamless integration with your existing API
