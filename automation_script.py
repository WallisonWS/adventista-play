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
    """Busca o devocional diário da API Open Heavens (JSON)."""
    API_URL = "https://micromab.com/wp-json/openheavens/v1/today"
    
    try:
        response = requests.get(API_URL, timeout=10)
        response.raise_for_status() # Levanta exceção para códigos de status HTTP de erro
        data = response.json()
        
        # A API retorna uma lista, pegamos o primeiro item
        if data and isinstance(data, list) and len(data) > 0:
            devotional = data[0]
            # Mapeamento dos campos da API para o formato esperado pelo frontend
            return {
                "date": devotional.get("date", datetime.now().strftime('%Y-%m-%d')),
                "title": devotional.get("title", "Devocional Diário"),
                "verse": devotional.get("memory_verse", "Versículo não encontrado."),
                "reference": devotional.get("memory_verse_reference", "Referência não encontrada."),
                "content": devotional.get("message", "Conteúdo do devocional não encontrado."),
                "author": "Pastor E.A. Adeboye (via Open Heavens API)"
            }
        else:
            print("Aviso: Resposta da API de devocional vazia ou inesperada.")
            return fetch_simulated_devotional() # Retorna simulação em caso de falha
            
    except requests.exceptions.RequestException as e:
        print(f"Erro ao buscar devocional da API: {e}")
        return fetch_simulated_devotional() # Retorna simulação em caso de falha

def fetch_simulated_devotional():
    """Retorna um devocional simulado em caso de falha da API."""
    today = datetime.now().strftime('%Y-%m-%d')
    return {
        "date": today,
        "title": f"Devocional do Dia (Simulado) - {today}",
        "verse": "O Senhor é o meu pastor; nada me faltará.",
        "reference": "Salmos 23:1",
        "content": "Reflexão sobre a provisão e cuidado de Deus (Conteúdo Simulado).",
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

def run_devotional_automation():
    # 1. Buscar e salvar Devocional
    devotional_data = fetch_devotional()
    with open(DEVOTIONAL_FILE, 'w', encoding='utf-8') as f:
        json.dump(devotional_data, f, ensure_ascii=False, indent=4)
    print(f"Devocional salvo em: {DEVOTIONAL_FILE}")

def run_desbravadores_automation():
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

def run_automation():
    print("Iniciando automação de conteúdo diário...")

    run_devotional_automation()
    run_desbravadores_automation()
    
    # Novo: Executa a automação da Escola Sabatina
    try:
        import automation_sabbath_school_md
        automation_sabbath_school_md.run_sabbath_school_automation()
    except Exception as e:
        print(f"Erro ao executar automação da Escola Sabatina: {e}")

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
