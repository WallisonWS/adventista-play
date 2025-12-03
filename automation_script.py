import os
import json
import requests
from datetime import datetime, timedelta

# --- Configurações ---
REPO_PATH = os.path.join(os.path.expanduser('~'), 'adventista-play')
DEVOTIONAL_FILE = os.path.join(REPO_PATH, 'src', 'data', 'devocional_diario.json')
NEWS_FILE = os.path.join(REPO_PATH, 'src', 'data', 'noticias_desbravadores.json')
PATHFINDERS_FILE = os.path.join(REPO_PATH, 'src', 'data', 'desbravadores_info.json')

# --- Funções de Busca de Dados (Simulação) ---

def fetch_devotional():
    """Simula a busca de um devocional diário."""
    # Em um cenário real, isso faria uma chamada a uma API de devocionais
    today = datetime.now().strftime('%d/%m/%Y')
    return {
        "date": today,
        "title": f"Devocional do Dia - {today}",
        "verse": "O Senhor é o meu pastor; nada me faltará.",
        "reference": "Salmos 23:1",
        "content": "Reflexão sobre a provisão e cuidado de Deus...",
        "author": "Manuscrito 21st.dev"
    }

def fetch_news():
    """Simula a busca de notícias de desbravadores."""
    # Em um cenário real, isso faria um web scraping ou chamada a uma API de notícias
    return [
        {
            "id": 1,
            "title": "Campori Sul-Americano 2026: Inscrições Abertas!",
            "date": datetime.now().strftime('%d/%m/%Y'),
            "summary": "O maior evento de desbravadores da América do Sul já tem data e local. Garanta sua vaga!",
            "link": "https://campori.org"
        },
        {
            "id": 2,
            "title": "Nova Especialidade: Programação Web",
            "date": (datetime.now() - timedelta(days=1)).strftime('%d/%m/%Y'),
            "summary": "A União Sul-Americana lança nova especialidade para o mundo digital.",
            "link": "https://especialidades.org"
        }
    ]

def fetch_pathfinders_info():
    """Simula a busca de informações de desbravadores (classes, especialidades)."""
    # Em um cenário real, isso buscaria dados de um sistema de gerenciamento
    return {
        "classes_progress": {
            "Amigo": 100,
            "Companheiro": 60,
            "Pesquisador": 25,
            "Pioneiro": 0
        },
        "specialties_completed": 17,
        "total_specialties": 80
    }

# --- Função Principal de Automação ---

def run_automation():
    print("Iniciando automação de conteúdo diário...")

    # 1. Buscar e salvar Devocional
    devotional_data = fetch_devotional()
    with open(DEVOTIONAL_FILE, 'w', encoding='utf-8') as f:
        json.dump(devotional_data, f, ensure_ascii=False, indent=4)
    print(f"Devocional salvo em: {DEVOTIONAL_FILE}")

    # 2. Buscar e salvar Notícias
    news_data = fetch_news()
    with open(NEWS_FILE, 'w', encoding='utf-8') as f:
        json.dump(news_data, f, ensure_ascii=False, indent=4)
    print(f"Notícias salvas em: {NEWS_FILE}")

    # 3. Buscar e salvar Info Desbravadores
    pathfinders_data = fetch_pathfinders_info()
    with open(PATHFINDERS_FILE, 'w', encoding='utf-8') as f:
        json.dump(pathfinders_data, f, ensure_ascii=False, indent=4)
    print(f"Info Desbravadores salva em: {PATHFINDERS_FILE}")

    # 4. Commit e Push
    os.chdir(REPO_PATH)
    os.system('git add .')
    os.system(f'git commit -m "chore: Automação de conteúdo diário - {datetime.now().strftime("%Y-%m-%d")}"')
    os.system('git push origin main')
    print("Commit e Push realizados com sucesso!")

if __name__ == "__main__":
    # Garantir que o repositório está clonado
    if not os.path.exists(REPO_PATH):
        print(f"Clonando repositório em {REPO_PATH}...")
        os.system(f'git clone https://github.com/WallisonWS/adventista-play {REPO_PATH}')
    
    # Garantir que as pastas de dados existem
    os.makedirs(os.path.join(REPO_PATH, 'src', 'data'), exist_ok=True)

    run_automation()
