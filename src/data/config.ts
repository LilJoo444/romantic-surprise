export interface AppConfig {
  recipientName: string;
  senderName: string;
  relationshipStartDate: string;
  secretPasscode: string;       // Kode untuk membuka amplop (misal: tanggal jadian / tanggal lahir)
  passcodeHint: string;         // Petunjuk jika pasangan lupa
  musicTitle: string;
  musicUrl: string;
}

export const appConfig: AppConfig = {
  recipientName: "Sayang",
  senderName: "Aku yang selalu mencintaimu",
  relationshipStartDate: "2026-04-21",
  secretPasscode: "210426",       // Ganti dengan 4 digit angka pilihanmu (contoh: tgl/bulan atau tahun)
  passcodeHint: "Tanggal penting kita (format: DDMMYY) 💜",
  musicTitle: "Bundle of Joy",
  musicUrl: "/music/our-song2.mp3",
};