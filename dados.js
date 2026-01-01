// ===== Game Data & Content =====

// Save key for localStorage
const SAVE_KEY = 'vidasim_save_v1';

// Default game settings
const DEFAULT_SETTINGS = {
    theme: 'light',
    eventDensity: 'medium',
    animationSpeed: 'normal',
    advancedMode: false,
    hardcoreMode: false,
    language: 'pt-BR'
};

// Default player state
const DEFAULT_STATE = {
    health: 100,
    mood: 100,
    money: 1000,
    reputation: 50,
    skill: 0,
    age: 18,
    inventory: {
        car: null,
        phone: null
    },
    relationships: [],
    jobs: [],
    achievements: []
};

// Event rarities with weights
const RARITIES = {
    common: { weight: 70, label: 'Comum' },
    rare: { weight: 25, label: 'Raro' },
    epic: { weight: 5, label: 'Épico' }
};

// Shop catalogs
const SHOPS = {
    cars: [
        { id: 'bike', name: '🚲 Bicicleta', price: 500, effects: { mood: 5 } },
        { id: 'scooter', name: '🛴 Patinete Elétrico', price: 1200, effects: { mood: 10, reputation: 5 } },
        { id: 'motorcycle', name: '🏍️ Moto', price: 5000, effects: { mood: 15, reputation: 10 } },
        { id: 'car', name: '🚗 Carro Popular', price: 15000, effects: { mood: 20, reputation: 15 } },
        { id: 'suv', name: '🚙 SUV', price: 40000, effects: { mood: 25, reputation: 25 } },
        { id: 'sports', name: '🏎️ Carro Esportivo', price: 100000, effects: { mood: 40, reputation: 40 } }
    ],
    phones: [
        { id: 'basic', name: '📱 Celular Básico', price: 200, effects: { mood: 3 } },
        { id: 'smartphone', name: '📱 Smartphone', price: 800, effects: { mood: 8, reputation: 5 } },
        { id: 'flagship', name: '📱 Top de Linha', price: 3000, effects: { mood: 15, reputation: 12 } },
        { id: 'pro', name: '📱 Pro Max Ultra', price: 8000, effects: { mood: 25, reputation: 20 } }
    ]
};

