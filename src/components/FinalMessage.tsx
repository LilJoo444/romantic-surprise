import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { RomanticButton } from './RomanticButton';
import { 
  RotateCcw, 
  Heart, 
  Sparkles, 
  Play, 
  Pause, 
  ChevronDown, 
  X,
  Music2
} from 'lucide-react';
import { appConfig } from '../data/config';

interface FinalMessageProps {
  onReset: () => void;
}

// -------------------------------------------------------------
// DATA 6 LAGU SPESIAL (SPOTIFY CARDS + SPOTIFY URL + AUDIO URL)
// -------------------------------------------------------------
interface SongItem {
  id: number;
  title: string;
  artist: string;
  coverUrl: string;
  audioUrl: string;      // Letakkan file MP3 di folder public/music/
  spotifyUrl: string;    // Link resmi lagu di Spotify
  duration: string;      // Tampilan durasi default
}

const SONGS_FOR_YOU: SongItem[] = [
  {
    id: 1,
    title: "Just The Way You Are",
    artist: "Bruno Mars",
    coverUrl: "/images/memories/cover-1.jpeg",
    audioUrl: "/music/song-1.mp3",
    spotifyUrl: "https://open.spotify.com/track/7BqBn9nzAq8spo5e7cZ0dJ?si=317e68da16974f3a",
    duration: "03:40"
  },
  {
    id: 2,
    title: "her",
    artist: "JVKE",
    coverUrl: "/images/memories/cover-2.jpeg",
    audioUrl: "/music/song-2.mp3",
    spotifyUrl: "https://open.spotify.com/track/6G9YlbU3ByPJQvOFDRdwyM?si=17715c7e9a5f4552",
    duration: "02:51"
  },
  {
    id: 3,
    title: "Best Part (feat. H.E.R.)",
    artist: "Daniel Caesar",
    coverUrl: "/images/memories/cover-3.jpeg",
    audioUrl: "/music/song-3.mp3",
    spotifyUrl: "https://open.spotify.com/track/1Q7EgiMOuwDcB0PJC6AzON?si=b08797c9f20d4417",
    duration: "03:29"
  },
  {
    id: 4,
    title: "Stuck with U",
    artist: "Ariana Grande, Justin Bieber",
    coverUrl: "/images/memories/cover-4.jpeg",
    audioUrl: "/music/song-4.mp3",
    spotifyUrl: "https://open.spotify.com/track/4HBZA5flZLE435QTztThqH?si=1e8dcf4fbfb04e66",
    duration: "03:48"
  },
  {
    id: 5,
    title: "24/7",
    artist: "Celina Sharma, Harris J.",
    coverUrl: "/images/memories/cover-5.jfif",
    audioUrl: "/music/song-5.mp3",
    spotifyUrl: "https://open.spotify.com/track/14mDVsehbzwNHaHFZSEY3W?si=6c1217bf9dab4d43",
    duration: "03:04"
  },
  {
    id: 6,
    title: "Beautiful (feat. Camila Cabello)",
    artist: "Bazzi",
    coverUrl: "/images/memories/cover-6.jpeg",
    audioUrl: "/music/song-6.mp3",
    spotifyUrl: "https://open.spotify.com/track/4VUwkH455At9kENOfzTqmF?si=916de98100ba4b84",
    duration: "03:00"
  }
];

// -------------------------------------------------------------
// DATA 12 FOTO POLAROID MEMORIES
// -------------------------------------------------------------
interface PolaroidItem {
  id: number;
  imageUrl: string;
  caption?: string;
  rotateDeg: number;
}

