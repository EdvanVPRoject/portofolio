# Implementasi Edge Computer Vision Real-Time Menggunakan WebRTC (aiortc) dan OpenCV

> **Kategori:** Computer Vision & Edge Engineering  
> **Tanggal:** 15 Oktober 2026  
> **Penulis:** Edvan Nuriana Putra Septia  
> **Tags:** `Computer Vision`, `WebRTC`, `aiortc`, `OpenCV`, `Edge AI`, `Python`

---

## 1. Latar Belakang Masalah
Dalam deployment sistem Computer Vision di level produksi—seperti pengawasan video cerdas (*smart surveillance*), otomasi industri, atau inspeksi robotik edge—pengiriman feed video teranotasi (*bounding box*, segmentasi, atau estimasi pose) ke dasbor web atau klien operator sering menghadapi kendala laten yang berat:
1. **Bottleneck Latensi Protokol Tradisional**: Protokol seperti RTSP (*Real-Time Streaming Protocol*) dan HLS/DASH berbasis HTTP memiliki latensi transmisi berkisar antara 2 hingga 10 detik akibat mekanisme *buffering* segmen.
2. **Buffer Bloat & Frame Stacking**: Ketika beban inferensi model deep learning meningkat, antrean frame video menumpuk di sisi klien, membuat operator melihat kondisi masa lalu (*past state*) alih-alih kejadian riil di lapangan.

---

## 2. Mengapa WebRTC Mengungguli RTSP / HTTP Streaming
**WebRTC** (*Web Real-Time Communication*) beroperasi di atas transport UDP via SRTP (*Secure Real-time Transport Protocol*), menghadirkan latensi sub-detik (*ultra-low latency*, umumnya < 200 ms). Berbeda dengan TCP, WebRTC mengimplementasikan mekanisme *adaptive bitrate*, *packet loss concealment*, dan dapat mengabaikan frame usang (*frame dropping*) untuk memastikan transmisi selalu sinkron dengan waktu nyata (*live*).

Dengan pustaka Python `aiortc` (implementasi asynchronous WebRTC berbasis `asyncio`), kita dapat mengintegrasikan pipeline pengolahan frame OpenCV secara langsung ke dalam media track WebRTC tanpa perlu server transmisi perantara yang rumit.

---

## 3. Implementasi Custom VideoStreamTrack dengan `aiortc` & `OpenCV`

Berikut adalah implementasi `OpenCVStreamTrack` yang mewarisi `VideoStreamTrack` dari `aiortc`. Track ini membaca frame kamera lokal, menjalankan pipeline computer vision (contoh: deteksi kontur atau inferensi model), dan mengubah array `numpy` (BGR) menjadi objek `VideoFrame` AV untuk di-stream melalui koneksi WebRTC peer.

```python
import asyncio
import cv2
import fractions
import time
from av import VideoFrame
from aiortc import MediaStreamTrack, RTCPeerConnection, RTCSessionDescription

class ComputerVisionStreamTrack(MediaStreamTrack):
    """
    Custom MediaStreamTrack yang memproses frame kamera dengan OpenCV
    dan mengalirkan hasil inferensi secara real-time via WebRTC.
    """
    kind = "video"

    def __init__(self, camera_index: int = 0):
        super().__init__()
        self.cap = cv2.VideoCapture(camera_index)
        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
        self.cap.set(cv2.CAP_PROP_FPS, 30)
        self._timestamp = 0

    async def recv(self):
        """
        Dijalankan secara asynchronous oleh aiortc setiap kali encoder
        membutuhkan frame video berikutnya.
        """
        pts, time_base = await self.next_timestamp()

        # Baca frame dari sensor kamera
        ret, frame = self.cap.read()
        if not ret:
            # Fallback jika kamera gagal membaca frame
            frame = 255 * (time.time() % 1)
        
        # --- PIPELINE COMPUTER VISION / INFERENSI ---
        # Contoh: Ekstraksi fitur Edge & Anotasi HUD Real-Time
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        blurred = cv2.GaussianBlur(gray, (5, 5), 0)
        edges = cv2.Canny(blurred, 50, 150)
        
        # Overlay visualisasi deteksi ke frame asli
        frame[edges > 0] = [0, 255, 128]  # Aksen hijau neon
        
        # Tambahkan metadata performa (Timestamp & FPS)
        fps_text = f"Edge CV Pipeline | Time: {time.strftime('%H:%M:%S')}"
        cv2.putText(frame, fps_text, (24, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)
        # ---------------------------------------------

        # Konversi BGR OpenCV ke format PyAV VideoFrame (RGB24)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        video_frame = VideoFrame.from_ndarray(rgb_frame, format="rgb24")
        video_frame.pts = pts
        video_frame.time_base = time_base

        return video_frame

    async def next_timestamp(self):
        # Basis waktu video 30 FPS (1/30 detik per frame)
        time_base = fractions.Fraction(1, 30)
        self._timestamp += 1
        return self._timestamp, time_base

    def release(self):
        if self.cap.isOpened():
            self.cap.release()
```

---

## 4. Arsitektur Signaling & Penanganan Koneksi Peer

Untuk menginisiasi sesi WebRTC antara Python server dan browser klien, pertukaran *Session Description Protocol* (SDP) dapat dilakukan melalui endpoint HTTP REST sederhana:

```python
async def handle_offer(sdp_offer_json: dict) -> dict:
    pc = RTCPeerConnection()
    
    # Tambahkan custom computer vision stream track
    video_track = ComputerVisionStreamTrack()
    pc.addTrack(video_track)

    @pc.on("connectionstatechange")
    async def on_connectionstatechange():
        print(f"WebRTC Connection State: {pc.connectionState}")
        if pc.connectionState in ["failed", "closed"]:
            video_track.release()
            await pc.close()

    # Set Remote Offer dan Buat Local Answer
    offer = RTCSessionDescription(sdp=sdp_offer_json["sdp"], type=sdp_offer_json["type"])
    await pc.setRemoteDescription(offer)
    
    answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)

    return {
        "sdp": pc.localDescription.sdp,
        "type": pc.localDescription.type
    }
```

---

## 5. Optimasi Performa & Zero-Copy Buffer

Agar pipeline mampu mempertahankan kestabilan 30–60 FPS tanpa memory leak pada hardware berdaya rendah (Raspberry Pi 5 atau NVIDIA Jetson):
1. **Pre-allocated Frame Buffer**: Hindari realokasi memori berulang pada loop inferensi; gunakan memory pooling atau pre-allocated NumPy array.
2. **Hardware Acceleration (H.264/NVENC)**: Konfigurasikan codec H.264 dengan `av.codec.Codec('h264_nvenc', 'w')` bila GPU NVIDIA tersedia untuk menghemat utilisasi CPU host hingga 75%.
3. **Queue Dropping**: Terapkan antrean `asyncio.Queue(maxsize=1)` pada modul pemrosesan agar frame yang terlambat diproses langsung dibuang (*drop*), menjaga transmisi tetap berlatensi nol (*zero-latency lock*).

---

## 6. Kesimpulan
Menggabungkan fleksibilitas pemrosesan citra `OpenCV` dengan protokol transmisi `aiortc` menghasilkan arsitektur streaming Computer Vision generasi baru yang tangguh, hemat bandwidth, dan memiliki latensi di bawah 150 milidetik. Solusi ini menjadi standar ideal untuk pemantauan sistem otonom dan otomasi industri modern.
