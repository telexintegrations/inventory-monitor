import fs from "fs";
import path from "path";

const FILE_PATH: string = path.join(__dirname, '../src/inventory_item.json');
 

interface InventoryItem {
    item_id: number;
    item_name: string;
    category: string;
    quantity: number;
    price: number;
    supplier: string;
    date_added: string;
}

interface Inventory {
    inventory_items: InventoryItem[];
}

function updateRandomItemQuantity(): void {
    fs.readFile(FILE_PATH, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }

        try {
            let inventory: Inventory = JSON.parse(data);
            let items: InventoryItem[] = inventory.inventory_items;
            if (items.length === 0) {
                console.log("No items in inventory.");
                return;
            }

            // Select a random item
            let randomIndex: number = Math.floor(Math.random() * items.length);
            let randomItem: InventoryItem = items[randomIndex];
            
            // Update quantity (random increase/decrease between -10 and +10, ensuring non-negative)
            let change: number = Math.floor(Math.random() * 21) - 10;
            randomItem.quantity = Math.max(0, randomItem.quantity + change);
            
            console.log(`Updated item: ${randomItem.item_name}, New Quantity: ${randomItem.quantity}`);
            
            // Write updated inventory back to file
            fs.writeFile(FILE_PATH, JSON.stringify(inventory, null, 4), (err) => {
                if (err) {
                    console.error("Error writing file:", err);
                }
            });
        } catch (parseError) {
            console.error("Error parsing JSON:", parseError);
        }
    });
}

// Run the function every 8 hours (28800000 ms)
setInterval(updateRandomItemQuantity, 8 * 60 * 60 * 1000);
// setInterval(updateRandomItemQuantity, 60 * 1000);

// Initial run
updateRandomItemQuantity();


export function startInventoryUpdater() {
    setInterval(updateRandomItemQuantity, 60 * 1000); // Runs every 1 minute for testing
    updateRandomItemQuantity(); // Initial run
}