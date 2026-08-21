export interface TimelineItem {
  id: number;
  date: string;
  title: string;
  description: string;
  iconType: 'sparkles' | 'heart' | 'flower' | 'coffee' | 'star';
}

export const timelineData: TimelineItem[] = [
  {
    id: 1,
    date: "Awal Pertemuan",
    title: "Pertama Kali Ketemu Kamu",
    description: "Dari awal kita mulai kelas katek, aku udah selalu ngelirik kamu, soalnya kamu itu cewe yang pendiem, gak terlalu banyak interaksi jadi lucu aja gitu liatnya. Pas kita retret, aku juga seneng banget karna kita sekelompok dan aku juga makin suka sama kamu, semenjak kamu nunjukkin senyum + ketawa kamu pas disebelah aku 🤗. Aku gak nyangka aja, padahal awal-awal kamu orangnya kayak cuek sama gapeduli gitu... ehh ternyata sekali senyum, manis nya tuh manisss bangettt 😋.",
    iconType: 'sparkles'
  },
  {
    id: 2,
    date: "Momen Pendekatan",
    title: "Mulai Nyaman Dikit",
    description: "Aku mulai pendekatan kayaknya pas yang aku basa basi nanyain taib yak 😁. Aku kira kita bakalan chat seadanya aja, tapi kita hampir tiap hari ngechat itupun karna aku yang nanya ke kamu terus sih hehe 😅. Saking seringnya chattingan, keterusan sampe mabar roblox tiap malem padahal bermula dari bales sw doang tiba tiba jadi temen mabar roblox 😚. Karna kita sering mabar roblox tiap malem, aku jadi mulai nyaman sama kamu deh sayang 😊.",
    iconType: 'coffee'
  },
  {
    id: 3,
    date: "Hari Spesial",
    title: "Awal Mula Jadian",
    description: "Karna aku udah mulai nyaman banget sama kamu, terus juga kita waktu itu chattingan di ig yang pembahasannya tentang siapa yang kita suka jadinya aku langsung jujur aja waktu itu, kalo aku suka sama kamu dan aku juga pedein diri buat langsung nembak kamu buat jadi pacar aku. Padahal pas aku nembak kamu, aku udah predik pasti ditolak, ehhhh ternyata kamu nerima 😁. Hari Selasa, tanggal 21 April 2026, kamu kasih aku jawaban lewat lagu. Jujur aku gak espek kamu bakal kasih lewat spotify WKWKWKWKWKWK. Efek baru pertama pacaran rasanya kayak mau langsung lompat ke kasur terus guling guling 🥰.",
    iconType: 'heart'
  },
  {
    id: 4,
    date: "Hari Ini & Seterusnya",
    title: "Perjalanan Kita Sekarang",
    description: "Aku seneng banget kita udah ngejalanin hubungan ini kurang lebih 5 bulan. Aku harap kita bisa terus pertahanin hubungan ini yaa, apapun itu masalahnya aku mau terus bareng kamu bubup. Susah senang tetep kita jalanin bersama yaaa sayanggg, walaupun sekarang kondisi kita lagi LDR, itu gak bakal jadi alasan buat kita putusin hubungan ini. Aku mau kita saling percaya satu sama lain yaa sayang, tetep jaga batasan, dan jangan pernah merasa kalo kamu itu sendiri yaa bubup 😥. Dari awal kita pacaran sampe sekarang dan seterusnya, hati aku selalu buat kamu sayang 🥰. I love you so muchh my babyy 💖.",
    iconType: 'star'
  }
];