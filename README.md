# Inventory Tracker

## Description
Inventory Tracker is a system designed to monitor the quantity of inventory items and automatically broadcast alerts to the Telex channel when stock levels fall below a predefined threshold. This ensures that administrators are notified in real-time for restocking via a webhook integration.

## Features
- Track inventory stock items in real time
- Update inventory items when stock levels change

## Installation

### Prerequisites
Ensure you have **Node.js** installed. If not, download and install it from [Node.js official website](https://nodejs.org/).

### Install Dependencies
Clone the repository and navigate to the project directory:

```sh
npm install

---

## Usage

### Running Locally

#### Development Mode
To start the application in development mode, run:

```sh
npm run dev
Build and Start
To build the TypeScript files and start the application, use:

sh
Copy
npm run build:start
Run Compiled JavaScript
To directly run the compiled JavaScript version, execute:

sh
Copy
npm run start
Running in a Live Environment
Ensure the app is built and then start it:

sh
Copy
npm run build && npm run start
Integration
Inventory Tracker integrates with Telex via a GET request to the following endpoint:

🔗 Integration URL: https://inventory-monitor.onrender.com/integrations

The response will be in JSON format, structured as follows:

json
Copy
{
  "data": {
    "date": {
      "created_at": "2025-02-22",
      "updated_at": "2025-02-22"
    },
    "descriptions": {
      "app_description": "Broadcast to channel members when an inventory item drops below base level",
      "app_logo": "https://cdn.brandfetch.io/id-Wd4a4TS/theme/dark/idCerXwXCa.svg?c=1bx1742623151377id64Mup7ac0_ViWH0a&t=1727787911932",
      "app_name": "Inventory Integration",
      "app_url": "https://inventory-monitor.onrender.com",
      "background_color": "#fff"
    },
    "integration_category": "E-commerce & Retail",
    "integration_type": "interval",
    "is_active": true,
    "key_features": [
      "Monitor inventory items that fall below a certain stock threshold"
    ],
    "permissions": {
      "monitoring_user": {
        "always_online": true,
        "display_name": "Stock inventory Monitor"
      }
    },
    "settings": [
      {
        "label": "interval",
        "type": "text",
        "required": true,
        "default": "*/5 * * * *"
      }
    ],
    "tick_url": "https://inventory-monitor.onrender.com/tick",
    "target_url": ""
  }
}
Telex Tick URL
Telex makes a request to the following tick URL to trigger the monitoring process at regular intervals:

🔗 Tick URL: https://inventory-monitor.onrender.com/tick

This allows the system to check stock levels at the specified interval and send notifications accordingly.