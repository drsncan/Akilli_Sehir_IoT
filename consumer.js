require('dotenv').config();
const { EventHubConsumerClient } = require("@azure/event-hubs");
const { MongoClient } = require("mongodb");

const eventHubConnectionString = process.env.EVENTHUB_CONNECTION_STRING;
const cosmosDbUri = process.env.COSMOS_DB_URI;

if (!eventHubConnectionString || !cosmosDbUri) {
    console.error("HATA: .env dosyasındaki bağlantı dizeleri eksik!");
    process.exit(1);
}

async function main() {
    console.log("🏙️ Akıllı Şehir Veri İşleme Merkezi (Consumer) Başlatılıyor...");

    // Veritabanı bağlantısı
    const dbClient = new MongoClient(cosmosDbUri);
    await dbClient.connect();
    const db = dbClient.db("SmartCityDB");
    const alertsCollection = db.collection("CriticalAlerts");
    console.log("✅ Cosmos DB Bağlantısı Başarılı!");

    // Event Hub (IoT Hub) bağlantısı
    const consumerClient = new EventHubConsumerClient("$Default", eventHubConnectionString);
    console.log("⏳ Canlı sensör verileri bekleniyor...\n");

    const subscription = consumerClient.subscribe({
        processEvents: async (events, context) => {
            for (const event of events) {
                const data = event.body;
                console.log(`[OKUNDU] Zaman: ${data.timestamp} | Trafik: %${data.metrics.trafficDensity} | AQI: ${data.metrics.airQualityIndex} | Durum: ${data.status}`);

                // Sadece WARNING durumlarını veritabanına kaydet
                if (data.status === 'WARNING') {
                    console.log("🚨 KRİTİK DURUM TESPİT EDİLDİ! Veritabanına kaydediliyor...");
                    await alertsCollection.insertOne({
                        deviceId: data.deviceId,
                        timestamp: data.timestamp,
                        location: data.location,
                        metrics: data.metrics,
                        recordedAt: new Date()
                    });
                    console.log("💾 Kayıt başarılı!\n");
                }
            }
        },
        processError: async (err, context) => {
            console.error(`Okuma hatası oluştu: ${err}`);
        }
    });
}

main().catch(console.error);