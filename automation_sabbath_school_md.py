import json
import os
import re
from datetime import datetime

# --- Configurações ---
REPO_PATH = os.path.join(os.path.expanduser('~'), 'adventista-play')
SABBATH_SCHOOL_REPO_PATH = os.path.join(os.path.expanduser('~'), 'sabbath-school-lessons')
SABBATH_SCHOOL_FILE = os.path.join(REPO_PATH, 'src', 'data', 'escola-sabatina-licoes-auto.json')
LANGUAGE = "pt" # Português
TARGET_YEAR = "2023"
TARGET_QUARTER = "04" # 4º Trimestre

# --- Funções de Processamento ---

def extract_markdown_content(filepath):
    """Lê um arquivo Markdown e extrai o conteúdo principal."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove o cabeçalho YAML (front matter)
    content = re.sub(r'---\s*[\s\S]*?\s*---', '', content, 1)
    
    # Remove quebras de linha duplas e espaços em excesso
    content = re.sub(r'\n\s*\n', '\n\n', content).strip()
    
    return content

def process_sabbath_school_data_from_md():
    """Processa e formata os dados da Escola Sabatina a partir dos arquivos Markdown."""
    
    quarterly_dir = os.path.join(SABBATH_SCHOOL_REPO_PATH, 'src', LANGUAGE, f"{TARGET_YEAR}-{TARGET_QUARTER}")
    
    if not os.path.isdir(quarterly_dir):
        print(f"Diretório do trimestre não encontrado: {quarterly_dir}")
        return None

    # 1. Buscar informações do trimestre (usando o arquivo introduction.md)
    introduction_file = os.path.join(quarterly_dir, 'introduction.md')
    if not os.path.exists(introduction_file):
        print(f"Arquivo introduction.md não encontrado em {quarterly_dir}")
        return None

    # Leitura do index.md para extrair metadados (simulação, pois o front matter foi removido)
    # Para simplificar, vamos usar o nome do diretório como título
    quarterly_title = f"Lições da Escola Sabatina - {TARGET_QUARTER}º Trimestre de {TARGET_YEAR}"
    
    estudos_formatados = {
        "id": f"{LANGUAGE}-{TARGET_YEAR}-{TARGET_QUARTER}",
        "titulo": quarterly_title,
        "trimestre": f"{TARGET_QUARTER}º Trimestre de {TARGET_YEAR}",
        "tipo": "Escola Sabatina - Adventech (MD)",
        "descricao": "Conteúdo das lições da Escola Sabatina extraído diretamente dos arquivos Markdown do projeto Adventech.",
        "capa": "", # Não é fácil extrair a capa do MD
        "licoes": []
    }

    # 2. Processar cada lição
    lesson_dirs = sorted([d for d in os.listdir(quarterly_dir) if os.path.isdir(os.path.join(quarterly_dir, d)) and d.isdigit()])
    
    for lesson_index_str in lesson_dirs:
        lesson_dir = os.path.join(quarterly_dir, lesson_index_str)
        
        # Arquivo principal da lição (geralmente 01.md, 02.md, etc.)
        lesson_main_file = os.path.join(lesson_dir, f"{lesson_index_str}.md")
        
        if not os.path.exists(lesson_main_file):
            print(f"Arquivo principal da lição {lesson_index_str} não encontrado.")
            continue

        # Conteúdo principal da lição
        lesson_content = extract_markdown_content(lesson_main_file)
        
        licoes_detalhes = []
        
        # Processar os dias da lição (01.md, 02.md, etc. dentro do diretório da lição)
        day_files = sorted([f for f in os.listdir(lesson_dir) if f.endswith('.md') and f != f"{lesson_index_str}.md"])
        
        for day_file in day_files:
            day_filepath = os.path.join(lesson_dir, day_file)
            day_content = extract_markdown_content(day_filepath)
            
            # Tenta extrair o título do dia (primeiro cabeçalho H1 ou H2)
            day_title_match = re.search(r'#\s*(.*)', day_content)
            day_title = day_title_match.group(1).strip() if day_title_match else os.path.splitext(day_file)[0]
            
            # Remove o título do conteúdo
            if day_title_match:
                day_content = day_content[day_title_match.end():].strip()

            licoes_detalhes.append({
                "titulo": day_title,
                "texto": "", # Não é fácil extrair a passagem bíblica de forma confiável do MD
                "conteudo": day_content,
                "versiculoChave": "", # Não é fácil extrair o versículo chave de forma confiável do MD
                "perguntas": []
            })

        estudos_formatados["licoes"].append({
            "numero": int(lesson_index_str),
            "titulo": lesson_content.split('\n')[0].replace('#', '').strip(), # Usa a primeira linha como título
            "texto": "",
            "conteudo": lesson_content,
            "versiculoChave": "",
            "licoes_detalhes": licoes_detalhes
        })

    return estudos_formatados

# --- Função Principal de Automação ---

def run_sabbath_school_automation():
    print("Iniciando automação do conteúdo da Escola Sabatina a partir de arquivos Markdown...")
    
    # 1. Processar e formatar os dados
    sabbath_school_data = process_sabbath_school_data_from_md()
    
    if sabbath_school_data and sabbath_school_data["licoes"]:
        # 2. Salvar o arquivo JSON
        os.makedirs(os.path.dirname(SABBATH_SCHOOL_FILE), exist_ok=True)
        with open(SABBATH_SCHOOL_FILE, 'w', encoding='utf-8') as f:
            json.dump(sabbath_school_data, f, ensure_ascii=False, indent=4)
        print(f"Conteúdo da Escola Sabatina salvo em: {SABBATH_SCHOOL_FILE}")
    else:
        print("Falha ao obter dados da Escola Sabatina. O arquivo não foi atualizado.")

if __name__ == "__main__":
    run_sabbath_school_automation()
