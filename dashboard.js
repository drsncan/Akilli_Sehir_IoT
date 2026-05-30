require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const { EventHubConsumerClient } = require("@azure/event-hubs");

// Express ve WebSocket Sunucu Kurulumu
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// "public" klasöründeki HTML dosyasını dışa açıyoruz
app.use(express.static('public'));

const eventHubConnectionString = process.env.EVENTHUB_CONNECTION_STRING;

if (!eventHubConnectionString) {
    console.error("HATA: .env dosyasında EVENTHUB_CONNECTION_STRING eksik!");
    process.exit(1);
}

async function startDashboard() {
    // Azure'dan verileri okumak için istemci oluştur
    const consumerClient = new EventHubConsumerClient("$Default", eventHubConnectionString);
    console.log("⏳ Dashboard için Event Hub (Azure) dinleniyor...");

    consumerClient.subscribe({
        processEvents: async (events, context) => {
            for (const event of events) {
                const data = event.body;
                
                // Gelen veriyi anında WebSocket üzerinden frontend'e fırlat
                io.emit('sensorData', data);
            }
        },
        processError: async (err, context) => {
            console.error(`Azure Okuma Hatası: ${err}`);
        }
    });
}

startDashboard().catch(console.error);

// Sunucuyu 3000 portunda başlat
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`✅ CANLI DASHBOARD HAZIR!`);
    console.log(`🌐 Tarayıcını aç ve şu adrese git: http://localhost:${PORT}`);
    console.log(`======================================================\n`);
});