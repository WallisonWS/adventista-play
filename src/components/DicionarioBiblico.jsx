import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from './ui/card.jsx'
import { Input } from './ui/input.jsx'
import { Search, BookOpen } from 'lucide-react'

// Dicionário Bíblico completo
const dicionario = [
  { letra: 'A', palavra: 'Aarão', definicao: 'Irmão de Moisés, primeiro sumo sacerdote de Israel (Êxodo 4:14).' },
  { letra: 'A', palavra: 'Abaddon', definicao: 'Hebraico: destruição, lugar de destruição (Jó 26:6; Apocalipse 9:11).' },
  { letra: 'A', palavra: 'Abadom', definicao: 'Anjo do abismo, o destruidor (Apocalipse 9:11).' },
  { letra: 'A', palavra: 'Abana', definicao: 'Rio de Damasco mencionado por Naamã (2 Reis 5:12).' },
  { letra: 'A', palavra: 'Abba', definicao: 'Aramaico: Pai. Termo de intimidade usado por Jesus (Marcos 14:36).' },
  { letra: 'A', palavra: 'Abel', definicao: 'Segundo filho de Adão e Eva, morto por seu irmão Caim (Gênesis 4:2-8).' },
  { letra: 'A', palavra: 'Abias', definicao: 'Nome de vários personagens bíblicos, incluindo um rei de Judá (1 Reis 14:31).' },
  { letra: 'A', palavra: 'Abiatar', definicao: 'Sumo sacerdote nos dias de Davi (1 Samuel 22:20).' },
  { letra: 'A', palavra: 'Abigail', definicao: 'Esposa de Nabal e depois de Davi, conhecida por sua sabedoria (1 Samuel 25).' },
  { letra: 'A', palavra: 'Abimelech', definicao: 'Nome de vários reis filisteus (Gênesis 20; 26).' },
  { letra: 'A', palavra: 'Abinadabe', definicao: 'Homem em cuja casa a arca ficou por 20 anos (1 Samuel 7:1).' },
  { letra: 'A', palavra: 'Abirão', definicao: 'Levita que se rebelou contra Moisés (Números 16).' },
  { letra: 'A', palavra: 'Abisague', definicao: 'Jovem que cuidou de Davi em sua velhice (1 Reis 1:3).' },
  { letra: 'A', palavra: 'Abismo', definicao: 'Lugar de confinamento de demônios; profundezas (Lucas 8:31; Apocalipse 9:1).' },
  { letra: 'A', palavra: 'Ablução', definicao: 'Lavagem ritual para purificação cerimonial (Marcos 7:4).' },
  { letra: 'A', palavra: 'Abner', definicao: 'Comandante do exército de Saul (1 Samuel 14:50).' },
  { letra: 'A', palavra: 'Abominação', definicao: 'Algo detestável a Deus, especialmente idolatria (Deuteronômio 7:25).' },
  { letra: 'A', palavra: 'Abraão', definicao: 'Pai da fé, patriarca do povo hebreu (Gênesis 12-25).' },
  { letra: 'A', palavra: 'Absalão', definicao: 'Filho de Davi que se rebelou contra o pai (2 Samuel 13-18).' },
  { letra: 'A', palavra: 'Acabe', definicao: 'Rei ímpio de Israel, casado com Jezabel (1 Reis 16:29).' },
  { letra: 'A', palavra: 'Acã', definicao: 'Israelita que pecou tomando do despojo de Jericó (Josué 7).' },
  { letra: 'A', palavra: 'Acaz', definicao: 'Rei de Judá que praticou idolatria (2 Reis 16).' },
  { letra: 'A', palavra: 'Acazias', definicao: 'Nome de dois reis: um de Israel e outro de Judá (1 Reis 22; 2 Reis 8).' },
  { letra: 'A', palavra: 'Aclamação', definicao: 'Grito de louvor ou aprovação (Salmos 47:1).' },
  { letra: 'A', palavra: 'Ação de Graças', definicao: 'Expressão de gratidão a Deus (Salmos 100:4).' },
  { letra: 'A', palavra: 'Adão', definicao: 'Primeiro homem criado por Deus (Gênesis 1-3).' },
  { letra: 'A', palavra: 'Adonai', definicao: 'Hebraico: Senhor, título de Deus (Salmos 8:1).' },
  { letra: 'A', palavra: 'Adonias', definicao: 'Filho de Davi que tentou usurpar o trono (1 Reis 1).' },
  { letra: 'A', palavra: 'Adoração', definicao: 'Reverência e honra prestadas a Deus (João 4:24).' },
  { letra: 'A', palavra: 'Adultério', definicao: 'Relação sexual fora do casamento (Êxodo 20:14).' },
  
  { letra: 'B', palavra: 'Baal', definicao: 'Deus cananeu da fertilidade, frequentemente adorado por Israel (1 Reis 18).' },
  { letra: 'B', palavra: 'Babel', definicao: 'Torre construída em rebelião contra Deus (Gênesis 11:1-9).' },
  { letra: 'B', palavra: 'Babilônia', definicao: 'Império que conquistou Judá e destruiu Jerusalém (2 Reis 25).' },
  { letra: 'B', palavra: 'Balaque', definicao: 'Rei de Moabe que contratou Balaão (Números 22).' },
  { letra: 'B', palavra: 'Balaão', definicao: 'Profeta que foi impedido de amaldiçoar Israel (Números 22-24).' },
  { letra: 'B', palavra: 'Barnabé', definicao: 'Companheiro de Paulo nas viagens missionárias (Atos 13-15).' },
  { letra: 'B', palavra: 'Barrabás', definicao: 'Criminoso libertado no lugar de Jesus (Mateus 27:16).' },
  { letra: 'B', palavra: 'Bartimeu', definicao: 'Cego curado por Jesus em Jericó (Marcos 10:46).' },
  { letra: 'B', palavra: 'Bate-Seba', definicao: 'Esposa de Urias, depois esposa de Davi (2 Samuel 11).' },
  { letra: 'B', palavra: 'Batismo', definicao: 'Rito de iniciação cristã por imersão em água (Mateus 28:19).' },
  { letra: 'B', palavra: 'Belém', definicao: 'Cidade onde Jesus nasceu (Mateus 2:1).' },
  { letra: 'B', palavra: 'Belsazar', definicao: 'Último rei de Babilônia (Daniel 5).' },
  { letra: 'B', palavra: 'Bem-aventurança', definicao: 'Estado de felicidade espiritual (Mateus 5:3-12).' },
  { letra: 'B', palavra: 'Benjamim', definicao: 'Filho mais novo de Jacó, uma das 12 tribos (Gênesis 35:18).' },
  { letra: 'B', palavra: 'Betel', definicao: 'Lugar onde Jacó teve a visão da escada (Gênesis 28:19).' },
  { letra: 'B', palavra: 'Blasfêmia', definicao: 'Falar mal de Deus ou coisas sagradas (Levítico 24:16).' },
  { letra: 'B', palavra: 'Boaz', definicao: 'Marido de Rute, ancestral de Davi (Rute 2-4).' },
  
  { letra: 'C', palavra: 'Cafarnaum', definicao: 'Cidade base do ministério de Jesus na Galileia (Mateus 4:13).' },
  { letra: 'C', palavra: 'Caifás', definicao: 'Sumo sacerdote que presidiu o julgamento de Jesus (Mateus 26:57).' },
  { letra: 'C', palavra: 'Caim', definicao: 'Primeiro filho de Adão, que matou seu irmão Abel (Gênesis 4:1-16).' },
  { letra: 'C', palavra: 'Cálice', definicao: 'Copa usada na Ceia do Senhor; símbolo de sofrimento (Mateus 26:39).' },
  { letra: 'C', palavra: 'Calvário', definicao: 'Lugar onde Jesus foi crucificado (Lucas 23:33).' },
  { letra: 'C', palavra: 'Canaã', definicao: 'Terra prometida a Abraão e seus descendentes (Gênesis 12:5).' },
  { letra: 'C', palavra: 'Cântico', definicao: 'Hino ou canção de louvor a Deus (Salmos 96:1).' },
  { letra: 'C', palavra: 'Caná', definicao: 'Cidade onde Jesus fez Seu primeiro milagre (João 2:1).' },
  { letra: 'C', palavra: 'Caridade', definicao: 'Amor cristão, benevolência (1 Coríntios 13).' },
  { letra: 'C', palavra: 'Carne', definicao: 'Natureza humana pecaminosa; corpo físico (Romanos 8:5).' },
  { letra: 'C', palavra: 'Cativeiro', definicao: 'Exílio de Israel e Judá (2 Reis 17; 25).' },
  { letra: 'C', palavra: 'Ceia do Senhor', definicao: 'Sacramento instituído por Jesus (1 Coríntios 11:23-26).' },
  { letra: 'C', palavra: 'Céu', definicao: 'Morada de Deus e dos salvos (Apocalipse 21).' },
  { letra: 'C', palavra: 'Circuncisão', definicao: 'Sinal da aliança de Deus com Abraão (Gênesis 17:10).' },
  { letra: 'C', palavra: 'Colossenses', definicao: 'Carta de Paulo à igreja de Colossos.' },
  { letra: 'C', palavra: 'Comunhão', definicao: 'Relacionamento íntimo com Deus e com os irmãos (1 João 1:3).' },
  { letra: 'C', palavra: 'Concupiscência', definicao: 'Desejo carnal pecaminoso (1 João 2:16).' },
  { letra: 'C', palavra: 'Confissão', definicao: 'Reconhecimento de pecados a Deus (1 João 1:9).' },
  { letra: 'C', palavra: 'Consagração', definicao: 'Dedicação total a Deus (Romanos 12:1).' },
  { letra: 'C', palavra: 'Consolador', definicao: 'Título do Espírito Santo (João 14:16).' },
  { letra: 'C', palavra: 'Conversão', definicao: 'Mudança de vida ao aceitar Cristo (Atos 3:19).' },
  { letra: 'C', palavra: 'Coração', definicao: 'Centro da vida espiritual e emocional (Provérbios 4:23).' },
  { letra: 'C', palavra: 'Cordeiro', definicao: 'Símbolo de Cristo, o sacrifício perfeito (João 1:29).' },
  { letra: 'C', palavra: 'Coríntios', definicao: 'Duas cartas de Paulo à igreja de Corinto.' },
  { letra: 'C', palavra: 'Coroa', definicao: 'Símbolo de vitória e recompensa (2 Timóteo 4:8).' },
  { letra: 'C', palavra: 'Criação', definicao: 'Ato de Deus ao fazer o universo (Gênesis 1).' },
  { letra: 'C', palavra: 'Cristo', definicao: 'Grego: Ungido, equivalente a Messias (Mateus 16:16).' },
  { letra: 'C', palavra: 'Cruz', definicao: 'Instrumento da morte de Cristo; símbolo da salvação (1 Coríntios 1:18).' },
  { letra: 'C', palavra: 'Culto', definicao: 'Adoração e serviço a Deus (João 4:23).' },
  
  { letra: 'D', palavra: 'Daniel', definicao: 'Profeta hebreu na Babilônia (Daniel 1-12).' },
  { letra: 'D', palavra: 'Davi', definicao: 'Segundo rei de Israel, homem segundo o coração de Deus (1 Samuel 16).' },
  { letra: 'D', palavra: 'Débora', definicao: 'Profetisa e juíza de Israel (Juízes 4-5).' },
  { letra: 'D', palavra: 'Decálogo', definicao: 'Os Dez Mandamentos (Êxodo 20:1-17).' },
  { letra: 'D', palavra: 'Demônio', definicao: 'Espírito maligno, anjo caído (Marcos 5:12).' },
  { letra: 'D', palavra: 'Deuteronômio', definicao: 'Quinto livro da Bíblia, segunda lei.' },
  { letra: 'D', palavra: 'Diabo', definicao: 'Satanás, o adversário de Deus (1 Pedro 5:8).' },
  { letra: 'D', palavra: 'Diácono', definicao: 'Servo da igreja (Atos 6:1-6).' },
  { letra: 'D', palavra: 'Dilúvio', definicao: 'Inundação mundial nos dias de Noé (Gênesis 6-9).' },
  { letra: 'D', palavra: 'Discípulo', definicao: 'Seguidor de Jesus (Mateus 28:19).' },
  { letra: 'D', palavra: 'Dízimo', definicao: 'Décima parte da renda devolvida a Deus (Malaquias 3:10).' },
  { letra: 'D', palavra: 'Dorcas', definicao: 'Discípula conhecida por suas boas obras (Atos 9:36).' },
  
  { letra: 'E', palavra: 'Éden', definicao: 'Jardim onde Deus colocou Adão e Eva (Gênesis 2:8).' },
  { letra: 'E', palavra: 'Efésios', definicao: 'Carta de Paulo à igreja de Éfeso.' },
  { letra: 'E', palavra: 'Egito', definicao: 'País onde Israel foi escravo (Êxodo 1-14).' },
  { letra: 'E', palavra: 'Eleição', definicao: 'Escolha divina para salvação (Romanos 8:33).' },
  { letra: 'E', palavra: 'Eli', definicao: 'Sacerdote e juiz que criou Samuel (1 Samuel 1-4).' },
  { letra: 'E', palavra: 'Elias', definicao: 'Profeta que foi arrebatado ao céu (2 Reis 2).' },
  { letra: 'E', palavra: 'Eliseu', definicao: 'Profeta sucessor de Elias (2 Reis 2-13).' },
  { letra: 'E', palavra: 'Emanuel', definicao: 'Hebraico: Deus conosco, nome profético de Cristo (Isaías 7:14).' },
  { letra: 'E', palavra: 'Enoque', definicao: 'Homem que andou com Deus e foi trasladado (Gênesis 5:24).' },
  { letra: 'E', palavra: 'Epístola', definicao: 'Carta, especialmente as do Novo Testamento.' },
  { letra: 'E', palavra: 'Esaú', definicao: 'Irmão gêmeo de Jacó que vendeu a primogenitura (Gênesis 25).' },
  { letra: 'E', palavra: 'Escriba', definicao: 'Copista e intérprete da Lei (Mateus 23:2).' },
  { letra: 'E', palavra: 'Espírito Santo', definicao: 'Terceira pessoa da Trindade (João 14:26).' },
  { letra: 'E', palavra: 'Ester', definicao: 'Rainha judia que salvou seu povo (Ester 1-10).' },
  { letra: 'E', palavra: 'Estêvão', definicao: 'Primeiro mártir cristão (Atos 6-7).' },
  { letra: 'E', palavra: 'Evangelho', definicao: 'Boas novas da salvação em Cristo (Marcos 1:1).' },
  { letra: 'E', palavra: 'Eva', definicao: 'Primeira mulher criada por Deus (Gênesis 2:22).' },
  { letra: 'E', palavra: 'Expiação', definicao: 'Pagamento pelo pecado através do sacrifício (Levítico 16).' },
  { letra: 'E', palavra: 'Êxodo', definicao: 'Saída de Israel do Egito; segundo livro da Bíblia.' },
  { letra: 'E', palavra: 'Ezequiel', definicao: 'Profeta do cativeiro babilônico (Ezequiel 1-48).' },
  
  { letra: 'F', palavra: 'Faraó', definicao: 'Título dos reis do Egito (Êxodo 5:1).' },
  { letra: 'F', palavra: 'Fariseu', definicao: 'Membro de seita judaica legalista (Mateus 23).' },
  { letra: 'F', palavra: 'Fé', definicao: 'Confiança em Deus e Sua Palavra (Hebreus 11:1).' },
  { letra: 'F', palavra: 'Félix', definicao: 'Governador romano que julgou Paulo (Atos 24).' },
  { letra: 'F', palavra: 'Filemom', definicao: 'Cristão a quem Paulo escreveu sobre Onésimo.' },
  { letra: 'F', palavra: 'Filipe', definicao: 'Apóstolo e evangelista (João 1:43; Atos 8).' },
  { letra: 'F', palavra: 'Filipenses', definicao: 'Carta de Paulo à igreja de Filipos.' },
  { letra: 'F', palavra: 'Fruto do Espírito', definicao: 'Características do cristão cheio do Espírito (Gálatas 5:22-23).' },
  
  { letra: 'G', palavra: 'Gabriel', definicao: 'Anjo mensageiro de Deus (Lucas 1:26).' },
  { letra: 'G', palavra: 'Gálatas', definicao: 'Carta de Paulo às igrejas da Galácia.' },
  { letra: 'G', palavra: 'Galileia', definicao: 'Região norte de Israel onde Jesus cresceu (Mateus 4:12).' },
  { letra: 'G', palavra: 'Geena', definicao: 'Vale de Hinom, símbolo do inferno (Mateus 5:22).' },
  { letra: 'G', palavra: 'Gênesis', definicao: 'Primeiro livro da Bíblia, livro das origens.' },
  { letra: 'G', palavra: 'Gentio', definicao: 'Não-judeu (Romanos 1:16).' },
  { letra: 'G', palavra: 'Getsêmani', definicao: 'Jardim onde Jesus orou antes da crucificação (Mateus 26:36).' },
  { letra: 'G', palavra: 'Gideão', definicao: 'Juiz que derrotou os midianitas (Juízes 6-8).' },
  { letra: 'G', palavra: 'Glória', definicao: 'Manifestação da presença de Deus (Êxodo 40:34).' },
  { letra: 'G', palavra: 'Gólgota', definicao: 'Lugar da Caveira, onde Jesus foi crucificado (João 19:17).' },
  { letra: 'G', palavra: 'Golias', definicao: 'Gigante filisteu morto por Davi (1 Samuel 17).' },
  { letra: 'G', palavra: 'Graça', definicao: 'Favor imerecido de Deus (Efésios 2:8).' },
  
  { letra: 'H', palavra: 'Hades', definicao: 'Grego: mundo dos mortos (Apocalipse 1:18).' },
  { letra: 'H', palavra: 'Hebreus', definicao: 'Carta do Novo Testamento sobre a superioridade de Cristo.' },
  { letra: 'H', palavra: 'Herodes', definicao: 'Nome de vários governantes da Judeia (Mateus 2:1).' },
  { letra: 'H', palavra: 'Hino', definicao: 'Cântico de louvor a Deus (Efésios 5:19).' },
  { letra: 'H', palavra: 'Holocausto', definicao: 'Oferta queimada completamente (Levítico 1).' },
  { letra: 'H', palavra: 'Hosana', definicao: 'Hebraico: Salva agora! Grito de louvor (Mateus 21:9).' },
  
  { letra: 'I', palavra: 'Idolatria', definicao: 'Adoração de ídolos (Êxodo 20:3-5).' },
  { letra: 'I', palavra: 'Igreja', definicao: 'Assembleia dos crentes em Cristo (Mateus 16:18).' },
  { letra: 'I', palavra: 'Imaculado', definicao: 'Sem mancha ou defeito (1 Pedro 1:19).' },
  { letra: 'I', palavra: 'Imortalidade', definicao: 'Vida eterna sem morte (1 Coríntios 15:53).' },
  { letra: 'I', palavra: 'Imposição de Mãos', definicao: 'Ato de ordenação ou bênção (Atos 6:6).' },
  { letra: 'I', palavra: 'Incenso', definicao: 'Perfume queimado na adoração (Apocalipse 8:3).' },
  { letra: 'I', palavra: 'Inferno', definicao: 'Lugar de punição eterna (Mateus 25:41).' },
  { letra: 'I', palavra: 'Iniquidade', definicao: 'Pecado, maldade (Salmos 51:2).' },
  { letra: 'I', palavra: 'Intercessão', definicao: 'Oração em favor de outros (Romanos 8:26).' },
  { letra: 'I', palavra: 'Isaac', definicao: 'Filho da promessa de Abraão (Gênesis 21).' },
  { letra: 'I', palavra: 'Isaías', definicao: 'Grande profeta messiânico (Isaías 1-66).' },
  { letra: 'I', palavra: 'Ismael', definicao: 'Filho de Abraão com Agar (Gênesis 16).' },
  { letra: 'I', palavra: 'Israel', definicao: 'Nome dado a Jacó; povo escolhido de Deus (Gênesis 32:28).' },
  
  { letra: 'J', palavra: 'Jacó', definicao: 'Patriarca, pai das 12 tribos de Israel (Gênesis 25-50).' },
  { letra: 'J', palavra: 'Jairo', definicao: 'Líder da sinagoga cuja filha Jesus ressuscitou (Marcos 5:22).' },
  { letra: 'J', palavra: 'Jeová', definicao: 'Nome próprio de Deus, Yahweh (Êxodo 6:3).' },
  { letra: 'J', palavra: 'Jeremias', definicao: 'Profeta das lágrimas (Jeremias 1-52).' },
  { letra: 'J', palavra: 'Jericó', definicao: 'Primeira cidade conquistada em Canaã (Josué 6).' },
  { letra: 'J', palavra: 'Jeroboão', definicao: 'Primeiro rei do reino dividido de Israel (1 Reis 12).' },
  { letra: 'J', palavra: 'Jerusalém', definicao: 'Cidade santa, capital de Israel (2 Samuel 5:6).' },
  { letra: 'J', palavra: 'Jesus', definicao: 'Filho de Deus, Salvador do mundo (Mateus 1:21).' },
  { letra: 'J', palavra: 'Jezabel', definicao: 'Rainha ímpia, esposa de Acabe (1 Reis 16:31).' },
  { letra: 'J', palavra: 'Jó', definicao: 'Homem justo que sofreu provações (Jó 1-42).' },
  { letra: 'J', palavra: 'João Batista', definicao: 'Precursor de Cristo (Mateus 3).' },
  { letra: 'J', palavra: 'João', definicao: 'Apóstolo amado, autor do quarto evangelho (João 1-21).' },
  { letra: 'J', palavra: 'Jonas', definicao: 'Profeta engolido por um grande peixe (Jonas 1-4).' },
  { letra: 'J', palavra: 'Jônatas', definicao: 'Filho de Saul, amigo de Davi (1 Samuel 18-20).' },
  { letra: 'J', palavra: 'Jordão', definicao: 'Rio onde Jesus foi batizado (Mateus 3:13).' },
  { letra: 'J', palavra: 'José', definicao: 'Filho de Jacó vendido como escravo (Gênesis 37-50).' },
  { letra: 'J', palavra: 'Josué', definicao: 'Sucessor de Moisés, conquistou Canaã (Josué 1-24).' },
  { letra: 'J', palavra: 'Josias', definicao: 'Rei reformador de Judá (2 Reis 22-23).' },
  { letra: 'J', palavra: 'Jubileu', definicao: 'Ano de libertação a cada 50 anos (Levítico 25).' },
  { letra: 'J', palavra: 'Judá', definicao: 'Filho de Jacó, tribo de onde veio Cristo (Gênesis 29:35).' },
  { letra: 'J', palavra: 'Judas Iscariotes', definicao: 'Apóstolo que traiu Jesus (Mateus 26:14).' },
  { letra: 'J', palavra: 'Juízo', definicao: 'Julgamento de Deus (Hebreus 9:27).' },
  { letra: 'J', palavra: 'Justiça', definicao: 'Retidão, conformidade com a lei de Deus (Romanos 3:22).' },
  { letra: 'J', palavra: 'Justificação', definicao: 'Ser declarado justo por Deus (Romanos 5:1).' },
  
  { letra: 'L', palavra: 'Laodiceia', definicao: 'Igreja morna do Apocalipse (Apocalipse 3:14).' },
  { letra: 'L', palavra: 'Lázaro', definicao: 'Amigo de Jesus ressuscitado (João 11).' },
  { letra: 'L', palavra: 'Lei', definicao: 'Mandamentos de Deus, especialmente os Dez (Êxodo 20).' },
  { letra: 'L', palavra: 'Levita', definicao: 'Membro da tribo de Levi, servia no templo (Números 3).' },
  { letra: 'L', palavra: 'Levítico', definicao: 'Terceiro livro da Bíblia, leis cerimoniais.' },
  { letra: 'L', palavra: 'Líbano', definicao: 'País conhecido por seus cedros (1 Reis 5:6).' },
  { letra: 'L', palavra: 'Livro da Vida', definicao: 'Registro dos salvos (Apocalipse 20:12).' },
  { letra: 'L', palavra: 'Ló', definicao: 'Sobrinho de Abraão que morou em Sodoma (Gênesis 13-19).' },
  { letra: 'L', palavra: 'Lucas', definicao: 'Médico amado, autor do terceiro evangelho (Colossenses 4:14).' },
  { letra: 'L', palavra: 'Lúcifer', definicao: 'Nome de Satanás antes da queda (Isaías 14:12).' },
  
  { letra: 'M', palavra: 'Maná', definicao: 'Pão do céu dado a Israel no deserto (Êxodo 16).' },
  { letra: 'M', palavra: 'Manassés', definicao: 'Filho de José, tribo de Israel (Gênesis 48).' },
  { letra: 'M', palavra: 'Marcos', definicao: 'Autor do segundo evangelho, companheiro de Paulo (Atos 12:12).' },
  { letra: 'M', palavra: 'Maria', definicao: 'Mãe de Jesus (Lucas 1:26-38).' },
  { letra: 'M', palavra: 'Marta', definicao: 'Irmã de Maria e Lázaro (Lucas 10:38).' },
  { letra: 'M', palavra: 'Mateus', definicao: 'Apóstolo, ex-cobrador de impostos (Mateus 9:9).' },
  { letra: 'M', palavra: 'Mediador', definicao: 'Intermediário entre Deus e os homens, Cristo (1 Timóteo 2:5).' },
  { letra: 'M', palavra: 'Melquisedeque', definicao: 'Rei e sacerdote, tipo de Cristo (Gênesis 14:18).' },
  { letra: 'M', palavra: 'Messias', definicao: 'Hebraico: Ungido, Cristo (João 1:41).' },
  { letra: 'M', palavra: 'Miguel', definicao: 'Arcanjo, príncipe de Israel (Daniel 10:13).' },
  { letra: 'M', palavra: 'Milagre', definicao: 'Ato sobrenatural de Deus (João 2:11).' },
  { letra: 'M', palavra: 'Misericórdia', definicao: 'Compaixão de Deus pelos pecadores (Efésios 2:4).' },
  { letra: 'M', palavra: 'Moisés', definicao: 'Libertador de Israel, mediador da lei (Êxodo 2-Deuteronômio 34).' },
  { letra: 'M', palavra: 'Mordomia', definicao: 'Administração fiel dos bens de Deus (1 Coríntios 4:2).' },
  { letra: 'M', palavra: 'Morte', definicao: 'Separação da vida; salário do pecado (Romanos 6:23).' },
  
  { letra: 'N', palavra: 'Naamã', definicao: 'General sírio curado da lepra (2 Reis 5).' },
  { letra: 'N', palavra: 'Nabal', definicao: 'Homem insensato, marido de Abigail (1 Samuel 25).' },
  { letra: 'N', palavra: 'Nabucodonosor', definicao: 'Rei de Babilônia que destruiu Jerusalém (2 Reis 25).' },
  { letra: 'N', palavra: 'Natã', definicao: 'Profeta que confrontou Davi (2 Samuel 12).' },
  { letra: 'N', palavra: 'Nazaré', definicao: 'Cidade onde Jesus cresceu (Lucas 2:39).' },
  { letra: 'N', palavra: 'Neemias', definicao: 'Copeiro que reconstruiu os muros de Jerusalém (Neemias 1-13).' },
  { letra: 'N', palavra: 'Nicodemos', definicao: 'Fariseu que visitou Jesus à noite (João 3).' },
  { letra: 'N', palavra: 'Nínive', definicao: 'Capital da Assíria, evangelizada por Jonas (Jonas 1:2).' },
  { letra: 'N', palavra: 'Noé', definicao: 'Homem justo salvo do dilúvio (Gênesis 6-9).' },
  { letra: 'N', palavra: 'Novo Nascimento', definicao: 'Regeneração espiritual (João 3:3).' },
  
  { letra: 'O', palavra: 'Obediência', definicao: 'Submissão à vontade de Deus (1 Samuel 15:22).' },
  { letra: 'O', palavra: 'Oferta', definicao: 'Dádiva apresentada a Deus (Levítico 1-7).' },
  { letra: 'O', palavra: 'Onésimo', definicao: 'Escravo fugitivo convertido por Paulo (Filemom).' },
  { letra: 'O', palavra: 'Oração', definicao: 'Comunicação com Deus (1 Tessalonicenses 5:17).' },
  { letra: 'O', palavra: 'Oráculo', definicao: 'Mensagem divina, profecia (Romanos 3:2).' },
  
  { letra: 'P', palavra: 'Páscoa', definicao: 'Festa da libertação do Egito (Êxodo 12).' },
  { letra: 'P', palavra: 'Pastor', definicao: 'Líder espiritual; título de Cristo (João 10:11).' },
  { letra: 'P', palavra: 'Paulo', definicao: 'Apóstolo aos gentios (Atos 9; Romanos-Filemom).' },
  { letra: 'P', palavra: 'Paz', definicao: 'Tranquilidade de espírito vinda de Deus (João 14:27).' },
  { letra: 'P', palavra: 'Pecado', definicao: 'Transgressão da lei de Deus (1 João 3:4).' },
  { letra: 'P', palavra: 'Pedro', definicao: 'Apóstolo, líder da igreja primitiva (Mateus 16:18).' },
  { letra: 'P', palavra: 'Pentecostes', definicao: 'Festa quando o Espírito Santo desceu (Atos 2).' },
  { letra: 'P', palavra: 'Perdão', definicao: 'Remissão de pecados (Efésios 1:7).' },
  { letra: 'P', palavra: 'Pérsia', definicao: 'Império que sucedeu Babilônia (Daniel 5:28).' },
  { letra: 'P', palavra: 'Pilatos', definicao: 'Governador romano que condenou Jesus (Mateus 27).' },
  { letra: 'P', palavra: 'Primogênito', definicao: 'Primeiro filho; título de Cristo (Colossenses 1:15).' },
  { letra: 'P', palavra: 'Profeta', definicao: 'Porta-voz de Deus (Deuteronômio 18:18).' },
  { letra: 'P', palavra: 'Propiciação', definicao: 'Sacrifício que satisfaz a justiça divina (1 João 2:2).' },
  { letra: 'P', palavra: 'Provação', definicao: 'Teste da fé (Tiago 1:2).' },
  { letra: 'P', palavra: 'Provérbios', definicao: 'Livro de sabedoria de Salomão.' },
  { letra: 'P', palavra: 'Purificação', definicao: 'Limpeza espiritual (1 João 1:7).' },
  
  { letra: 'R', palavra: 'Raabe', definicao: 'Prostituta de Jericó que ajudou os espias (Josué 2).' },
  { letra: 'R', palavra: 'Raquel', definicao: 'Esposa amada de Jacó (Gênesis 29).' },
  { letra: 'R', palavra: 'Rebeca', definicao: 'Esposa de Isaque (Gênesis 24).' },
  { letra: 'R', palavra: 'Redenção', definicao: 'Libertação através do pagamento de resgate (Efésios 1:7).' },
  { letra: 'R', palavra: 'Regeneração', definicao: 'Novo nascimento espiritual (Tito 3:5).' },
  { letra: 'R', palavra: 'Reino de Deus', definicao: 'Governo de Deus nos corações (Lucas 17:21).' },
  { letra: 'R', palavra: 'Remanescente', definicao: 'Povo fiel que permanece (Romanos 11:5).' },
  { letra: 'R', palavra: 'Remissão', definicao: 'Perdão de pecados (Mateus 26:28).' },
  { letra: 'R', palavra: 'Ressurreição', definicao: 'Retorno à vida (João 11:25).' },
  { letra: 'R', palavra: 'Revelação', definicao: 'Manifestação da verdade divina; último livro da Bíblia.' },
  { letra: 'R', palavra: 'Romanos', definicao: 'Carta de Paulo sobre justificação pela fé.' },
  { letra: 'R', palavra: 'Rute', definicao: 'Moabita fiel, ancestral de Davi (Rute 1-4).' },
  
  { letra: 'S', palavra: 'Sábado', definicao: 'Sétimo dia, dia de descanso (Êxodo 20:8-11).' },
  { letra: 'S', palavra: 'Sabedoria', definicao: 'Conhecimento aplicado segundo Deus (Provérbios 9:10).' },
  { letra: 'S', palavra: 'Sacerdote', definicao: 'Mediador entre Deus e o povo (Hebreus 5:1).' },
  { letra: 'S', palavra: 'Sacrifício', definicao: 'Oferta a Deus, especialmente de Cristo (Hebreus 9:26).' },
  { letra: 'S', palavra: 'Saduceus', definicao: 'Seita judaica que negava a ressurreição (Mateus 22:23).' },
  { letra: 'S', palavra: 'Salmos', definicao: 'Livro de cânticos e orações.' },
  { letra: 'S', palavra: 'Salomão', definicao: 'Rei sábio, filho de Davi (1 Reis 1-11).' },
  { letra: 'S', palavra: 'Salvação', definicao: 'Libertação do pecado através de Cristo (Efésios 2:8).' },
  { letra: 'S', palavra: 'Salvador', definicao: 'Título de Jesus Cristo (Lucas 2:11).' },
  { letra: 'S', palavra: 'Samaria', definicao: 'Capital do reino do norte de Israel (1 Reis 16:24).' },
  { letra: 'S', palavra: 'Samuel', definicao: 'Último juiz e profeta de Israel (1 Samuel 1-25).' },
  { letra: 'S', palavra: 'Sansão', definicao: 'Juiz de força sobre-humana (Juízes 13-16).' },
  { letra: 'S', palavra: 'Santa Ceia', definicao: 'Sacramento instituído por Cristo (1 Coríntios 11:23-26).' },
  { letra: 'S', palavra: 'Santificação', definicao: 'Processo de tornar-se santo (1 Tessalonicenses 4:3).' },
  { letra: 'S', palavra: 'Santo', definicao: 'Separado para Deus, sem pecado (1 Pedro 1:16).' },
  { letra: 'S', palavra: 'Sara', definicao: 'Esposa de Abraão, mãe de Isaque (Gênesis 17:15).' },
  { letra: 'S', palavra: 'Satanás', definicao: 'Adversário, o diabo (1 Pedro 5:8).' },
  { letra: 'S', palavra: 'Saul', definicao: 'Primeiro rei de Israel (1 Samuel 9-31).' },
  { letra: 'S', palavra: 'Seol', definicao: 'Hebraico: sepultura, mundo dos mortos (Salmos 16:10).' },
  { letra: 'S', palavra: 'Serpente', definicao: 'Símbolo de Satanás (Gênesis 3:1; Apocalipse 12:9).' },
  { letra: 'S', palavra: 'Servo', definicao: 'Aquele que serve; título de Cristo (Filipenses 2:7).' },
  { letra: 'S', palavra: 'Sião', definicao: 'Monte em Jerusalém; símbolo do povo de Deus (Salmos 48:2).' },
  { letra: 'S', palavra: 'Silas', definicao: 'Companheiro de Paulo (Atos 15:22).' },
  { letra: 'S', palavra: 'Sinagoga', definicao: 'Local de reunião e culto judaico (Lucas 4:16).' },
  { letra: 'S', palavra: 'Sinai', definicao: 'Monte onde Moisés recebeu a lei (Êxodo 19).' },
  { letra: 'S', palavra: 'Sodoma', definicao: 'Cidade destruída por sua maldade (Gênesis 19).' },
  { letra: 'S', palavra: 'Sofrimento', definicao: 'Dor física ou espiritual (1 Pedro 4:12).' },
  
  { letra: 'T', palavra: 'Tabernáculo', definicao: 'Santuário móvel no deserto (Êxodo 25-40).' },
  { letra: 'T', palavra: 'Tábua da Lei', definicao: 'Pedras com os Dez Mandamentos (Êxodo 31:18).' },
  { letra: 'T', palavra: 'Templo', definicao: 'Casa de Deus construída por Salomão (1 Reis 6).' },
  { letra: 'T', palavra: 'Tentação', definicao: 'Provação para pecar (Mateus 4:1).' },
  { letra: 'T', palavra: 'Testemunho', definicao: 'Declaração da verdade; lei de Deus (Salmos 19:7).' },
  { letra: 'T', palavra: 'Timóteo', definicao: 'Jovem pastor, discípulo de Paulo (Atos 16:1).' },
  { letra: 'T', palavra: 'Tito', definicao: 'Companheiro de Paulo, pastor em Creta (Tito 1:5).' },
  { letra: 'T', palavra: 'Tomé', definicao: 'Apóstolo que duvidou da ressurreição (João 20:24).' },
  { letra: 'T', palavra: 'Transfiguração', definicao: 'Transformação gloriosa de Jesus (Mateus 17:1-8).' },
  { letra: 'T', palavra: 'Trindade', definicao: 'Deus em três pessoas: Pai, Filho e Espírito Santo (Mateus 28:19).' },
  { letra: 'T', palavra: 'Trono', definicao: 'Assento do rei; símbolo do governo de Deus (Apocalipse 4:2).' },
  
  { letra: 'U', palavra: 'Unção', definicao: 'Derramamento de óleo; consagração (1 Samuel 16:13).' },
  { letra: 'U', palavra: 'Ungido', definicao: 'Consagrado com óleo; Messias (1 Samuel 2:10).' },
  { letra: 'U', palavra: 'Urias', definicao: 'Marido de Bate-Seba, morto por ordem de Davi (2 Samuel 11).' },
  { letra: 'U', palavra: 'Urim e Tumim', definicao: 'Objetos usados para conhecer a vontade de Deus (Êxodo 28:30).' },
  
  { letra: 'V', palavra: 'Velho Testamento', definicao: 'Primeira parte da Bíblia, antes de Cristo.' },
  { letra: 'V', palavra: 'Verbo', definicao: 'Palavra; título de Cristo (João 1:1).' },
  { letra: 'V', palavra: 'Verdade', definicao: 'Realidade conforme Deus; Cristo é a verdade (João 14:6).' },
  { letra: 'V', palavra: 'Vida Eterna', definicao: 'Vida sem fim com Deus (João 3:16).' },
  { letra: 'V', palavra: 'Vinha', definicao: 'Símbolo de Israel e da igreja (João 15:1).' },
  { letra: 'V', palavra: 'Vinho', definicao: 'Bebida fermentada; símbolo do sangue de Cristo (Mateus 26:27-29).' },
  { letra: 'V', palavra: 'Visão', definicao: 'Revelação divina em forma visual (Atos 10:3).' },
  { letra: 'V', palavra: 'Voto', definicao: 'Promessa solene a Deus (Números 30:2).' },
  
  { letra: 'Z', palavra: 'Zacarias', definicao: 'Profeta pós-exílico; pai de João Batista (Zacarias 1:1; Lucas 1:5).' },
  { letra: 'Z', palavra: 'Zaqueu', definicao: 'Cobrador de impostos convertido (Lucas 19:1-10).' },
  { letra: 'Z', palavra: 'Zelote', definicao: 'Membro de partido nacionalista judaico (Lucas 6:15).' },
  { letra: 'Z', palavra: 'Zorobabel', definicao: 'Líder que reconstruiu o templo (Esdras 3:2).' }
]

