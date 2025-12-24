import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

const radioStreamUrl = 'https://stream.novotempo.com/radio/mp3';

export function GlobalRadioPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Tenta iniciar a reprodução automaticamente (mutado)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0; // Começa mutado
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setIsMuted(true);
      }).catch(error => {
        // Autoplay bloqueado, aguarda interação do usuário
        console.log("Autoplay bloqueado. Aguardando interação do usuário.");
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Se estiver mutado, desmuta e define o volume para 0.5
      if (isMuted) {
        audioRef.current.volume = 0.5;
        setIsMuted(false);
      }
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
    // Se estiver desmutando e não estiver tocando, tenta tocar
    if (!isMuted && !isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={radioStreamUrl} loop />
      <motion.div 
        className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-2xl flex items-center space-x-3 z-50 border border-primary"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <p className="font-bold text-sm text-primary">Rádio NT</p>
        
        <motion.button 
          onClick={togglePlayPause} 
          className="p-2 rounded-full bg-primary text-white hover:bg-primary/80 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={isPlaying ? 'Pausar Rádio' : 'Ouvir Rádio'}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </motion.button>

        <motion.button 
          onClick={toggleMute} 
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={isMuted ? 'Desmutar' : 'Mutar'}
        >
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </motion.button>
      </motion.div>
    </>
  );
}
