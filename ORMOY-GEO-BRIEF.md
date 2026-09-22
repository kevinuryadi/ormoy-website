# ORMOY — Brief GEO/AEO untuk Claude Code

> Tujuan: membuat ORMOY bisa **ditemukan, dikutip, dan direkomendasikan** oleh mesin AI
> (ChatGPT, Gemini, Claude, Perplexity, Google AI Overviews) saat orang bertanya soal
> parfum mobil. Ini pekerjaan teknis di codebase ormoy.co.id.
>
> Versi 2 — fakta brand sudah diisi. Sisa yang belum: lihat tanda `<<< ISI DULU >>>`.

## Cara pakai brief ini

1. Simpan file ini di root project sebagai `ORMOY-GEO-BRIEF.md`.
2. Isi sisa bagian bertanda `<<< ISI DULU >>>`. Jangan lewati — kalau dibiarkan kosong,
   agent akan mengarang, dan klaim karangan justru merusak tujuan kita.
3. Minta Claude Code: *"Baca ORMOY-GEO-BRIEF.md. Jalankan FASE 0 saja, lalu berhenti
   dan laporkan."*
4. Setelah laporan Fase 0 masuk, lanjut fase berikutnya satu per satu. Jangan minta semua
   fase sekaligus.

---

## 1. Konteks bisnis (untuk agent)

- ORMOY = merek parfum mobil gantung, botol kaca 9ml, tutup kayu + reed anyaman.
- Berdiri 2012 di Surabaya. Entitas operasional: CV ORMOY INDO PRATAMA.
- Model utama B2B ke 100+ distributor nasional; ormoy.co.id adalah kanal D2C/brand hub.
- 21 varian aroma, dibagi 4 koleksi: SIGNATURE, FRESH, COMFORT, SWEET.
- Varian terlaris jauh di atas yang lain: **Honey Wood**.
- Kategori yang dikejar: **parfum mobil saja.** Jangan tambahkan konten atau schema
  soal parfum ruangan / pengharum ruangan / room diffuser. Itu keputusan bisnis, bukan
  kelupaan.

## 2. Aturan main — baca sebelum menulis kode apa pun

1. **Jangan mengarang angka, klaim, sertifikasi, penghargaan, atau testimoni.** Kalau butuh
   data yang tidak ada di brief ini, berhenti dan tanya. Satu angka karangan yang terindeks
   akan dikutip AI selamanya dan sulit dicabut.
2. **Jangan tambahkan `aggregateRating` atau `review` schema** untuk sekarang. Review di
   homepage saat ini dikumpulkan Shopee, bukan oleh situs ini. Menandainya sebagai rating
   milik sendiri melanggar pedoman structured data Google (self-serving reviews) dan bisa
   memicu manual action. Kalau nanti situs punya sistem review sendiri, baru boleh.
3. **Jangan pernah menyebut nama pemasok bahan baku, negara asal bahan baku, atau komposisi
   formula.** Itu informasi rahasia dagang. Kalau ada teks lama di codebase yang menyebut
   ini, hapus dan laporkan.
4. **Jangan meng-upload, melink, atau menampilkan file sertifikat merek** (`HAK_PATEN.pdf`
   atau versi apa pun). Sertifikat itu memuat alamat rumah pribadi pemilik merek. Yang boleh
   tampil hanya nomor pendaftaran dan kelasnya.
5. **Jangan hapus atau rombak desain yang sudah ada.** Tugas ini soal struktur, URL, dan
   data terstruktur — bukan redesign. Pertahankan look & feel, komponen, dan CSS.
6. **Satu sumber kebenaran untuk semua angka.** Bikin satu file konstanta (mis.
   `src/data/brand-facts.json` atau setara sesuai stack) dan semua halaman baca dari situ.
