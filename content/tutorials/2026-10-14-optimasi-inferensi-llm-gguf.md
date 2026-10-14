# Mengoptimasi Inferensi LLM Lokal dengan Kuantisasi GGUF dan Multithreading PyQt6

> **Kategori:** Applied AI & Desktop Engineering  
> **Tanggal:** 14 Oktober 2026  
> **Penulis:** Edvan Nuriana Putra Septia  
> **Tags:** `LLM`, `GGUF`, `llama-cpp`, `PyQt6`, `QThread`, `Optimization`

---

## 1. Latar Belakang Masalah
Menjalankan Large Language Model (LLM) seperti Qwen-2.5 7B secara langsung di lingkungan desktop pengguna sering menghadapi dua kendala utama:
1. **Kebutuhan VRAM/RAM yang Masif**: Model *unquantized* (FP16/FP32) membutuhkan memori lebih dari 14 GB, yang mustahil berjalan mulus di laptop consumer standar.
2. **UI Freezing**: Eksekusi inferensi AI di *main thread* akan memblokir *event loop* antarmuka grafis (GUI), menyebabkan aplikasi tidak responsif (*Not Responding*).

---

## 2. Solusi 1: Kuantisasi GGUF (4-bit / Q4_K_M)
Format **GGUF** (*GPT-Generated Unified Format*) dirancang untuk eksekusi CPU & GPU yang efisien melalui `llama.cpp`. Dengan mengonversi bobot model ke format 4-bit (`Q4_K_M`), kebutuhan RAM menyusut drastis dari **~14.5 GB menjadi hanya ~4.8 GB** dengan penurunan skor perplexity yang sangat minimal (< 0.05%).

### Contoh Implementasi Python (`llama-cpp-python`):
```python
from llama_cpp import Llama

# Inisialisasi model dengan offload layer ke GPU jika tersedia
llm = Llama(
    model_path="models/qwen2.5-7b-instruct-q4_k_m.gguf",
    n_ctx=2048,       # Context window
    n_threads=6,      # Jumlah core CPU fisik untuk thread inferensi
    n_gpu_layers=33,  # Offload semua layer transformer ke VRAM jika ada GPU
    verbose=False
)

def extract_viral_hook(transcription_text: str) -> str:
    prompt = f"<|im_start|>system\nAnda adalah kurator video profesional.<|im_end|>\n<|im_start|>user\nTentukan 1 hook paling menarik dari teks berikut:\n{transcription_text}<|im_end|>\n<|im_start|>assistant\n"
    response = llm(prompt, max_tokens=150, temperature=0.3, stop=["<|im_end|>"])
    return response['choices'][0]['text'].strip()
```

---

## 3. Solusi 2: Concurrency dengan `QThread` di PyQt6
Agar GUI desktop tetap responsif pada 60 FPS saat model melakukan kalkulasi token (*token generation*), seluruh pipeline AI harus didelegasikan ke *worker thread*.

```python
from PyQt6.QtCore import QThread, pyqtSignal

class LLMWorker(QThread):
    finished = pyqtSignal(str)
    progress = pyqtSignal(str)

    def __init__(self, text_input: str):
        super().__init__()
        self.text_input = text_input

    def run(self):
        self.progress.emit("Sedang menganalisis konteks video...")
        result = extract_viral_hook(self.text_input)
        self.finished.emit(result)
```

---

## 4. Kesimpulan
Kombinasi kuantisasi model **GGUF** dan arsitektur *event-driven* **QThread** memungkinkan aplikasi berbasis AI berjalan mandiri di komputer pengguna biasa tanpa memerlukan koneksi internet, tanpa biaya sewa server cloud (*zero cloud cost*), dan dengan privasi data pengguna yang terlindungi 100%.
