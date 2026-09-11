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
        period: 'Mar 2022 — Feb 2026',
        role: 'Senior Backend Developer',
        company: 'Virtual Spirit',
        current: false,
        description: [
          'Merancang arsitektur dan memimpin pengembangan backend Sistem Sewa Properti berskala besar dari nol menggunakan Ruby on Rails dan PostgreSQL.',
          'Memimpin tim backend developer, melakukan code review via Git, dan memberikan mentoring teknis bagi anggota baru.',
          'Mengurangi downtime sistem sebesar 20% melalui troubleshooting proaktif dan penerapan monitoring otomatis.',
          'Mengoptimalkan alur kerja pengembangan dengan memecah kebutuhan bisnis yang kompleks menjadi tugas teknis yang jelas serta memimpin daily scrum.',
          'Mengembangkan modul Metaprogramming khusus yang meningkatkan efisiensi kode dan mengurangi boilerplate di seluruh sistem secara signifikan.',
          'Mengelola siklus deployment end-to-end untuk lingkungan staging dan produksi dengan uptime sistem 99,9%.',
          'Berkolaborasi lintas fungsi dengan QA, Business Analyst, dan Project Manager untuk memastikan fitur kritis dirilis tepat waktu.'
        ],
        tags: ['Ruby on Rails', 'PostgreSQL', 'Metaprogramming', 'Git', 'CI/CD']
      },
      {
        period: 'Nov 2017 — Feb 2022',
        role: 'Backend Engineering Manager',
        company: 'PT Weyland Indonesia Perkasa',
        current: false,
        description: [
          'Mengelola rekayasa backend untuk platform bertransaksi tinggi, termasuk Payment Point Online Bank (PPOB) dan sistem Food Delivery, menggunakan Ruby on Rails dan MySQL.',
          'Mengarahkan siklus hidup pengembangan aplikasi secara menyeluruh, dari desain kerangka awal hingga peluncuran produksi.',
          'Meningkatkan keandalan dan efisiensi transaksi melalui integrasi strategis API pembayaran dan layanan pihak ketiga.',
          'Menjembatani eksekusi teknis dan tujuan bisnis dengan melapor langsung ke CTO serta terlibat dalam diskusi proyek strategis.',
          'Mendorong pertumbuhan tim melalui program pelatihan terstruktur bagi developer baru dan audit kualitas kode yang ketat.'
        ],
        tags: ['Ruby on Rails', 'MySQL', 'API Integration']
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
