const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Helper functions
function isNaturalNumber(str) {
    const num = Number(str);
    return Number.isInteger(num) && num >= 1;
}

function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

function transformEmail(email) {
    return email.replace(/[^a-zA-Z0-9]/g, '_');
}

const myEmail = "lukaslaurinait@gmail.com";
const emailPath = transformEmail(myEmail);

app.get(`/${emailPath}/lcm`, (req, res) => {
    const x = req.query.x;
    const y = req.query.y;
    
    res.setHeader('Content-Type', 'text/plain');
    
    if (x === undefined || y === undefined || 
        !isNaturalNumber(x) || !isNaturalNumber(y)) {
        return res.send("NaN");
    }
    
    const numX = parseInt(x, 10);
    const numY = parseInt(y, 10);
    const result = lcm(numX, numY);
    res.send(result.toString());
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Test URL: http://localhost:${port}/${emailPath}/lcm?x=4&y=6`);
});