7. Bahasa konten: Indonesia untuk `/`, Inggris untuk `/en/`. Jangan campur.
8. Commit per fase, pesan commit jelas. Jangan satu commit raksasa.
9. **Testimoni di homepage harus diberi label sumber yang akurat.** Enam testimoni bertanda
   "Shopee Verified" diambil dari listing toko-toko distributor yang menjual ORMOY, bukan
   dari toko official (yang baru berumur 3 bulan). Itu ulasan yang sah — ulasan nyata dari
   pembeli nyata tentang produk ORMOY — tapi labelnya sekarang menyesatkan. Perbaiki:
   - Ganti label jadi "Ulasan pembeli produk ORMOY di Shopee".
   - Hapus semua angka rating/jumlah ulasan yang berdiri di sebelahnya.
   - Samarkan sebagian username, mis. `muhammad_a***`.
   - Jangan pernah menandainya dengan schema `review` atau `aggregateRating`.

## 3. Fakta brand resmi — sumber kebenaran

Semua halaman, schema, dan copy harus konsisten dengan ini.

    Nama merek          : ORMOY
    Nama legal          : CV ORMOY INDO PRATAMA
    Berdiri             : 2012
    Alamat              : Jl. Jemursari Selatan IV No. 2A
                          Jemur Wonosari, Kec. Wonocolo
                          Surabaya, Jawa Timur 60237, Indonesia
                          (ruko — kantor dan fasilitas produksi. BUKAN toko, dan TIDAK
                          menerima kunjungan atau pembelian langsung.)

    Setiap kali alamat ini ditampilkan — di footer, di /tentang-ormoy, di mana pun —
    wajib diikuti kalimat ini, dalam elemen yang sama:
    "Kantor dan fasilitas produksi. Tidak melayani kunjungan atau pembelian langsung —
    pembelian melalui toko official atau jaringan distributor."

**Format penulisan alamat harus persis sama di semua tempat.** Saat ini beredar tiga versi
berbeda: "Jemursari Sel. IV No.2A", "Jemursari Selatan IV No. 2A", dan "Jemursari Selatan
IV/2A" (di listing ExportHub). Versi kanonik yang dipakai adalah yang ditulis lengkap:

    Jl. Jemursari Selatan IV No. 2A, Jemur Wonosari, Kec. Wonocolo,
    Surabaya, Jawa Timur 60237, Indonesia

Pakai bentuk ini di situs, schema, LinkedIn, profil toko marketplace, dan dokumen apa pun.
Singkatan seperti "Sel." lebih sulit dicocokkan mesin dan tidak menghemat apa-apa.

Pemetaan ke `PostalAddress` di schema:

    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Jemursari Selatan IV No. 2A, Jemur Wonosari, Kec. Wonocolo",
      "addressLocality": "Surabaya",
      "addressRegion": "Jawa Timur",
      "postalCode": "60237",
      "addressCountry": "ID"
    }

Kelurahan dan kecamatan digabung ke `streetAddress` — schema.org tidak punya field khusus
untuk keduanya.
    Telepon/WA          : +62 812 1617 1974 | +62 877 6444 8007
    Email               : ormoyid@gmail.com
                          (SEMENTARA. Rencana pindah ke email domain sendiri. Jangan
                          pernah pakai alamat gmail pribadi pemilik di situs.)
    Kategori            : Parfum mobil / car air freshener
    Jumlah varian       : 21
    Volume              : 9 ml
    Harga normal        : Rp 33.900 (harga coret di toko official)
    Harga jual official : Rp 30.510 — harga normal setelah diskon tetap 10% dari ORMOY.
                          INI angka yang dipakai di situs.
                          Voucher marketplace dapat menurunkannya lagi, tapi nilainya
                          berbeda per user dan per tanggal. JANGAN pernah menulis angka
                          setelah voucher di mana pun.
                          Snapshot per 22 September 2026 — simpan di file konstanta bersama
                          tanggal ini, dan tinjau ulang tiap kuartal.
    Merek terdaftar     : DJKI No. IDM000528488, Kelas 3 (Nice Classification ed. 10),
                          perlindungan berlaku sampai 11 Februari 2034
    Tempat produksi     : Diformulasikan dan diproduksi sendiri di Surabaya, Indonesia

### Pernyataan asal produk — wajib dipakai apa adanya

