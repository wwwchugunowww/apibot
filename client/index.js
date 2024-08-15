const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs'); 



const PORT = 443; 
const app = express();
app.use(express.static('public')); 
app.use(express.static(path.join(__dirname)));


app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html')); 
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html')); 
});



app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html')); 
});


// const options = {
//   key: fs.readFileSync('./sert/private-key.pem'),
//   cert: fs.readFileSync('./sert/certificate.pem'),
//   passphrase: 'Knapeditox333',
// };


// const server = https.createServer(options, app);
// server.listen(PORT, 'autote.tascombank.ua', (e) => {
//     console.log(`Server.on ${PORT} ${e}`);
// });


app.listen(PORT, () => {
    console.log(`Server.on ${PORT}`);
});