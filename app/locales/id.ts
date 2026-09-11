import type en from './en'

const id: typeof en = {
  nav: {
    tagline: '/ sistem backend',
    sheets: [
      { code: '01', label: 'Ikhtisar', href: '#hero' },
      { code: '02', label: 'Teknologi', href: '#stack' },
      { code: '03', label: 'Pengalaman', href: '#experience' },
      { code: '04', label: 'Praktik', href: '#architecture' }
    ],
    pages: [
      { label: 'Proyek', href: '/projects' },
      { label: 'Blog', href: '/blog' }
    ],
    dashboard: 'DASBOR',
    logout: 'Keluar',
    downloadCv: 'Unduh CV',
    toLight: 'Ganti ke mode terang',
    toDark: 'Ganti ke mode gelap',
    switchLang: 'English',
    toggleNav: 'Buka/tutup navigasi'
  },
  sheet: 'LEMBAR',
  hero: {
    caption: 'IKHTISAR SISTEM — SUSUNAN UMUM',
    location: 'Bandung, Indonesia · UTC+7 · remote',
    open: 'Terbuka untuk peran senior IC',
    title: ['Sistem backend,', 'digambar sesuai spesifikasi.'],
    subtitle: 'SENIOR BACKEND ENGINEER · 10+ TAHUN',
    bio: 'Sepuluh tahun membangun platform marketplace dan pembayaran berstandar fintech di atas Ruby on Rails, Go, dan PostgreSQL. Spesialisasi mendalam pada infrastruktur Stripe Connect — split payment, escrow, langganan, payout otomatis — ditangani menyeluruh dari desain teknis hingga produksi. Sebelumnya Engineering Manager di balik sistem yang menopang 1.000 TPS dengan uptime 99,9%; terakhir membawa marketplace sewa dan jasa tahap awal dari nol hingga rilis. Kini fokus pada pekerjaan senior IC secara langsung bersama tim terdistribusi.',
    viewProjects: 'Lihat proyek',
    experienceLog: 'Riwayat pengalaman',
    scale: 'SKALA 1:1',
    stats: [
      { label: 'STATUS', value: 'berjalan', running: true },
      { label: 'UPTIME', value: '99,99%', running: false },
      { label: 'TPS PUNCAK', value: '1.000', running: false },
      { label: 'LATENSI p95', value: '<150ms', running: false }
    ]
  },
  stack: {
    title: 'Teknologi',
    note: 'Daftar komponen — perkakas yang benar-benar dipakai membangun sistem ini.',
    groups: [
      { code: 'INF · 01', title: 'Infrastruktur', items: ['Docker / Docker Compose', 'Kubernetes', 'Terraform (IaC)', 'AWS / GCP', 'Nginx / Traefik'] },
      { code: 'LNG · 02', title: 'Bahasa', items: ['Ruby / Rails', 'Go', 'Node.js / NestJS', 'PHP / Laravel', 'JavaScript'] },
      { code: 'DAT · 03', title: 'Penyimpanan data', items: ['PostgreSQL', 'MySQL / SQL Server', 'Redis / Memcached', 'MongoDB', 'Prisma / ActiveRecord'] },
      { code: 'PRF · 04', title: 'Performa', items: ['Prometheus / Grafana', 'Distributed tracing', 'Load balancing', 'Tuning query & indeks', 'BullMQ / Sidekiq'] }
    ]
  },
  experience: {
    title: 'Pengalaman',
    note: 'Tampak elevasi — posisi terbaru di paling atas.',
    items: [
      {
        period: 'Mar 2026 — sekarang',
        role: 'Solo Founder & Engineer',
        company: 'PT Giradia Solusi Digital',
        current: true,
        description: [
          'Membangun Bati, POS SaaS multi-tenant di atas NestJS dan PostgreSQL yang melayani aplikasi kasir Flutter dan dasbor admin.',
          'Merancang sinkronisasi offline-first dengan kunci UUIDv7 yang dibuat di sisi klien, push idempoten, dan pull berbasis cursor — merchant bisa berjualan offline dan merekonsiliasi tanpa penjualan ganda atau stok hilang.',
          'Memodelkan setiap pergerakan kas dan stok sebagai event immutable dengan read model turunan, sehingga koreksi berupa entri lawan, bukan edit. Laba rugi, arus kas, neraca, rekonsiliasi kas shift, dan buku besar semuanya diproyeksikan dari satu sumber kebenaran, mencegah perubahan retroaktif.',
          'Membangun lapisan entitlement freemium/Pro: fitur diresolusi sebagai fitur paket, di-cache di Redis, dan ditegakkan di sisi server lewat guard fitur dan kuota, sehingga tiap laporan bisa dijual per flag sebagai add-on.',
          'Merilis pipeline penjualan F&B dengan billing per kanal dan open bill tanpa mengubah alur checkout inti, memungkinkan beberapa terminal POS melayani satu meja secara bersamaan tanpa kehilangan data akibat race condition.',
          'Menjalankan produksi di Docker/Traefik; membuat job terjadwal BullMQ (analitik, siklus langganan, notifikasi) idempoten lewat lock deduplikasi.',
          'Menghilangkan hambatan horizontal scaling lewat layanan migrasi sekali jalan, rate limiting berbasis Redis, dan penyimpanan kompatibel S3.'
        ],
        tags: ['NestJS', 'PostgreSQL', 'Redis', 'BullMQ', 'Docker', 'Traefik', 'Flutter']
      },
      {
        period: 'Mar 2022 — Feb 2026',
        role: 'Senior Backend Developer',
        company: 'Virtual Spirit',
        current: false,
        description: [
          'Merancang lapisan domain inti dengan pola Interactor dan Organizer, memisahkan logika bisnis dari model dan controller Rails — fondasi yang mudah dirawat dan memangkas waktu review PR.',
          'Membangun infrastruktur pembayaran marketplace end-to-end di atas Stripe API dan Stripe Connect, mengimplementasikan destination fee dan split payment.',
          'Membangun pipeline routing pembayaran otomatis yang menyalurkan pembayaran sewa dari penyewa ke pemilik dengan pemotongan platform fee, menghapus rekonsiliasi manual dan memenuhi SLA pembayaran di hari yang sama.',
          'Merancang mesin escrow dan billing langganan yang mendukung pembayaran berulang, alur hold-and-release, serta pemesanan jasa profesional di berbagai tingkat harga.',
          'Mengimplementasikan lapisan pesan real-time dengan AnyCable di Ruby on Rails untuk chat dan fitur media sosial in-app, teruji menopang 1.000+ koneksi WebSocket bersamaan.',
          'Menghilangkan pola query N+1 dan merefaktor beban basis data yang berat, menambahkan counter cache dipadukan dengan cache Redis untuk menurunkan latensi PostgreSQL.',
          'Mengontainerisasi seluruh stack aplikasi dengan Docker dan Docker Compose, mencapai paritas dev/staging/produksi dan memangkas onboarding engineer baru dari 2 hari menjadi kurang dari 4 jam.',
          'Bermitra dengan tim lintas fungsi terdistribusi (FE, UI/UX, Produk) lintas zona waktu dengan Agile/Scrum.'
        ],
        tags: ['Ruby on Rails', 'PostgreSQL', 'Stripe Connect', 'AnyCable', 'Redis', 'Docker']
      },
      {
        period: 'Nov 2019 — Feb 2022',
        role: 'Engineering Manager',
        company: 'PT Weyland Indonesia Perkasa',
        current: false,
        description: [
          'Dipromosikan dari Senior Backend Developer menjadi Engineering Manager setelah 2 tahun — memegang penuh arah teknologi dan keputusan arsitektur, serta mengelola tim engineering 8 orang sambil tetap terlibat langsung dalam pengembangan backend.',
          'Memimpin backend AtozGo — super-app pesan-antar makanan on-demand yang dibangun sebagai lini produk baru — mencapai lebih dari 154.000 transaksi per bulan dengan tingkat keberhasilan pengiriman 92% dan GMV Rp 3,76 miliar dalam beberapa bulan sejak rilis.',
          'Merancang mesin routing pesanan dan pengiriman multi-sisi di 9 domain layanan dengan push notification real-time via AnyCable.',
          'Memimpin migrasi monolit ke microservices, memisahkan alur billing dan transaksi menjadi layanan yang dapat di-deploy secara independen.'
        ],
        tags: ['Ruby on Rails', 'AnyCable', 'Microservices', 'Team leadership']
      },
      {
        period: 'Nov 2017 — Nov 2019',
        role: 'Senior Backend Developer',
        company: 'PT Weyland Indonesia Perkasa',
        current: false,
        description: [
          'Bertanggung jawab penuh atas arsitektur backend super-app fintech yang mencakup 7 domain layanan inti dan 21+ sub-layanan — pembayaran tagihan (PPOB), top-up, QRIS, uang elektronik, tiket pesawat dan bus, transfer, serta disbursement bank — mencapai volume transaksi bulanan lebih dari Rp 8,6 miliar dan 181.000+ transaksi/bulan dalam dua tahun sejak rilis.',
          'Menjaga 1.000 TPS dengan uptime 99,9% pada puncak siklus pembayaran utilitas melalui load balancing di Nginx, horizontal scaling layanan stateless, dan migrasi proaktif titik bottleneck sebelum terjadi insiden.'
        ],
        tags: ['Ruby on Rails', 'MySQL', 'Nginx', 'Payments']
      },
      {
        period: 'Okt 2015 — Des 2017',
        role: 'Backend Developer',
        company: 'Walden Global Services',
        current: false,
        description: [
          'Mengembangkan dan memelihara sistem Shipping Export & Import Nutrifood menggunakan Ruby on Rails dan SQL Server.',
          'Meningkatkan efisiensi pengelolaan data dengan menerapkan praktik terbaik basis data dan mengoptimalkan query SQL yang kompleks.',
          'Menjadi technical lead untuk sprint tertentu, mengelola estimasi SOW, milestone, dan penugasan developer.',
          'Menyusun kerangka aplikasi inti dan pustaka bersama untuk dipakai tim pengembang yang lebih luas demi menjaga konsistensi.'
        ],
        tags: ['Ruby on Rails', 'SQL Server']
      },
      {
        period: 'Jan 2014 — Agu 2015',
        role: 'Backend Developer',
        company: 'Politeknik Piksi Ganesha',
        current: false,
        description: [
          'Membangun Sistem Manajemen Sertifikasi yang komprehensif menggunakan Laravel dan MySQL.',
          'Menerjemahkan kebutuhan bisnis yang kompleks menjadi fitur produk fungsional sambil menjaga stabilitas platform.'
        ],
        tags: ['Laravel', 'MySQL']
      }
    ]
  },
  practice: {
    title: 'Cara saya membangun',
    note: 'Catatan dan standar yang berlaku di setiap gambar.',
    intro: 'Saya memperlakukan backend seperti satu set gambar teknik: kontrak yang eksplisit, dimensi yang bisa diperiksa, dan riwayat revisi yang bisa dibaca siapa pun. Logika domain berada di interactor, bukan model; jalur uang idempoten sejak dirancang; dan setiap service dikirim beserta telemetri yang membuktikan ia bekerja.',
    principles: [
      { code: 'N1', title: 'Kontrak sebelum kode', body: 'Pola interactor dan organizer menjaga logika domain di luar model dan controller, sehingga perilaku bisa diuji secara terisolasi.' },
      { code: 'N2', title: 'Jalur uang idempoten', body: 'Kunci webhook, tabel outbox, dan ledger event-sourced — retry tidak pernah menagih atau membayar dua kali.' },
      { code: 'N3', title: 'Diukur, bukan diasumsikan', body: 'Anggaran p95 per endpoint, tracing di setiap hop, dan dasbor yang bisa dibaca non-engineer.' },
      { code: 'N4', title: 'Tes sebagai fondasi', body: 'Suite RSpec yang dijaga CI pada semua jalur pembayaran dan autentikasi, dibangun sejak commit pertama, bukan ditambal belakangan.' }
    ],
    detail: 'detail B — jalur request',
    nodes: [
      { code: '01', label: 'edge / load balancer', meta: 'nginx · alb' },
      { code: '02', label: 'api service', meta: 'rails · go' },
      { code: '03', label: 'domain interactors', meta: 'idempoten' },
      { code: '04', label: 'queue & workers', meta: 'sidekiq · bullmq' },
      { code: '05', label: 'postgres + redis', meta: 'replica · cache' }
    ],
    observable: 'terpantau di setiap hop'
  },
  footer: {
    titleBlock: 'KEPALA GAMBAR',
    heading: 'Punya sistem yang perlu digambar?',
    body: 'Tersedia untuk pekerjaan backend dan platform senior bersama tim remote lintas fungsi. Termasuk review, audit arsitektur, dan pembangunan infrastruktur pembayaran.',
    fields: [
      { label: 'DIGAMBAR OLEH', value: 'Gilang Ramadan' },
      { label: 'DISIPLIN', value: 'Backend / platform' },
      { label: 'SKALA', value: '1 : 1' },
      { label: 'NO. GAMBAR', value: 'GR-BE-2026-01', accent: true },
      { label: 'REV', value: '03' },
      { label: 'LEMBAR', value: '1 dari 1' }
    ],
    copyright: 'seluruh gambar dilindungi',
    rev: 'Systems Blueprint · rev 03'
  },
  blog: {
    caption: 'LOG REVISI — CATATAN LAPANGAN',
    title: 'Blog',
    intro: 'Catatan tentang arsitektur perangkat lunak, rekayasa backend, dan membangun sistem berperforma tinggi.',
    searchPlaceholder: 'Cari entri berdasarkan judul, isi, atau tag',
    searchAria: 'Cari entri',
    loadError: 'ERR — gagal memuat tulisan:',
    entries: 'ENTRI',
    latest: 'TERBARU',
    sorted: 'DIURUTKAN DARI TERBARU',
    minRead: 'MENIT BACA',
    views: 'DILIHAT',
    readEntry: 'Baca entri',
    noMatch: 'Tidak ada entri yang cocok.',
    backHome: 'Kembali ke lembar 01',
    seoTitle: 'Blog | Gilang Ramadan',
    seoDescription: 'Berbagi pemikiran tentang arsitektur perangkat lunak dan rekayasa backend.',
    preview: 'PRATINJAU — DRAF BELUM TERBIT',
    back: 'Kembali ke log revisi',
    notFound: 'Entri tidak ditemukan',
    notFoundBody: 'entri ini tidak ada di log revisi',
    backToBlog: 'Kembali ke blog',
    entry: 'ENTRI',
    edit: 'EDIT ENTRI',
    plate: 'PLAT',
    coverMissing: 'GAMBAR SAMPUL MENYUSUL',
    fig: 'GBR. 1',
    scale: 'SKALA NTS',
    drawnBy: 'DIGAMBAR OLEH',
    authorBio: 'Fullstack engineer yang berspesialisasi pada sistem backend berperforma tinggi dan arsitektur frontend modern.',
    onThisSheet: 'DI LEMBAR INI',
    entryRecord: 'REKAM ENTRI',
    record: { entry: 'ENTRI', filed: 'DIARSIPKAN', status: 'STATUS', readTime: 'WAKTU BACA', views: 'DILIHAT', tags: 'TAG', min: 'MENIT' },
    prevSheet: 'LEMBAR SEBELUMNYA',
    nextSheet: 'LEMBAR BERIKUTNYA'
  },
  projects: {
    caption: 'INDEKS GAMBAR — KARYA PILIHAN',
    title: 'Proyek',
    intro: 'Sistem terskala, layanan backend, dan platform full-stack — tiap entri diarsipkan beserta stack dan tahunnya.',
    loadError: 'ERR — gagal memuat proyek:',
    empty: 'belum ada gambar yang diarsipkan',
    totalSheets: 'TOTAL LEMBAR',
    span: 'RENTANG',
    discipline: 'DISIPLIN · BACKEND / PLATFORM',
    rev: 'REV 03',
    plate: 'PLAT',
    details: 'Detail',
    liveDemo: 'Demo langsung',
    sourceCode: 'Kode sumber',
    backHome: 'Kembali ke lembar 01',
    seoTitle: 'Proyek | Gilang Ramadan',
    seoDescription: 'Kumpulan sistem terskala, layanan backend, dan aplikasi full-stack.',
    back: 'Kembali ke indeks gambar',
    notFound: 'Gambar tidak ditemukan',
    notFoundBody: 'proyek ini tidak ada di indeks gambar',
    backToProjects: 'Kembali ke proyek',
    dwg: 'GBR',
    disciplineShort: 'BACKEND / PLATFORM',
    edit: 'EDIT PROYEK',
    screenshotMissing: 'TANGKAPAN LAYAR MENYUSUL',
    fig: 'GBR. 1',
    scale: 'SKALA NTS',
    about: 'Tentang proyek',
    generalNotes: 'CATATAN UMUM',
    specification: 'SPESIFIKASI',
    spec: { drawingNo: 'NO. GAMBAR', sheet: 'LEMBAR', year: 'TAHUN', discipline: 'DISIPLIN', disciplineValue: 'Backend / platform', demo: 'DEMO', source: 'SUMBER', available: 'TERSEDIA' },
    technicalStack: 'STACK TEKNIS',
    prevSheet: 'LEMBAR SEBELUMNYA',
    nextSheet: 'LEMBAR BERIKUTNYA',
    zoomOut: 'Perkecil',
    zoomIn: 'Perbesar',
    close: 'Tutup'
  }
}

export default id