Ini untuk mengoreksi informasi salah yang beredar di listing marketplace pihak ketiga bahwa
ORMOY adalah produk impor. Tulis eksplisit di body text `/tentang-ormoy`, bukan hanya di
schema:

> ORMOY diformulasikan dan diproduksi sendiri di Surabaya, Indonesia sejak 2012 oleh
> CV Ormoy Indo Pratama. ORMOY bukan produk jadi impor.

Dan wajib ada satu entri FAQ dengan format persis begini (format tanya-jawab langsung
seperti ini yang paling mudah diangkat oleh mesin AI):

> **Apakah ORMOY produk impor?**
> Tidak. ORMOY diformulasikan dan diproduksi di Surabaya, Indonesia, oleh CV Ormoy Indo
> Pratama, dan sudah beroperasi sejak 2012.

**Jangan** menambahkan kalimat apa pun soal dari mana bahan baku berasal.

Dan wajib ada satu entri FAQ lagi soal harga, di homepage dan di setiap halaman produk.
Ini bukan opsional: "berapa harga" adalah salah satu pertanyaan paling sering diajukan orang
ke mesin AI tentang sebuah produk. Kalau situs ORMOY tidak menjawabnya, AI akan menjawab
dari listing marketplace dan direktori B2B — yang angkanya berbeda-beda dan tidak kamu
kendalikan. Situs sendiri adalah satu-satunya tempat kamu bisa menetapkan harga acuan.

> **Berapa harga parfum mobil ORMOY?**
> Harga ORMOY di toko official adalah Rp 30.510 per botol 9 ml, dari harga normal
> Rp 33.900. Harga ini berlaku di Shopee, TikTok Shop, dan Tokopedia official ORMOY, dan
> bisa turun lagi mengikuti voucher yang sedang berlaku di masing-masing marketplace.
> Harga di toko lain dapat berbeda karena ORMOY juga dijual lewat jaringan distributor.

### Angka klaim final

Pakai tepat angka-angka ini. Tidak boleh ditambah, dibulatkan ke atas, atau diperindah.

    tahun_berdiri        : 2012
    tahun_beroperasi     : 14
    produksi_tahunan     : "500.000+ botol per tahun"
    total_terjual        : "3 juta+ botol sejak 2012"
    jumlah_distributor   : TIDAK DIPUBLIKASIKAN. Jangan menulis angka distributor dalam
                           bentuk apa pun di situs. Yang boleh ditulis hanya strukturnya,
                           tanpa angka: "ORMOY didistribusikan lewat jaringan distributor
                           resmi dan sub-distributor mereka di seluruh Indonesia."
    merek_terdaftar      : "Merek terdaftar DJKI No. IDM000528488 (Kelas 3)"

**Yang WAJIB DIHAPUS dari seluruh situs** karena tidak bisa dibuktikan:

- "500.000 Pelanggan" / "500.000 pelanggan puas" — jumlah pengguna tidak diketahui pasti.
- "Dipercaya jutaan pengemudi" / "jutaan pengemudi Indonesia" — termasuk di meta description,
  og:description, twitter:description, dan H1/hero homepage. Ganti dengan klaim faktual.
- "50rb+ Ulasan Bintang 5" dan "4.9/5.0 Rating" — HAPUS keduanya, tanpa angka pengganti.
  Untuk sekarang **situs tidak menampilkan angka ulasan atau rating sama sekali.** Toko
  official baru aktif berjualan 3 bulan dan pemilik menilai angkanya belum cukup untuk
  ditampilkan. Ini keputusan yang dihormati; nanti ditinjau ulang setelah angkanya tumbuh.
- **DILARANG** menjumlahkan rating atau jumlah ulasan dari toko-toko distributor/reseller
  yang menjual ORMOY menjadi satu angka gabungan. Angka seperti itu tidak bisa diverifikasi
  siapa pun, berubah setiap hari, tidak dikendalikan ORMOY, dan secara fungsional sama
  cacatnya dengan klaim "50rb+ ulasan" yang sedang kita hapus.