// Event catalog
const EVENTS = {
    // ===== COMMON EVENTS =====
    common: [
        // Health & Daily Life
        {
            id: 'morning_jog',
            category: 'health',
            title: '🏃 Corrida Matinal',
            description: 'Você acordou cedo e decidiu fazer uma corrida. O exercício fez você se sentir energizado!',
            effects: { health: 5, mood: 5 },
            choices: null
        },
        {
            id: 'caught_cold',
            category: 'health',
            title: '🤧 Resfriado',
            description: 'Você pegou um resfriado e está se sentindo mal.',
            effects: { health: -10, mood: -5 },
            choices: [
                { text: 'Ir ao médico (-$50)', effects: { money: -50, health: 8 } },
                { text: 'Descansar em casa', effects: { health: 3 } }
            ]
        },
        {
            id: 'gym_membership',
            category: 'health',
            title: '💪 Academia',
            description: 'Você está pensando em começar a frequentar uma academia.',
            effects: {},
            choices: [
                { text: 'Assinar mensalidade (-$100)', effects: { money: -100, health: 15, mood: 10 } },
                { text: 'Fazer exercícios em casa', effects: { health: 5, mood: 5 } }
            ]
        },
        
        // Relationships & Social
        {
            id: 'made_friend',
            category: 'relationships',
            title: '👋 Novo Amigo',
            description: 'Você conheceu alguém interessante e parece que uma amizade está começando!',
            effects: { mood: 10, reputation: 5 },
            choices: null
        },
        {
            id: 'friend_birthday',
            category: 'relationships',
            title: '🎂 Aniversário de Amigo',
            description: 'É o aniversário de um amigo próximo. Como você vai comemorar?',
            effects: {},
            choices: [
                { text: 'Dar um presente legal (-$150)', effects: { money: -150, mood: 15, reputation: 10 } },
                { text: 'Apenas parabenizar', effects: { mood: 5, reputation: -5 } }
            ]
        },
        {
            id: 'family_dinner',
            category: 'relationships',
            title: '🍽️ Jantar em Família',
            description: 'Sua família organizou um jantar especial e todos estão reunidos.',
            effects: { mood: 15, health: 5 },
            choices: null
        },
        {
            id: 'argument_friend',
            category: 'relationships',
            title: '😠 Discussão',
            description: 'Você teve uma discussão com um amigo por um mal-entendido.',
            effects: { mood: -15, reputation: -5 },
            choices: [
                { text: 'Pedir desculpas', effects: { mood: 10, reputation: 10 } },
                { text: 'Deixar o tempo passar', effects: { mood: -5 } }
            ]
        },
        
        // Career & Education
        {
            id: 'online_course',
            category: 'education',
            title: '📚 Curso Online',
            description: 'Você encontrou um curso online interessante na sua área.',
            effects: {},
            choices: [
                { text: 'Fazer o curso (-$300)', effects: { money: -300, skill: 15 } },
                { text: 'Estudar sozinho', effects: { skill: 5 } }
            ]
        },
        {
            id: 'work_overtime',
            category: 'career',
            title: '⏰ Hora Extra',
            description: 'Seu chefe ofereceu horas extras no trabalho.',
            effects: {},
            choices: [
                { text: 'Aceitar (+$200)', effects: { money: 200, mood: -10, health: -5 } },
                { text: 'Recusar e descansar', effects: { mood: 10, health: 5 } }
            ]
        },
        {
            id: 'good_performance',
            category: 'career',
            title: '⭐ Bom Desempenho',
            description: 'Você teve um desempenho excepcional no trabalho e recebeu elogios!',
            effects: { reputation: 10, skill: 5, mood: 15 },
            choices: null
        },
        
        // Finance
        {
            id: 'found_money',
            category: 'finance',
            title: '💵 Dinheiro na Rua',
            description: 'Você encontrou dinheiro na rua!',
            effects: { money: 50, mood: 10 },
            choices: null
        },
        {
            id: 'unexpected_bill',
            category: 'finance',
            title: '📄 Conta Inesperada',
            description: 'Você recebeu uma conta que não estava esperando.',
            effects: { money: -150, mood: -10 },
            choices: null
        },
        {
            id: 'sale_shopping',
            category: 'finance',
            title: '🛍️ Promoção',
            description: 'Você encontrou uma promoção imperdível em algo que queria.',
            effects: {},
            choices: [
                { text: 'Aproveitar a promoção (-$100)', effects: { money: -100, mood: 15 } },
                { text: 'Economizar', effects: { mood: -5 } }
            ]
        },
        
        // Hobbies & Entertainment
        {
            id: 'movie_night',
            category: 'hobbies',
            title: '🎬 Noite de Cinema',
            description: 'Você está pensando em ir ao cinema assistir um filme novo.',
            effects: {},
            choices: [
                { text: 'Ir ao cinema (-$40)', effects: { money: -40, mood: 15 } },
                { text: 'Assistir em casa', effects: { mood: 8 } }
            ]
        },
        {
            id: 'hobby_time',
            category: 'hobbies',
            title: '🎨 Tempo de Hobby',
            description: 'Você dedicou um tempo ao seu hobby favorito.',
            effects: { mood: 20, health: 5 },
            choices: null
        },
        {
            id: 'concert',
            category: 'hobbies',
            title: '🎵 Show',
            description: 'Há um show da sua banda favorita na cidade!',
            effects: {},
            choices: [
                { text: 'Comprar ingresso (-$200)', effects: { money: -200, mood: 30 } },
                { text: 'Ficar em casa', effects: { mood: -10 } }
            ]
        },
        
        // Social Media & News
        {
            id: 'viral_post',
            category: 'social',
            title: '📱 Post Viral',
            description: 'Um dos seus posts nas redes sociais viralizou!',
            effects: { reputation: 15, mood: 20 },
            choices: null
        },
        {
            id: 'negative_comment',
            category: 'social',
            title: '💬 Comentário Negativo',
            description: 'Alguém fez um comentário desagradável sobre você online.',
            effects: { mood: -10, reputation: -5 },
            choices: null
        },
        
        // Minor Events
        {
            id: 'good_weather',
            category: 'news',
            title: '☀️ Dia Lindo',
            description: 'O clima está perfeito hoje! Você se sente renovado.',
            effects: { mood: 10 },
            choices: null
        },
        {
            id: 'traffic_jam',
            category: 'news',
            title: '🚗 Trânsito',
            description: 'Você ficou preso no trânsito por horas.',
            effects: { mood: -10 },
            choices: null
        },
        {
            id: 'good_sleep',
            category: 'health',
            title: '😴 Boa Noite de Sono',
            description: 'Você teve uma excelente noite de sono e acordou revigorado.',
            effects: { health: 10, mood: 10 },
            choices: null
        }
    ],
    
    // ===== RARE EVENTS =====
    rare: [
        // Career Opportunities
        {
            id: 'job_offer',
            category: 'career',
            title: '💼 Oferta de Emprego',
            description: 'Você recebeu uma oferta para um emprego melhor com salário maior!',
            effects: {},
            choices: [
                { text: 'Aceitar a oferta', effects: { money: 500, reputation: 15, skill: 10, mood: 20 } },
                { text: 'Recusar e manter o atual', effects: { reputation: -5 } }
            ]
        },
        {
            id: 'promotion',
            category: 'career',
            title: '📈 Promoção',
            description: 'Seu chefe ofereceu uma promoção! Você será promovido com aumento de salário.',
            effects: { money: 800, reputation: 20, skill: 15, mood: 30 },
            choices: null
        },
        {
            id: 'start_business',
            category: 'career',
            title: '🚀 Iniciar Negócio',
            description: 'Você teve uma ideia de negócio e está pensando em começar sua própria empresa.',
            effects: {},
            choices: [
                { text: 'Investir no negócio (-$3000)', effects: { money: -3000, skill: 20, reputation: 15 } },
                { text: 'Não arriscar', effects: { mood: -10 } }
            ]
        },
        
        // Relationships
        {
            id: 'romantic_interest',
            category: 'relationships',
            title: '💕 Interesse Romântico',
            description: 'Você conheceu alguém especial e há uma química incrível entre vocês!',
            effects: { mood: 25, reputation: 10 },
            choices: [
                { text: 'Chamar para um encontro (-$100)', effects: { money: -100, mood: 20, reputation: 10 } },
                { text: 'Ser apenas amigos', effects: { mood: -5 } }
            ]
        },
        {
            id: 'relationship_milestone',
            category: 'relationships',
            title: '💑 Marco no Relacionamento',
            description: 'Seu relacionamento está ficando mais sério. É hora de dar o próximo passo?',
            effects: {},
            choices: [
                { text: 'Compromisso sério', effects: { mood: 30, reputation: 15 } },
                { text: 'Manter como está', effects: { mood: 10 } }
            ]
        },
        {
            id: 'wedding',
            category: 'relationships',
            title: '💒 Casamento',
            description: 'Você está se casando! A cerimônia foi linda e todos estão felizes.',
            effects: { mood: 40, reputation: 25, money: -2000 },
            choices: null
        },
        {
            id: 'having_child',
            category: 'relationships',
            title: '👶 Novo Membro da Família',
            description: 'Você está esperando um filho! Uma nova fase da vida começa.',
            effects: { mood: 35, reputation: 15, money: -500 },
            choices: null
        },
        
        // Finance
        {
            id: 'investment_opportunity',
            category: 'finance',
            title: '📊 Oportunidade de Investimento',
            description: 'Um amigo te apresentou uma oportunidade de investimento promissora.',
            effects: {},
            choices: [
                { text: 'Investir $2000', effects: { money: -2000, skill: 10 } },
                { text: 'Não investir', effects: {} }
            ]
        },
        {
            id: 'investment_return',
            category: 'finance',
            title: '💰 Retorno de Investimento',
            description: 'Seu investimento deu certo e você teve um ótimo retorno!',
            effects: { money: 3000, mood: 25, reputation: 10 },
            choices: null
        },
        {
            id: 'inheritance',
            category: 'finance',
            title: '🏦 Herança',
            description: 'Você recebeu uma herança inesperada de um parente distante.',
            effects: { money: 5000, mood: 15 },
            choices: null
        },
        
        // Health
        {
            id: 'health_scare',
            category: 'health',
            title: '🏥 Problema de Saúde',
            description: 'Você teve um problema de saúde que requer atenção médica.',
            effects: { health: -25, mood: -20 },
            choices: [
                { text: 'Tratamento completo (-$800)', effects: { money: -800, health: 30 } },
                { text: 'Tratamento básico (-$200)', effects: { money: -200, health: 15 } }
            ]
        },
        
        // Legal & Trouble
        {
            id: 'traffic_ticket',
            category: 'legal',
            title: '🚦 Multa de Trânsito',
            description: 'Você foi multado por excesso de velocidade.',
            effects: { money: -300, mood: -15, reputation: -10 },
            choices: null
        },
        {
            id: 'jury_duty',
            category: 'legal',
            title: '⚖️ Convocação para Júri',
            description: 'Você foi convocado para servir como jurado.',
            effects: { skill: 5, reputation: 10, mood: -5 },
            choices: null
        },
        
        // Achievements
        {
            id: 'skill_mastery',
            category: 'education',
            title: '🏆 Maestria em Habilidade',
            description: 'Você atingiu um nível de maestria em uma de suas habilidades!',
            effects: { skill: 25, reputation: 20, mood: 30 },
            choices: null
        },
        {
            id: 'win_competition',
            category: 'hobbies',
            title: '🥇 Vitória em Competição',
            description: 'Você ganhou uma competição relacionada ao seu hobby!',
            effects: { money: 500, reputation: 25, mood: 35 },
            choices: null
        }
    ],
    
    // ===== EPIC EVENTS =====
    epic: [
        // Major Career
        {
            id: 'dream_job',
            category: 'career',
            title: '🌟 Emprego dos Sonhos',
            description: 'Você conseguiu o emprego dos seus sonhos! Sua vida profissional está no auge.',
            effects: { money: 2000, reputation: 40, skill: 30, mood: 50 },
            choices: null
        },
        {
            id: 'business_success',
            category: 'career',
            title: '🎯 Sucesso Empresarial',
            description: 'Seu negócio decolou! Você é agora um empresário de sucesso.',
            effects: { money: 10000, reputation: 50, mood: 50 },
            choices: null
        },
        {
            id: 'famous',
            category: 'career',
            title: '⭐ Fama',
            description: 'Você ficou famoso! Seu trabalho foi reconhecido mundialmente.',
            effects: { money: 5000, reputation: 60, mood: 40 },
            choices: null
        },
        
        // Life Events
        {
            id: 'life_crisis',
            category: 'health',
            title: '⚠️ Crise de Vida',
            description: 'Você está passando por uma crise existencial importante.',
            effects: { mood: -30, health: -15 },
            choices: [
                { text: 'Buscar ajuda profissional (-$1000)', effects: { money: -1000, mood: 40, health: 20 } },
                { text: 'Enfrentar sozinho', effects: { mood: 10, health: 5 } }
            ]
        },
        {
            id: 'major_accident',
            category: 'health',
            title: '🚑 Acidente Grave',
            description: 'Você sofreu um acidente sério. A recuperação será longa.',
            effects: { health: -40, mood: -30, money: -2000 },
            choices: [
                { text: 'Tratamento premium (-$3000)', effects: { money: -3000, health: 45 } },
                { text: 'Tratamento padrão', effects: { health: 25 } }
            ]
        },
        
        // Major Windfalls
        {
            id: 'lottery_win',
            category: 'finance',
            title: '🎰 Loteria!',
            description: 'INCRÍVEL! Você ganhou na loteria! Sua vida financeira mudou completamente.',
            effects: { money: 50000, mood: 50, reputation: 20 },
            choices: null
        },
        {
            id: 'lawsuit_win',
            category: 'legal',
            title: '⚖️ Ganhou Processo',
            description: 'Você ganhou um processo judicial importante e recebeu uma compensação substancial.',
            effects: { money: 20000, reputation: 30, mood: 40 },
            choices: null
        },
        
        // Major Setbacks
        {
            id: 'business_failure',
            category: 'career',
            title: '📉 Falência',
            description: 'Seu negócio faliu. Você perdeu muito dinheiro e precisa recomeçar.',
            effects: { money: -15000, mood: -40, reputation: -30 },
            choices: null
        },
        {
            id: 'major_theft',
            category: 'legal',
            title: '🚨 Grande Roubo',
            description: 'Você foi vítima de um grande roubo e perdeu itens valiosos.',
            effects: { money: -5000, mood: -35, reputation: -10 },
            choices: null
        },
        
        // Life Milestones
        {
            id: 'adopted_child',
            category: 'relationships',
            title: '👨‍👩‍👧 Adoção',
            description: 'Você adotou uma criança! Sua família cresceu e você está emocionado.',
            effects: { mood: 45, reputation: 30, money: -1000 },
            choices: null
        },
        {
            id: 'world_travel',
            category: 'hobbies',
            title: '✈️ Viagem Mundial',
            description: 'Você realizou o sonho de viajar o mundo por um ano!',
            effects: { money: -10000, mood: 50, health: 20, skill: 25, reputation: 25 },
            choices: null
        },
        {
            id: 'humanitarian_work',
            category: 'relationships',
            title: '🌍 Trabalho Humanitário',
            description: 'Você dedicou tempo para trabalho humanitário e teve um impacto real na vida de muitas pessoas.',
            effects: { reputation: 50, mood: 45, skill: 20, money: -2000 },
            choices: null
        }
    ]
};

// Export for use in game.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SAVE_KEY,
        DEFAULT_SETTINGS,
        DEFAULT_STATE,
        RARITIES,
        SHOPS,
        EVENTS
    };
}