const POLAROID_MEMORIES: PolaroidItem[] = [
  { id: 1, imageUrl: "/images/memories/final-1.png", caption: "Momen #1 💖", rotateDeg: -2 },
  { id: 2, imageUrl: "/images/memories/final-2.png", caption: "Momen #2 💕", rotateDeg: 3 },
  { id: 3, imageUrl: "/images/memories/final-3.png", caption: "Momen #3 ✨", rotateDeg: -1 },
  { id: 4, imageUrl: "/images/memories/final-4.png", caption: "Momen #4 💞", rotateDeg: 2 },
  { id: 5, imageUrl: "/images/memories/final-5.png", caption: "Momen #5 😆", rotateDeg: -3 },
  { id: 6, imageUrl: "/images/memories/final-6.png", caption: "Momen #6 💗", rotateDeg: 1 },
  { id: 7, imageUrl: "/images/memories/final-7.png", caption: "Momen #7 💜", rotateDeg: -2 },
  { id: 8, imageUrl: "/images/memories/final-8.png", caption: "Momen #8 🤏", rotateDeg: 3 },
  { id: 9, imageUrl: "/images/memories/final-9.png", caption: "Momen #9 🥰", rotateDeg: -1 },
  { id: 10, imageUrl: "/images/memories/final-10.png", caption: "Momen #10 👶", rotateDeg: 2 },
  { id: 11, imageUrl: "/images/memories/final-11.png", caption: "Momen #11 🤍", rotateDeg: -2 },
  { id: 12, imageUrl: "/images/memories/final-12.png", caption: "Momen #12 💘", rotateDeg: 1 },
];

