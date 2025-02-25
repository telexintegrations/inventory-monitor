import express from 'express';
import path from 'path';
import fs from 'fs';
import { startInventoryUpdater } from "./updateinventory"
import { getLowStockItems } from './low_stock';
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

startInventoryUpdater();

app.post('/tick', (req, res) => {
    const payload = req.body;
    console.log('Tick received:', payload);

    getLowStockItems()
    // Immediately acknowledge the tick request
    res.status(202).json({ status: 'accepted' });


});




app.get('/health', (req, res) => {
    res.json("Hello there")
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});