# 🏙️ Akıllı Şehir IoT Veri Akışı ve Analizi

Bu proje, 3522 Bulut Bilişim dersi kapsamında geliştirilmiş bir IoT (Nesnelerin İnterneti) ve Akıllı Şehir uygulamasıdır. 

## Proje Aşamaları (Günlüğüm)

### 1. Gün: Altyapı ve Simülatör Geliştirme
* Proje iskeleti Node.js kullanılarak oluşturuldu.
* Şehirdeki trafik yoğunluğunu, hava sıcaklığını ve hava kalitesi indeksini (AQI) anlık olarak ölçen yazılımsal bir IoT sensör simülatörü (`simulator.js`) kodlandı.
* Anomali tespiti için (Yüksek trafik veya kötü hava kalitesi) basit bir karar mekanizması eklendi.
* **Sonraki Adım:** Üretilen bu verilerin MQTT/AMQP protokolleri ile Azure IoT Hub veya AWS ortamına aktarılması sağlanacak.

### 2. Gün: Azure IoT Hub ve MQTT Entegrasyonu
* Microsoft Azure üzerinde "Free Tier" (Ücretsiz Katman) bir IoT Hub oluşturuldu.
* `SENSOR-KIZILAY-01` ID'si ile bulut üzerinde sanal bir cihaz kaydı yapıldı.
* Node.js uygulamasına `azure-iot-device` ve `azure-iot-device-mqtt` SDK'ları entegre edildi.
* Üretilen verilerin `.env` kullanılarak güvenli bir şekilde ve gerçek zamanlı olarak Azure IoT Hub'a MQTT protokolü üzerinden akışı sağlandı.