export const FinalMessage: React.FC<FinalMessageProps> = ({ onReset }) => {
  const [playingSongId, setPlayingSongId] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [selectedPolaroid, setSelectedPolaroid] = useState<PolaroidItem | null>(null);
  
  const cardAudioRef = useRef<HTMLAudioElement | null>(null);

  // Helper untuk format detik ke format "MM:SS"
  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === 0) return "00:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    // Efek konfeti awal
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#C084FC', '#D8B4FE', '#A855F7', '#FAF5FF', '#F472B6'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    return () => {
      // Hentikan audio kartu dan nyalakan kembali musik latar saat halaman ditinggalkan
      if (cardAudioRef.current) {
        cardAudioRef.current.pause();
        cardAudioRef.current = null;
      }
      window.dispatchEvent(new CustomEvent('RESUME_BACKGROUND_MUSIC'));
    };
  }, []);

  const handleToggleSong = (song: SongItem) => {
    // Jika lagu yang sama sedang berputar, maka di-pause
    if (playingSongId === song.id) {
      if (cardAudioRef.current) {
        cardAudioRef.current.pause();
      }
      setPlayingSongId(null);
      // Lanjutkan kembali musik latar belakang
      window.dispatchEvent(new CustomEvent('RESUME_BACKGROUND_MUSIC'));
    } else {
      // Hentikan audio kartu sebelumnya jika ada
      if (cardAudioRef.current) {
        cardAudioRef.current.pause();
      }

      // Hentikan musik latar belakang
      window.dispatchEvent(new CustomEvent('PAUSE_BACKGROUND_MUSIC'));

      // Buat instance audio baru untuk lagu yang dipilih
      const newAudio = new Audio(song.audioUrl);
      cardAudioRef.current = newAudio;
      setPlayingSongId(song.id);
      setCurrentTime(0);

      newAudio.addEventListener('loadedmetadata', () => {
        setDuration(newAudio.duration);
      });

      newAudio.addEventListener('timeupdate', () => {
        setCurrentTime(newAudio.currentTime);
      });

      newAudio.addEventListener('ended', () => {
        setPlayingSongId(null);
        setCurrentTime(0);
        // Otomatis lanjutkan musik latar saat lagu kartu selesai
        window.dispatchEvent(new CustomEvent('RESUME_BACKGROUND_MUSIC'));
      });

      newAudio.play().catch(() => {
        // Fallback jika file audio belum dimasukkan
        console.warn(`File audio ${song.audioUrl} belum ditemukan di folder public/music/`);
      });
    }
  };

  const scrollToNextSection = () => {
    document.getElementById('songs-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full max-w-3xl mx-auto text-center px-4 select-none">
      
      {/* ========================================================================= */}
      {/* 1. BAGIAN ATAS: SURAT PENUTUP DI TENGAH LAYAR PENUH */}
      {/* ========================================================================= */}
      <section className="min-h-[82vh] md:min-h-[85vh] flex flex-col items-center justify-center py-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md glass-card p-8 md:p-10 rounded-3xl border border-lilac-300 shadow-2xl relative overflow-hidden"
        >
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-lilac-600 uppercase tracking-widest mb-3">
            <Sparkles size={12} /> Surat Penutup
          </span>

          <h1 className="font-heading text-2xl md:text-3xl font-bold text-lilac-950 mb-3 leading-snug">
            Makasih yaa udah mau jadi pacar aku, {appConfig.recipientName}. 💜
          </h1>

          <div className="my-6">
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="inline-block"
            >
              <Heart size={54} className="text-purple-600 fill-purple-400 mx-auto drop-shadow-lg" />
            </motion.div>
            
            <p className="font-handwriting text-3xl md:text-4xl font-bold text-purple-900 mt-3">
              I Love You.
            </p>
            <p className="text-xs text-lilac-700 mt-1 font-medium">
              — {appConfig.senderName}
            </p>
          </div>
        </motion.div>

        {/* Petunjuk Scroll ke Bawah */}
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          onClick={scrollToNextSection}
          className="mt-6 flex flex-col items-center gap-1 cursor-pointer group"
        >
          <span className="bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-lilac-200 text-lilac-700 text-xs font-semibold shadow-sm group-hover:bg-white transition-colors flex items-center gap-1.5">
            <span>Scroll ke bawah yaa sayang</span>
            <ChevronDown size={14} className="text-purple-600 animate-bounce" />
          </span>
        </motion.div>
      </section>


      {/* ========================================================================= */}
      {/* 2. BAGIAN SONGS FOR YOU (SPOTIFY CARDS + REAL-TIME AUDIO) */}
      {/* ========================================================================= */}
      <section id="songs-section" className="pt-12 pb-16 space-y-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-lilac-950 tracking-tight">
            Lagu Buat Kamu
          </h2>
          <p className="text-xs text-lilac-600 mt-1 italic">
            setiap aku dengerin lagu-lagu ini, selalu bikin aku keinget sama kamu 😊
          </p>
        </motion.div>

        {/* Grid 6 Spotify Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {SONGS_FOR_YOU.map((song, index) => {
            const isThisPlaying = playingSongId === song.id;
            
            // Hitung persentase progress bar secara real-time
            const progressPercent = isThisPlaying && duration > 0 
              ? (currentTime / duration) * 100 
              : 0;

            return (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 3) * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="glass-card p-4 rounded-2xl border border-lilac-200 shadow-lg text-left flex flex-col justify-between transition-all group"
              >
                {/* Cover Art Album */}
                <div className="relative aspect-video sm:aspect-square w-full rounded-xl overflow-hidden bg-lilac-100 mb-3 flex items-center justify-center border border-lilac-200">
                  <img
                    src={song.coverUrl}
                    alt={song.title}
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Info Lagu */}
                <div>
                  <h3 className="font-semibold text-sm text-lilac-950 line-clamp-1 group-hover:text-purple-700 transition-colors">
                    {song.title}
                  </h3>
                  <p className="text-[11px] text-lilac-600 line-clamp-1 font-medium">
                    {song.artist}
                  </p>
                </div>

                {/* Progress Scrubber Bar Real-Time */}
                <div className="my-2.5 space-y-1">
                  <div className="w-full h-1.5 bg-lilac-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-lilac-400 to-purple-600 rounded-full transition-all duration-150"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] text-lilac-500 font-mono">
                    <span>{isThisPlaying ? formatTime(currentTime) : "00:00"}</span>
                    <span>{isThisPlaying && duration > 0 ? formatTime(duration) : song.duration}</span>
                  </div>
                </div>

                {/* Footer Card: Link ke Spotify & Tombol Play */}
                <div className="flex items-center justify-between pt-1 border-t border-lilac-100">
                  <a
                    href={song.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 text-lilac-700 hover:text-green-600 text-[10px] font-medium transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 fill-[#1DB954]" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.494 17.308a.747.747 0 0 1-1.028.247c-2.812-1.718-6.353-2.107-10.523-1.155a.748.748 0 1 1-.336-1.458c4.562-1.042 8.49-.602 11.64 1.338a.748.748 0 0 1 .247 1.028zm1.464-3.256a.936.936 0 0 1-1.287.308c-3.22-1.979-8.13-2.552-11.938-1.396a.936.936 0 1 1-.548-1.791c4.354-1.321 9.775-.681 13.465 1.592a.936.936 0 0 1 .308 1.287zm.126-3.393c-3.86-2.292-10.226-2.503-13.91-1.385a1.123 1.123 0 1 1-.652-2.15c4.24-1.287 11.272-1.037 15.698 1.593a1.123 1.123 0 1 1-1.136 1.942z"/>
                    </svg>
                    <span>Listen on Spotify</span>
                  </a>

                  <button
                    onClick={() => handleToggleSong(song)}
                    className="w-7 h-7 rounded-full bg-gradient-to-tr from-lilac-500 to-purple-600 text-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-transform"
                    aria-label={`Putar ${song.title}`}
                  >
                    {isThisPlaying ? <Pause size={12} className="fill-white" /> : <Play size={12} className="fill-white ml-0.5" />}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 3. BAGIAN OUR MEMORIES :3 📸 (POLAROID GRID) */}
      {/* ========================================================================= */}
      <section className="pt-6 pb-16 space-y-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="space-y-1"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-red-500/90 tracking-tight flex items-center justify-center gap-2">
            <span>Memori Kita</span>
          </h2>
          <p className="text-xs text-lilac-700">
            Kumpulan momen mabar roblox kita (kali kamu lupa 😊)
          </p>
        </motion.div>

        {/* Grid 12 Polaroid Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 md:gap-6 pt-2">
          {POLAROID_MEMORIES.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 6) * 0.08 }}
              whileHover={{ scale: 1.06, rotate: 0, zIndex: 10 }}
              style={{ rotate: `${item.rotateDeg}deg` }}
              onClick={() => setSelectedPolaroid(item)}
              className="bg-white p-3 pb-6 rounded-lg shadow-lg hover:shadow-2xl border border-gray-100 cursor-pointer transition-all duration-300 flex flex-col items-center group relative"
            >
              {/* Pin Hati di Atas Polaroid */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-400/80 shadow-sm border border-white flex items-center justify-center">
                <Heart size={8} className="text-white fill-white" />
              </div>

              {/* Area Foto Polaroid */}
              <div className="w-full aspect-square bg-gray-100 rounded-sm overflow-hidden mb-2.5 flex items-center justify-center border border-gray-200">
                <img
                  src={item.imageUrl}
                  alt={item.caption || `Kenangan ${item.id}`}
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Caption Polaroid */}
              <p className="font-handwriting text-base md:text-lg text-gray-800 font-bold line-clamp-1">
                {item.caption || `Foto #${item.id}`}
              </p>
            </motion.div>
          ))}
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 4. BAGIAN TOMBOL PALING BAWAH (RESTART) */}
      {/* ========================================================================= */}
      <section className="pt-4 pb-14 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <Heart size={16} className="text-red-400 fill-red-400 animate-pulse" />
          <span className="font-handwriting text-xl md:text-2xl text-purple-900 font-bold">
            Forever & Always with You
          </span>
          <Heart size={16} className="text-red-400 fill-red-400 animate-pulse" />
        </div>

        <div className="flex justify-center">
          <RomanticButton 
            onClick={onReset} 
          >
            <RotateCcw size={16} />
            <span>Ulangi Kejutan Dari Awal</span>
          </RomanticButton>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* LIGHTBOX PREVIEW POLAROID */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedPolaroid && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedPolaroid(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full bg-white rounded-2xl p-4 shadow-2xl text-center"
            >
              <button
                onClick={() => setSelectedPolaroid(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors z-10"
                aria-label="Tutup foto"
              >
                <X size={16} />
              </button>

              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center mb-3">
                <img
                  src={selectedPolaroid.imageUrl}
                  alt={selectedPolaroid.caption || "Polaroid Preview"}
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="font-handwriting text-xl text-gray-900 font-bold">
                {selectedPolaroid.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};