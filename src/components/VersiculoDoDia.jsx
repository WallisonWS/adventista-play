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
  },
  {
    texto: "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.",
    referencia: "Mateus 11:28",
    tema: "Descanso"
  },
  {
    texto: "Mas buscai primeiro o reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas.",
    referencia: "Mateus 6:33",
    tema: "Prioridade"
  },
  {
    texto: "E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.",
    referencia: "Romanos 8:28",
    tema: "Propósito"
  },
  {
    texto: "Alegrai-vos sempre no Senhor; outra vez digo, alegrai-vos.",
    referencia: "Filipenses 4:4",
    tema: "Alegria"
  },
  {
    texto: "O amor é sofredor, é benigno; o amor não é invejoso; o amor não se vangloria, não se ensoberbece.",
    referencia: "1 Coríntios 13:4",
    tema: "Amor"
  },
  {
    texto: "Porque onde estiver o vosso tesouro, aí estará também o vosso coração.",
    referencia: "Mateus 6:21",
    tema: "Coração"
  },
  {
    texto: "No mundo tereis aflições, mas tende bom ânimo; eu venci o mundo.",
    referencia: "João 16:33",
    tema: "Vitória"
  },
  {
    texto: "Porque para Deus nada será impossível.",
    referencia: "Lucas 1:37",
    tema: "Fé"
  },
  {
    texto: "Portanto, se o Filho vos libertar, verdadeiramente sereis livres.",
    referencia: "João 8:36",
    tema: "Liberdade"
  },
  {
    texto: "Melhor é o pouco com o temor do Senhor, do que grandes tesouros onde há inquietação.",
    referencia: "Provérbios 15:16",
    tema: "Temor a Deus"
  },
  {
    texto: "Mas o fruto do Espírito é amor, alegria, paz, paciência, amabilidade, bondade, fidelidade, mansidão e domínio próprio.",
    referencia: "Gálatas 5:22-23",
    tema: "Fruto do Espírito"
  },
  {
    texto: "Lâmpada para os meus pés é a tua palavra e luz para o meu caminho.",
    referencia: "Salmos 119:105",
    tema: "Palavra de Deus"
  },
  {
    texto: "O Senhor é a minha luz e a minha salvação; a quem temerei? O Senhor é a força da minha vida; de quem me recearei?",
    referencia: "Salmos 27:1",
    tema: "Segurança"
  },
  {
    texto: "Ora, a fé é a certeza daquilo que esperamos e a prova das coisas que não vemos.",
    referencia: "Hebreus 11:1",
    tema: "Fé"
  },
  {
    texto: "Não se aparte da tua boca o livro desta lei; antes, medita nele dia e noite, para que tenhas cuidado de fazer conforme a tudo quanto nele está escrito; porque então farás prosperar o teu caminho, e então prudentemente te conduzirás.",
    referencia: "Josué 1:8",
    tema: "Meditação"
  },
  {
    texto: "Mas os que esperam no Senhor renovarão as suas forças; subirão com asas como águias; correrão e não se cansarão; caminharão e não se fatigarão.",
    referencia: "Isaías 40:31",
    tema: "Esperança"
  },
  {
    texto: "Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais.",
    referencia: "Jeremias 29:11",
    tema: "Planos de Deus"
  },
  {
    texto: "Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar os pecados e nos purificar de toda injustiça.",
    referencia: "1 João 1:9",
    tema: "Perdão"
  },
  {
    texto: "Portanto, ide, fazei discípulos de todas as nações, batizando-os em nome do Pai, e do Filho, e do Espírito Santo.",
    referencia: "Mateus 28:19",
    tema: "Missão"
  },
  {
    texto: "E o segundo, semelhante a este, é: Amarás o teu próximo como a ti mesmo.",
    referencia: "Mateus 22:39",
    tema: "Próximo"
  },
  {
    texto: "Porque onde estiverem dois ou três reunidos em meu nome, aí estou eu no meio deles.",
    referencia: "Mateus 18:20",
    tema: "Comunhão"
  },
  {
    texto: "O ladrão não vem senão para roubar, matar e destruir; eu vim para que tenham vida e a tenham em abundância.",
    referencia: "João 10:10",
    tema: "Vida Abundante"
  },
  {
    texto: "Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.",
    referencia: "Salmos 91:1",
    tema: "Proteção"
  },
  {
    texto: "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.",
    referencia: "Salmos 46:1",
    tema: "Refúgio"
  },
  {
    texto: "Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam.",
    referencia: "Salmos 23:4",
    tema: "Consolo"
  },
  {
    texto: "Regozijai-vos na esperança, sede pacientes na tribulação, perseverai na oração.",
    referencia: "Romanos 12:12",
    tema: "Perseverança"
  },
  {
    texto: "Sede, pois, praticantes da palavra e não somente ouvintes, enganando-vos a vós mesmos.",
    referencia: "Tiago 1:22",
    tema: "Prática"
  },
  {
    texto: "Sujeitai-vos, pois, a Deus, resisti ao diabo, e ele fugirá de vós.",
    referencia: "Tiago 4:7",
    tema: "Resistência"
  },
  {
    texto: "Humilhai-vos, portanto, sob a poderosa mão de Deus, para que ele, a seu tempo, vos exalte.",
    referencia: "1 Pedro 5:6",
    tema: "Humildade"
  },
  {
    texto: "Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.",
    referencia: "1 Pedro 5:7",
    tema: "Ansiedade"
  },
  {
    texto: "O temor do Senhor é o princípio do conhecimento; os loucos desprezam a sabedoria e a instrução.",
    referencia: "Provérbios 1:7",
    tema: "Sabedoria"
  },
  {
    texto: "O coração alegre é bom remédio, mas o espírito abatido seca os ossos.",
    referencia: "Provérbios 17:22",
    tema: "Saúde Mental"
  },
  {
    texto: "Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.",
    referencia: "1 Tessalonicenses 5:18",
    tema: "Gratidão"
  },
  {
    texto: "Sede sóbrios e vigilantes. O diabo, vosso adversário, anda em derredor, como leão que ruge procurando alguém para devorar.",
    referencia: "1 Pedro 5:8",
    tema: "Vigilância"
  },
  {
    texto: "Aquele que é de Deus ouve as palavras de Deus; por isso, vós não as ouvis, porque não sois de Deus.",
    referencia: "João 8:47",
    tema: "Ouvir a Deus"
  },
  {
    texto: "Se permanecerdes em mim, e as minhas palavras permanecerem em vós, pedireis o que quiserdes, e vos será feito.",
    referencia: "João 15:7",
    tema: "Permanecer em Cristo"
  },
  {
    texto: "Nisto conhecemos o amor: que Cristo deu a sua vida por nós; e devemos dar a nossa vida pelos irmãos.",
    referencia: "1 João 3:16",
    tema: "Sacrifício"
  },
  {
    texto: "E esta é a confiança que temos nele: que, se pedirmos alguma coisa, segundo a sua vontade, ele nos ouve.",
    referencia: "1 João 5:14",
    tema: "Oração"
  },
  {
    texto: "Mas o justo viverá pela fé.",
    referencia: "Romanos 1:17",
    tema: "Justiça"
  },
  {
    texto: "Não vos conformeis com este século, mas transformai-vos pela renovação da vossa mente, para que experimenteis qual seja a boa, agradável e perfeita vontade de Deus.",
    referencia: "Romanos 12:2",
    tema: "Transformação"
  },
  {
    texto: "Pois todos pecaram e estão destituídos da glória de Deus.",
    referencia: "Romanos 3:23",
    tema: "Pecado"
  },
  {
    texto: "Porque o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna em Cristo Jesus, nosso Senhor.",
    referencia: "Romanos 6:23",
    tema: "Salvação"
  },
  {
    texto: "Portanto, agora, nenhuma condenação há para os que estão em Cristo Jesus.",
    referencia: "Romanos 8:1",
    tema: "Condenação"
  },
  {
    texto: "Quem nos separará do amor de Cristo? Será a tribulação, ou a angústia, ou a perseguição, ou a fome, ou a nudez, ou o perigo, ou a espada?",
    referencia: "Romanos 8:35",
    tema: "Inseparável"
  },
  {
    texto: "Tudo tem o seu tempo determinado, e há tempo para todo propósito debaixo do céu.",
    referencia: "Eclesiastes 3:1",
    tema: "Tempo"
  },
  {
    texto: "Lembra-te do teu Criador nos dias da tua mocidade, antes que venham os maus dias, e cheguem os anos dos quais venhas a dizer: Não tenho neles contentamento.",
    referencia: "Eclesiastes 12:1",
    tema: "Juventude"
  },
  {
    texto: "O meu Deus, segundo as suas riquezas, suprirá todas as vossas necessidades em glória, por Cristo Jesus.",
    referencia: "Filipenses 4:19",
    tema: "Provisão"
  },
  {
    texto: "Combati o bom combate, completei a carreira, guardei a fé.",
    referencia: "2 Timóteo 4:7",
    tema: "Fidelidade"
  },
  {
    texto: "Porque Deus não nos deu o espírito de temor, mas de fortaleza, e de amor, e de moderação.",
    referencia: "2 Timóteo 1:7",
    tema: "Poder"
  },
  {
    texto: "Alegrai-vos na esperança, sede pacientes na tribulação, perseverai na oração.",
    referencia: "Romanos 12:12",
    tema: "Esperança"
  },
  {
    texto: "Não vos inquieteis com nada; antes, em tudo, pela oração e pela súplica, com ações de graças, sejam as vossas petições conhecidas diante de Deus.",
    referencia: "Filipenses 4:6",
    tema: "Paz"
  },
  {
    texto: "A vós outros, que sois atribulados, descanso conosco, quando do céu se manifestar o Senhor Jesus com os anjos do seu poder, em chama de fogo.",
    referencia: "2 Tessalonicenses 1:7",
    tema: "Segunda Vinda"
  },
  {
    texto: "Sede uns para com os outros benignos, misericordiosos, perdoando-vos uns aos outros, como também Deus vos perdoou em Cristo.",
    referencia: "Efésios 4:32",
    tema: "Perdão"
  },
  {
    texto: "Filhinhos, não amemos de palavra nem de língua, mas por obra e em verdade.",
    referencia: "1 João 3:18",
    tema: "Ação"
  },
  {
    texto: "E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos sentimentos em Cristo Jesus.",
    referencia: "Filipenses 4:7",
    tema: "Paz"
  },
  {
    texto: "Se, porém, não perdoardes aos homens as suas ofensas, também vosso Pai vos não perdoará as vossas ofensas.",
    referencia: "Mateus 6:15",
    tema: "Perdão"
  },
  {
    texto: "Porque, onde estiverem dois ou três reunidos em meu nome, aí estou eu no meio deles.",
    referencia: "Mateus 18:20",
    tema: "Presença de Deus"
  },
  {
    texto: "Eu sou o caminho, a verdade e a vida; ninguém vem ao Pai, senão por mim.",
    referencia: "João 14:6",
    tema: "Jesus"
  },
  {
    texto: "Aquele que tem os meus mandamentos e os guarda, esse é o que me ama; e aquele que me ama será amado de meu Pai, e eu o amarei e me manifestarei a ele.",
    referencia: "João 14:21",
    tema: "Obediência"
  },
  {
    texto: "Pois o Senhor é bom; o seu amor dura para sempre, e a sua fidelidade não tem fim.",
    referencia: "Salmos 100:5",
    tema: "Bondade de Deus"
  },
  {
    texto: "Provai e vede que o Senhor é bom; bem-aventurado o homem que nele se refugia.",
    referencia: "Salmos 34:8",
    tema: "Bondade de Deus"
  },
  {
    texto: "O Senhor te abençoe e te guarde; o Senhor faça resplandecer o seu rosto sobre ti e te conceda graça; o Senhor volte para ti o seu rosto e te dê paz.",
    referencia: "Números 6:24-26",
    tema: "Bênção"
  },
  {
    texto: "O Senhor é compassivo e misericordioso, mui paciente e cheio de amor.",
    referencia: "Salmos 103:8",
    tema: "Misericórdia"
  },
  {
    texto: "O Senhor está perto de todos os que o invocam, de todos os que o invocam com sinceridade.",
    referencia: "Salmos 145:18",
    tema: "Proximidade"
  },
  {
    texto: "Cria em mim, ó Deus, um coração puro e renova dentro de mim um espírito inabalável.",
    referencia: "Salmos 51:10",
    tema: "Coração Puro"
  },
  {
    texto: "Não se turbe o vosso coração; credes em Deus, crede também em mim.",
    referencia: "João 14:1",
    tema: "Paz"
  },
  {
    texto: "E eu vos darei um novo coração e porei dentro de vós um espírito novo; tirarei de vós o coração de pedra e vos darei um coração de carne.",
    referencia: "Ezequiel 36:26",
    tema: "Novo Coração"
  },
  {
    texto: "O meu mandamento é este: que vos ameis uns aos outros, assim como eu vos amei.",
    referencia: "João 15:12",
    tema: "Amor Fraternal"
  },
  {
    texto: "Pois todos nós, que fomos batizados em Cristo Jesus, fomos batizados na sua morte.",
    referencia: "Romanos 6:3",
    tema: "Batismo"
  },
  {
    texto: "Assim, se alguém está em Cristo, nova criatura é; as coisas antigas já passaram; eis que tudo se fez novo.",
    referencia: "2 Coríntios 5:17",
    tema: "Nova Criação"
  },
  {
    texto: "Porque o reino de Deus não é comida nem bebida, mas justiça, e paz, e alegria no Espírito Santo.",
    referencia: "Romanos 14:17",
    tema: "Reino de Deus"
  },
  {
    texto: "Portanto, quer comais, quer bebais ou façais outra qualquer coisa, fazei tudo para a glória de Deus.",
    referencia: "1 Coríntios 10:31",
    tema: "Glória de Deus"
  },
  {
    texto: "Mas recebereis poder, ao descer sobre vós o Espírito Santo, e sereis minhas testemunhas tanto em Jerusalém como em toda a Judeia e Samaria e até aos confins da terra.",
    referencia: "Atos 1:8",
    tema: "Testemunho"
  },
  {
    texto: "O Espírito do Senhor está sobre mim, porque me ungiu para evangelizar os pobres; enviou-me para proclamar libertação aos cativos e restauração da vista aos cegos, para pôr em liberdade os oprimidos.",
    referencia: "Lucas 4:18",
    tema: "Missão de Jesus"
  },
  {
    texto: "Mas Deus prova o seu próprio amor para conosco pelo fato de ter Cristo morrido por nós, sendo nós ainda pecadores.",
    referencia: "Romanos 5:8",
    tema: "Amor Incondicional"
  },
  {
    texto: "Porque a palavra de Deus é viva e eficaz, e mais penetrante do que qualquer espada de dois gumes, e penetra até à divisão da alma e do espírito, e das juntas e medulas, e é apta para discernir os pensamentos e intenções do coração.",
    referencia: "Hebreus 4:12",
    tema: "Poder da Palavra"
  },
  {
    texto: "Não vos deixeis vencer do mal, mas vencei o mal com o bem.",
    referencia: "Romanos 12:21",
    tema: "Bem vs Mal"
  },
  {
    texto: "O Senhor é bom, um refúgio em tempos de angústia. Ele protege os que nele confiam.",
    referencia: "Naum 1:7",
    tema: "Refúgio"
  },
  {
    texto: "Aquele que é a luz verdadeira, que ilumina a todo homem, estava no mundo.",
    referencia: "João 1:9",
    tema: "Luz"
  },
  {
    texto: "Eu sou o pão da vida; aquele que vem a mim não terá fome; e quem crê em mim nunca terá sede.",
    referencia: "João 6:35",
    tema: "Pão da Vida"
  },
  {
    texto: "Eis que estou à porta e bato; se alguém ouvir a minha voz e abrir a porta, entrarei em sua casa e cearei com ele, e ele, comigo.",
    referencia: "Apocalipse 3:20",
    tema: "Convite"
  },
  {
    texto: "O Espírito e a noiva dizem: Vem! Aquele que ouve diga: Vem! Aquele que tem sede venha, e quem quiser receba de graça a água da vida.",
    referencia: "Apocalipse 22:17",
    tema: "Água da Vida"
  },
  {
    texto: "Aquele que testifica estas coisas diz: Certamente, venho sem demora. Amém! Vem, Senhor Jesus!",
    referencia: "Apocalipse 22:20",
    tema: "Vinda de Jesus"
  },
  {
    texto: "E lhes enxugará dos olhos toda lágrima, e a morte já não existirá, já não haverá luto, nem pranto, nem dor, porque as primeiras coisas passaram.",
    referencia: "Apocalipse 21:4",
    tema: "Nova Terra"
  },
  {
    texto: "Porque dele, e por meio dele, e para ele são todas as coisas. A ele, pois, a glória eternamente. Amém!",
    referencia: "Romanos 11:36",
    tema: "Glória"
  },
  {
    texto: "Não te deixes vencer do mal, mas vence o mal com o bem.",
    referencia: "Romanos 12:21",
    tema: "Vitória"
  },
  {
    texto: "Tudo o que fizerdes, fazei-o de todo o coração, como ao Senhor e não aos homens.",
    referencia: "Colossenses 3:23",
    tema: "Trabalho"
  },
  {
    texto: "Alegrai-vos na esperança, sede pacientes na tribulação, perseverai na oração.",
    referencia: "Romanos 12:12",
    tema: "Perseverança"
  },
  {
    texto: "O Senhor é a minha força e o meu escudo; nele o meu coração confia, e dele recebo ajuda. Meu coração exulta de alegria, e com o meu cântico lhe darei graças.",
    referencia: "Salmos 28:7",
    tema: "Gratidão"
  },
  {
    texto: "Instrui o menino no caminho em que deve andar, e, até quando envelhecer, não se desviará dele.",
    referencia: "Provérbios 22:6",
    tema: "Educação"
  },
  {
    texto: "Ouve, Israel, o Senhor, nosso Deus, é o único Senhor. Amarás, pois, o Senhor, teu Deus, de todo o teu coração, e de toda a tua alma, e de todas as tuas forças.",
    referencia: "Deuteronômio 6:4-5",
    tema: "Amor a Deus"
  },
  {
    texto: "Não te deixes vencer do mal, mas vence o mal com o bem.",
    referencia: "Romanos 12:21",
    tema: "Vitória"
  },
  {
    texto: "Portanto, se o Filho vos libertar, verdadeiramente sereis livres.",
    referencia: "João 8:36",
    tema: "Liberdade"
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
    texto: "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento. Reconhece-O em todos os teus caminhos, e Ele endireitará as tuas veredas.",
    referencia: "Provérbios 3:5-6",
    tema: "Confiança"
  },
  {
    texto: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
    referencia: "João 3:16",
    tema: "Amor de Deus"
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
  },
  {
    texto: "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.",
    referencia: "Mateus 11:28",
    tema: "Descanso"
  },
  {
    texto: "Mas buscai primeiro o reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas.",
    referencia: "Mateus 6:33",
    tema: "Prioridade"
  },
  {
    texto: "E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.",
    referencia: "Romanos 8:28",
    tema: "Propósito"
  },
  {
    texto: "Alegrai-vos sempre no Senhor; outra vez digo, alegrai-vos.",
    referencia: "Filipenses 4:4",
    tema: "Alegria"
  },
  {
    texto: "O amor é sofredor, é benigno; o amor não é invejoso; o amor não se vangloria, não se ensoberbece.",
    referencia: "1 Coríntios 13:4",
    tema: "Amor"
  },
  {
    texto: "Porque onde estiver o vosso tesouro, aí estará também o vosso coração.",
    referencia: "Mateus 6:21",
    tema: "Coração"
  },
  {
    texto: "No mundo tereis aflições, mas tende bom ânimo; eu venci o mundo.",
    referencia: "João 16:33",
    tema: "Vitória"
  },
  {
    texto: "Porque para Deus nada será impossível.",
    referencia: "Lucas 1:37",
    tema: "Fé"
  },
  {
    texto: "Portanto, se o Filho vos libertar, verdadeiramente sereis livres.",
    referencia: "João 8:36",
    tema: "Liberdade"
  },
  {
    texto: "Melhor é o pouco com o temor do Senhor, do que grandes tesouros onde há inquietação.",
    referencia: "Provérbios 15:16",
    tema: "Temor a Deus"
  },
  {
    texto: "Mas o fruto do Espírito é amor, alegria, paz, paciência, amabilidade, bondade, fidelidade, mansidão e domínio próprio.",
    referencia: "Gálatas 5:22-23",
    tema: "Fruto do Espírito"
  },
  {
    texto: "Lâmpada para os meus pés é a tua palavra e luz para o meu caminho.",
    referencia: "Salmos 119:105",
    tema: "Palavra de Deus"
  },
  {
    texto: "O Senhor é a minha luz e a minha salvação; a quem temerei? O Senhor é a força da minha vida; de quem me recearei?",
    referencia: "Salmos 27:1",
    tema: "Segurança"
  },
  {
    texto: "Ora, a fé é a certeza daquilo que esperamos e a prova das coisas que não vemos.",
    referencia: "Hebreus 11:1",
    tema: "Fé"
  },
  {
    texto: "Não se aparte da tua boca o livro desta lei; antes, medita nele dia e noite, para que tenhas cuidado de fazer conforme a tudo quanto nele está escrito; porque então farás prosperar o teu caminho, e então prudentemente te conduzirás.",
    referencia: "Josué 1:8",
    tema: "Meditação"
  },
  {
    texto: "Mas os que esperam no Senhor renovarão as suas forças; subirão com asas como águias; correrão e não se cansarão; caminharão e não se fatigarão.",
    referencia: "Isaías 40:31",
    tema: "Esperança"
  },
  {
    texto: "Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais.",
    referencia: "Jeremias 29:11",
    tema: "Planos de Deus"
  },
  {
    texto: "Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar os pecados e nos purificar de toda injustiça.",
    referencia: "1 João 1:9",
    tema: "Perdão"
  },
  {
    texto: "Portanto, ide, fazei discípulos de todas as nações, batizando-os em nome do Pai, e do Filho, e do Espírito Santo.",
    referencia: "Mateus 28:19",
    tema: "Missão"
  },
  {
    texto: "E o segundo, semelhante a este, é: Amarás o teu próximo como a ti mesmo.",
    referencia: "Mateus 22:39",
    tema: "Próximo"
  },
  {
    texto: "Porque onde estiverem dois ou três reunidos em meu nome, aí estou eu no meio deles.",
    referencia: "Mateus 18:20",
    tema: "Comunhão"
  },
  {
    texto: "O ladrão não vem senão para roubar, matar e destruir; eu vim para que tenham vida e a tenham em abundância.",
    referencia: "João 10:10",
    tema: "Vida Abundante"
  },
  {
    texto: "Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.",
    referencia: "Salmos 91:1",
    tema: "Proteção"
  },
  {
    texto: "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.",
    referencia: "Salmos 46:1",
    tema: "Refúgio"
  },
  {
    texto: "Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam.",
    referencia: "Salmos 23:4",
    tema: "Consolo"
  },
  {
    texto: "Regozijai-vos na esperança, sede pacientes na tribulação, perseverai na oração.",
    referencia: "Romanos 12:12",
    tema: "Perseverança"
  },
  {
    texto: "Sede, pois, praticantes da palavra e não somente ouvintes, enganando-vos a vós mesmos.",
    referencia: "Tiago 1:22",
    tema: "Prática"
  },
  {
    texto: "Sujeitai-vos, pois, a Deus, resisti ao diabo, e ele fugirá de vós.",
    referencia: "Tiago 4:7",
    tema: "Resistência"
  },
  {
    texto: "Humilhai-vos, portanto, sob a poderosa mão de Deus, para que ele, a seu tempo, vos exalte.",
    referencia: "1 Pedro 5:6",
    tema: "Humildade"
  },
  {
    texto: "Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.",
    referencia: "1 Pedro 5:7",
    tema: "Ansiedade"
  },
  {
    texto: "O temor do Senhor é o princípio do conhecimento; os loucos desprezam a sabedoria e a instrução.",
    referencia: "Provérbios 1:7",
    tema: "Sabedoria"
  },
  {
    texto: "O coração alegre é bom remédio, mas o espírito abatido seca os ossos.",
    referencia: "Provérbios 17:22",
    tema: "Saúde Mental"
  },
  {
    texto: "Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.",
    referencia: "1 Tessalonicenses 5:18",
    tema: "Gratidão"
  },
  {
    texto: "Sede sóbrios e vigilantes. O diabo, vosso adversário, anda em derredor, como leão que ruge procurando alguém para devorar.",
    referencia: "1 Pedro 5:8",
    tema: "Vigilância"
  },
  {
    texto: "Aquele que é de Deus ouve as palavras de Deus; por isso, vós não as ouvis, porque não sois de Deus.",
    referencia: "João 8:47",
    tema: "Ouvir a Deus"
  },
  {
    texto: "Se permanecerdes em mim, e as minhas palavras permanecerem em vós, pedireis o que quiserdes, e vos será feito.",
    referencia: "João 15:7",
    tema: "Permanecer em Cristo"
  },
  {
    texto: "Nisto conhecemos o amor: que Cristo deu a sua vida por nós; e devemos dar a nossa vida pelos irmãos.",
    referencia: "1 João 3:16",
    tema: "Sacrifício"
  },
  {
    texto: "E esta é a confiança que temos nele: que, se pedirmos alguma coisa, segundo a sua vontade, ele nos ouve.",
    referencia: "1 João 5:14",
    tema: "Oração"
  },
  {
    texto: "Mas o justo viverá pela fé.",
    referencia: "Romanos 1:17",
    tema: "Justiça"
  },
  {
    texto: "Não vos conformeis com este século, mas transformai-vos pela renovação da vossa mente, para que experimenteis qual seja a boa, agradável e perfeita vontade de Deus.",
    referencia: "Romanos 12:2",
    tema: "Transformação"
  },
  {
    texto: "Pois todos pecaram e estão destituídos da glória de Deus.",
    referencia: "Romanos 3:23",
    tema: "Pecado"
  },
  {
    texto: "Porque o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna em Cristo Jesus, nosso Senhor.",
    referencia: "Romanos 6:23",
    tema: "Salvação"
  },
  {
    texto: "Portanto, agora, nenhuma condenação há para os que estão em Cristo Jesus.",
    referencia: "Romanos 8:1",
    tema: "Condenação"
  },
  {
    texto: "Quem nos separará do amor de Cristo? Será a tribulação, ou a angústia, ou a perseguição, ou a fome, ou a nudez, ou o perigo, ou a espada?",
    referencia: "Romanos 8:35",
    tema: "Inseparável"
  },
  {
    texto: "Tudo tem o seu tempo determinado, e há tempo para todo propósito debaixo do céu.",
    referencia: "Eclesiastes 3:1",
    tema: "Tempo"
  },
  {
    texto: "Lembra-te do teu Criador nos dias da tua mocidade, antes que venham os maus dias, e cheguem os anos dos quais venhas a dizer: Não tenho neles contentamento.",
    referencia: "Eclesiastes 12:1",
    tema: "Juventude"
  },
  {
    texto: "O meu Deus, segundo as suas riquezas, suprirá todas as vossas necessidades em glória, por Cristo Jesus.",
    referencia: "Filipenses 4:19",
    tema: "Provisão"
  },
  {
    texto: "Combati o bom combate, completei a carreira, guardei a fé.",
    referencia: "2 Timóteo 4:7",
    tema: "Fidelidade"
  },
  {
    texto: "Porque Deus não nos deu o espírito de temor, mas de fortaleza, e de amor, e de moderação.",
    referencia: "2 Timóteo 1:7",
    tema: "Poder"
  },
  {
    texto: "Alegrai-vos na esperança, sede pacientes na tribulação, perseverai na oração.",
    referencia: "Romanos 12:12",
    tema: "Esperança"
  },
  {
    texto: "Não vos inquieteis com nada; antes, em tudo, pela oração e pela súplica, com ações de graças, sejam as vossas petições conhecidas diante de Deus.",
    referencia: "Filipenses 4:6",
    tema: "Paz"
  },
  {
    texto: "A vós outros, que sois atribulados, descanso conosco, quando do céu se manifestar o Senhor Jesus com os anjos do seu poder, em chama de fogo.",
    referencia: "2 Tessalonicenses 1:7",
    tema: "Segunda Vinda"
  },
  {
    texto: "Sede uns para com os outros benignos, misericordiosos, perdoando-vos uns aos outros, como também Deus vos perdoou em Cristo.",
    referencia: "Efésios 4:32",
    tema: "Perdão"
  },
  {
    texto: "Filhinhos, não amemos de palavra nem de língua, mas por obra e em verdade.",
    referencia: "1 João 3:18",
    tema: "Ação"
  },
  {
    texto: "E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos sentimentos em Cristo Jesus.",
    referencia: "Filipenses 4:7",
    tema: "Paz"
  },
  {
    texto: "Se, porém, não perdoardes aos homens as suas ofensas, também vosso Pai vos não perdoará as vossas ofensas.",
    referencia: "Mateus 6:15",
    tema: "Perdão"
  },
  {
    texto: "Porque, onde estiverem dois ou três reunidos em meu nome, aí estou eu no meio deles.",
    referencia: "Mateus 18:20",
    tema: "Presença de Deus"
  },
  {
    texto: "Eu sou o caminho, a verdade e a vida; ninguém vem ao Pai, senão por mim.",
    referencia: "João 14:6",
    tema: "Jesus"
  },
  {
    texto: "Aquele que tem os meus mandamentos e os guarda, esse é o que me ama; e aquele que me ama será amado de meu Pai, e eu o amarei e me manifestarei a ele.",
    referencia: "João 14:21",
    tema: "Obediência"
  },
  {
    texto: "Pois o Senhor é bom; o seu amor dura para sempre, e a sua fidelidade não tem fim.",
    referencia: "Salmos 100:5",
    tema: "Bondade de Deus"
  },
  {
    texto: "Provai e vede que o Senhor é bom; bem-aventurado o homem que nele se refugia.",
    referencia: "Salmos 34:8",
    tema: "Bondade de Deus"
  },
  {
    texto: "O Senhor te abençoe e te guarde; o Senhor faça resplandecer o seu rosto sobre ti e te conceda graça; o Senhor volte para ti o seu rosto e te dê paz.",
    referencia: "Números 6:24-26",
    tema: "Bênção"
  },
  {
    texto: "O Senhor é compassivo e misericordioso, mui paciente e cheio de amor.",
    referencia: "Salmos 103:8",
    tema: "Misericórdia"
  },
  {
    texto: "O Senhor está perto de todos os que o invocam, de todos os que o invocam com sinceridade.",
    referencia: "Salmos 145:18",
    tema: "Proximidade"
  },
  {
    texto: "Cria em mim, ó Deus, um coração puro e renova dentro de mim um espírito inabalável.",
    referencia: "Salmos 51:10",
    tema: "Coração Puro"
  },
  {
    texto: "Não se turbe o vosso coração; credes em Deus, crede também em mim.",
    referencia: "João 14:1",
    tema: "Paz"
  },
  {
    texto: "E eu vos darei um novo coração e porei dentro de vós um espírito novo; tirarei de vós o coração de pedra e vos darei um coração de carne.",
    referencia: "Ezequiel 36:26",
    tema: "Novo Coração"
  },
  {
    texto: "O meu mandamento é este: que vos ameis uns aos outros, assim como eu vos amei.",
    referencia: "João 15:12",
    tema: "Amor Fraternal"
  },
  {
    texto: "Pois todos nós, que fomos batizados em Cristo Jesus, fomos batizados na sua morte.",
    referencia: "Romanos 6:3",
    tema: "Batismo"
  },
  {
    texto: "Assim, se alguém está em Cristo, nova criatura é; as coisas antigas já passaram; eis que tudo se fez novo.",
    referencia: "2 Coríntios 5:17",
    tema: "Nova Criação"
  },
  {
    texto: "Porque o reino de Deus não é comida nem bebida, mas justiça, e paz, e alegria no Espírito Santo.",
    referencia: "Romanos 14:17",
    tema: "Reino de Deus"
  },
  {
    texto: "Portanto, quer comais, quer bebais ou façais outra qualquer coisa, fazei tudo para a glória de Deus.",
    referencia: "1 Coríntios 10:31",
    tema: "Glória de Deus"
  },
  {
    texto: "Mas recebereis poder, ao descer sobre vós o Espírito Santo, e sereis minhas testemunhas tanto em Jerusalém como em toda a Judeia e Samaria e até aos confins da terra.",
    referencia: "Atos 1:8",
    tema: "Testemunho"
  },
  {
    texto: "O Espírito do Senhor está sobre mim, porque me ungiu para evangelizar os pobres; enviou-me para proclamar libertação aos cativos e restauração da vista aos cegos, para pôr em liberdade os oprimidos.",
    referencia: "Lucas 4:18",
    tema: "Missão de Jesus"
  },
  {
    texto: "Mas Deus prova o seu próprio amor para conosco pelo fato de ter Cristo morrido por nós, sendo nós ainda pecadores.",
    referencia: "Romanos 5:8",
    tema: "Amor Incondicional"
  },
  {
    texto: "Porque a palavra de Deus é viva e eficaz, e mais penetrante do que qualquer espada de dois gumes, e penetra até à divisão da alma e do espírito, e das juntas e medulas, e é apta para discernir os pensamentos e intenções do coração.",
    referencia: "Hebreus 4:12",
    tema: "Poder da Palavra"
  },
  {
    texto: "Não vos deixeis vencer do mal, mas vencei o mal com o bem.",
    referencia: "Romanos 12:21",
    tema: "Bem vs Mal"
  },
  {
    texto: "O Senhor é bom, um refúgio em tempos de angústia. Ele protege os que nele confiam.",
    referencia: "Naum 1:7",
    tema: "Refúgio"
  },
  {
    texto: "Aquele que é a luz verdadeira, que ilumina a todo homem, estava no mundo.",
    referencia: "João 1:9",
    tema: "Luz"
  },
  {
    texto: "Eu sou o pão da vida; aquele que vem a mim não terá fome; e quem crê em mim nunca terá sede.",
    referencia: "João 6:35",
    tema: "Pão da Vida"
  },
  {
    texto: "Eis que estou à porta e bato; se alguém ouvir a minha voz e abrir a porta, entrarei em sua casa e cearei com ele, e ele, comigo.",
    referencia: "Apocalipse 3:20",
    tema: "Convite"
  },
  {
    texto: "O Espírito e a noiva dizem: Vem! Aquele que ouve diga: Vem! Aquele que tem sede venha, e quem quiser receba de graça a água da vida.",
    referencia: "Apocalipse 22:17",
    tema: "Água da Vida"
  },
  {
    texto: "Aquele que testifica estas coisas diz: Certamente, venho sem demora. Amém! Vem, Senhor Jesus!",
    referencia: "Apocalipse 22:20",
    tema: "Vinda de Jesus"
  },
  {
    texto: "E lhes enxugará dos olhos toda lágrima, e a morte já não existirá, já não haverá luto, nem pranto, nem dor, porque as primeiras coisas passaram.",
    referencia: "Apocalipse 21:4",
    tema: "Nova Terra"
  },
  {
    texto: "Porque dele, e por meio dele, e para ele são todas as coisas. A ele, pois, a glória eternamente. Amém!",
    referencia: "Romanos 11:36",
    tema: "Glória"
  },
  {
    texto: "Não te deixes vencer do mal, mas vence o mal com o bem.",
    referencia: "Romanos 12:21",
    tema: "Vitória"
  },
  {
    texto: "Tudo o que fizerdes, fazei-o de todo o coração, como ao Senhor e não aos homens.",
    referencia: "Colossenses 3:23",
    tema: "Trabalho"
  },
  {
    texto: "Alegrai-vos na esperança, sede pacientes na tribulação, perseverai na oração.",
    referencia: "Romanos 12:12",
    tema: "Perseverança"
  },
  {
    texto: "O Senhor é a minha força e o meu escudo; nele o meu coração confia, e dele recebo ajuda. Meu coração exulta de alegria, e com o meu cântico lhe darei graças.",
    referencia: "Salmos 28:7",
    tema: "Gratidão"
  },
  {
    texto: "Instrui o menino no caminho em que deve andar, e, até quando envelhecer, não se desviará dele.",
    referencia: "Provérbios 22:6",
    tema: "Educação"
  },
  {
    texto: "Ouve, Israel, o Senhor, nosso Deus, é o único Senhor. Amarás, pois, o Senhor, teu Deus, de todo o teu coração, e de toda a tua alma, e de todas as tuas forças.",
    referencia: "Deuteronômio 6:4-5",
    tema: "Amor a Deus"
  },
  {
    texto: "Não te deixes vencer do mal, mas vence o mal com o bem.",
    referencia: "Romanos 12:21",
    tema: "Vitória"
  },
  {
    texto: "Portanto, se o Filho vos libertar, verdadeiramente sereis livres.",
    referencia: "João 8:36",
    tema: "Liberdade"
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
    texto: "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento. Reconhece-O em todos os teus caminhos, e Ele endireitará as tuas veredas.",
    referencia: "Provérbios 3:5-6",
    tema: "Confiança"
  },
  {
    texto: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
    referencia: "João 3:16",
    tema: "Amor de Deus"
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
  },
  {
    texto: "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.",
    referencia: "Mateus 11:28",
    tema: "Descanso"
  },
  {
    texto: "Mas buscai primeiro o reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas.",
    referencia: "Mateus 6:33",
    tema: "Prioridade"
  },
  {
    texto: "E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.",
    referencia: "Romanos 8:28",
    tema: "Propósito"
  },
  {
    texto: "Alegrai-vos sempre no Senhor; outra vez digo, alegrai-vos.",
    referencia: "Filipenses 4:4",
    tema: "Alegria"
  },
  {
    texto: "O amor é sofredor, é benigno; o amor não é invejoso; o amor não se vangloria, não se ensoberbece.",
    referencia: "1 Coríntios 13:4",
    tema: "Amor"
  },
  {
    texto: "Porque onde estiver o vosso tesouro, aí estará também o vosso coração.",
    referencia: "Mateus 6:21",
    tema: "Coração"
  },
  {
    texto: "No mundo tereis aflições, mas tende bom ânimo; eu venci o mundo.",
    referencia: "João 16:33",
    tema: "Vitória"
  },
  {
    texto: "Porque para Deus nada será impossível.",
    referencia: "Lucas 1:37",
    tema: "Fé"
  },
  {
    texto: "Portanto, se o Filho vos libertar, verdadeiramente sereis livres.",
    referencia: "João 8:36",
    tema: "Liberdade"
  },
  {
    texto: "Melhor é o pouco com o temor do Senhor, do que grandes tesouros onde há inquietação.",
    referencia: "Provérbios 15:16",
    tema: "Temor a Deus"
  },
  {
    texto: "Mas o fruto do Espírito é amor, alegria, paz, paciência, amabilidade, bondade, fidelidade, mansidão e domínio próprio.",
    referencia: "Gálatas 5:22-23",
    tema: "Fruto do Espírito"
  },
  {
    texto: "Lâmpada para os meus pés é a tua palavra e luz para o meu caminho.",
    referencia: "Salmos 119:105",
    tema: "Palavra de Deus"
  },
  {
    texto: "O Senhor é a minha luz e a minha salvação; a quem temerei? O Senhor é a força da minha vida; de quem me recearei?",
    referencia: "Salmos 27:1",
    tema: "Segurança"
  },
  {
    texto: "Ora, a fé é a certeza daquilo que esperamos e a prova das coisas que não vemos.",
    referencia: "Hebreus 11:1",
    tema: "Fé"
  },
  {
    texto: "Não se aparte da tua boca o livro desta lei; antes, medita nele dia e noite, para que tenhas cuidado de fazer conforme a tudo quanto nele está escrito; porque então farás prosperar o teu caminho, e então prudentemente te conduzirás.",
    referencia: "Josué 1:8",
    tema: "Meditação"
  },
  {
    texto: "Mas os que esperam no Senhor renovarão as suas forças; subirão com asas como águias; correrão e não se cansarão; caminharão e não se fatigarão.",
    referencia: "Isaías 40:31",
    tema: "Esperança"
  },
  {
    texto: "Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais.",
    referencia: "Jeremias 29:11",
    tema: "Planos de Deus"
  },
  {
    texto: "Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar os pecados e nos purificar de toda injustiça.",
    referencia: "1 João 1:9",
    tema: "Perdão"
  },
  {
    texto: "Portanto, ide, fazei discípulos de todas as nações, batizando-os em nome do Pai, e do Filho, e do Espírito Santo.",
    referencia: "Mateus 28:19",
    tema: "Missão"
  },
  {
    texto: "E o segundo, semelhante a este, é: Amarás o teu próximo como a ti mesmo.",
    referencia: "Mateus 22:39",
    tema: "Próximo"
  },
  {
    texto: "Porque onde estiverem dois ou três reunidos em meu nome, aí estou eu no meio deles.",
    referencia: "Mateus 18:20",
    tema: "Comunhão"
  },
  {
    texto: "O ladrão não vem senão para roubar, matar e destruir; eu vim para que tenham vida e a tenham em abundância.",
    referencia: "João 10:10",
    tema: "Vida Abundante"
  },
  {
    texto: "Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.",
    referencia: "Salmos 91:1",
    tema: "Proteção"
  },
  {
    texto: "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.",
    referencia: "Salmos 46:1",
    tema: "Refúgio"
  },
  {
    texto: "Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam.",
    referencia: "Salmos 23:4",
    tema: "Consolo"
  },
  {
    texto: "Regozijai-vos na esperança, sede pacientes na tribulação, perseverai na oração.",
    referencia: "Romanos 12:12",
    tema: "Perseverança"
  },
  {
    texto: "Sede, pois, praticantes da palavra e não somente ouvintes, enganando-vos a vós mesmos.",
    referencia: "Tiago 1:22",
    tema: "Prática"
  },
  {
    texto: "Sujeitai-vos, pois, a Deus, resisti ao diabo, e ele fugirá de vós.",
    referencia: "Tiago 4:7",
    tema: "Resistência"
  },
  {
    texto: "Humilhai-vos, portanto, sob a poderosa mão de Deus, para que ele, a seu tempo, vos exalte.",
    referencia: "1 Pedro 5:6",
    tema: "Humildade"
  },
  {
    texto: "Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.",
    referencia: "1 Pedro 5:7",
    tema: "Ansiedade"
  },
  {
    texto: "O temor do Senhor é o princípio do conhecimento; os loucos desprezam a sabedoria e a instrução.",
    referencia: "Provérbios 1:7",
    tema: "Sabedoria"
  },
  {
    texto: "O coração alegre é bom remédio, mas o espírito abatido seca os ossos.",
    referencia: "Provérbios 17:22",
    tema: "Saúde Mental"
  },
  {
    texto: "Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.",
    referencia: "1 Tessalonicenses 5:18",
    tema: "Gratidão"
  },
  {
    texto: "Sede sóbrios e vigilantes. O diabo, vosso adversário, anda em derredor, como leão que ruge procurando alguém para devorar.",
    referencia: "1 Pedro 5:8",
    tema: "Vigilância"
  },
  {
    texto: "Aquele que é de Deus ouve as palavras de Deus; por isso, vós não as ouvis, porque não sois de Deus.",
    referencia: "João 8:47",
    tema: "Ouvir a Deus"
  },
  {
    texto: "Se permanecerdes em mim, e as minhas palavras permanecerem em vós, pedireis o que quiserdes, e vos será feito.",
    referencia: "João 15:7",
    tema: "Permanecer em Cristo"
  },
  {
    texto: "Nisto conhecemos o amor: que Cristo deu a sua vida por nós; e devemos dar a nossa vida pelos irmãos.",
    referencia: "1 João 3:16",
    tema: "Sacrifício"
  },
  {
    texto: "E esta é a confiança que temos nele: que, se pedirmos alguma coisa, segundo a sua vontade, ele nos ouve.",
    referencia: "1 João 5:14",
    tema: "Oração"
  },
  {
    texto: "Mas o justo viverá pela fé.",
    referencia: "Romanos 1:17",
    tema: "Justiça"
  },
  {
    texto: "Não vos conformeis com este século, mas transformai-vos pela renovação da vossa mente, para que experimenteis qual seja a boa, agradável e perfeita vontade de Deus.",
    referencia: "Romanos 12:2",
    tema: "Transformação"
  },
  {
    texto: "Pois todos pecaram e estão destituídos da glória de Deus.",
    referencia: "Romanos 3:23",
    tema: "Pecado"
  },
  {
    texto: "Porque o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna em Cristo Jesus, nosso Senhor.",
    referencia: "Romanos 6:23",
    tema: "Salvação"
  },
  {
    texto: "Portanto, agora, nenhuma condenação há para os que estão em Cristo Jesus.",
    referencia: "Romanos 8:1",
    tema: "Condenação"
  },
  {
    texto: "Quem nos separará do amor de Cristo? Será a tribulação, ou a angústia, ou a perseguição, ou a fome, ou a nudez, ou o perigo, ou a espada?",
    referencia: "Romanos 8:35",
    tema: "Inseparável"
  },
  {
    texto: "Tudo tem o seu tempo determinado, e há tempo para todo propósito debaixo do céu.",
    referencia: "Eclesiastes 3:1",
    tema: "Tempo"
  },
  {
    texto: "Lembra-te do teu Criador nos dias da tua mocidade, antes que venham os maus dias, e cheguem os anos dos quais venhas a dizer: Não tenho neles contentamento.",
    referencia: "Eclesiastes 12:1",
    tema: "Juventude"
  },
  {
    texto: "O meu Deus, segundo as suas riquezas, suprirá todas as vossas necessidades em glória, por Cristo Jesus.",
    referencia: "Filipenses 4:19",
    tema: "Provisão"
  },
  {
    texto: "Combati o bom combate, completei a carreira, guardei a fé.",
    referencia: "2 Timóteo 4:7",
    tema: "Fidelidade"
  },
  {
    texto: "Porque Deus não nos deu o espírito de temor, mas de fortaleza, e de amor, e de moderação.",
    referencia: "2 Timóteo 1:7",
    tema: "Poder"
  },
  {
    texto: "Alegrai-vos na esperança, sede pacientes na tribulação, perseverai na oração.",
    referencia: "Romanos 12:12",
    tema: "Esperança"
  },
  {
    texto: "Não vos inquieteis com nada; antes, em tudo, pela oração e pela súplica, com ações de graças, sejam as vossas petições conhecidas diante de Deus.",
    referencia: "Filipenses 4:6",
    tema: "Paz"
  },
  {
    texto: "A vós outros, que sois atribulados, descanso conosco, quando do céu se manifestar o Senhor Jesus com os anjos do seu poder, em chama de fogo.",
    referencia: "2 Tessalonicenses 1:7",
    tema: "Segunda Vinda"
  },
  {
    texto: "Sede uns para com os outros benignos, misericordiosos, perdoando-vos uns aos outros, como também Deus vos perdoou em Cristo.",
    referencia: "Efésios 4:32",
    tema: "Perdão"
  },
  {
    texto: "Filhinhos, não amemos de palavra nem de língua, mas por obra e em verdade.",
    referencia: "1 João 3:18",
    tema: "Ação"
  },
  {
    texto: "E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos sentimentos em Cristo Jesus.",
    referencia: "Filipenses 4:7",
    tema: "Paz"
  },
  {
    texto: "Se, porém, não perdoardes aos homens as suas ofensas, também vosso Pai vos não perdoará as vossas ofensas.",
    referencia: "Mateus 6:15",
    tema: "Perdão"
  },
  {
    texto: "Porque, onde estiverem dois ou três reunidos em meu nome, aí estou eu no meio deles.",
    referencia: "Mateus 18:20",
    tema: "Presença de Deus"
  },
  {
    texto: "Eu sou o caminho, a verdade e a vida; ninguém vem ao Pai, senão por mim.",
    referencia: "João 14:6",
    tema: "Jesus"
  },
  {
    texto: "Aquele que tem os meus mandamentos e os guarda, esse é o que me ama; e aquele que me ama será amado de meu Pai, e eu o amarei e me manifestarei a ele.",
    referencia: "João 14:21",
    tema: "Obediência"
  },
  {
    texto: "Pois o Senhor é bom; o seu amor dura para sempre, e a sua fidelidade não tem fim.",
    referencia: "Salmos 100:5",
    tema: "Bondade de Deus"
  },
  {
    texto: "Provai e vede que o Senhor é bom; bem-aventurado o homem que nele se refugia.",
    referencia: "Salmos 34:8",
    tema: "Bondade de Deus"
  },
  {
    texto: "O Senhor te abençoe e te guarde; o Senhor faça resplandecer o seu rosto sobre ti e te conceda graça; o Senhor volte para ti o seu rosto e te dê paz.",
    referencia: "Números 6:24-26",
    tema: "Bênção"
  },
  {
    texto: "O Senhor é compassivo e misericordioso, mui paciente e cheio de amor.",
    referencia: "Salmos 103:8",
    tema: "Misericórdia"
  },
  {
    texto: "O Senhor está perto de todos os que o invocam, de todos os que o invocam com sinceridade.",
    referencia: "Salmos 145:18",
    tema: "Proximidade"
  },
  {
    texto: "Cria em mim, ó Deus, um coração puro e renova dentro de mim um espírito inabalável.",
    referencia: "Salmos 51:10",
    tema: "Coração Puro"
  },
  {
    texto: "Não se turbe o vosso coração; credes em Deus, crede também em mim.",
    referencia: "João 14:1",
    tema: "Paz"
  },
  {
    texto: "E eu vos darei um novo coração e porei dentro de vós um espírito novo; tirarei de vós o coração de pedra e vos darei um coração de carne.",
    referencia: "Ezequiel 36:26",
    tema: "Novo Coração"
  },
  {
    texto: "O meu mandamento é este: que vos ameis uns aos outros, assim como eu vos amei.",
    referencia: "João 15:12",
    tema: "Amor Fraternal"
  },
  {
    texto: "Pois todos nós, que fomos batizados em Cristo Jesus, fomos batizados na sua morte.",
    referencia: "Romanos 6:3",
    tema: "Batismo"
  },
  {
    texto: "Assim, se alguém está em Cristo, nova criatura é; as coisas antigas já passaram; eis que tudo se fez novo.",
    referencia: "2 Coríntios 5:17",
    tema: "Nova Criação"
  },
  {
    texto: "Porque o reino de Deus não é comida nem bebida, mas justiça, e paz, e alegria no Espírito Santo.",
    referencia: "Romanos 14:17",
    tema: "Reino de Deus"
  },
  {
    texto: "Portanto, quer comais, quer bebais ou façais outra qualquer coisa, fazei tudo para a glória de Deus.",
    referencia: "1 Coríntios 10:31",
    tema: "Glória de Deus"
  },
  {
    texto: "Mas recebereis poder, ao descer sobre vós o Espírito Santo, e sereis minhas testemunhas tanto em Jerusalém como em toda a Judeia e Samaria e até aos confins da terra.",
    referencia: "Atos 1:8",
    tema: "Testemunho"
  },
  {
    texto: "O Espírito do Senhor está sobre mim, porque me ungiu para evangelizar os pobres; enviou-me para proclamar libertação aos cativos e restauração da vista aos cegos, para pôr em liberdade os oprimidos.",
    referencia: "Lucas 4:18",
    tema: "Missão de Jesus"
  },
  {
    texto: "Mas Deus prova o seu próprio amor para conosco pelo fato de ter Cristo morrido por nós, sendo nós ainda pecadores.",
    referencia: "Romanos 5:8",
    tema: "Amor Incondicional"
  },
  {
    texto: "Porque a palavra de Deus é viva e eficaz, e mais penetrante do que qualquer espada de dois gumes, e penetra até à divisão da alma e do espírito, e das juntas e medulas, e é apta para discernir os pensamentos e intenções do coração.",
    referencia: "Hebreus 4:12",
    tema: "Poder da Palavra"
  },
  {
    texto: "Não vos deixeis vencer do mal, mas vencei o mal com o bem.",
    referencia: "Romanos 12:21",
    tema: "Bem vs Mal"
  },
  {
    texto: "O Senhor é bom, um refúgio em tempos de angústia. Ele protege os que nele confiam.",
    referencia: "Naum 1:7",
    tema: "Refúgio"
  },
  {
    texto: "Aquele que é a luz verdadeira, que ilumina a todo homem, estava no mundo.",
    referencia: "João 1:9",
    tema: "Luz"
  },
  {
    texto: "Eu sou o pão da vida; aquele que vem a mim não terá fome; e quem crê em mim nunca terá sede.",
    referencia: "João 6:35",
    tema: "Pão da Vida"
  },
  {
    texto: "Eis que estou à porta e bato; se alguém ouvir a minha voz e abrir a porta, entrarei em sua casa e cearei com ele, e ele, comigo.",
    referencia: "Apocalipse 3:20",
    tema: "Convite"
  },
  {
    texto: "O Espírito e a noiva dizem: Vem! Aquele que ouve diga: Vem! Aquele que tem sede venha, e quem quiser receba de graça a água da vida.",
    referencia: "Apocalipse 22:17",
    tema: "Água da Vida"
  },
  {
    texto: "Aquele que testifica estas coisas diz: Certamente, venho sem demora. Amém! Vem, Senhor Jesus!",
    referencia: "Apocalipse 22:20",
    tema: "Vinda de Jesus"
  },
  {
    texto: "E lhes enxugará dos olhos toda lágrima, e a morte já não existirá, já não haverá luto, nem pranto, nem dor, porque as primeiras coisas passaram.",
    referencia: "Apocalipse 21:4",
    tema: "Nova Terra"
  },
  {
    texto: "Porque dele, e por meio dele, e para ele são todas as coisas. A ele, pois, a glória eternamente. Amém!",
    referencia: "Romanos 11:36",
    tema: "Glória"
  },
  {
    texto: "Não te deixes vencer do mal, mas vence o mal com o bem.",
    referencia: "Romanos 12:21",
    tema: "Vitória"
  },
  {
    texto: "Tudo o que fizerdes, fazei-o de todo o coração, como ao Senhor e não aos homens.",
    referencia: "Colossenses 3:23",
    tema: "Trabalho"
  },
  {
    texto: "Alegrai-vos na esperança, sede pacientes na tribulação, perseverai na oração.",
    referencia: "Romanos 12:12",
    tema: "Perseverança"
  },
  {
    texto: "O Senhor é a minha força e o meu escudo; nele o meu coração confia, e dele recebo ajuda. Meu coração exulta de alegria, e com o meu cântico lhe darei graças.",
    referencia: "Salmos 28:7",
    tema: "Gratidão"
  },
  {
    texto: "Instrui o menino no caminho em que deve andar, e, até quando envelhecer, não se desviará dele.",
    referencia: "Provérbios 22:6",
    tema: "Educação"
  },
  {
    texto: "Ouve, Israel, o Senhor, nosso Deus, é o único Senhor. Amarás, pois, o Senhor, teu Deus, de todo o teu coração, e de toda a tua alma, e de todas as tuas forças.",
    referencia: "Deuteronômio 6:4-5",
    tema: "Amor a Deus"
  },
  {
    texto: "Não te deixes vencer do mal, mas vence o mal com o bem.",
    referencia: "Romanos 12:21",
    tema: "Vitória"
  },
  {
    texto: "Portanto, se o Filho vos libertar, verdadeiramente sereis livres.",
    referencia: "João 8:36",
    tema: "Liberdade"
  },
  {
    texto: "Eu sou o pão vivo que desceu do céu; se alguém comer deste pão, viverá para sempre; e o pão que eu der é a minha carne, que eu darei pela vida do mundo.",
    referencia: "João 6:51",
    tema: "Pão da Vida"
  },
  {
    texto: "Disse-lhe Jesus: Eu sou a ressurreição e a vida; quem crê em mim, ainda que morra, viverá.",
    referencia: "João 11:25",
    tema: "Ressurreição"
  },
  {
    texto: "Porque onde estiverem dois ou três reunidos em meu nome, aí estou eu no meio deles.",
    referencia: "Mateus 18:20",
    tema: "Comunhão"
  },
  {
    texto: "Pois eu lhes darei boca e sabedoria a que não poderão resistir nem contradizer nenhum dos seus adversários.",
    referencia: "Lucas 21:15",
    tema: "Sabedoria"
  },
  {
    texto: "Aquele que não ama não conhece a Deus, pois Deus é amor.",
    referencia: "1 João 4:8",
    tema: "Deus é Amor"
  },
  {
    texto: "O Senhor te guiará continuamente, fartará a tua alma em lugares áridos e fortificará os teus ossos; e serás como um jardim regado e como um manancial cujas águas jamais faltam.",
    referencia: "Isaías 58:11",
    tema: "Guia Divina"
  },
  {
    texto: "Vós sois o sal da terra; e se o sal for insípido, com que se há de salgar? Para nada mais presta, senão para se lançar fora e ser pisado pelos homens.",
    referencia: "Mateus 5:13",
    tema: "Sal da Terra"
  },
  {
    texto: "Assim resplandeça a vossa luz diante dos homens, para que vejam as vossas boas obras e glorifiquem o vosso Pai, que está nos céus.",
    referencia: "Mateus 5:16",
    tema: "Luz do Mundo"
  },
  {
    texto: "Bem-aventurados os pacificadores, porque eles serão chamados filhos de Deus.",
    referencia: "Mateus 5:9",
    tema: "Paz"
  },
  {
    texto: "Não vos prendais a um jugo desigual com os infiéis; porque que sociedade tem a justiça com a injustiça? E que comunhão tem a luz com as trevas?",
    referencia: "2 Coríntios 6:14",
    tema: "Comunhão"
  },
  {
    texto: "Portanto, se o vosso olho direito vos escandalizar, arranca-o e atira-o para longe de vós; pois vos é melhor que se perca um dos membros do vosso corpo do que todo o vosso corpo seja lançado no inferno.",
    referencia: "Mateus 5:29",
    tema: "Sacrifício"
  },
  {
    texto: "Mas eu vos digo que qualquer que atentar numa mulher para a cobiçar já em seu coração cometeu adultério com ela.",
    referencia: "Mateus 5:28",
    tema: "Pureza"
  },
  {
    texto: "E, orando, não useis de vãs repetições, como os gentios; porque presumem que pelo seu muito falar serão ouvidos.",
    referencia: "Mateus 6:7",
    tema: "Oração"
  },
  {
    texto: "Não acumuleis para vós outros tesouros sobre a terra, onde a traça e a ferrugem corroem e onde ladrões escavam e roubam.",
    referencia: "Mateus 6:19",
    tema: "Tesouro"
  },
  {
    texto: "Ninguém pode servir a dois senhores; porque ou há de odiar um e amar o outro ou se dedicará a um e desprezará o outro. Não podeis servir a Deus e a Mamom.",
    referencia: "Mateus 6:24",
    tema: "Serviço"
  },
  {
    texto: "Não julgueis, para que não sejais julgados.",
    referencia: "Mateus 7:1",
    tema: "Julgamento"
  },
  {
    texto: "Pedi, e dar-se-vos-á; buscai, e encontrareis; batei, e abrir-se-vos-á.",
    referencia: "Mateus 7:7",
    tema: "Busca"
  },
  {
    texto: "Entrai pela porta estreita; porque larga é a porta, e espaçoso, o caminho que conduz à perdição, e muitos são os que entram por ela.",
    referencia: "Mateus 7:13",
    tema: "Caminho"
  },
  {
    texto: "Nem todo o que me diz: Senhor, Senhor! entrará no Reino dos céus, mas aquele que faz a vontade de meu Pai, que está nos céus.",
    referencia: "Mateus 7:21",
    tema: "Vontade de Deus"
  },
  {
    texto: "Portanto, quem ouve estas minhas palavras e as pratica é como um homem prudente que construiu a sua casa sobre a rocha.",
    referencia: "Mateus 7:24",
    tema: "Prática"
  },
  {
    texto: "E o que estava assentado sobre o trono disse: Eis que faço novas todas as coisas. E disse-me: Escreve, porque estas palavras são verdadeiras e fiéis.",
    referencia: "Apocalipse 21:5",
    tema: "Novas Coisas"
  },
  {
    texto: "Mas a vereda dos justos é como a luz da aurora, que vai brilhando mais e mais até ser dia perfeito.",
    referencia: "Provérbios 4:18",
    tema: "Caminho Justo"
  }
]

