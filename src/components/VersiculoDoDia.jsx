import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { BookText, Share2, Copy, Heart, RefreshCw, Instagram, MessageCircle } from 'lucide-react'

// Versículos do dia (rotação diária)
const versiculos = [
  {
    texto: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
    referencia: "João 3:16",
    tema: "Amor de Deus"
  },
  {
    texto: "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento. Reconhece-O em todos os teus caminhos, e Ele endireitará as tuas veredas.",
    referencia: "Provérbios 3:5-6",
    tema: "Confiança"
  },
  {
    texto: "O Senhor é o meu pastor; nada me faltará.",
    referencia: "Salmos 23:1",
    tema: "Provisão"
  },
  {
    texto: "Tudo posso naquele que me fortalece.",
    referencia: "Filipenses 4:13",
    tema: "Força"
  },
  {
    texto: "Não to mandei eu? Esforça-te, e tem bom ânimo; não temas, nem te espantes; porque o Senhor teu Deus é contigo, por onde quer que andares.",
    referencia: "Josué 1:9",
    tema: "Coragem"
  },
  {
    texto: "Entrega o teu caminho ao Senhor; confia nele, e ele o fará.",
    referencia: "Salmos 37:5",
    tema: "Entrega"
  },
  {
    texto: "Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus.",
    referencia: "Efésios 2:8",
    tema: "Graça"
  }
]

