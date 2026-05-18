require('dotenv').config();
const Protocol = require('azure-iot-device-mqtt').Mqtt;
const Client = require('azure-iot-device').Client;
const Message = require('azure-iot-device').Message;

// Şifreyi .env dosyasından güvenli bir şekilde çekiyoruz
const connectionString = process.env.DEVICE_CONNECTION_STRING;

if (!connectionString) {
    console.error("HATA: .env dosyasından bağlantı dizesi okunamadı!");
    process.exit(1);
}

// Bağlantıyı kuruyoruz
const client = Client.fromConnectionString(connectionString, Protocol);

function generateCityData() {
    const trafficDensity = Math.floor(Math.random() * 101); 
    const temperature = (Math.random() * (35 - 10) + 10).toFixed(1); 
    const airQualityIndex = Math.floor(Math.random() * (150 - 20) + 20); 

    const status = (airQualityIndex > 100 || trafficDensity > 80) ? 'WARNING' : 'NORMAL';

    return {
        deviceId: 'SENSOR-KIZILAY-01',
        timestamp: new Date().toISOString(),
        location: 'Kızılay Meydanı',
        metrics: {
            temperature: parseFloat(temperature),
            trafficDensity: trafficDensity,
            airQualityIndex: airQualityIndex
        },
        status: status
    };
}

console.log("🏙️ Akıllı Şehir IoT Simülatörü Başlatıldı...");
console.log("Azure IoT Hub ile MQTT bağlantısı kuruluyor...\n");

client.open((err) => {
    if (err) {
        console.error('Bağlantı hatası: ' + err.message);
        return;
    }
    console.log('✅ Azure IoT Hub Bağlantısı Başarılı!');

    setInterval(() => {
        const data = generateCityData();
        const message = new Message(JSON.stringify(data));
        
        if (data.status === 'WARNING') {
            message.properties.add('alert', 'true');
        }

        console.log(`[VERİ ÜRETİLDİ] Zaman: ${data.timestamp} | Trafik: %${data.metrics.trafficDensity} | AQI: ${data.metrics.airQualityIndex} | Durum: ${data.status}`);
        
        client.sendEvent(message, (err) => {
            if (err) {
                console.error('Gönderim hatası: ' + err.toString());
            } else {
                console.log('   ☁️ -> Buluta iletildi!');
            }
        });
    }, 3000);
});