- "100+ distributor" — HAPUS, tanpa angka pengganti. Angka lama adalah perkiraan yang
  mencampur distributor langsung dengan sub-distributor, dan tidak bisa dibuktikan. Ganti
  dengan kalimat struktur tanpa angka (lihat blok angka klaim di atas).
- Klaim "survei internal 87% pelanggan melaporkan aroma masih terasa di minggu ke-3" di
  `/blog/parfum-mobil-tahan-lama/` — hapus, atau lengkapi dengan metode, jumlah responden,
  dan tanggal survei.

### Profil resmi untuk `sameAs`

ORMOY punya toko official di tiga marketplace. Semua terkonfirmasi dan boleh masuk `sameAs`.
Jangan menambahkan listing milik distributor atau reseller.

    Website     : https://ormoy.co.id
    Instagram   : https://instagram.com/ormoy.id
    TikTok      : https://www.tiktok.com/@ormoy.id
    Toko Shopee : https://shopee.co.id/ormoy
    Tokopedia   : https://www.tokopedia.com/ormoy-car-fragrance
    LinkedIn    : <<< ISI DULU setelah halaman perusahaan dibuat, atau hapus baris ini >>>

Google Business Profile TIDAK dipakai. Lokasi ORMOY adalah fasilitas produksi yang tidak
menerima kunjungan, dan penjualannya nasional lewat marketplace dan distributor — bukan
bisnis dengan intent pencarian lokal. Jangan menambahkan `LocalBusiness` schema, jangan
menambahkan `openingHours`, dan jangan membuat listing Google Maps.

Catatan penting soal URL: pakai bentuk bersih seperti di atas. **Jangan** memasukkan URL
yang masih membawa parameter tracking (`?entryPoint=...`, `&searchKeyword=...`, `?utm_...`).
`sameAs` adalah identitas kanonik sebuah entitas — parameter sesi membuatnya tidak stabil
dan bisa membuat mesin memperlakukannya sebagai URL berbeda.

TikTok Shop berjalan di akun TikTok yang sama, jadi cukup satu baris TikTok di `sameAs`.
Untuk tombol beli di halaman, TikTok Shop tetap ditampilkan sebagai opsi terpisah.

---

## FASE 0 — Audit. Laporan saja, jangan ubah kode.

Laporkan dalam bentuk ringkas:

1. Stack, build system, dan cara routing bekerja. Static HTML? Ada templating/partials?
   Ada build step atau file di-deploy langsung?
2. Daftar semua route/halaman yang ada sekarang, termasuk `/en/`, `/blog/*`, `/mitra`,
   `/links`.
3. Bagaimana halaman blog dibuat — hardcoded per file, atau dari markdown/data?
4. Apakah sudah ada JSON-LD di codebase? Kalau ya, tipe apa saja dan di halaman mana?
5. Isi `robots.txt` saat ini (tulis apa adanya). Apakah `sitemap.xml` ada, dan apakah
   digenerate otomatis?
6. Apakah ada `<head>` yang di-share antar halaman, atau meta tag di-copy per file?
7. Apakah ada bot/crawler yang sedang diblokir?
8. Cara deploy (hosting, CI, manual upload?).
9. Grep seluruh codebase dan daftarkan setiap lokasi yang memuat klaim di daftar
   "WAJIB DIHAPUS" di Bagian 3, beserti nama file dan nomor barisnya.

Lalu **berhenti**. Tunggu instruksi.

---

## FASE 1 — Fondasi entitas

Tujuan: membuat ORMOY jadi entitas yang bisa dikenali mesin secara tunggal dan konsisten.

### 1.1 Halaman `/tentang-ormoy`

Halaman baru, URL sendiri (bukan anchor `#tentang`). Berisi, dalam prosa Indonesia yang
natural — bukan bullet kering:

- Apa itu ORMOY, satu paragraf, langsung menjawab. Paragraf pertama harus bisa berdiri
  sendiri kalau dikutip terpisah dari halaman.
