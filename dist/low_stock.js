"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLowStockItems = getLowStockItems;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const FILE_PATH = path_1.default.join(__dirname, "inventory_item.json");
function getLowStockItems(threshold = 90) {
    try {
        const data = fs_1.default.readFileSync(FILE_PATH, "utf8");
        const inventory = JSON.parse(data);
        return inventory.inventory_items.filter(item => item.quantity < threshold);
    }
    catch (error) {
        console.error("Error reading or parsing file:", error);
        return [];
    }
}
