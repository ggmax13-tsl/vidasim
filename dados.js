// ===== VIDASIM PRO - DADOS COMPLETOS =====

const DADOS = {
    nomes: {
        brasil: {
            masculinos: ["Miguel","Arthur","Heitor","Bernardo","Théo","Davi","Gabriel","Samuel","Lucas","Matheus","Pedro","Rafael","João","Gustavo","Felipe","Bruno","Leonardo","Enzo","Nicolas","Cauã","Vinicius","Eduardo","Henrique","Thiago","Igor","Caio","Ryan","Lucca","Guilherme","Murilo"],
            femininos: ["Helena","Alice","Laura","Maria","Valentina","Sophia","Isabella","Manuela","Júlia","Heloísa","Luísa","Lorena","Lívia","Giovanna","Beatriz","Maria Clara","Cecília","Eloá","Lara","Ana","Mariana","Gabriela","Letícia","Carolina","Amanda","Bruna","Camila","Fernanda","Juliana","Larissa"]
        }
    },
    sobrenomes: ["Silva","Santos","Oliveira","Souza","Rodrigues","Ferreira","Alves","Pereira","Lima","Gomes","Costa","Ribeiro","Martins","Carvalho","Almeida","Lopes","Soares","Fernandes","Vieira","Barbosa"],
    cidades: {brasil: ["São Paulo","Rio de Janeiro","Belo Horizonte","Brasília","Salvador","Curitiba","Fortaleza","Recife","Porto Alegre","Manaus","Florianópolis","Goiânia"]},
    familia: {
        mae: {nome:"Mãe",icone:"fa-female",afinidadeInicial:85,limiteMessada:{pobre:20,media:100,alta:500,rica:2000}},
        pai: {nome:"Pai",icone:"fa-male",afinidadeInicial:80,limiteMessada:{pobre:30,media:150,alta:600,rica:2500}}
    },
    interacoesFamilia: {
        pedirDinheiro: {
            opcoes: [
                {texto:"Pedir R$20 para lanche",valor:20,dificuldade:20},
                {texto:"Pedir R$50 para sair",valor:50,dificuldade:35},
                {texto:"Pedir R$100 para comprar algo",valor:100,dificuldade:50},
                {texto:"Pedir R$500 emprestado",valor:500,dificuldade:80}
            ],
            respostas: {
                sucesso: ["Toma aqui, use com sabedoria!","Claro querido!","Está bem, mas é a última vez!"],
                falha: ["Dinheiro não nasce em árvore!","Você acha que sou banco?","Arruma um emprego!"]
            }
        }
    },
    empregos: {
        entrada: [
            {nome:"Atendente",salario:1500,idadeMin:18},
            {nome:"Caixa",salario:1600,idadeMin:18},
            {nome:"Garçom",salario:1800,idadeMin:18},
            {nome:"Vendedor",salario:2200,idadeMin:18}
        ],
        qualificado: [
            {nome:"Programador",salario:8000,idadeMin:20,requisitos:{inteligencia:60}},
            {nome:"Médico",salario:20000,idadeMin:28,requisitos:{curso:"Medicina"}},
            {nome:"Advogado",salario:10000,idadeMin:24,requisitos:{curso:"Direito"}},
            {nome:"Engenheiro",salario:12000,idadeMin:24,requisitos:{curso:"Engenharia"}}
        ]
    },
    atividades: {
        exercicio: [
            {nome:"Caminhar",icone:"fa-walking",saude:5,felicidade:8,custo:0},
            {nome:"Academia",icone:"fa-dumbbell",saude:15,felicidade:8,custo:100},
            {nome:"Natação",icone:"fa-swimmer",saude:12,felicidade:10,custo:50}
        ],
        lazer: [
            {nome:"Jogar videogame",icone:"fa-gamepad",felicidade:15,custo:0},
            {nome:"Cinema",icone:"fa-film",felicidade:20,custo:50},
            {nome:"Ler livro",icone:"fa-book",inteligencia:10,felicidade:8,custo:0}
        ]
    },
    eventos: {
        infancia: [
            {texto:"Você aprendeu a andar de bicicleta!",felicidade:15,icone:"fa-bicycle"},
            {texto:"Você ganhou um brinquedo novo!",felicidade:20,icone:"fa-robot"},
            {texto:"Você fez um novo amigo!",felicidade:15,icone:"fa-child"}
        ],
        adulto: [
            {texto:"Você recebeu uma promoção!",felicidade:30,dinheiro:5000,icone:"fa-chart-line"},
            {texto:"Você foi demitido.",felicidade:-35,icone:"fa-user-times"},
            {texto:"Você ganhou na loteria!",felicidade:50,dinheiro:50000,icone:"fa-money-bill-wave"}
        ]
    },
    causasMorte: ["velhice","ataque cardíaco","acidente","doença"]
};
window.DADOS = DADOS;