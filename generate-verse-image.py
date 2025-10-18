#!/usr/bin/env python3
"""
Script para gerar imagens de versículos com papéis de parede cristãos
"""
import sys
import json
import os
import random
from PIL import Image, ImageDraw, ImageFont
import textwrap

def generate_verse_image(verse_text, verse_reference, output_path):
    """Gera uma imagem com versículo sobre um papel de parede cristão"""
    
    # Lista de wallpapers disponíveis
    wallpapers_dir = "/home/ubuntu/adventista-play/src/assets/wallpapers"
    wallpapers = [
        "fmli6E1VQpuL.jpg",  # Cruz com céu dourado
        "XqCZAP7AAJhm.jpg",  # Ressurreição
        "ils9Xhm7aTWZ.jpg",  # Jesus nas nuvens
        "etIR06XJyK5P.jpg",  # Cruz com pôr do sol
        "dJ6Q0EMHrIpx.jpg",  # Jesus minimalista
    ]
    
    # Selecionar wallpaper aleatório
    wallpaper_file = random.choice(wallpapers)
    wallpaper_path = os.path.join(wallpapers_dir, wallpaper_file)
    
    # Abrir e redimensionar wallpaper para formato Stories (1080x1920)
    img = Image.open(wallpaper_path)
    img = img.resize((1080, 1920), Image.Resampling.LANCZOS)
    
    # Criar camada de overlay escura para melhor legibilidade
    overlay = Image.new('RGBA', img.size, (0, 0, 0, 120))
    img = img.convert('RGBA')
    img = Image.alpha_composite(img, overlay)
    
    # Preparar para desenhar texto
    draw = ImageDraw.Draw(img)
    
    # Tentar carregar fontes (fallback para default se não encontrar)
    try:
        font_verse = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 48)
        font_ref = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 36)
        font_footer = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 28)
    except:
        font_verse = ImageFont.load_default()
        font_ref = ImageFont.load_default()
        font_footer = ImageFont.load_default()
    
    # Quebrar texto do versículo em linhas
    max_width = 35  # caracteres por linha
    wrapped_text = textwrap.fill(verse_text, width=max_width)
    
    # Calcular posição centralizada
    y_position = 600
    
    # Desenhar texto do versículo (com sombra para melhor legibilidade)
    for line in wrapped_text.split('\n'):
        # Sombra
        bbox = draw.textbbox((0, 0), line, font=font_verse)
        text_width = bbox[2] - bbox[0]
        x_position = (1080 - text_width) // 2
        draw.text((x_position + 3, y_position + 3), line, fill=(0, 0, 0, 200), font=font_verse)
        # Texto principal
        draw.text((x_position, y_position), line, fill=(255, 255, 255, 255), font=font_verse)
        y_position += 60
    
    # Desenhar referência
    y_position += 40
    bbox = draw.textbbox((0, 0), verse_reference, font=font_ref)
    text_width = bbox[2] - bbox[0]
    x_position = (1080 - text_width) // 2
    draw.text((x_position + 2, y_position + 2), verse_reference, fill=(0, 0, 0, 200), font=font_ref)
    draw.text((x_position, y_position), verse_reference, fill=(123, 179, 66, 255), font=font_ref)
    
    # Adicionar logo/marca d'água no rodapé
    footer_text = "www.adventistaplay.online"
    y_footer = 1800
    bbox = draw.textbbox((0, 0), footer_text, font=font_footer)
    text_width = bbox[2] - bbox[0]
    x_position = (1080 - text_width) // 2
    draw.text((x_position + 2, y_footer + 2), footer_text, fill=(0, 0, 0, 180), font=font_footer)
    draw.text((x_position, y_footer), footer_text, fill=(255, 255, 255, 220), font=font_footer)
    
    # Converter de volta para RGB e salvar
    img = img.convert('RGB')
    img.save(output_path, 'JPEG', quality=95)
    
    return output_path

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Uso: generate-verse-image.py <texto> <referencia> <output>")
        sys.exit(1)
    
    verse_text = sys.argv[1]
    verse_reference = sys.argv[2]
    output_path = sys.argv[3]
    
    result = generate_verse_image(verse_text, verse_reference, output_path)
    print(json.dumps({"success": True, "path": result}))
