import type en from './en'

const id: typeof en = {
  nav: {
    tagline: '/ backend developer',
    sheets: [
      { code: '01', label: 'Beranda', href: '#hero' },
      { code: '02', label: 'Tentang', href: '#about' },
      { code: '03', label: 'Tech stack', href: '#stack' },
      { code: '04', label: 'Pengalaman', href: '#experience' },
      { code: '05', label: 'Proyek', href: '#projects' },
      { code: '06', label: 'Cara kerja', href: '#architecture' },
      { code: '07', label: 'Kontak', href: '#contact' }
    ],
    pages: [
      { label: 'Proyek', href: '/projects' },
      { label: 'Blog', href: '/blog' }
    ],
    dashboard: 'DASHBOARD',
    logout: 'Keluar',
    downloadCv: 'Unduh CV',
    toLight: 'Ganti ke mode terang',
    toDark: 'Ganti ke mode gelap',
    switchLang: 'English',
    toggleNav: 'Buka/tutup menu'
  },
  sheet: 'BAGIAN',
  hero: {
    caption: 'GAMBARAN UMUM',
    location: 'Bandung, Indonesia · UTC+7 · remote',
    open: 'Terbuka untuk posisi senior engineer',
    title: ['Backend systems,', 'drawn to spec.'],
    subtitle: 'SENIOR BACKEND ENGINEER · 10+ TAHUN',
    bio: 'Sudah sepuluh tahun saya membangun platform marketplace dan sistem pembayaran kelas fintech dengan Ruby on Rails, Go, dan PostgreSQL. Keahlian utama saya ada di sistem backend. Saya pernah menangani proyek untuk salah satu perusahaan manufaktur FMCG terbesar di Indonesia, perusahaan startup, hingga perusahaan internasional. Terakhir, saya ikut membangun marketplace sewa dan jasa dari nol sampai rilis. Sekarang saya fokus kembali ke pekerjaan teknis sebagai senior engineer bersama tim remote.',
    viewProjects: 'Lihat proyek',
    experienceLog: 'Lihat pengalaman',
    scale: 'SKALA 1:1',
    stats: [
      { label: 'STATUS', value: 'aktif', running: true },
      { label: 'UPTIME', value: '99,99%', running: false },
      { label: 'TPS PUNCAK', value: '1.000', running: false },
      { label: 'LATENSI p95', value: '<150ms', running: false }
    ]
  },
  about: {
    title: 'Tentang saya',
    note: 'Sedikit tentang saya dan apa saja yang pernah saya bangun.'
  },
  featured: {
    title: 'Proyek pilihan',
    note: 'Beberapa proyek terbaru dan cerita teknis di baliknya.',
    viewAll: 'Lihat semua proyek'
  },
  stack: {
    title: 'Tech stack',
    note: 'Tools yang saya pakai sehari-hari untuk membangun dan menjalankan sistem.',
    groups: [
      { code: 'INF · 01', title: 'Infrastruktur', items: ['Docker / Docker Compose', 'Kubernetes', 'Terraform (IaC)', 'AWS / GCP', 'Nginx / Traefik'] },
      { code: 'LNG · 02', title: 'Bahasa', items: ['Ruby / Rails', 'Go', 'Node.js / NestJS', 'PHP / Laravel', 'JavaScript'] },
      { code: 'DAT · 03', title: 'Database', items: ['PostgreSQL', 'MySQL / SQL Server', 'Redis / Memcached', 'MongoDB', 'Prisma / ActiveRecord'] },
      { code: 'PRF · 04', title: 'Performa', items: ['Prometheus / Grafana', 'Distributed tracing', 'Load balancing', 'Optimasi query & index', 'BullMQ / Sidekiq'] }
    ]
  },
  experience: {
    title: 'Pengalaman',
    note: 'Diurutkan dari yang terbaru.',
    items: [
      {
        period: 'Mar 2026 — sekarang',
        role: 'Senior Backend Developer',
        company: 'PT Giradia Solusi Digital',
        current: true,
        description: [
          'Membangun Bati, POS SaaS multi-tenant berbasis NestJS dan PostgreSQL untuk aplikasi kasir Flutter dan dashboard admin.',
          'Merancang sinkronisasi offline-first: ID dibuat di aplikasi dengan UUIDv7, push bersifat idempoten, dan pull memakai cursor. Hasilnya, merchant tetap bisa berjualan saat offline lalu sinkron tanpa transaksi dobel atau stok yang hilang.',
          'Mencatat setiap pergerakan kas dan stok sebagai event yang tidak bisa diubah, lalu membentuk read model dari situ. Koreksi dilakukan dengan entri balik, bukan mengedit data lama. Laporan laba rugi, arus kas, neraca, rekap kas per shift, dan buku besar semuanya dihitung dari satu sumber data, jadi angka lama tidak bisa diubah diam-diam.',
          'Membangun sistem paket freemium/Pro: fitur tiap paket di-cache di Redis dan dicek di server lewat guard fitur dan kuota, sehingga setiap laporan bisa dijual terpisah sebagai add-on.',
          'Merilis alur penjualan F&B dengan tagihan per kanal dan open bill tanpa mengubah alur checkout utama. Beberapa terminal POS bisa melayani satu meja bersamaan tanpa data hilang karena race condition.',
          'Menjalankan production di Docker dan Traefik, serta membuat job terjadwal BullMQ (analitik, siklus langganan, notifikasi) aman dijalankan ulang dengan lock deduplikasi.',
          'Membuka jalan untuk horizontal scaling lewat service migrasi sekali jalan, rate limiting berbasis Redis, dan storage yang kompatibel dengan S3.'
        ],
        tags: ['NestJS', 'PostgreSQL', 'Redis', 'BullMQ', 'Docker', 'Traefik', 'Flutter']
      },
      {
        period: 'Mar 2022 — Feb 2026',
        role: 'Senior Backend Developer',
        company: 'Virtual Spirit',
        current: false,
        description: [
          'Menyusun layer domain dengan pola Interactor dan Organizer supaya logika bisnis tidak menumpuk di model dan controller Rails. Kode jadi lebih mudah dirawat dan review PR lebih cepat.',
          'Membangun infrastruktur pembayaran marketplace dari ujung ke ujung dengan Stripe API dan Stripe Connect, termasuk destination fee dan split payment.',
          'Membuat alur pembayaran otomatis yang meneruskan uang sewa dari penyewa ke pemilik sekaligus memotong fee platform. Rekonsiliasi manual tidak diperlukan lagi dan dana sampai di hari yang sama.',
          'Merancang sistem escrow dan tagihan langganan untuk pembayaran berulang, alur tahan-lalu-cairkan dana, serta pemesanan jasa profesional dengan beberapa tingkat harga.',
          'Membangun fitur chat dan sosial real-time dengan AnyCable di Ruby on Rails, sudah diuji untuk lebih dari 1.000 koneksi WebSocket bersamaan.',
          'Membereskan query N+1 dan beban database yang berat, lalu menambahkan counter cache dan cache Redis sehingga latensi PostgreSQL turun.',
          'Memindahkan seluruh stack aplikasi ke Docker dan Docker Compose agar lingkungan dev, staging, dan production sama. Onboarding engineer baru turun dari 2 hari jadi kurang dari 4 jam.',
          'Bekerja sama dengan tim FE, UI/UX, dan Product yang tersebar di beberapa zona waktu menggunakan Agile/Scrum.'
        ],
        tags: ['Ruby on Rails', 'PostgreSQL', 'Stripe Connect', 'AnyCable', 'Redis', 'Docker']
      },
      {
        period: 'Nov 2019 — Feb 2022',
        role: 'Engineering Manager',
        company: 'PT Weyland Indonesia Perkasa',
        current: false,
        description: [
          'Naik dari Senior Backend Developer menjadi Engineering Manager setelah 2 tahun. Bertanggung jawab atas arah teknologi dan keputusan arsitektur, memimpin tim 8 engineer, dan tetap ikut ngoding di backend.',
          'Memimpin backend AtozGo, aplikasi pesan-antar makanan yang dibangun sebagai lini produk baru. Dalam beberapa bulan setelah rilis, transaksinya tembus 154.000 per bulan dengan tingkat pengiriman berhasil 92% dan GMV Rp 3,76 miliar.',
          'Merancang sistem routing pesanan dan pengiriman yang melibatkan banyak pihak di 9 domain layanan, lengkap dengan push notification real-time lewat AnyCable.',
          'Memimpin migrasi dari monolit ke microservices dengan memisahkan alur billing dan transaksi menjadi service yang bisa di-deploy sendiri-sendiri.'
        ],
        tags: ['Ruby on Rails', 'AnyCable', 'Microservices', 'Team leadership']
      },
      {
        period: 'Nov 2017 — Nov 2019',
        role: 'Senior Backend Developer',
        company: 'PT Weyland Indonesia Perkasa',
        current: false,
        description: [
          'Memegang penuh arsitektur backend super-app fintech dengan 7 layanan utama dan lebih dari 21 sub-layanan: PPOB, top-up, QRIS, uang elektronik, tiket pesawat dan bus, transfer, hingga disbursement bank. Dalam dua tahun setelah rilis, volume transaksinya mencapai lebih dari Rp 8,6 miliar dan 181.000 transaksi per bulan.',
          'Menjaga sistem tetap di 1.000 TPS dengan uptime 99,9% saat puncak pembayaran tagihan, lewat load balancing di Nginx, horizontal scaling service stateless, dan membereskan bottleneck sebelum jadi insiden.'
        ],
        tags: ['Ruby on Rails', 'MySQL', 'Nginx', 'Payments']
      },
      {
        period: 'Okt 2015 — Des 2017',
        role: 'Backend Developer',
        company: 'Walden Global Services',
        current: false,
        description: [
          'Mengembangkan dan merawat sistem Shipping Export & Import untuk Nutrifood dengan Ruby on Rails dan SQL Server.',
          'Merapikan pengelolaan data dan mengoptimalkan query SQL yang rumit agar sistem lebih efisien.',
          'Menjadi technical lead di beberapa sprint: menyusun estimasi SOW, milestone, dan pembagian tugas developer.',
          'Membuat kerangka aplikasi dan library bersama yang dipakai seluruh tim supaya kode tetap konsisten.'
        ],
        tags: ['Ruby on Rails', 'SQL Server']
      },
      {
        period: 'Jan 2014 — Agu 2015',
        role: 'Backend Developer',
        company: 'Politeknik Piksi Ganesha',
        current: false,
        description: [
          'Membangun sistem manajemen sertifikasi dengan Laravel dan MySQL.',
          'Mengubah kebutuhan bisnis yang rumit menjadi fitur yang bisa langsung dipakai, tanpa mengorbankan stabilitas sistem.'
        ],
        tags: ['Laravel', 'MySQL']
      }
    ]
  },
  practice: {
    title: 'Cara saya bekerja',
    note: 'Prinsip yang saya pegang di setiap proyek.',
    intro: 'Bagi saya, backend yang baik itu jelas dan bisa dicek. Kontraknya eksplisit, perilakunya bisa diukur, dan riwayat perubahannya mudah ditelusuri siapa saja. Logika bisnis saya taruh di interactor, bukan di model. Alur yang menyangkut uang saya buat idempoten sejak awal, dan setiap service dilengkapi monitoring supaya kelihatan kalau ada yang tidak beres.',
    principles: [
      { code: 'N1', title: 'Kontrak dulu, baru kode', body: 'Pola interactor dan organizer menjaga logika bisnis tetap di luar model dan controller, jadi bisa dites secara terpisah.' },
      { code: 'N2', title: 'Uang tidak boleh dobel', body: 'Idempotency key di webhook, tabel outbox, dan ledger berbasis event. Request yang diulang tidak akan menagih atau membayar dua kali.' },
      { code: 'N3', title: 'Ukur, jangan menebak', body: 'Target p95 untuk tiap endpoint, tracing di setiap hop, dan dashboard yang bisa dipahami orang non-teknis.' },
      { code: 'N4', title: 'Tes sejak awal', body: 'Semua alur pembayaran dan autentikasi dilindungi tes RSpec di CI sejak commit pertama, bukan ditambahkan belakangan.' }
    ],
    detail: 'Alur sebuah request',
    nodes: [
      { code: '01', label: 'edge / load balancer', meta: 'nginx · alb' },
      { code: '02', label: 'api service', meta: 'rails · go' },
      { code: '03', label: 'domain interactors', meta: 'idempoten' },
      { code: '04', label: 'queue & workers', meta: 'sidekiq · bullmq' },
      { code: '05', label: 'postgres + redis', meta: 'replica · cache' }
    ],
    observable: 'setiap langkah bisa dipantau'
  },
  footer: {
    titleBlock: 'KONTAK',
    heading: 'Ada sistem yang mau dibangun bareng?',
    body: 'Saya terbuka untuk pekerjaan backend dan platform level senior bersama tim remote. Bisa juga untuk code review, audit arsitektur, atau membangun sistem pembayaran.',
    fields: [
      { label: 'NAMA', value: 'Gilang Ramadan' },
      { label: 'BIDANG', value: 'Backend / platform' },
      { label: 'SKALA', value: '1 : 1' },
      { label: 'REFERENSI', value: 'GR-BE-2026-01', accent: true },
      { label: 'REV', value: '03' },
      { label: 'HALAMAN', value: '1 dari 1' }
    ],
    copyright: 'Hak cipta dilindungi.',
    rev: 'Systems Blueprint · rev 03'
  },
  blog: {
    caption: 'CATATAN',
    title: 'Blog',
    intro: 'Tulisan seputar arsitektur software, backend engineering, dan cara membangun sistem yang cepat dan stabil.',
    searchPlaceholder: 'Cari tulisan berdasarkan judul, isi, atau tag',
    searchAria: 'Cari tulisan',
    loadError: 'Gagal memuat tulisan:',
    entries: 'TULISAN',
    latest: 'TERBARU',
    sorted: 'URUT DARI TERBARU',
    minRead: 'MENIT BACA',
    views: 'KALI DIBACA',
    readEntry: 'Baca selengkapnya',
    noMatch: 'Tidak ada tulisan yang cocok.',
    backHome: 'Kembali ke beranda',
    seoTitle: 'Blog | Gilang Ramadan',
    seoDescription: 'Tulisan seputar arsitektur software dan backend engineering.',
    preview: 'PRATINJAU — DRAF, BELUM TERBIT',
    back: 'Kembali ke blog',
    notFound: 'Tulisan tidak ditemukan',
    notFoundBody: 'Tulisan ini mungkin sudah dihapus atau belum diterbitkan.',
    backToBlog: 'Kembali ke blog',
    entry: 'TULISAN',
    edit: 'EDIT TULISAN',
    plate: 'GAMBAR',
    coverMissing: 'BELUM ADA GAMBAR SAMPUL',
    fig: 'GBR. 1',
    scale: 'SKALA NTS',
    drawnBy: 'DITULIS OLEH',
    authorBio: 'Engineer yang fokus di sistem backend berperforma tinggi, juga paham arsitektur frontend modern.',
    onThisSheet: 'DAFTAR ISI',
    entryRecord: 'INFO TULISAN',
    record: { entry: 'NO.', filed: 'TERBIT', status: 'STATUS', readTime: 'WAKTU BACA', views: 'DIBACA', tags: 'TAG', min: 'MENIT' },
    prevSheet: 'TULISAN SEBELUMNYA',
    nextSheet: 'TULISAN BERIKUTNYA'
  },
  projects: {
    caption: 'KARYA PILIHAN',
    title: 'Proyek',
    intro: 'Sistem berskala besar, layanan backend, dan platform full-stack, lengkap dengan stack dan tahun pengerjaannya.',
    loadError: 'Gagal memuat proyek:',
    empty: 'Belum ada proyek.',
    totalSheets: 'TOTAL PROYEK',
    span: 'RENTANG',
    discipline: 'BIDANG · BACKEND / PLATFORM',
    rev: 'REV 03',
    plate: 'GAMBAR',
    details: 'Detail',
    liveDemo: 'Lihat demo',
    sourceCode: 'Source code',
    backHome: 'Kembali ke beranda',
    seoTitle: 'Proyek | Gilang Ramadan',
    seoDescription: 'Kumpulan sistem berskala besar, layanan backend, dan aplikasi full-stack.',
    back: 'Kembali ke daftar proyek',
    notFound: 'Proyek tidak ditemukan',
    notFoundBody: 'Proyek ini mungkin sudah dihapus atau belum dipublikasikan.',
    backToProjects: 'Kembali ke proyek',
    dwg: 'NO.',
    disciplineShort: 'BACKEND / PLATFORM',
    edit: 'EDIT PROYEK',
    screenshotMissing: 'BELUM ADA SCREENSHOT',
    fig: 'GBR. 1',
    scale: 'SKALA NTS',
    about: 'Tentang proyek ini',
    generalNotes: 'CATATAN',
    specification: 'INFO PROYEK',
    spec: { drawingNo: 'NO. REFERENSI', sheet: 'URUTAN', year: 'TAHUN', discipline: 'BIDANG', disciplineValue: 'Backend / platform', demo: 'DEMO', source: 'SOURCE CODE', available: 'ADA' },
    technicalStack: 'TECH STACK',
    prevSheet: 'PROYEK SEBELUMNYA',
    nextSheet: 'PROYEK BERIKUTNYA',
    zoomOut: 'Perkecil',
    zoomIn: 'Perbesar',
    close: 'Tutup'
  }
}

export default id
