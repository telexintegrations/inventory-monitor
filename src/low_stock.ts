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
