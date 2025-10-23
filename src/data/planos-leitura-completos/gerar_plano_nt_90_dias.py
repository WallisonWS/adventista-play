import json

def gerar_plano_nt_90_dias():
    # Estrutura simplificada para simular a divisão do Novo Testamento em 90 dias
    plano = []
    livros_nt = [
        ("Mateus", 28), ("Marcos", 16), ("Lucas", 24), ("João", 21), ("Atos", 28),
        ("Romanos", 16), ("1 Coríntios", 16), ("2 Coríntios", 13), ("Gálatas", 6), ("Efésios", 6),
        ("Filipenses", 4), ("Colossenses", 4), ("1 Tessalonicenses", 5), ("2 Tessalonicenses", 3),
        ("1 Timóteo", 6), ("2 Timóteo", 4), ("Tito", 3), ("Filemom", 1), ("Hebreus", 13),
        ("Tiago", 5), ("1 Pedro", 5), ("2 Pedro", 3), ("1 João", 5), ("2 João", 1), 
        ("3 João", 1), ("Judas", 1), ("Apocalipse", 22)
    ]
    
    total_capitulos = sum(cap for _, cap in livros_nt)
    capitulos_por_dia = total_capitulos / 90.0
    
    dia_atual = 1
    capitulos_lidos = 0
    leitura_dia = []
    
    for livro, total_cap in livros_nt:
        cap_lidos_no_livro = 0
        while cap_lidos_no_livro < total_cap:
            cap_restantes_no_dia = int(capitulos_por_dia) - len(leitura_dia)
            
            if cap_restantes_no_dia <= 0:
                # Se a leitura do dia estiver completa, salva e começa um novo dia
                plano.append({
                    "dia": dia_atual, 
                    "leitura": ", ".join(leitura_dia), 
                    "reflexao": f"Meditação sobre o Novo Testamento"
                })
                dia_atual += 1
                leitura_dia = []
                capitulos_lidos = 0
                
            cap_a_ler = min(total_cap - cap_lidos_no_livro, cap_restantes_no_dia)
            
            if cap_a_ler > 0:
                cap_inicio = cap_lidos_no_livro + 1
                cap_fim = cap_lidos_no_livro + cap_a_ler
                
                if cap_inicio == cap_fim:
                    leitura_dia.append(f"{livro} {cap_inicio}")
                else:
                    leitura_dia.append(f"{livro} {cap_inicio}-{cap_fim}")
                
                cap_lidos_no_livro += cap_a_ler
                capitulos_lidos += cap_a_ler

    # Adicionar o último dia se houver leitura pendente
    if leitura_dia and dia_atual <= 90:
        plano.append({
            "dia": dia_atual, 
            "leitura": ", ".join(leitura_dia), 
            "reflexao": f"Meditação sobre o Novo Testamento"
        })
        dia_atual += 1
        
    # Garantir 90 dias, se a lógica acima não atingiu
    while len(plano) < 90:
        plano.append({
            "dia": len(plano) + 1, 
            "leitura": "Revisão e Meditação", 
            "reflexao": "Dia extra de revisão e meditação."
        })

    return plano[:90]

if __name__ == "__main__":
    plano_completo = gerar_plano_nt_90_dias()
    # Salvar em um arquivo JS
    with open("src/data/planos-leitura-completos/novo-testamento-90-dias.js", "w", encoding="utf-8") as f:
        f.write("export const novoTestamento90Dias = ")
        json.dump(plano_completo, f, ensure_ascii=False, indent=2)
        f.write(";")