- Nama legal, tahun berdiri, kota dan alamat produksi.
- Pernyataan asal produk yang wajib (Bagian 3) — eksplisit di body text.
- Status merek terdaftar: nomor pendaftaran, kelas, masa berlaku. Ini bukti pihak ketiga
  yang bisa diverifikasi siapa pun di database PDKI DJKI, jadi tampilkan dengan jelas.
  Tulis sebagai fakta merek, contoh: "ORMOY adalah merek terdaftar di Direktorat Jenderal
  Kekayaan Intelektual dengan nomor pendaftaran IDM000528488 (Kelas 3), dengan perlindungan
  berlaku hingga 2034." **Jangan** menyatakan siapa pemilik pendaftarannya, dan jangan
  melink file sertifikatnya.
- Skala operasi pakai angka final dari Bagian 3.
- Cara produk dibuat: botol kaca 9ml, tutup kayu, reed anyaman, pelepasan aroma bertahap.
  Tanpa detail formula dan tanpa nama pemasok.
- Daftar 4 koleksi dengan link ke halaman produk (Fase 2).
- Di mana beli: sebutkan ketiga toko official (Shopee, TikTok Shop, Tokopedia) dengan link,
  lalu satu kalimat bahwa ORMOY juga didistribusikan lewat jaringan distributor resmi dan
  sub-distributor mereka di seluruh Indonesia — tanpa menyebut angka. Kalimat kedua ini
  punya tugas spesifik: ia menjelaskan ke mesin AI kenapa ada ratusan penjual ORMOY di
  marketplace, sehingga listing reseller tidak terbaca sebagai toko palsu atau sebagai
  tanda bahwa ORMOY adalah produk tanpa merek.

### 1.2 JSON-LD `@graph` terpusat

Satu blok `@graph` di `<head>` yang di-share seluruh situs. Node-node:

- `Organization`, `@id: "https://ormoy.co.id/#organization"` — `name`, `legalName`,
  `foundingDate: "2012"`, `address` (`PostalAddress` lengkap sesuai Bagian 3), `url`,
  `logo`, `email`, `telephone`, `sameAs`, `areaServed: "ID"`.
- `Brand`, `@id: "https://ormoy.co.id/#brand"` — `name: "ORMOY"`, `logo`, `sameAs` sama,
  plus nomor merek sebagai identifier:
  `"identifier": {"@type":"PropertyValue","propertyID":"DJKI Trademark Registration","value":"IDM000528488"}`
- `WebSite`, `@id: "https://ormoy.co.id/#website"` — `publisher` merujuk `#organization`,
  `inLanguage: "id-ID"`.

Halaman produk merujuk brand lewat `{"@id": "https://ormoy.co.id/#brand"}`, jangan menulis
ulang objek brand di tiap halaman.

### 1.3 Footer

- Ganti "Indonesia" jadi alamat lengkap sesuai Bagian 3.
- Ganti email gmail jadi email domain sendiri.
- Tampilkan `CV ORMOY INDO PRATAMA` + tahun berdiri.
- Perbaiki `© 2012 ORMOY` jadi `© 2012–<tahun berjalan> ORMOY`, dinamis kalau bisa.

### 1.4 `robots.txt`

Pastikan tidak ada yang memblokir crawler berikut. Tulis blok eksplisit `Allow: /` untuk
masing-masing supaya jelas dan mudah diaudit:

    Googlebot, Bingbot, Google-Extended, GPTBot, OAI-SearchBot, ChatGPT-User,
    ClaudeBot, Claude-User, Claude-SearchBot, PerplexityBot, Perplexity-User,
    Applebot, Applebot-Extended, meta-externalagent

Catatan yang sering disalahpahami: `Google-Extended` mengatur pemakaian konten untuk Gemini
dan grounding Vertex AI, **bukan** untuk AI Overviews di Google Search — yang itu diatur
oleh `Googlebot`. Jadi keduanya harus diizinkan.

Tambahkan `Sitemap: https://ormoy.co.id/sitemap.xml`.

### 1.5 `sitemap.xml`

