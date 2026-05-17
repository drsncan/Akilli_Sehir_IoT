# 🏙️ Akıllı Şehir IoT Veri Akışı ve Analizi

Bu proje, 3522 Bulut Bilişim dersi kapsamında geliştirilmiş bir IoT (Nesnelerin İnterneti) ve Akıllı Şehir uygulamasıdır. 

## Proje Aşamaları (Günlüğüm)

### 1. Gün: Altyapı ve Simülatör Geliştirme
* Proje iskeleti Node.js kullanılarak oluşturuldu.
* Şehirdeki trafik yoğunluğunu, hava sıcaklığını ve hava kalitesi indeksini (AQI) anlık olarak ölçen yazılımsal bir IoT sensör simülatörü (`simulator.js`) kodlandı.
* Anomali tespiti için (Yüksek trafik veya kötü hava kalitesi) basit bir karar mekanizması eklendi.
* **Sonraki Adım:** Üretilen bu verilerin MQTT/AMQP protokolleri ile Azure IoT Hub veya AWS ortamına aktarılması sağlanacak.