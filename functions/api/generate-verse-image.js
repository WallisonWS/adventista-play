import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { texto, referencia } = req.body;

    if (!texto || !referencia) {
      return res.status(400).json({ error: 'Texto e referência são obrigatórios' });
    }

    const timestamp = Date.now();
    const outputPath = path.join('/tmp', `verse-${timestamp}.jpg`);
    const scriptPath = path.join(__dirname, '..', 'generate-verse-image.py');
    const command = `python3 "${scriptPath}" "${texto.replace(/"/g, '\\"')}" "${referencia.replace(/"/g, '\\"')}" "${outputPath}"`;
    
    await execAsync(command);

    const fs = await import('fs');
    const imageBuffer = fs.readFileSync(outputPath);

    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Disposition', `attachment; filename="versiculo-${timestamp}.jpg"`);
    res.send(imageBuffer);

    fs.unlinkSync(outputPath);

  } catch (error) {
    console.error('Erro ao gerar imagem:', error);
    res.status(500).json({ error: 'Erro ao gerar imagem', details: error.message });
  }
}
