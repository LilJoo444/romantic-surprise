export interface MemoryItem {
  id: number;
  images: string[]; // Mendukung 1, 2, 3 atau lebih foto per momen
  caption: string;
  dateText: string;
  svgPlaceholderType?: 'cafe' | 'beach' | 'stroll' | 'laugh' | 'sunset' | 'gift';
}

export const memoriesData: MemoryItem[] = [
  {
    id: 1,
    // Foto ke-1: Total 2 Foto (Tambah 1 slot)
    images: [
      "/images/memories/memory-1.jpeg",
      "/images/memories/memory-1-2.jpeg", // Slot tambahan
    ],
    caption: "Momen pertama kali kita gereja sore bareng, terus pulangnya jajan di mixue ⛪🍦. Pas itu kita masih rada canggung yak WKWKWKWK 😅",
    dateText: "3 Mei 2026",
    svgPlaceholderType: 'cafe'
  },
  {
    id: 2,
    // Foto ke-2: Total 3 Foto (Tambah 2 slot)
    images: [
      "/images/memories/memory-2.jpeg",
      "/images/memories/memory-2-2.jpeg", // Slot tambahan 1
      "/images/memories/memory-2-3.jpeg", // Slot tambahan 2
    ],
    caption: "Ini momen kita nongkrong minum jus depan puri abis pulang dari bikin taib, terus pulangnya aku kecelakaan 🥤🤕",
    dateText: "9 Mei 2026",
    svgPlaceholderType: 'stroll'
  },
  {
    id: 3,
    // Foto ke-3: Total 3 Foto (Tambah 2 slot)
    images: [
      "/images/memories/memory-3.jpeg",
      "/images/memories/memory-3-2.jpeg", // Slot tambahan 1
      "/images/memories/memory-3-3.jpeg", // Slot tambahan 2
    ],
    caption: "Yang ini momen kita pas lagi photobooth di Blok M. Niatnya mau cari cari tempat makan lagi, tapi kamu uda lemes WKWKWKWK 📸🥴",
    dateText: "28 Mei 2026",
    svgPlaceholderType: 'laugh'
  },
  {
    id: 4,
    // Foto ke-4: Total 2 Foto (Tambah 1 slot)
    images: [
      "/images/memories/memory-4.jpeg",
      "/images/memories/memory-4-2.jpeg", // Slot tambahan
    ],
    caption: "Ini pas pulang dari gereja sore kita langsung ke Solaria buat makan. Kita ngobrol sambil bercanda sampe gak inget waktu 🤣. Terus sebelum pulang beli eskrim di indomaret, niatnya mau makan pas udah nyampe rumah kamu malah udah cair di laci motor 😫",
    dateText: "31 Mei 2026",
    svgPlaceholderType: 'gift'
  },
  {
    id: 5,
    // Foto ke-5: Total 2 Foto (Tambah 1 slot)
    images: [
      "/images/memories/memory-5.jpeg",
      "/images/memories/memory-5-2.jpeg", // Slot tambahan
    ],
    caption: "Niatnya mau langsung nyari gantungan kunci di lawson, tapi karna belum makan jadinya mampir ke Wizzmie deh. Mesen mie level 1, tapi malah kepedesan 😂. Walaupun waktu itu kondisinya kamu sempet marah karna dapet kabar hasil photobooth kita ketinggalan di gereja 😅. Makasih yaa sayang, kamu udah mau maapin aku 😁. Ini juga awal buat aku beraniin diri buat foto, walaupun masih rada gak pede sih...",
    dateText: "1 Juli 2026",
    svgPlaceholderType: 'sunset'
  },
  {
    id: 6,
    // Foto ke-6: Total 2 Foto (Tambah 1 slot)
    images: [
      "/images/memories/memory-6.jpeg",
      "/images/memories/memory-6-2.jpeg", // Slot tambahan
    ],
    caption: "Dan yappp ini foto bareng kita yang terakhir sebelum kita ldr 😔. Kita juice date buat yang ke-3 kalinya. Kamu sempet bete yaa karna aku awal awal sempet sibuk kelarin tugas 😅. Maafin aku yaa sayangg 🙏💕",
    dateText: "24 Juli 2026",
    svgPlaceholderType: 'beach'
  }
];