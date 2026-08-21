import React, { useState, useRef, useEffect } from 'react';
import { Music, Volume2, VolumeX, Play } from 'lucide-react';
import { appConfig } from '../data/config';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startAudio = () => {
    if (!audioRef.current || hasError) return;

    audioRef.current.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        // Menunggu interaksi pertama pengguna
      });
  };

  useEffect(() => {
    const audio = new Audio(appConfig.musicUrl);
    audio.loop = true;
    audio.preload = 'auto';
    audioRef.current = audio;

    audio.onerror = () => {
      setHasError(true);
    };

    // 1. Coba putar otomatis saat halaman dimuat
    startAudio();

    // 2. Pasang pemicu sentuhan pertama
    const handleFirstTouch = () => {
      startAudio();
      document.removeEventListener('click', handleFirstTouch);
      document.removeEventListener('touchstart', handleFirstTouch);
    };

    document.addEventListener('click', handleFirstTouch);
    document.addEventListener('touchstart', handleFirstTouch);

    // 3. Listener kustom saat tombol "Mulai Kejutan" ditekan
    const handleCustomStart = () => {
      startAudio();
    };
    window.addEventListener('START_ROMANTIC_MUSIC', handleCustomStart);

    // 4. Smart Audio Switcher: Pause musik latar saat lagu kartu diputar
    const handlePauseBGM = () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };
    window.addEventListener('PAUSE_BACKGROUND_MUSIC', handlePauseBGM);

    // 5. Smart Audio Switcher: Lanjutkan musik latar saat lagu kartu selesai / dijeda
    const handleResumeBGM = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    };
    window.addEventListener('RESUME_BACKGROUND_MUSIC', handleResumeBGM);

    return () => {
      document.removeEventListener('click', handleFirstTouch);
      document.removeEventListener('touchstart', handleFirstTouch);
      window.removeEventListener('START_ROMANTIC_MUSIC', handleCustomStart);
      window.removeEventListener('PAUSE_BACKGROUND_MUSIC', handlePauseBGM);
      window.removeEventListener('RESUME_BACKGROUND_MUSIC', handleResumeBGM);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current || hasError) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setHasError(true));
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <aside 
      aria-label="Pemutar Musik Romantis"
      className="fixed bottom-4 right-4 z-40"
    >
      <div 
        onClick={togglePlay}
        className="glass-card pl-3 pr-4 py-2 rounded-full flex items-center gap-3 cursor-pointer shadow-lg hover:shadow-lilac-400/30 transition-all border border-lilac-300"
      >
        <div 
          className={`w-8 h-8 rounded-full bg-gradient-to-tr from-lilac-500 to-purple-600 flex items-center justify-center text-white shadow-md ${
            isPlaying ? 'animate-spin' : ''
          }`} 
          style={{ animationDuration: '6s' }}
        >
          {isPlaying ? <Music size={14} /> : <Play size={14} className="ml-0.5" />}
        </div>
        
        <div className="hidden sm:block text-left">
          <p className="text-[11px] font-semibold text-lilac-900 leading-tight">
            {hasError ? 'Lagu Belum Dimasukkan' : appConfig.musicTitle}
          </p>
          <p className="text-[9px] text-lilac-600">
            {hasError 
              ? 'Letakkan file di public/music/our-song.mp3 💜' 
              : isPlaying 
              ? 'Lagu Special' 
              : 'Ketuk untuk memutar musik'}
          </p>
        </div>

        {!hasError && (
          <button 
            onClick={toggleMute}
            className="p-1 rounded-full text-lilac-700 hover:bg-lilac-100 transition-colors"
            aria-label={isMuted ? "Aktifkan suara" : "Bisukan suara"}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        )}
      </div>
    </aside>
  );
};