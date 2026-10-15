# AFRIÉ Parfums — Landing Page Native

Website landing page parfum luxury untuk tugas HTML5, CSS3, dan JavaScript murni.

## Struktur folder

```text
afrie-parfum/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Cara menjalankan di VS Code

1. Ekstrak `afrie-parfum.zip`.
2. Buka VS Code, pilih **File → Open Folder**, lalu pilih folder `afrie-parfum`.
3. Buka `index.html`.
4. Cara termudah: klik kanan di `index.html` → **Open with Live Server** (jika ekstensi Live Server tersedia).
5. Jika tidak memakai Live Server, buka folder melalui File Explorer lalu klik dua kali `index.html` untuk membukanya di browser.

## Fitur

- HTML5 semantik: `header`, `nav`, `main`, `section`, `article`, `form`, dan `footer`.
- CSS3: Flexbox, Grid, media queries, hover effects, dan animasi ringan.
- JavaScript: menu hamburger, penghitung tas demo, notifikasi, validasi form, dan tahun footer otomatis.
- Responsif untuk desktop, tablet, dan ponsel.
- Formulir hanya demo browser; tidak mengirim data ke server.

## Catatan

Gambar dan font diambil dari layanan eksternal sehingga perlu koneksi internet. Nama koleksi, harga, dan detail kontak adalah contoh untuk proyek pendidikan. Ganti detail kontak dengan data yang memang ingin ditampilkan sebelum publikasi.

## Checklist sebelum dikumpulkan

- [ ] Uji tautan navigasi.
- [ ] Uji menu hamburger dengan lebar layar kecil.
- [ ] Coba tombol “Tambahkan ke tas”.
- [ ] Kirim formulir kosong, lalu isi dengan data valid untuk menguji validasi.
- [ ] Buka Developer Tools → Console dan pastikan tidak ada error JavaScript.
- [ ] Uji tampilan desktop dan mobile.
- [ ] Pastikan file HTML, CSS, JS, dan README berada di folder yang sama.


## Keranjang dan pemesanan WhatsApp

1. Buka `script.js`.
2. Cari `const WHATSAPP_NUMBER="6281234567890";`.
3. Ganti nomor contoh itu dengan nomor WhatsApp toko yang aktif, memakai kode negara tanpa `+`, spasi, atau strip.
4. Simpan file dan refresh website.
5. Tambahkan produk ke tas, buka ikon tas, ubah jumlah atau hapus produk, lalu tekan **Pesan via WhatsApp**.

Checkout membuka WhatsApp dengan ringkasan pesanan dan total sementara. Pemilik toko perlu mengonfirmasi stok, ongkir, dan pembayaran melalui chat.
