"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const updateinventory_1 = require("./updateinventory");
const low_stock_1 = require("./low_stock");
const app = (0, express_1.default)();
const port = 3000;
app.get('/integrations', (req, res) => {
    const filePath = path_1.default.join(__dirname, '../src/integration.json');
    fs_1.default.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading the file');
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});
(0, updateinventory_1.startInventoryUpdater)();
app.post('/tick', (req, res) => {
    const payload = req.body;
    console.log('Tick received:', payload);
    (0, low_stock_1.getLowStockItems)();
    // Immediately acknowledge the tick request
    res.status(202).json({ status: 'accepted' });
});
app.get('/health', (req, res) => {
    res.json("Hello there");
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
