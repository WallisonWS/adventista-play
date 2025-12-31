import requests
import json
import os
from datetime import datetime

# --- Configurações ---
REPO_PATH = os.path.join(os.path.expanduser('~'), 'adventista-play')
SABBATH_SCHOOL_FILE = os.path.join(REPO_PATH, 'src', 'data', 'escola-sabatina-licoes-auto.json')
BASE_URL = "https://sabbath-school.adventech.io/api/v1"
LANGUAGE = "pt" # Português
QUARTERLY_ID = "2024-04" # ID do trimestre (ex: 2024-04) - Usando um trimestre mais antigo para garantir que o conteúdo exista.
QUARTERLY_FULL_ID = f"{LANGUAGE}-{QUARTERLY_ID}"











# --- Funções de Busca de Dados ---

def fetch_quarterly_info(quarterly_full_id):
    """Busca informações sobre um trimestre específico."""
    url = f"{BASE_URL}/quarterlies/{quarterly_full_id}/"
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Erro ao buscar informações do trimestre {quarterly_full_id}: {e}")
        return None

def fetch_lesson_info(quarterly_full_id, lesson_index):
    """Busca informações sobre uma lição específica."""
    url = f"{BASE_URL}/quarterlies/{quarterly_full_id}/lessons/{lesson_index}/"
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Erro ao buscar lição {lesson_index} do trimestre {quarterly_full_id}: {e}")
        return None

def fetch_lesson_days(quarterly_full_id, lesson_index):
    """Busca os dias de estudo de uma lição específica."""
    url = f"{BASE_URL}/quarterlies/{quarterly_full_id}/lessons/{lesson_index}/days/"
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Erro ao buscar dias da lição {lesson_index} do trimestre {quarterly_full_id}: {e}")
        return None

def process_sabbath_school_data():
    """Processa e formata os dados da Escola Sabatina."""
    quarterly_info = fetch_quarterly_info(QUARTERLY_FULL_ID)
    if not quarterly_info:
        return None

    print(f"Processando trimestre: {quarterly_info.get('title')}")
    
    estudos_formatados = {
        "id": quarterly_info.get("id"),
        "titulo": quarterly_info.get("title"),
        "trimestre": quarterly_info.get("human_date"),
        "tipo": "Escola Sabatina - Adventech",
        "descricao": quarterly_info.get("description"),
        "capa": quarterly_info.get("cover"),
        "licoes": []
    }

    for lesson_index in range(1, quarterly_info.get("lesson_count", 0) + 1):
        lesson_info = fetch_lesson_info(QUARTERLY_FULL_ID, lesson_index)
        lesson_days = fetch_lesson_days(QUARTERLY_FULL_ID, lesson_index)
        
        if not lesson_info or not lesson_days:
            continue

        licoes_detalhes = []
        for day in lesson_days:
            # A API da Adventech retorna o conteúdo em Markdown no campo 'content'
            # Para simplificar, vamos usar o título e o conteúdo do dia
            licoes_detalhes.append({
                "titulo": day.get("title"),
                "texto": day.get("bible_passage", "Passagem não informada"),
                "conteudo": day.get("content", ""),
                "versiculoChave": day.get("memory_text", ""),
                "perguntas": [] # Não há perguntas estruturadas na API, mas o conteúdo pode ser usado
            })

        estudos_formatados["licoes"].append({
            "numero": lesson_index,
            "titulo": lesson_info.get("title"),
            "texto": lesson_info.get("bible_passage", "Passagem não informada"),
            "conteudo": lesson_info.get("introduction", ""),
            "versiculoChave": lesson_info.get("memory_text", ""),
            "licoes_detalhes": licoes_detalhes
        })

    return estudos_formatados

# --- Função Principal de Automação ---

def run_sabbath_school_automation():
    print("Iniciando automação do conteúdo da Escola Sabatina...")
    
    # 1. Processar e formatar os dados
    sabbath_school_data = process_sabbath_school_data()
    
    if sabbath_school_data:
        # 2. Salvar o arquivo JSON
        os.makedirs(os.path.dirname(SABBATH_SCHOOL_FILE), exist_ok=True)
        with open(SABBATH_SCHOOL_FILE, 'w', encoding='utf-8') as f:
            json.dump(sabbath_school_data, f, ensure_ascii=False, indent=4)
        print(f"Conteúdo da Escola Sabatina salvo em: {SABBATH_SCHOOL_FILE}")
    else:
        print("Falha ao obter dados da Escola Sabatina. O arquivo não foi atualizado.")

if __name__ == "__main__":
    run_sabbath_school_automation()
