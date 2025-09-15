

// import React, { useEffect, useState } from 'react';

// function App() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async() => {
//       await fetch('http://localhost:5000/ph-values')
//         .then(res => res.json())
//         .then(setData)
//         .catch(console.error);
//     };
  
//     fetchData();
//     const interval = setInterval(fetchData, 5000);
//     return () => clearInterval(interval);
//   }, []);
  

//   // const firstTimestamp = data.length > 0 ? new Date(data[0].timestamp) : null;
//   return (
//     <div>
//       {/* <h1>pH Sensor Data</h1>
//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>Timestamp</th>
//             <th>pH Value</th>
//             <th>Corrosion Time 33(hours)</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map(({ timestamp, phValue }, idx) => {
//             const time = new Date(timestamp);
//             const corrosionTime = firstTimestamp
//               ? ((time - firstTimestamp) / (1000 * 60 * 60)).toFixed(2)
//               : 0;
//             return (
//               <tr key={idx}>
//                 <td>{time.toLocaleString()}</td>
//                 <td>{phValue.toFixed(2)}</td>
//                 <td>{corrosionTime}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table> */}
//       <pre>{JSON.stringify(data, null, 2)}</pre>

//     </div>
//   );
// }

// export default App;


// import React, { useEffect, useState } from 'react';

// function App() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch('http://localhost:5000/ph-values');
//         const json = await res.json();
//         setData(json);
//       } catch (err) {
//         console.error('Error fetching data:', err);
//       }
//     };

//     fetchData();
//     const interval = setInterval(fetchData, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const firstTimestamp = data.length > 0 ? new Date(data[0].timestamp) : null;

//   return (
//     <div>
//       <h1>pH Sensor Data</h1>
//       <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
//   <thead>
//     <tr style={{ backgroundColor: '#f2f2f2' }}>
//       <th>#</th>
//       <th>Timestamp</th>
//       <th>pH Value</th>
//       <th>Corrosion Time (hrs)</th>
//     </tr>
//   </thead>
//   <tbody>
//     {data
//       .filter(d => typeof d.phValue === 'number' && d.timestamp)
//       .map(({ timestamp, phValue }, idx) => {
//         const time = new Date(timestamp);
//         const corrosionTime = ((time - new Date(data[0].timestamp)) / (1000 * 60 * 60)).toFixed(2);
//         return (
//           <tr key={idx}>
//             <td>{idx + 1}</td>
//             <td>{time.toLocaleString()}</td>
//             <td>{phValue.toFixed(2)}</td>
//             <td>{corrosionTime}</td>
//           </tr>
//         );
//       })}
//   </tbody>
// </table>

//     </div>
//   );
// }

// export default App;



import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const material = 'Stainless steel'; // You can make this dynamic later

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5000/ph-values');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const firstTimestamp = data.length > 0 ? new Date(data[0].timestamp) : null;

  const getCorrosionInfo = (phValue) => {
    if (material === 'Stainless steel') {
      if (phValue > 9) {
        return { rate: 'Very Slow', duration: '>400 days', className: 'very-slow-row' };
      } else if (phValue < 7) {
        return { rate: 'Slow', duration: 'Moderate corrosion', className: 'slow-row' };
      } else {
        return { rate: 'Fast', duration: 'Accelerated corrosion', className: 'fast-row' };
      }
    }
    return { rate: 'Unknown', duration: '-', className: '' };
  };

  return (
    <div className="container">
      <h1>🌡️ pH Sensor Dashboard</h1>
      <p><strong>Material:</strong> {material}</p>
      <div className="table-wrapper">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Timestamp</th>
              <th>pH Value</th>
              <th>Corrosion Time (hrs)</th>
              <th>Corrosion Rate</th>
              <th>Estimated Duration</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter(d => typeof d.phValue === 'number' && d.timestamp)
              .map(({ timestamp, phValue }, idx) => {
                const time = new Date(timestamp);
                const corrosionTime = firstTimestamp
                  ? ((time - firstTimestamp) / (1000 * 60 * 60)).toFixed(2)
                  : '0.00';
                const { rate, duration, className } = getCorrosionInfo(phValue);
                return (
                  <tr key={idx} className={className}>
                    <td>{idx + 1}</td>
                    <td>{time.toLocaleString()}</td>
                    <td>{phValue.toFixed(2)}</td>
                    <td>{corrosionTime}</td>
                    <td>{rate}</td>
                    <td>{duration}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