export function VersiculoDoDia({ compact = false }) {
  const [versiculo, setVersiculo] = useState(null)
  const [favorito, setFavorito] = useState(false)
  const [copiado, setCopiado] = useState(false)

  useEffect(() => {
    // Selecionar versículo baseado no dia do ano
    const hoje = new Date()
    const inicioDano = new Date(hoje.getFullYear(), 0, 0)
    const diff = hoje - inicioDano
    const umDia = 1000 * 60 * 60 * 24
    const diaDoAno = Math.floor(diff / umDia)
    const index = diaDoAno % versiculos.length
    
    setVersiculo(versiculos[index])
  }, [])

  const handleCopiar = () => {
    if (versiculo) {
      const texto = `"${versiculo.texto}" - ${versiculo.referencia}`
      navigator.clipboard.writeText(texto)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    }
  }

  const handleCompartilhar = async () => {
    if (versiculo && navigator.share) {
      try {
        await navigator.share({
          title: 'Versículo do Dia',
          text: `"${versiculo.texto}" - ${versiculo.referencia}`,
        })
      } catch (err) {
        handleCopiar()
      }
    } else {
      handleCopiar()
    }
  }

  const generateVerseImage = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 1080;
        canvas.height = 1920;
        const ctx = canvas.getContext('2d');

        // Buscar imagem de fundo cristã do Unsplash
        const temasBusca = ['jesus christ', 'christian cross', 'church', 'bible', 'prayer', 'faith'];
        const temaSelecionado = temasBusca[Math.floor(Math.random() * temasBusca.length)];
        
        try {
          // Carregar imagem de fundo
          const img = new Image();
          img.crossOrigin = 'anonymous';
          
          await new Promise((resolveImg, rejectImg) => {
            img.onload = () => resolveImg();
            img.onerror = () => rejectImg();
            // Usar Unsplash API para imagens cristãs de alta qualidade
            img.src = `https://source.unsplash.com/1080x1920/?${temaSelecionado},spiritual,religious`;
          });

          // Desenhar imagem de fundo
          ctx.drawImage(img, 0, 0, 1080, 1920);
        } catch (imgError) {
          // Fallback: gradiente se a imagem falhar
          const gradient = ctx.createLinearGradient(0, 0, 0, 1920);
          gradient.addColorStop(0, '#1e3a8a');
          gradient.addColorStop(0.5, '#7c3aed');
          gradient.addColorStop(1, '#2563eb');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, 1080, 1920);
        }

        // Overlay escuro para melhor legibilidade
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(0, 0, 1080, 1920);

        // Adicionar borda decorativa
        ctx.strokeStyle = '#7BB342';
        ctx.lineWidth = 8;
        ctx.strokeRect(40, 40, 1000, 1840);

        // Título com sombra
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 4;
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 70px Arial, sans-serif';
        ctx.fillText('Versículo do Dia', 540, 250);

        // Linha decorativa com gradiente
        const lineGradient = ctx.createLinearGradient(300, 300, 780, 300);
        lineGradient.addColorStop(0, 'rgba(123, 179, 66, 0)');
        lineGradient.addColorStop(0.5, '#7BB342');
        lineGradient.addColorStop(1, 'rgba(123, 179, 66, 0)');
        ctx.strokeStyle = lineGradient;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(300, 300);
        ctx.lineTo(780, 300);
        ctx.stroke();

        // Reset shadow para o texto
        ctx.shadowBlur = 15;
        ctx.shadowOffsetY = 3;

        // Texto do versículo (GRANDE e legível)
        ctx.font = 'bold 58px Arial, sans-serif';
        const maxWidth = 900;
        const lineHeight = 85;
        const words = versiculo.texto.split(' ');
        let line = '';
        let y = 600;

        // Aspas de abertura decorativas
        ctx.font = 'bold 100px Georgia, serif';
        ctx.fillStyle = '#7BB342';
        ctx.fillText('"', 540, y - 80);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 58px Arial, sans-serif';

        // Quebrar texto com melhor espaçamento
        for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i] + ' ';
          const metrics = ctx.measureText(testLine);

          if (metrics.width > maxWidth && i > 0) {
            ctx.fillText(line, 540, y);
            line = words[i] + ' ';
            y += lineHeight;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, 540, y);

        // Aspas de fechamento decorativas
        ctx.font = 'bold 100px Georgia, serif';
        ctx.fillStyle = '#7BB342';
        ctx.fillText('"', 540, y + 120);

        // Referência com destaque
        y += 220;
        ctx.font = 'bold 60px Arial, sans-serif';
        ctx.fillStyle = '#7BB342';
        ctx.fillText(versiculo.referencia, 540, y);

        // Tema do versículo
        y += 80;
        ctx.font = '40px Arial, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillText(`Tema: ${versiculo.tema}`, 540, y);

        // Reset shadow
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;

        // Logo/Marca d'água com fundo
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 1750, 1080, 170);
        
        ctx.font = 'bold 45px Arial, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Adventista Play', 540, 1820);
        
        ctx.font = '35px Arial, sans-serif';
        ctx.fillStyle = '#7BB342';
        ctx.fillText('www.adventistaplay.online', 540, 1870);

        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Erro ao gerar imagem'));
          }
        }, 'image/jpeg', 0.95);
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleCompartilharWhatsApp = async () => {
    if (!versiculo) return;
    
    try {
      const blob = await generateVerseImage();
      const file = new File([blob], 'versiculo.jpg', { type: 'image/jpeg' });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Versículo do Dia',
          text: `*Versículo do Dia* 📖\n\n${versiculo.referencia}\n\nCompartilhado via Adventista Play`
        });
      } else {
        const texto = encodeURIComponent(`*Versículo do Dia* 📖\n\n"${versiculo.texto}"\n\n_${versiculo.referencia}_\n\nCompartilhado via Adventista Play`);
        window.open(`https://wa.me/?text=${texto}`, '_blank');
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `versiculo-${Date.now()}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Erro:', error);
      const texto = encodeURIComponent(`*Versículo do Dia* 📖\n\n"${versiculo.texto}"\n\n_${versiculo.referencia}_\n\nCompartilhado via Adventista Play`);
      window.open(`https://wa.me/?text=${texto}`, '_blank');
    }
  }

  const handleCompartilharInstagram = async () => {
    if (!versiculo) return;
    
    try {
      const blob = await generateVerseImage();
      const file = new File([blob], 'versiculo.jpg', { type: 'image/jpeg' });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Versículo do Dia',
          text: `${versiculo.referencia} - Adventista Play`
        });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `versiculo-${Date.now()}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        alert('✅ Imagem baixada! Agora é só postar no Instagram Stories!');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('❌ Erro ao gerar imagem. Tente novamente.');
    }
  }

  const handleNovoVersiculo = () => {
    const index = Math.floor(Math.random() * versiculos.length)
    setVersiculo(versiculos[index])
  }

  if (!versiculo) return null

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg border"
      >
        <div className="flex items-start gap-3">
          <BookText className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
          <div className="flex-1">
            <p className="text-sm italic mb-2">"{versiculo.texto}"</p>
            <p className="text-xs font-semibold text-primary">{versiculo.referencia}</p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <BookText className="h-6 w-6 text-primary" />
              </motion.div>
              Versículo do Dia
            </CardTitle>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFavorito(!favorito)}
              className={`p-2 rounded-full transition-colors ${
                favorito ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
              }`}
            >
              <Heart className={`h-5 w-5 ${favorito ? 'fill-current' : ''}`} />
            </motion.button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div
            key={versiculo.referencia}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="bg-white/50 dark:bg-black/20 p-6 md:p-8 rounded-xl shadow-inner">
              <p className="text-base md:text-lg italic leading-relaxed text-center font-medium">
                "{versiculo.texto}"
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-primary text-lg md:text-xl">{versiculo.referencia}</p>
                <p className="text-sm md:text-base text-muted-foreground">Tema: {versiculo.tema}</p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 min-w-[100px]">
                <Button
                  variant="outline"
                  size="default"
                  onClick={handleCopiar}
                  className="w-full h-11 text-sm md:text-base"
                >
                  <Copy className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  {copiado ? 'Copiado!' : 'Copiar'}
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 min-w-[120px]">
                <Button
                  variant="outline"
                  size="default"
                  onClick={handleCompartilhar}
                  className="w-full h-11 text-sm md:text-base"
                >
                  <Share2 className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  Compartilhar
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="default"
                  onClick={handleNovoVersiculo}
                  className="h-11 px-4"
                >
                  <RefreshCw className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </motion.div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                <Button
                  size="default"
                  onClick={handleCompartilharWhatsApp}
                  className="w-full h-12 bg-green-600 hover:bg-green-700 text-white shadow-lg text-sm md:text-base font-semibold"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  WhatsApp
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                <Button
                  size="default"
                  onClick={handleCompartilharInstagram}
                  className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg text-sm md:text-base font-semibold"
                >
                  <Instagram className="h-5 w-5 mr-2" />
                  Instagram Stories
                </Button>
              </motion.div>
            </div>
          </div>

          <p className="text-xs md:text-sm text-center text-muted-foreground mt-2">
            📸 Compartilhe este versículo com uma imagem linda!
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}