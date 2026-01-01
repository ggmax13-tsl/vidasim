// Dados do Jogo - VidaSim

const DADOS = {
    // Nomes brasileiros
    nomes: {
        masculinos: [
            "Miguel", "Arthur", "Heitor", "Bernardo", "Théo", "Davi", "Gabriel", 
            "Samuel", "Lucas", "Matheus", "Pedro", "Rafael", "João", "Gustavo",
            "Felipe", "Bruno", "Leonardo", "Enzo", "Nicolas", "Cauã"
        ],
        femininos: [
            "Helena", "Alice", "Laura", "Maria", "Valentina", "Sophia", "Isabella",
            "Manuela", "Júlia", "Heloísa", "Luísa", "Lorena", "Lívia", "Giovanna",
            "Beatriz", "Maria Clara", "Cecília", "Eloá", "Lara", "Ana"
        ]
    },

    sobrenomes: [
        "Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves",
        "Pereira", "Lima", "Gomes", "Costa", "Ribeiro", "Martins", "Carvalho",
        "Almeida", "Lopes", "Soares", "Fernandes", "Vieira", "Barbosa"
    ],

    // Cidades brasileiras
    cidades: [
        "São Paulo", "Rio de Janeiro", "Belo Horizonte", "Brasília", "Salvador",
        "Curitiba", "Fortaleza", "Recife", "Porto Alegre", "Manaus",
        "Florianópolis", "Goiânia", "Campinas", "Natal", "João Pessoa"
    ],

    // Eventos aleatórios por faixa etária
    eventos: {
        infancia: [
            { texto: "Você aprendeu a andar de bicicleta! 🚲", felicidade: 10, saude: 5, inteligencia: 0, dinheiro: 0 },
            { texto: "Você fez novos amigos na escola! 👫", felicidade: 15, saude: 0, inteligencia: 5, dinheiro: 0 },
            { texto: "Você ganhou um brinquedo novo! 🧸", felicidade: 20, saude: 0, inteligencia: 0, dinheiro: 0 },
            { texto: "Você ficou gripado. 🤧", felicidade: -5, saude: -10, inteligencia: 0, dinheiro: 0 },
            { texto: "Você tirou boas notas na escola! 📚", felicidade: 10, saude: 0, inteligencia: 15, dinheiro: 0 },
            { texto: "Você aprendeu a nadar! 🏊", felicidade: 10, saude: 10, inteligencia: 5, dinheiro: 0 },
            { texto: "Você caiu e machucou o joelho. 🩹", felicidade: -10, saude: -5, inteligencia: 0, dinheiro: 0 },
            { texto: "Seus pais te levaram ao parque de diversões! 🎢", felicidade: 25, saude: 0, inteligencia: 0, dinheiro: 0 },
            { texto: "Você ganhou uma competição na escola! 🏆", felicidade: 20, saude: 0, inteligencia: 10, dinheiro: 0 },
            { texto: "Você aprendeu a tocar um instrumento! 🎵", felicidade: 15, saude: 0, inteligencia: 10, dinheiro: 0 }
        ],
        adolescencia: [
            { texto: "Você passou no vestibular! 🎓", felicidade: 30, saude: 0, inteligencia: 20, dinheiro: 0 },
            { texto: "Você teve seu primeiro beijo! 💋", felicidade: 25, saude: 0, inteligencia: 0, dinheiro: 0 },
            { texto: "Você brigou com um amigo. 😤", felicidade: -15, saude: 0, inteligencia: 0, dinheiro: 0 },
            { texto: "Você foi a uma festa incrível! 🎉", felicidade: 20, saude: -5, inteligencia: 0, dinheiro: 0 },
            { texto: "Você começou a praticar um esporte! ⚽", felicidade: 15, saude: 15, inteligencia: 0, dinheiro: 0 },
            { texto: "Você tirou carteira de motorista! 🚗", felicidade: 25, saude: 0, inteligencia: 5, dinheiro: 0 },
            { texto: "Você sofreu bullying na escola. 😢", felicidade: -25, saude: -5, inteligencia: 0, dinheiro: 0 },
            { texto: "Você ganhou um prêmio em uma olimpíada científica! 🔬", felicidade: 20, saude: 0, inteligencia: 25, dinheiro: 0 },
            { texto: "Você conseguiu seu primeiro estágio! 💼", felicidade: 15, saude: 0, inteligencia: 10, dinheiro: 500 },
            { texto: "Você viajou com amigos! ✈️", felicidade: 30, saude: 5, inteligencia: 5, dinheiro: -200 }
        ],
        adulto: [
            { texto: "Você recebeu uma promoção no trabalho! 📈", felicidade: 25, saude: 0, inteligencia: 5, dinheiro: 2000 },
            { texto: "Você comprou seu primeiro carro! 🚙", felicidade: 20, saude: 0, inteligencia: 0, dinheiro: -15000 },
            { texto: "Você foi demitido. 😰", felicidade: -30, saude: -10, inteligencia: 0, dinheiro: -500 },
            { texto: "Você ganhou na loteria! 🎰", felicidade: 40, saude: 0, inteligencia: 0, dinheiro: 10000 },
            { texto: "Você teve um acidente de carro. 🚨", felicidade: -20, saude: -30, inteligencia: 0, dinheiro: -5000 },
            { texto: "Você comprou uma casa! 🏠", felicidade: 30, saude: 0, inteligencia: 0, dinheiro: -50000 },
            { texto: "Você foi promovido a gerente! 👔", felicidade: 25, saude: -5, inteligencia: 10, dinheiro: 5000 },
            { texto: "Você foi assaltado na rua. 😱", felicidade: -25, saude: -10, inteligencia: 0, dinheiro: -1000 },
            { texto: "Você fez uma viagem internacional! ✈️", felicidade: 35, saude: 5, inteligencia: 10, dinheiro: -8000 },
            { texto: "Você abriu seu próprio negócio! 🏪", felicidade: 30, saude: -10, inteligencia: 15, dinheiro: -20000 },
            { texto: "Seu negócio teve um lucro recorde! 💵", felicidade: 35, saude: 0, inteligencia: 5, dinheiro: 25000 },
            { texto: "Você descobriu que tem pressão alta. 💊", felicidade: -15, saude: -20, inteligencia: 0, dinheiro: -500 }
        ],
        idoso: [
            { texto: "Você se aposentou! 🎊", felicidade: 20, saude: 0, inteligencia: 0, dinheiro: 3000 },
            { texto: "Seus netos vieram te visitar! 👨‍👩‍👧‍👦", felicidade: 30, saude: 5, inteligencia: 0, dinheiro: 0 },
            { texto: "Você teve um problema cardíaco. ❤️‍🩹", felicidade: -20, saude: -25, inteligencia: 0, dinheiro: -3000 },
            { texto: "Você aprendeu a usar o computador! 💻", felicidade: 15, saude: 0, inteligencia: 15, dinheiro: 0 },
            { texto: "Você fez uma viagem de cruzeiro! 🚢", felicidade: 35, saude: 5, inteligencia: 5, dinheiro: -10000 },
            { texto: "Você ganhou um prêmio de melhor avô/avó! 🏆", felicidade: 25, saude: 5, inteligencia: 0, dinheiro: 0 },
            { texto: "Você quebrou o quadril em uma queda. 🦴", felicidade: -30, saude: -35, inteligencia: 0, dinheiro: -5000 },
            { texto: "Você escreveu suas memórias! 📖", felicidade: 25, saude: 0, inteligencia: 10, dinheiro: 2000 }
        ]
    },

    // Atividades
    atividades: {
        academia: { texto: "Você foi à academia e fez exercícios! 🏋️", felicidade: 5, saude: 15, inteligencia: 0, dinheiro: -50 },
        biblioteca: { texto: "Você passou horas lendo na biblioteca! 📖", felicidade: 5, saude: 0, inteligencia: 15, dinheiro: 0 },
        passeio: { texto: "Você deu um passeio relaxante no parque! 🌳", felicidade: 15, saude: 10, inteligencia: 0, dinheiro: 0 },
        cinema: { texto: "Você assistiu um filme incrível no cinema! 🎬", felicidade: 20, saude: 0, inteligencia: 5, dinheiro: -40 },
        meditacao: { texto: "Você meditou e encontrou paz interior! 🧘", felicidade: 20, saude: 10, inteligencia: 5, dinheiro: 0 },
        videogame: { texto: "Você jogou videogame por horas! 🎮", felicidade: 15, saude: -5, inteligencia: 5, dinheiro: 0 }
    },

    // Empregos
    empregos: [
        { nome: "Atendente de Loja", salario: 1500, requisitos: { idade: 16, inteligencia: 0, educacao: null } },
        { nome: "Caixa de Supermercado", salario: 1600, requisitos: { idade: 16, inteligencia: 0, educacao: null } },
        { nome: "Garçom", salario: 1800, requisitos: { idade: 18, inteligencia: 0, educacao: null } },
        { nome: "Recepcionista", salario: 2000, requisitos: { idade: 18, inteligencia: 20, educacao: null } },
        { nome: "Assistente Administrativo", salario: 2500, requisitos: { idade: 18, inteligencia: 30, educacao: "Ensino Médio" } },
        { nome: "Vendedor", salario: 2800, requisitos: { idade: 18, inteligencia: 25, educacao: "Ensino Médio" } },
        { nome: "Técnico de Informática", salario: 3500, requisitos: { idade: 20, inteligencia: 40, educacao: "Curso Técnico" } },
        { nome: "Enfermeiro", salario: 4000, requisitos: { idade: 22, inteligencia: 50, educacao: "Graduação" } },
        { nome: "Contador", salario: 5000, requisitos: { idade: 22, inteligencia: 55, educacao: "Graduação" } },
        { nome: "Programador Júnior", salario: 4500, requisitos: { idade: 20, inteligencia: 50, educacao: "Graduação" } },
        { nome: "Programador Pleno", salario: 8000, requisitos: { idade: 24, inteligencia: 60, educacao: "Graduação" } },
        { nome: "Engenheiro", salario: 9000, requisitos: { idade: 24, inteligencia: 65, educacao: "Graduação" } },
        { nome: "Advogado", salario: 10000, requisitos: { idade: 24, inteligencia: 70, educacao: "Graduação" } },
        { nome: "Médico", salario: 15000, requisitos: { idade: 28, inteligencia: 80, educacao: "Graduação" } },
        { nome: "Gerente", salario: 12000, requisitos: { idade: 30, inteligencia: 60, educacao: "Graduação" } },
        { nome: "Diretor", salario: 25000, requisitos: { idade: 35, inteligencia: 75, educacao: "Pós-graduação" } },
        { nome: "CEO", salario: 50000, requisitos: { idade: 40, inteligencia: 85, educacao: "Pós-graduação" } }
    ],

    // Cursos/Educação
    cursos: [
        { nome: "Ensino Médio", duracao: 3, idade_minima: 15, custo: 0, bonus_inteligencia: 20 },
        { nome: "Curso Técnico", duracao: 2, idade_minima: 17, custo: 3000, bonus_inteligencia: 25 },
        { nome: "Graduação", duracao: 4, idade_minima: 18, custo: 40000, bonus_inteligencia: 35 },
        { nome: "Pós-graduação", duracao: 2, idade_minima: 22, custo: 25000, bonus_inteligencia: 25 },
        { nome: "MBA", duracao: 2, idade_minima: 25, custo: 50000, bonus_inteligencia: 20 },
        { nome: "Mestrado", duracao: 2, idade_minima: 24, custo: 15000, bonus_inteligencia: 30 },
        { nome: "Doutorado", duracao: 4, idade_minima: 26, custo: 10000, bonus_inteligencia: 40 }
    ],

    // Tipos de relacionamento
    tiposRelacionamento: ["Amigo", "Melhor Amigo", "Namorado(a)", "Cônjuge", "Inimigo"],

    // Interações com relacionamentos
    interacoes: {
        conversar: { texto: "Vocês tiveram uma boa conversa! 💬", afinidade: 10, felicidade: 5 },
        presente: { texto: "Você deu um presente! 🎁", afinidade: 20, felicidade: 10, custo: 100 },
        passeio: { texto: "Vocês saíram juntos! 🚶", afinidade: 15, felicidade: 15, custo: 50 },
        brigar: { texto: "Vocês discutiram... 😠", afinidade: -25, felicidade: -10 },
        reconciliar: { texto: "Vocês fizeram as pazes! 🤝", afinidade: 15, felicidade: 10 }
    },

    // Causas de morte
    causasMorte: ["velhice", "doença cardíaca", "acidente", "doença", "causas naturais"]
};