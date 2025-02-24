"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
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
app.get('/', (req, res) => {
    res.json("Hello there");
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
