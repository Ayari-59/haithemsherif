// Toutes les infos du site sont centralisées ici : modifier ce fichier suffit
// pour mettre à jour les liens, vidéos et sorties, sans toucher au code.

export const artist = {
  name: "Haithem Sherif",
  nameAr: "هيثم شريف",
  tagline: "Chanteur tunisien",
  taglineAr: "القناة الرسمية للفنان هيثم شريف",
  bio: "Haithem Sherif est un chanteur tunisien, figure reconnue de la scène orientale parisienne. Initié tout jeune au chant soufi, il s'est nourri de la musique tunisienne et du tarab oriental, cet art du chant qui cherche l'émotion pure. De « Hiya » à son dernier single « Barcha Klam », il marie aujourd'hui cet héritage à une pop orientale moderne et romantique, sur scène comme en studio.",
  bioAr:
    "هيثم شريف مغنٍّ تونسي، ومن الوجوه المعروفة على الساحة الفنية الباريسية. بدأ الغناء منذ صغره بالإنشاد الصوفي، ونهل من الموسيقى التونسية والطرب الشرقي الأصيل. ومن «هي» إلى أحدث أغانيه «برشى كلام»، يمزج اليوم هذا الإرث العريق بلمسة عصرية رومانسية، على الخشبة وفي الاستوديو.",
  // Adresse e-mail de booking : laisser vide pour masquer la section e-mail.
  bookingEmail: "",
  // Numéro WhatsApp booking (format international) et message pré-rempli.
  whatsapp: "+33 6 61 08 36 44",
  whatsappMessage: "Bonjour Haithem, je vous contacte pour une demande de booking.",
};

export const socials = [
  { label: "YouTube", url: "https://www.youtube.com/@haithemsherif4216" },
  { label: "Instagram", url: "https://www.instagram.com/haithem.sherif.officiel/" },
  { label: "TikTok", url: "https://www.tiktok.com/@haithemsherif1" },
  // Ajouter Facebook ici quand le lien est connu :
  // { label: "Facebook", url: "https://www.facebook.com/..." },
];

export const platforms = [
  { label: "Spotify", url: "https://open.spotify.com/intl-fr/artist/5NpMzsB3PDi1sfZ7d1Cos6" },
  { label: "Anghami", url: "https://play.anghami.com/artist/12445993" },
  { label: "Deezer", url: "https://www.deezer.com/fr/artist/143196202" },
  { label: "YouTube", url: "https://www.youtube.com/@haithemsherif4216" },
];

// Dernier clip mis en avant sur la page d'accueil.
export const featuredVideo = {
  id: "Qhln3jkTSSs",
  title: "Barcha Klem",
  titleAr: "برشى كلام",
  year: 2025,
};

export const videos = [
  { id: "Qhln3jkTSSs", title: "Barcha Klem", titleAr: "برشى كلام", year: 2025 },
  { id: "QBRDvtFFel4", title: "Ah Ya Lila", titleAr: "آه يا ليلة", year: 2023 },
  { id: "VgNf_0W2-jY", title: "Mahleh", titleAr: "محلاه", year: 2023 },
  { id: "My5ftqHrhIs", title: "Hiya", titleAr: "هي", year: 2023 },
  { id: "1Zj6mlyVDZs", title: "Fard 3bar", titleAr: "فرد عبار", year: 2022 },
  { id: "QvtCQMRZP-w", title: "W3edni Bel 7ob", titleAr: "وعدني بالحب", year: 2021 },
];

export const releases = [
  {
    title: "Barcha Klam",
    titleAr: "برشى كلام",
    year: 2025,
    type: "Single",
    cover: "/covers/barcha-klam.jpg",
  },
  {
    title: "Awel Hekayetna",
    titleAr: "أول حكايتنا",
    year: 2024,
    type: "Single",
    cover: "/covers/awel-hekayetna.jpg",
  },
  {
    title: "Fard 3bar",
    titleAr: "فرد عبار",
    year: 2022,
    type: "Single",
    cover: "/covers/fard-3bar.jpg",
  },
  {
    title: "Hob Hyeti",
    titleAr: "حب حياتي",
    year: 2021,
    type: "EP",
    cover: "/covers/hob-hyeti.jpg",
  },
];