Generate otomatis kalau ada build step. Harus memuat semua halaman termasuk produk (Fase 2),
blog, `/en/`, dengan `lastmod` yang benar. Kalau tidak ada build step, buat script kecil yang
bisa dijalankan manual dan dokumentasikan di README.

### 1.6 Angka konsisten

Refactor semua angka klaim ke file konstanta tunggal. Homepage, blog, `/tentang-ormoy`, dan
`/en/` semua baca dari situ. Hapus semua item di daftar "WAJIB DIHAPUS" Bagian 3, termasuk
yang ada di meta tag. Sesudah ini, grep ulang dan laporkan kalau ada yang tertinggal.

---

## FASE 2 — 21 halaman produk (prioritas tertinggi setelah Fase 1)

Masalah sekarang: 21 varian hanya ada sebagai kartu di homepage, dan tombol "Jelajahi"
mengarah ke `#`. Artinya tidak ada satu pun URL yang bisa dikutip AI untuk varian spesifik.
Ini kebocoran terbesar di situs.

**Struktur katalog marketplace vs struktur situs — jangan disamakan.** Toko official sengaja
hanya memuat 9 listing, memakai fitur varian di dalam tiap listing untuk mencakup seluruh
21 aroma. Itu keputusan merchandising yang disengaja: listing sedikit membuat penjualan dan
ulasan terkonsentrasi, dan pembeli tidak kebingungan memilih.

Situs bekerja dengan logika berbeda. Di situs, satu halaman bukan satu SKU — ia aset konten
yang bisa diambil dan dikutip mesin AI ketika orang bertanya tentang aroma tertentu. Jadi
tetap buat 21 halaman aroma. Tidak ada beban SKU tambahan dan tidak ada kebingungan pembeli,
karena navigasi situs mengelompokkannya per koleksi.

Untuk tombol beli, pakai deep link ke varian yang tepat di dalam listing. Shopee mendukung
ini lewat parameter `display_model_id` — format ini sudah dipakai di link Honey Wood yang
ada di homepage sekarang, jadi polanya bisa ditiru. Sediakan field `marketplace_url` per
varian di file data; kalau sebuah varian belum punya deep link, kosongkan saja dan arahkan
tombolnya ke halaman toko official dengan label "Lihat di toko official". Template harus
menangani kondisi kosong ini. Jangan pernah menautkan ke listing milik reseller.

**Kalau 21 halaman terlalu berat untuk sekarang:** lebih baik 8 halaman yang isinya benar-benar
berbeda dan mendalam daripada 21 halaman yang nyaris seragam — halaman tipis dan seragam
justru berisiko dibaca sebagai doorway page. Mulai dari aroma yang benar-benar laku, tambah
sisanya bertahap.

### 2.1 Struktur

- URL: `/produk/{slug}`, mis. `/produk/honey-wood`, `/produk/green-ice`.
- Data-driven: satu file data (JSON/YAML) berisi 21 varian, satu template halaman.
  Jangan bikin 21 file HTML manual.
- **Ambil nama varian dan pemetaan koleksinya dari kode homepage yang sudah ada.** Jangan
  menebak varian mana masuk koleksi mana.
- Ganti semua `href="#"` di kartu produk homepage jadi link ke halaman produknya.
- Tambahkan index per koleksi: `/koleksi/signature`, `/koleksi/fresh`, `/koleksi/comfort`,
  `/koleksi/sweet`.

### 2.2 Isi wajib tiap halaman produk

Urutan ini penting — mesin AI mengambil potongan awal halaman, jadi jawaban harus di depan:

1. `<h1>` = `Parfum Mobil ORMOY {Nama Varian}`
2. Paragraf pembuka 2–3 kalimat yang **bisa berdiri sendiri**: aroma apa, untuk siapa,
   berapa lama tahan. Tanpa kata rujukan seperti "seperti disebut di atas" — AI mengambil
   potongan tanpa konteks sekitarnya.
