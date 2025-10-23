
import json

def gerar_plano_biblia_1_ano():
    # Esta é uma representação simplificada. Um plano real precisaria de uma lógica mais complexa
    # para dividir a Bíblia de forma equilibrada em 365 dias.
    plano = []
    livros_pentateuco = ["Gênesis", "Êxodo", "Levítico", "Números", "Deuteronômio"]
    dia_atual = 1

    # Pentateuco (aproximadamente 60 dias)
    for livro in livros_pentateuco:
        # Simulação de divisão de capítulos
        for i in range(1, 13):
            if dia_atual > 365: break
            plano.append({"dia": dia_atual, "leitura": f"{livro} {i*4-3}-{i*4}", "reflexao": f"Estudo sobre {livro}"})
            dia_atual += 1

    # Livros Históricos (aproximadamente 90 dias)
    livros_historicos = ["Josué", "Juízes", "Rute", "1 Samuel", "2 Samuel", "1 Reis", "2 Reis", "1 Crônicas", "2 Crônicas", "Esdras", "Neemias", "Ester"]
    for livro in livros_historicos:
        for i in range(1, 8):
            if dia_atual > 365: break
            plano.append({"dia": dia_atual, "leitura": f"{livro} {i*3-2}-{i*3}", "reflexao": f"História de Israel em {livro}"})
            dia_atual += 1

    # Livros Poéticos e de Sabedoria (aproximadamente 60 dias)
    livros_poeticos = ["Jó", "Salmos", "Provérbios", "Eclesiastes", "Cantares"]
    for livro in livros_poeticos:
        num_dias = 30 if livro == "Salmos" else 10
        for i in range(1, num_dias + 1):
            if dia_atual > 365: break
            leitura = f"{livro} {i*5-4}-{i*5}" if livro == "Salmos" else f"{livro} {i*3-2}-{i*3}"
            plano.append({"dia": dia_atual, "leitura": leitura, "reflexao": f"Sabedoria e poesia em {livro}"})
            dia_atual += 1

    # Profetas Maiores (aproximadamente 60 dias)
    profetas_maiores = ["Isaías", "Jeremias", "Lamentações", "Ezequiel", "Daniel"]
    for livro in profetas_maiores:
        for i in range(1, 13):
            if dia_atual > 365: break
            plano.append({"dia": dia_atual, "leitura": f"{livro} {i*4-3}-{i*4}", "reflexao": f"Profecias em {livro}"})
            dia_atual += 1

    # Profetas Menores (aproximadamente 30 dias)
    profetas_menores = ["Oséias", "Joel", "Amós", "Obadias", "Jonas", "Miquéias", "Naum", "Habacuque", "Sofonias", "Ageu", "Zacarias", "Malaquias"]
    for livro in profetas_menores:
        for i in range(1, 3):
            if dia_atual > 365: break
            plano.append({"dia": dia_atual, "leitura": f"{livro} {i*2-1}-{i*2}", "reflexao": f"Mensagens dos profetas menores em {livro}"})
            dia_atual += 1

    # Novo Testamento (aproximadamente 65 dias)
    livros_nt = ["Mateus", "Marcos", "Lucas", "João", "Atos", "Romanos", "1 Coríntios", "2 Coríntios", "Gálatas", "Efésios", "Filipenses", "Colossenses", "1 Tessalonicenses", "2 Tessalonicenses", "1 Timóteo", "2 Timóteo", "Tito", "Filemom", "Hebreus", "Tiago", "1 Pedro", "2 Pedro", "1 João", "2 João", "3 João", "Judas", "Apocalipse"]
    for livro in livros_nt:
        num_dias = 5 if livro in ["Mateus", "Lucas", "Atos"] else 3
        for i in range(1, num_dias + 1):
            if dia_atual > 365: break
            plano.append({"dia": dia_atual, "leitura": f"{livro} {i*3-2}-{i*3}", "reflexao": f"O Novo Testamento em {livro}"})
            dia_atual += 1
            
    # Preencher os dias restantes, se houver
    while dia_atual <= 365:
        plano.append({"dia": dia_atual, "leitura": "Revisão e Meditação", "reflexao": "Dia de revisão e meditação."})
        dia_atual += 1

    return plano

if __name__ == "__main__":
    plano_completo = gerar_plano_biblia_1_ano()
    # Salvar em um arquivo JS
    with open("src/data/planos-leitura-completos/biblia-em-1-ano.js", "w", encoding="utf-8") as f:
        f.write("export const bibliaEmUmAno = ")
        json.dump(plano_completo, f, ensure_ascii=False, indent=2)
        f.write(";")

