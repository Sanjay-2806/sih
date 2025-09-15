const express = require('express');
const cors = require('cors'); // <-- Import CORS middleware
const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());
app.use(cors({
    origin: 'http://localhost:3001'
  }));

let phData = [
    {
        label: "hello"
    }
];

app.get('/ph-values', (req, res) => {
    console.log('Sending data:', phData);
    res.json(phData);
});

function readFromPhSensor() {
    const phValue = Math.random() * 14;
    const timestamp = new Date();

    phData.push({ timestamp, phValue });
    console.log(`Stored pH value: ${phValue} at ${timestamp}`);
}

setInterval(readFromPhSensor, 5000);

app.listen(port, () => console.log(`Server listening on port ${port}`));