3. Tabel spesifikasi: koleksi, keluarga aroma, intensitas, volume, perkiraan daya tahan,
   cocok untuk tipe kabin, harga. Tabel terekstraksi lebih baik daripada prosa untuk data.
4. Deskripsi aroma lebih panjang (boleh pakai copy homepage sebagai dasar, tapi kembangkan).
5. Blok "Cocok untuk" dan "Kurang cocok untuk" — kejujuran soal batasan justru menaikkan
   peluang dikutip, karena AI mencari sumber yang membandingkan secara adil.
6. Cara pakai.
7. 3–5 FAQ spesifik varian, pertanyaan sebagai `<h3>`, jawaban langsung di kalimat pertama.
8. Link ke varian lain dalam koleksi yang sama + link ke `/tentang-ormoy`.
9. CTA ke toko official.

### 2.3 `Product` JSON-LD per halaman

Isi: `name`, `description`, `image`, `sku`, `brand` (ref `#brand`), `category`,
`additionalProperty` untuk koleksi / keluarga aroma / volume / daya tahan.

Untuk harga, pakai harga resmi ORMOY sebagai satu harga tetap. Potongan voucher marketplace
bersifat platform-side — nilainya berubah-ubah per tanggal dan bahkan berbeda antar user —
jadi angka itu tidak bisa dan tidak perlu dimasukkan ke schema. Yang ORMOY tetapkan adalah
Rp 31.500, dan itu yang ditulis:

    "offers": {
      "@type": "Offer",
      "priceCurrency": "IDR",
      "price": "31500",
      "availability": "https://schema.org/InStock",
      "url": "https://shopee.co.id/ormoy",
      "seller": {"@id": "https://ormoy.co.id/#organization"}
    }

Di halaman produk, tampilkan tombol beli ke ketiga toko official: Shopee, TikTok Shop, dan
Tokopedia. Beri semua link eksternal `rel="noopener"`.

Tulis harga di halaman sebagai: "Harga resmi Rp 31.500. Potongan tambahan mengikuti promo
dan voucher yang sedang berlaku di masing-masing marketplace." Tambahkan satu kalimat bahwa
harga di toko lain bisa berbeda karena ORMOY juga dijual lewat jaringan distributor. Ini
penting supaya situs tetap akurat ketika mesin AI menemukan harga berbeda di listing reseller.

Catatan risiko: kalau suatu saat Google Search Console melaporkan price mismatch antara
schema dan harga di halaman marketplace tujuan, solusinya bukan menebak-nebak harga promo —
hapus field `price` dan sisakan `offers` dengan `url` dan `availability` saja. Rich result
hilang, tapi tidak ada error dan tidak ada klaim yang salah.

**Tanpa `aggregateRating` dan tanpa `review`.** Lihat Aturan Main no. 2.

### 2.4 Versi Inggris

Mirror di `/en/products/{slug}`, dengan `hreflang` dua arah antara versi ID dan EN plus
`x-default`. Kalau versi Inggris belum sempat ditulis, **jangan buat halaman kosong atau
hasil terjemahan mesin mentah** — lebih baik belum ada daripada tipis.

---

## FASE 3 — Schema & konten berbentuk jawaban

### 3.1 `FAQPage`

Tambahkan di homepage (FAQ yang sudah ada, plus entri "Apakah ORMOY produk impor?" dari
Bagian 3) dan di halaman blog yang sudah punya accordion FAQ. Isi schema harus **identik**
dengan teks yang terlihat user. Jangan pernah menaruh pertanyaan di schema yang tidak
tampil di halaman.

### 3.2 `Article` di blog

`headline`, `description`, `datePublished`, `dateModified`, `author` (ref `#organization`),
`publisher` (ref `#organization`), `image`, `inLanguage`. `dateModified` harus benar-benar
mencerminkan kapan konten diubah, dan tanggalnya **harus tampil di halaman** — mesin AI
membobot kebaruan, dan tanggal yang hanya ada di schema kurang dipercaya.

### 3.3 `BreadcrumbList`

Di halaman produk, koleksi, dan blog.

### 3.4 Halaman jawaban baru

