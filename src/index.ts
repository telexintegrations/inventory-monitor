import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const port = 3000;

app.get('/integrations', (req, res) => {
    const filePath = path.join(__dirname, '../src/integration.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading the file');
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});


app.get('/', (req, res) => {
    res.json("Hello there")
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});