export function DicionarioBiblico() {
  const [busca, setBusca] = useState('')
  const [letraSelecionada, setLetraSelecionada] = useState('A')

  // Filtrar palavras por busca ou letra
  const palavrasFiltradas = useMemo(() => {
    if (busca.trim()) {
      return dicionario.filter(item =>
        item.palavra.toLowerCase().includes(busca.toLowerCase()) ||
        item.definicao.toLowerCase().includes(busca.toLowerCase())
      )
    }
    return dicionario.filter(item => item.letra === letraSelecionada)
  }, [busca, letraSelecionada])

  // Obter letras únicas
  const letras = useMemo(() => {
    const letrasUnicas = [...new Set(dicionario.map(item => item.letra))]
    return letrasUnicas.sort()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="mx-auto mb-6 w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-indigo-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Dicionário Bíblico
          </h1>
          <p className="text-xl text-gray-600">
            Significados e definições de termos bíblicos
          </p>
        </motion.div>

        {/* Barra de Pesquisa */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Pesquisar palavra ou definição..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10 text-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Alfabeto (só mostra se não houver busca) */}
        {!busca.trim() && (
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            {letras.map(letra => (
              <button
                key={letra}
                onClick={() => setLetraSelecionada(letra)}
                className={`w-12 h-12 rounded-full font-bold text-lg transition-all duration-300 ${
                  letraSelecionada === letra
                    ? 'bg-indigo-600 text-white shadow-lg scale-110'
                    : 'bg-white text-gray-700 hover:bg-indigo-100'
                }`}
              >
                {letra}
              </button>
            ))}
          </div>
        )}

        {/* Lista de Palavras */}
        <div className="space-y-4">
          {palavrasFiltradas.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-gray-500">
                Nenhuma palavra encontrada
              </CardContent>
            </Card>
          ) : (
            palavrasFiltradas.map((item, index) => (
              <motion.div
                key={`${item.letra}-${item.palavra}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-indigo-600">
                          {item.letra}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {item.palavra}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {item.definicao}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        {/* Contador */}
        {!busca.trim() && (
          <div className="mt-8 text-center text-gray-500">
            {palavrasFiltradas.length} palavra{palavrasFiltradas.length !== 1 ? 's' : ''} encontrada{palavrasFiltradas.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  )
}

