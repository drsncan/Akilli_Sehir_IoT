// Akıllı Şehir IoT Sensör Simülatörü - Gün 1
// Bu modül sokaktaki sensörlerden gelen anlık verileri simüle eder.

function generateCityData() {
    // Rastgele sensör verileri üretimi
    const trafficDensity = Math.floor(Math.random() * 101); // %0 - %100 arası trafik
    const temperature = (Math.random() * (35 - 10) + 10).toFixed(1); // 10°C - 35°C arası
    const airQualityIndex = Math.floor(Math.random() * (150 - 20) + 20); // AQI (Hava Kalitesi)

    // Eğer hava kalitesi 100'ün üzerindeyse veya trafik %80'den fazlaysa uyarı ver
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

// Her 3 saniyede bir veri üret
console.log("🏙️ Akıllı Şehir IoT Simülatörü Başlatıldı...");
console.log("Sensör verileri toplanıyor...\n");

setInterval(() => {
    const data = generateCityData();
    console.log(`[VERİ ÜRETİLDİ] Zaman: ${data.timestamp} | Trafik: %${data.metrics.trafficDensity} | Hava Kalitesi (AQI): ${data.metrics.airQualityIndex} | Durum: ${data.status}`);
}, 3000);