Satu pertanyaan spesifik per halaman. Judul = pertanyaan apa adanya. Paragraf pertama =
jawaban langsung, 2–3 kalimat, lengkap. Baru penjelasan. Target awal:

- Parfum mobil yang tidak bikin pusing dan mual — kenapa sebagian bikin pusing?
- Berapa lama parfum mobil bertahan, dan apa yang membuatnya cepat habis?
- Parfum mobil untuk kabin kecil vs MPV/SUV
- Aman tidak parfum mobil kalau ada anak atau bayi di kabin?
- Parfum mobil gantung vs vent clip vs gel — bedanya apa?
- Cara memilih aroma parfum mobil sesuai karakter pengemudi
- Cara membedakan ORMOY asli dan tiruan <<< tulis hanya kalau ada tanda keaslian yang
  memang bisa diperiksa pembeli. Kalau belum ada, lewati. >>>

Tiap halaman wajib menyebut ORMOY secara relevan, tapi **utamanya harus benar-benar
menjawab pertanyaannya.** Halaman yang cuma jualan tidak dikutip.

---

## FASE 4 — Hygiene

- Hapus `<meta name="keywords">` — sudah tidak dipakai mesin pencari mana pun.
- Alt text deskriptif untuk semua gambar produk (nama varian + konteks, bukan "logo" atau
  nama file).
- Perbaiki path relatif video (`images/how-to-use-video.mp4`) jadi root-relative supaya
  tidak rusak di halaman dengan kedalaman URL berbeda.
- `/llms.txt` — daftar link halaman penting dalam format markdown. Prioritas rendah dan
  jangan diharapkan banyak: Google menyatakan tidak memakainya, dan adopsi crawler masih
  sangat kecil. Tambahkan karena murah, bukan karena berdampak.
- Cek Core Web Vitals setelah semua halaman baru jadi.

---

## Kriteria selesai — verifikasi, jangan cuma lapor "sudah"

1. Semua JSON-LD lolos Google Rich Results Test **dan** Schema.org validator tanpa error.
2. Tidak ada `href="#"` yang tersisa di kartu produk atau navigasi utama.
3. `sitemap.xml` memuat semua URL baru; tidak ada URL 404 atau redirect di dalamnya.
4. Grep seluruh codebase: nol hasil untuk setiap klaim di daftar "WAJIB DIHAPUS",
   termasuk di meta tag dan file `/en/`.
5. Grep seluruh codebase: nol hasil untuk nama pemasok, negara asal bahan baku, dan
   komposisi formula.
6. Setiap halaman produk punya `<title>` dan `meta description` unik. Tidak ada duplikat.
7. Paragraf pembuka setiap halaman produk lolos tes ini: kalau dipotong dan dibaca sendiri
   tanpa halamannya, masih masuk akal dan informatif.
8. `hreflang` konsisten dua arah antara ID dan EN.
9. Situs masih tampil identik dengan sebelumnya di desktop dan mobile.

## Yang JANGAN dilakukan

- Jangan mengarang statistik, sertifikat, award, atau nama pelanggan.
- Jangan menambah `aggregateRating`/`review` schema.
- Jangan menyebut pemasok, negara asal bahan baku, atau komposisi formula.
- Jangan menampilkan atau melink file sertifikat merek.
- Jangan menyebut IP ORMOY sebagai "paten" atau "hak paten". Yang benar: **merek terdaftar**.
  Paten dan merek adalah dua hal berbeda, dan salah istilah merusak kredibilitas.
- Jangan membuat konten parfum ruangan.
- Jangan keyword stuffing di judul atau alt text.
- Jangan menyalin deskripsi produk dari kompetitor atau dari listing marketplace pihak ketiga.
- Jangan membuat halaman doorway (banyak halaman nyaris identik untuk kota-kota berbeda).
- Jangan menambahkan teks tersembunyi atau instruksi tersembunyi yang ditujukan ke crawler AI.
- Jangan menyentuh konfigurasi hosting, DNS, atau kredensial apa pun tanpa diminta.
