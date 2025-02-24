"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startInventoryUpdater = startInventoryUpdater;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const FILE_PATH = path_1.default.join(__dirname, '../src/inventory_item.json');
function updateRandomItemQuantity() {
    fs_1.default.readFile(FILE_PATH, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }
        try {
            let inventory = JSON.parse(data);
            let items = inventory.inventory_items;
            if (items.length === 0) {
                console.log("No items in inventory.");
                return;
            }
            // Select a random item
            let randomIndex = Math.floor(Math.random() * items.length);
            let randomItem = items[randomIndex];
            // Update quantity (random increase/decrease between -10 and +10, ensuring non-negative)
            let change = Math.floor(Math.random() * 21) - 10;
            randomItem.quantity = Math.max(0, randomItem.quantity + change);
            console.log(`Updated item: ${randomItem.item_name}, New Quantity: ${randomItem.quantity}`);
            // Write updated inventory back to file
            fs_1.default.writeFile(FILE_PATH, JSON.stringify(inventory, null, 4), (err) => {
                if (err) {
                    console.error("Error writing file:", err);
                }
            });
        }
        catch (parseError) {
            console.error("Error parsing JSON:", parseError);
        }
    });
}
// Run the function every 8 hours (28800000 ms)
// setInterval(updateRandomItemQuantity, 8 * 60 * 60 * 1000);
setInterval(updateRandomItemQuantity, 60 * 1000);
// Initial run
updateRandomItemQuantity();
function startInventoryUpdater() {
    setInterval(updateRandomItemQuantity, 60 * 1000); // Runs every 1 minute for testing
    updateRandomItemQuantity(); // Initial run
}