export const VersiculoDoDia = ({ compact = false }) => {
  const [versiculo, setVersiculo] = useState(getDailyVerse())
  const [favorito, setFavorito] = useState(false)
  const [copiado, setCopiado] = useState(false)



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
              className={`p-2 rounded-full transition-colors ${favorito ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
                }`}
            >
              <Heart className={`h-5 w-5 ${favorito ? 'fill-current' : ''}`} />
            </motion.button>
          </div>
        </CardHeader>
        <CardContent>
          <motion.p
            key={versiculo.referencia}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg md:text-xl italic text-center mb-4 leading-relaxed"
          >
            "{versiculo.texto}"
          </motion.p>
          <p className="text-sm md:text-base font-bold text-center text-primary mb-6">
            {versiculo.referencia}
          </p>
          <div className="flex justify-center flex-wrap gap-3">
            <Button onClick={handleCopiar} variant="outline" size="sm" className="flex items-center gap-1">
              <Copy className="h-4 w-4" />
              {copiado ? 'Copiado!' : 'Copiar'}
            </Button>
            <Button onClick={handleCompartilharWhatsApp} variant="outline" size="sm" className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Button>
            <Button onClick={handleCompartilharInstagram} variant="outline" size="sm" className="flex items-center gap-1">
              <Instagram className="h-4 w-4" />
              Instagram
            </Button>
            <Button onClick={handleNovoVersiculo} variant="secondary" size="sm" className="flex items-center gap-1">
              <RefreshCw className="h-4 w-4" />
              Novo
            </Button>
          </div>
          <p className="text-xs text-center text-muted-foreground mt-4">
            *O versículo é atualizado diariamente com base no dia do ano.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

