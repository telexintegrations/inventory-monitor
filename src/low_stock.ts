import fs from "fs";
import path from "path";

const FILE_PATH: string = path.join(__dirname, "inventory_item.json");

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

export function getLowStockItems(threshold: number = 90): InventoryItem[] {
    try {
        const data = fs.readFileSync(FILE_PATH, "utf8");
        const inventory: Inventory = JSON.parse(data);
        return inventory.inventory_items.filter(item => item.quantity < threshold);
        
    } catch (error) {
        console.error("Error reading or parsing file:", error);
        return [];
    }
}

const url = "https://ping.telex.im/v1/webhooks/0195390a-47a2-79c1-83d5-a4e5f6058e64";
fetch(url, {
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(getLowStockItems())
})


