// ===== VIDASIM - DADOS.JS =====
// Data-driven catalogs for events, shops, jobs, and game content

const DADOS = {
  // === CONSTANTS ===
  SAVE_KEY: 'vidasim_save_v1',
  SETTINGS_KEY: 'vidasim_settings_v1',

  // === SETTINGS DEFAULTS ===
  settingsDefaults: {
    theme: 'light',
    eventDensity: 'medium', // low, medium, high
    animationSpeed: 'normal', // slow, normal, fast
    language: 'pt-BR',
    advancedMode: false, // placeholder
    hardcoreMode: false // placeholder
  },

  // === NAMES ===
  nomes: {
    brasil: {
      masculinos: ['João', 'Pedro', 'Lucas', 'Gabriel', 'Miguel', 'Rafael', 'Matheus', 'Felipe', 'Bruno', 'Guilherme', 'Carlos', 'André', 'Thiago', 'Diego', 'Leonardo', 'Daniel', 'Ricardo', 'Rodrigo', 'Fernando', 'Marcelo', 'Paulo', 'Roberto', 'Eduardo', 'Vinícius', 'Gustavo', 'Henrique', 'Marcos', 'Alex', 'Caio', 'Bernardo'],
      femininos: ['Maria', 'Ana', 'Juliana', 'Beatriz', 'Laura', 'Isabela', 'Sophia', 'Gabriela', 'Mariana', 'Carolina', 'Amanda', 'Fernanda', 'Camila', 'Júlia', 'Bruna', 'Larissa', 'Letícia', 'Rafaela', 'Vanessa', 'Patrícia', 'Bianca', 'Carla', 'Daniela', 'Aline', 'Natália', 'Renata', 'Priscila', 'Cristina', 'Mônica', 'Luciana']
    }
  },

  sobrenomes: ['Silva', 'Santos', 'Oliveira', 'Souza', 'Costa', 'Pereira', 'Ferreira', 'Rodrigues', 'Almeida', 'Nascimento', 'Lima', 'Araújo', 'Fernandes', 'Carvalho', 'Gomes', 'Martins', 'Rocha', 'Ribeiro', 'Alves', 'Monteiro', 'Mendes', 'Barros', 'Freitas', 'Barbosa', 'Pinto', 'Moreira', 'Cavalcanti', 'Dias', 'Castro', 'Campos'],

  // === COUNTRIES & CITIES ===
  paises: ['Brasil', 'Estados Unidos', 'Portugal', 'Espanha', 'França', 'Itália', 'Alemanha', 'Inglaterra', 'Japão', 'China', 'Canadá', 'Austrália'],
  
  cidades: {
    brasil: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Porto Alegre', 'Belém', 'Goiânia', 'Guarulhos', 'Campinas', 'São Luís', 'São Gonçalo', 'Maceió', 'Duque de Caxias', 'Natal', 'Campo Grande']
  },

  linguas: ['Português', 'Inglês', 'Espanhol', 'Francês', 'Alemão', 'Italiano', 'Japonês', 'Mandarim'],

  // === EVENTS WITH RARITIES ===
  eventos: {
    // Family/Relationships events
    familia: [
      { texto: 'Seus pais brigaram feio. O clima em casa está pesado.', raridade: 'comum', felicidade: -10, mood: -15, categoria: 'familia', icone: 'fa-home' },
      { texto: 'Seus pais te levaram para um passeio no parque!', raridade: 'comum', felicidade: 15, mood: 10, categoria: 'familia', icone: 'fa-tree' },
      { texto: 'Você ganhou um presente de aniversário incrível!', raridade: 'comum', felicidade: 20, mood: 15, categoria: 'familia', icone: 'fa-gift' },
      { texto: 'Seu irmão/irmã nasceu! A família está feliz.', raridade: 'raro', felicidade: 25, categoria: 'familia', icone: 'fa-baby' },
      { texto: 'Seus pais se divorciaram. Momento difícil para a família.', raridade: 'raro', felicidade: -30, mood: -25, categoria: 'familia', icone: 'fa-heart-broken' },
      { texto: 'Reunião de família foi muito divertida!', raridade: 'comum', felicidade: 15, categoria: 'familia', icone: 'fa-users' },
      { texto: 'Sua avó te ensinou a fazer um bolo delicioso!', raridade: 'comum', felicidade: 10, skill: 5, categoria: 'familia', icone: 'fa-birthday-cake' }
    ],

    // Career/Education events
    educacao: [
      { texto: 'Você tirou uma nota excelente na prova!', raridade: 'comum', felicidade: 15, skill: 10, reputation: 5, categoria: 'educacao', icone: 'fa-graduation-cap' },
      { texto: 'Foi mal na prova de matemática...', raridade: 'comum', felicidade: -10, mood: -5, categoria: 'educacao', icone: 'fa-calculator' },
      { texto: 'Ganhou uma bolsa de estudos!', raridade: 'raro', felicidade: 30, money: 5000, reputation: 10, categoria: 'educacao', icone: 'fa-award' },
      { texto: 'Foi suspenso por bagunça na sala.', raridade: 'raro', felicidade: -20, reputation: -15, categoria: 'educacao', icone: 'fa-exclamation-triangle' },
      { texto: 'Participou de uma feira de ciências e seu projeto foi destaque!', raridade: 'raro', felicidade: 25, skill: 15, reputation: 10, categoria: 'educacao', icone: 'fa-flask' },
      { texto: 'Fez novos amigos na escola!', raridade: 'comum', felicidade: 10, mood: 10, categoria: 'educacao', icone: 'fa-user-friends' },
      { texto: 'Passou no vestibular para sua faculdade dos sonhos!', raridade: 'epico', felicidade: 50, reputation: 20, categoria: 'educacao', icone: 'fa-university' }
    ],

    // Finance/Investments events
    financas: [
      { texto: 'Encontrou R$ 100 na rua!', raridade: 'comum', felicidade: 10, money: 100, categoria: 'financas', icone: 'fa-money-bill' },
      { texto: 'Seu investimento deu lucro!', raridade: 'raro', felicidade: 20, money: 1000, categoria: 'financas', icone: 'fa-chart-line' },
      { texto: 'Foi assaltado e perdeu dinheiro.', raridade: 'raro', felicidade: -25, money: -500, mood: -20, categoria: 'financas', icone: 'fa-mask' },
      { texto: 'Ganhou na loteria!', raridade: 'epico', felicidade: 80, money: 50000, categoria: 'financas', icone: 'fa-trophy' },
      { texto: 'Perdeu dinheiro em um golpe online.', raridade: 'raro', felicidade: -30, money: -2000, categoria: 'financas', icone: 'fa-skull-crossbones' },
      { texto: 'Economizou bem esse mês!', raridade: 'comum', felicidade: 5, money: 200, categoria: 'financas', icone: 'fa-piggy-bank' }
    ],

    // Health/Imprevistos events
    saude: [
      { texto: 'Pegou uma gripe forte.', raridade: 'comum', health: -15, mood: -10, money: -100, categoria: 'saude', icone: 'fa-thermometer' },
      { texto: 'Check-up médico: está tudo ótimo!', raridade: 'comum', felicidade: 10, health: 5, categoria: 'saude', icone: 'fa-heartbeat' },
      { texto: 'Sofreu um acidente e foi hospitalizado.', raridade: 'raro', health: -40, money: -5000, felicidade: -30, categoria: 'saude', icone: 'fa-ambulance' },
      { texto: 'Começou a fazer exercícios regularmente!', raridade: 'comum', health: 20, felicidade: 15, categoria: 'saude', icone: 'fa-running' },
      { texto: 'Descobriu uma alergia alimentar.', raridade: 'raro', health: -10, mood: -5, categoria: 'saude', icone: 'fa-allergies' },
      { texto: 'Dormiu muito bem essa semana!', raridade: 'comum', health: 10, mood: 10, categoria: 'saude', icone: 'fa-bed' }
    ],

    // Hobbies events
    hobbies: [
      { texto: 'Aprendeu a tocar uma nova música no violão!', raridade: 'comum', felicidade: 15, skill: 10, categoria: 'hobbies', icone: 'fa-guitar' },
      { texto: 'Ganhou um torneio de videogame!', raridade: 'raro', felicidade: 30, reputation: 10, money: 500, categoria: 'hobbies', icone: 'fa-gamepad' },
      { texto: 'Seu quadro foi exposto em uma galeria!', raridade: 'epico', felicidade: 40, reputation: 20, money: 2000, categoria: 'hobbies', icone: 'fa-palette' },
      { texto: 'Passou o dia jogando bola com os amigos.', raridade: 'comum', felicidade: 15, health: 10, categoria: 'hobbies', icone: 'fa-futbol' },
      { texto: 'Leu um livro incrível!', raridade: 'comum', felicidade: 10, skill: 5, categoria: 'hobbies', icone: 'fa-book' },
      { texto: 'Completou uma maratona!', raridade: 'raro', felicidade: 35, health: 20, reputation: 15, categoria: 'hobbies', icone: 'fa-medal' }
    ],

    // Legal/Trouble events
    legal: [
      { texto: 'Foi pego colando na prova e recebeu zero.', raridade: 'raro', felicidade: -25, reputation: -20, categoria: 'legal', icone: 'fa-ban' },
      { texto: 'Testemunhou um crime e ajudou a polícia.', raridade: 'raro', felicidade: 10, reputation: 15, categoria: 'legal', icone: 'fa-balance-scale' },
      { texto: 'Recebeu uma multa de trânsito.', raridade: 'comum', felicidade: -10, money: -300, categoria: 'legal', icone: 'fa-car-crash' },
      { texto: 'Fez trabalho voluntário na comunidade!', raridade: 'comum', felicidade: 20, reputation: 10, categoria: 'legal', icone: 'fa-hands-helping' },
      { texto: 'Foi acusado injustamente de algo, mas conseguiu provar inocência.', raridade: 'raro', felicidade: -10, reputation: 5, categoria: 'legal', icone: 'fa-gavel' }
    ],

    // Social Media/News flavor events
    social: [
      { texto: 'Seu post nas redes sociais viralizou!', raridade: 'raro', felicidade: 25, reputation: 20, categoria: 'social', icone: 'fa-fire' },
      { texto: 'Recebeu muitos comentários negativos online.', raridade: 'comum', felicidade: -15, mood: -10, categoria: 'social', icone: 'fa-comment-slash' },
      { texto: 'Fez um novo amigo pela internet.', raridade: 'comum', felicidade: 10, categoria: 'social', icone: 'fa-user-plus' },
      { texto: 'Seu vídeo alcançou 1 milhão de views!', raridade: 'epico', felicidade: 40, reputation: 30, money: 5000, categoria: 'social', icone: 'fa-video' },
      { texto: 'Foi bloqueado por alguém nas redes sociais.', raridade: 'comum', felicidade: -5, mood: -5, categoria: 'social', icone: 'fa-user-slash' }
    ],

    // Random windfalls/setbacks
    aleatorios: [
      { texto: 'Teve um dia incrível sem razão aparente!', raridade: 'comum', felicidade: 15, mood: 15, categoria: 'aleatorio', icone: 'fa-smile-beam' },
      { texto: 'Acordou com o pé esquerdo hoje...', raridade: 'comum', felicidade: -5, mood: -10, categoria: 'aleatorio', icone: 'fa-frown' },
      { texto: 'Ganhou um prêmio inesperado!', raridade: 'raro', felicidade: 30, money: 3000, categoria: 'aleatorio', icone: 'fa-gift' },
      { texto: 'Seu celular quebrou e precisa comprar outro.', raridade: 'raro', felicidade: -20, money: -1500, categoria: 'aleatorio', icone: 'fa-mobile-alt' },
      { texto: 'Encontrou um objeto de valor perdido há muito tempo!', raridade: 'raro', felicidade: 20, money: 500, categoria: 'aleatorio', icone: 'fa-search' }
    ]
  },

  // === EVENT RARITY WEIGHTS ===
  raridadePesos: {
    comum: 70,
    raro: 25,
    epico: 5
  },

  // === SHOPS - CARS (Real brands/models) ===
  lojas: {
    carros: [
      // Luxury
      { marca: 'Ferrari', modelo: 'F8 Tributo', ano: 2023, preco: 3500000, tipo: 'esportivo', stats: { reputation: 50, mood: 30 }, raridade: 'luxo' },
      { marca: 'Ferrari', modelo: '488 GTB', ano: 2022, preco: 3000000, tipo: 'esportivo', stats: { reputation: 45, mood: 25 }, raridade: 'luxo' },
      { marca: 'Lamborghini', modelo: 'Huracán', ano: 2023, preco: 3200000, tipo: 'esportivo', stats: { reputation: 48, mood: 28 }, raridade: 'luxo' },
      { marca: 'Porsche', modelo: '911 Turbo S', ano: 2023, preco: 1800000, tipo: 'esportivo', stats: { reputation: 40, mood: 25 }, raridade: 'premium' },
      { marca: 'Mercedes-Benz', modelo: 'S-Class', ano: 2023, preco: 800000, tipo: 'sedan', stats: { reputation: 35, mood: 20 }, raridade: 'premium' },
      { marca: 'BMW', modelo: 'M5', ano: 2023, preco: 900000, tipo: 'sedan', stats: { reputation: 35, mood: 20 }, raridade: 'premium' },
      { marca: 'Audi', modelo: 'RS6', ano: 2023, preco: 850000, tipo: 'wagon', stats: { reputation: 33, mood: 18 }, raridade: 'premium' },
      
      // Mid-range
      { marca: 'Toyota', modelo: 'Corolla', ano: 2023, preco: 130000, tipo: 'sedan', stats: { reputation: 10, mood: 8 }, raridade: 'comum' },
      { marca: 'Honda', modelo: 'Civic', ano: 2023, preco: 150000, tipo: 'sedan', stats: { reputation: 12, mood: 10 }, raridade: 'comum' },
      { marca: 'Volkswagen', modelo: 'Jetta', ano: 2023, preco: 140000, tipo: 'sedan', stats: { reputation: 10, mood: 8 }, raridade: 'comum' },
      { marca: 'Ford', modelo: 'Fusion', ano: 2022, preco: 135000, tipo: 'sedan', stats: { reputation: 10, mood: 8 }, raridade: 'comum' },
      { marca: 'Chevrolet', modelo: 'Cruze', ano: 2023, preco: 125000, tipo: 'sedan', stats: { reputation: 9, mood: 7 }, raridade: 'comum' },
      { marca: 'Hyundai', modelo: 'Elantra', ano: 2023, preco: 120000, tipo: 'sedan', stats: { reputation: 9, mood: 7 }, raridade: 'comum' },
      
      // Budget
      { marca: 'Volkswagen', modelo: 'Gol', ano: 2023, preco: 60000, tipo: 'hatch', stats: { reputation: 5, mood: 5 }, raridade: 'basico' },
      { marca: 'Fiat', modelo: 'Uno', ano: 2023, preco: 55000, tipo: 'hatch', stats: { reputation: 5, mood: 5 }, raridade: 'basico' },
      { marca: 'Chevrolet', modelo: 'Onix', ano: 2023, preco: 70000, tipo: 'hatch', stats: { reputation: 6, mood: 6 }, raridade: 'basico' },
      { marca: 'Renault', modelo: 'Kwid', ano: 2023, preco: 50000, tipo: 'hatch', stats: { reputation: 4, mood: 5 }, raridade: 'basico' }
    ],

    // === PHONES (Real brands/models) ===
    celulares: [
      // Flagship
      { marca: 'Apple', modelo: 'iPhone 15 Pro Max', ano: 2023, preco: 10000, stats: { reputation: 20, mood: 15 }, categoria: 'flagship' },
      { marca: 'Apple', modelo: 'iPhone 15 Pro', ano: 2023, preco: 9000, stats: { reputation: 18, mood: 14 }, categoria: 'flagship' },
      { marca: 'Samsung', modelo: 'Galaxy S23 Ultra', ano: 2023, preco: 8500, stats: { reputation: 18, mood: 13 }, categoria: 'flagship' },
      { marca: 'Samsung', modelo: 'Galaxy Z Fold 5', ano: 2023, preco: 12000, stats: { reputation: 25, mood: 18 }, categoria: 'flagship' },
      
      // Mid-range
      { marca: 'Samsung', modelo: 'Galaxy A54', ano: 2023, preco: 2500, stats: { reputation: 8, mood: 6 }, categoria: 'intermediario' },
      { marca: 'Xiaomi', modelo: 'Redmi Note 12 Pro', ano: 2023, preco: 2000, stats: { reputation: 7, mood: 6 }, categoria: 'intermediario' },
      { marca: 'Motorola', modelo: 'Moto G Power', ano: 2023, preco: 1800, stats: { reputation: 6, mood: 5 }, categoria: 'intermediario' },
      { marca: 'Xiaomi', modelo: 'Poco F5', ano: 2023, preco: 2200, stats: { reputation: 8, mood: 6 }, categoria: 'intermediario' },
      
      // Budget
      { marca: 'Motorola', modelo: 'Moto E32', ano: 2023, preco: 800, stats: { reputation: 3, mood: 3 }, categoria: 'basico' },
      { marca: 'Nokia', modelo: 'G20', ano: 2022, preco: 900, stats: { reputation: 3, mood: 3 }, categoria: 'basico' },
      { marca: 'LG', modelo: 'K62', ano: 2022, preco: 1000, stats: { reputation: 4, mood: 3 }, categoria: 'basico' }
    ],

    // === PCs/NOTEBOOKS (Real brands/models) ===
    computadores: [
      // High-end Gaming/Workstation
      { marca: 'Apple', modelo: 'MacBook Pro M3 Max 16"', ano: 2023, tipo: 'notebook', preco: 35000, specs: 'M3 Max, 64GB RAM, 2TB SSD', stats: { skill: 30, reputation: 25 }, categoria: 'premium' },
      { marca: 'Dell', modelo: 'Alienware Aurora R15', ano: 2023, tipo: 'desktop', preco: 25000, specs: 'RTX 4090, i9-13900K, 64GB', stats: { skill: 35, reputation: 20 }, categoria: 'premium' },
      { marca: 'MSI', modelo: 'Titan GT77', ano: 2023, tipo: 'notebook', preco: 30000, specs: 'RTX 4090, i9-13980HX, 64GB', stats: { skill: 35, reputation: 22 }, categoria: 'premium' },
      { marca: 'Asus', modelo: 'ROG Strix Scar 18', ano: 2023, tipo: 'notebook', preco: 22000, specs: 'RTX 4080, i9-13980HX, 32GB', stats: { skill: 30, reputation: 18 }, categoria: 'premium' },
      
      // Mid-range
      { marca: 'Lenovo', modelo: 'IdeaPad Gaming 3', ano: 2023, tipo: 'notebook', preco: 5500, specs: 'RTX 3050, Ryzen 5, 16GB', stats: { skill: 15, reputation: 8 }, categoria: 'intermediario' },
      { marca: 'HP', modelo: 'Pavilion Gaming', ano: 2023, tipo: 'desktop', preco: 6000, specs: 'GTX 1660, i5-12400, 16GB', stats: { skill: 15, reputation: 7 }, categoria: 'intermediario' },
      { marca: 'Acer', modelo: 'Nitro 5', ano: 2023, tipo: 'notebook', preco: 5000, specs: 'RTX 3050, i5-12500H, 16GB', stats: { skill: 14, reputation: 7 }, categoria: 'intermediario' },
      { marca: 'Dell', modelo: 'Inspiron 15', ano: 2023, tipo: 'notebook', preco: 4000, specs: 'Intel Iris Xe, i5-1235U, 8GB', stats: { skill: 10, reputation: 5 }, categoria: 'intermediario' },
      
      // Budget
      { marca: 'Lenovo', modelo: 'IdeaPad 3', ano: 2023, tipo: 'notebook', preco: 2500, specs: 'Intel UHD, i3-1215U, 8GB', stats: { skill: 5, reputation: 3 }, categoria: 'basico' },
      { marca: 'HP', modelo: 'Essential', ano: 2023, tipo: 'desktop', preco: 2000, specs: 'Intel UHD, i3-12100, 8GB', stats: { skill: 5, reputation: 2 }, categoria: 'basico' }
    ],

    // === PC COMPONENTS ===
    componentes: [
      // GPUs
      { tipo: 'gpu', marca: 'Nvidia', modelo: 'RTX 4090', preco: 15000, stats: { skill: 25 } },
      { tipo: 'gpu', marca: 'Nvidia', modelo: 'RTX 4080', preco: 11000, stats: { skill: 20 } },
      { tipo: 'gpu', marca: 'Nvidia', modelo: 'RTX 4070', preco: 5500, stats: { skill: 15 } },
      { tipo: 'gpu', marca: 'AMD', modelo: 'RX 7900 XTX', preco: 9000, stats: { skill: 20 } },
      { tipo: 'gpu', marca: 'AMD', modelo: 'RX 7800 XT', preco: 5000, stats: { skill: 14 } },
      
      // Peripherals
      { tipo: 'teclado', marca: 'Razer', modelo: 'BlackWidow V4 Pro', preco: 1500, stats: { skill: 5, mood: 5 } },
      { tipo: 'mouse', marca: 'Logitech', modelo: 'G Pro X Superlight', preco: 800, stats: { skill: 3, mood: 3 } },
      { tipo: 'headset', marca: 'Corsair', modelo: 'Virtuoso RGB', preco: 1200, stats: { skill: 4, mood: 4 } },
      { tipo: 'monitor', marca: 'LG', modelo: 'UltraGear 27" 240Hz', preco: 2500, stats: { skill: 8, mood: 6 } }
    ],

    // === HOUSES (Real cities) ===
    casas: [
      { cidade: 'São Paulo', bairro: 'Jardins', tipo: 'Apartamento', quartos: 3, preco: 2000000, stats: { reputation: 30, mood: 20 } },
      { cidade: 'São Paulo', bairro: 'Vila Madalena', tipo: 'Casa', quartos: 4, preco: 2500000, stats: { reputation: 35, mood: 25 } },
      { cidade: 'Rio de Janeiro', bairro: 'Copacabana', tipo: 'Apartamento', quartos: 2, preco: 1500000, stats: { reputation: 25, mood: 20 } },
      { cidade: 'Rio de Janeiro', bairro: 'Leblon', tipo: 'Cobertura', quartos: 4, preco: 5000000, stats: { reputation: 50, mood: 35 } },
      { cidade: 'Brasília', bairro: 'Lago Sul', tipo: 'Casa', quartos: 5, preco: 3000000, stats: { reputation: 40, mood: 28 } },
      { cidade: 'Curitiba', bairro: 'Batel', tipo: 'Apartamento', quartos: 3, preco: 800000, stats: { reputation: 20, mood: 15 } },
      { cidade: 'Porto Alegre', bairro: 'Moinhos de Vento', tipo: 'Apartamento', quartos: 2, preco: 700000, stats: { reputation: 18, mood: 13 } },
      { cidade: 'Salvador', bairro: 'Barra', tipo: 'Casa', quartos: 3, preco: 900000, stats: { reputation: 22, mood: 18 } }
    ],

    // === TRAVEL DESTINATIONS ===
    viagens: [
      { destino: 'Paris', pais: 'França', duracao: 7, preco: 15000, stats: { mood: 30, reputation: 15 } },
      { destino: 'Tóquio', pais: 'Japão', duracao: 10, preco: 20000, stats: { mood: 35, reputation: 18 } },
      { destino: 'Nova York', pais: 'EUA', duracao: 7, preco: 12000, stats: { mood: 28, reputation: 14 } },
      { destino: 'Cancún', pais: 'México', duracao: 5, preco: 8000, stats: { mood: 25, reputation: 10 } },
      { destino: 'Fernando de Noronha', pais: 'Brasil', duracao: 5, preco: 7000, stats: { mood: 30, reputation: 12 } },
      { destino: 'Roma', pais: 'Itália', duracao: 7, preco: 14000, stats: { mood: 28, reputation: 14 } },
      { destino: 'Dubai', pais: 'EAU', duracao: 7, preco: 18000, stats: { mood: 32, reputation: 20 } }
    ]
  },

  // === COMPANIES & JOBS ===
  empresas: [
    { nome: 'Google', setor: 'Tecnologia', vagas: ['Engenheiro Software', 'Designer UX', 'Gerente Produto'] },
    { nome: 'Microsoft', setor: 'Tecnologia', vagas: ['Desenvolvedor', 'Analista Dados', 'Consultor Cloud'] },
    { nome: 'Apple', setor: 'Tecnologia', vagas: ['Desenvolvedor iOS', 'Designer', 'Especialista Suporte'] },
    { nome: 'Amazon', setor: 'E-commerce', vagas: ['Analista Logística', 'Desenvolvedor Web', 'Gerente Vendas'] },
    { nome: 'Petrobras', setor: 'Energia', vagas: ['Engenheiro Petróleo', 'Geólogo', 'Técnico Segurança'] },
    { nome: 'Banco do Brasil', setor: 'Financeiro', vagas: ['Gerente Agência', 'Analista Crédito', 'Caixa'] },
    { nome: 'Ambev', setor: 'Bebidas', vagas: ['Representante Vendas', 'Analista Marketing', 'Supervisor Produção'] },
    { nome: 'Vale', setor: 'Mineração', vagas: ['Engenheiro Minas', 'Operador Equipamento', 'Analista Ambiental'] }
  ],

  // === CHOICE EVENTS ===
  // Events with 2-4 choice options and consequences
  eventosEscolha: [
    // Career choices
    {
      id: 'job_offer',
      idade: 18,
      texto: 'Você recebeu uma oferta de emprego, mas o salário é baixo e o trabalho parece entediante. O que você faz?',
      icone: 'fa-briefcase',
      opcoes: [
        {
          texto: 'Aceitar o emprego',
          consequencias: { money: 2000, mood: -10, skill: 5 },
          resultado: 'Você aceitou o emprego. O salário ajuda, mas o trabalho é monótono.'
        },
        {
          texto: 'Recusar e procurar algo melhor',
          consequencias: { mood: 5, skill: 10 },
          resultado: 'Você recusou e continuou procurando. Sua autoestima melhorou!'
        },
        {
          texto: 'Negociar um salário maior',
          consequencias: { money: 3500, reputation: 10, skill: 5 },
          resultado: 'Você negociou e conseguiu um salário 75% maior! Boa negociação.',
          chance: 0.5
        }
      ]
    },
    {
      id: 'study_choice',
      idade: 15,
      texto: 'Você tem uma prova importante amanhã. O que você vai fazer?',
      icone: 'fa-book',
      opcoes: [
        {
          texto: 'Estudar a noite toda',
          consequencias: { skill: 15, health: -10, mood: -5 },
          resultado: 'Você estudou muito e tirou nota alta, mas está exausto!'
        },
        {
          texto: 'Estudar algumas horas e dormir',
          consequencias: { skill: 10, health: 5 },
          resultado: 'Você fez um bom equilíbrio! Dormiu bem e ainda foi bem na prova.'
        },
        {
          texto: 'Não estudar e sair com amigos',
          consequencias: { mood: 20, skill: -10, reputation: -5 },
          resultado: 'Você se divertiu muito, mas foi mal na prova...'
        }
      ]
    },
    {
      id: 'bully',
      idade: 12,
      texto: 'Um colega está sendo intimidado na escola. Como você reage?',
      icone: 'fa-hand-paper',
      opcoes: [
        {
          texto: 'Defender o colega',
          consequencias: { reputation: 20, mood: 10, health: -5 },
          resultado: 'Você defendeu seu colega! Todos te admiram, mas levou uns empurrões.'
        },
        {
          texto: 'Chamar um professor',
          consequencias: { reputation: 10, mood: 5 },
          resultado: 'Você chamou um adulto. O bullying parou e todos ficaram seguros.'
        },
        {
          texto: 'Ignorar a situação',
          consequencias: { mood: -15, reputation: -10 },
          resultado: 'Você ignorou... Não se sente bem com isso.'
        },
        {
          texto: 'Conversar com o agressor',
          consequencias: { reputation: 15, skill: 10 },
          resultado: 'Você conversou com calma. O agressor entendeu e parou!',
          chance: 0.6
        }
      ]
    },
    {
      id: 'money_found',
      idade: 10,
      texto: 'Você encontrou uma carteira com R$ 500 na rua. O que você faz?',
      icone: 'fa-wallet',
      opcoes: [
        {
          texto: 'Ficar com o dinheiro',
          consequencias: { money: 500, mood: -10, reputation: -15 },
          resultado: 'Você ficou com o dinheiro, mas se sente culpado...'
        },
        {
          texto: 'Devolver ao dono',
          consequencias: { reputation: 25, mood: 20, money: 100 },
          resultado: 'Você devolveu! O dono te deu uma recompensa e ficou muito grato.'
        },
        {
          texto: 'Levar para a polícia',
          consequencias: { reputation: 20, mood: 15 },
          resultado: 'Você levou para a polícia. Fez a coisa certa!'
        }
      ]
    },
    {
      id: 'sick_parent',
      idade: 14,
      texto: 'Seu pai/mãe está doente e precisa ir ao hospital, mas você tem uma festa importante. O que você faz?',
      icone: 'fa-hospital',
      opcoes: [
        {
          texto: 'Ir para a festa',
          consequencias: { mood: 15, reputation: -20 },
          resultado: 'Você foi para a festa, mas sua família ficou decepcionada.'
        },
        {
          texto: 'Ficar e ajudar',
          consequencias: { reputation: 15, mood: -5, skill: 5 },
          resultado: 'Você ficou e ajudou. Sua família está orgulhosa de você!'
        },
        {
          texto: 'Ir rápido ao hospital e depois à festa',
          consequencias: { mood: 10, reputation: 10 },
          resultado: 'Você conseguiu fazer os dois! Equilíbrio perfeito.',
          chance: 0.7
        }
      ]
    },
    {
      id: 'love_triangle',
      idade: 16,
      texto: 'Duas pessoas te convidaram para sair no mesmo dia. Como você resolve isso?',
      icone: 'fa-heart',
      opcoes: [
        {
          texto: 'Sair com a primeira pessoa',
          consequencias: { mood: 15, reputation: 5 },
          resultado: 'Você saiu com quem te chamou primeiro. Foi uma noite legal!'
        },
        {
          texto: 'Sair com a segunda pessoa',
          consequencias: { mood: 15, reputation: -5 },
          resultado: 'Você saiu com a segunda pessoa, mas a primeira ficou chateada.'
        },
        {
          texto: 'Ser honesto e reagendar',
          consequencias: { reputation: 15, mood: 5, skill: 10 },
          resultado: 'Você foi honesto! Todos respeitaram sua sinceridade.'
        },
        {
          texto: 'Marcar um encontro triplo',
          consequencias: { mood: -10, reputation: -15 },
          resultado: 'Foi muito constrangedor... Ninguém curtiu a ideia.'
        }
      ]
    },
    {
      id: 'pet_choice',
      idade: 8,
      texto: 'Seus pais deixaram você escolher um animal de estimação! Qual você quer?',
      icone: 'fa-paw',
      opcoes: [
        {
          texto: 'Cachorro',
          consequencias: { mood: 25, health: 10 },
          resultado: 'Você ganhou um cachorro! Melhor amigo para sempre! 🐕'
        },
        {
          texto: 'Gato',
          consequencias: { mood: 20, health: 5 },
          resultado: 'Você ganhou um gato! Companheiro fofo e independente! 🐱'
        },
        {
          texto: 'Hamster',
          consequencias: { mood: 15, skill: 5 },
          resultado: 'Você ganhou um hamster! Pequeno e adorável! 🐹'
        },
        {
          texto: 'Peixe',
          consequencias: { mood: 10, health: 5, skill: 5 },
          resultado: 'Você ganhou um aquário! Relaxante e bonito! 🐠'
        }
      ]
    },
    {
      id: 'diet_choice',
      idade: 20,
      texto: 'Você quer melhorar sua saúde. Qual dieta você vai seguir?',
      icone: 'fa-apple-alt',
      opcoes: [
        {
          texto: 'Dieta balanceada',
          consequencias: { health: 20, mood: 10, money: -500 },
          resultado: 'Você seguiu uma dieta balanceada! Saúde e energia melhoraram.'
        },
        {
          texto: 'Dieta radical',
          consequencias: { health: 10, mood: -15, money: -800 },
          resultado: 'A dieta foi muito restritiva... Você perdeu peso mas está cansado.'
        },
        {
          texto: 'Só exercícios',
          consequencias: { health: 25, skill: 5, money: -200 },
          resultado: 'Você focou em exercícios! Está em ótima forma!'
        },
        {
          texto: 'Não fazer nada',
          consequencias: { mood: 5, health: -5 },
          resultado: 'Você não mudou nada... Tudo continua igual.'
        }
      ]
    },
    {
      id: 'investment',
      idade: 25,
      texto: 'Você tem R$ 5.000 guardados. Onde você vai investir?',
      icone: 'fa-chart-line',
      opcoes: [
        {
          texto: 'Bolsa de valores',
          consequencias: { money: 3000, skill: 10 },
          resultado: 'Você investiu na bolsa e teve lucro! Mas foi arriscado.',
          chance: 0.6
        },
        {
          texto: 'Poupança',
          consequencias: { money: 500, mood: 5 },
          resultado: 'Você colocou na poupança. Seguro, mas rendimento baixo.'
        },
        {
          texto: 'Curso profissionalizante',
          consequencias: { skill: 30, reputation: 10, money: -3000 },
          resultado: 'Você investiu em si mesmo! Suas habilidades aumentaram muito.'
        },
        {
          texto: 'Viagem',
          consequencias: { mood: 40, health: 10, money: -5000 },
          resultado: 'Você viajou e viveu experiências incríveis! Valeu cada centavo.'
        }
      ]
    },
    {
      id: 'fight',
      idade: 17,
      texto: 'Alguém está te provocando e quer brigar. O que você faz?',
      icone: 'fa-fist-raised',
      opcoes: [
        {
          texto: 'Brigar',
          consequencias: { reputation: -20, health: -15, mood: -10 },
          resultado: 'Você brigou e se machucou. Todos perderam.'
        },
        {
          texto: 'Ignorar e ir embora',
          consequencias: { mood: -5, reputation: 5, skill: 5 },
          resultado: 'Você foi maduro e se afastou. Escolha sábia!'
        },
        {
          texto: 'Conversar e resolver',
          consequencias: { reputation: 15, skill: 10, mood: 10 },
          resultado: 'Você conversou e resolveu pacificamente. Todos te respeitam!',
          chance: 0.5
        }
      ]
    }
  ],

  profissoes: [
    { nome: 'Desenvolvedor Web', salarioBase: 8000, requisitos: { skill: 40 }, setor: 'Tecnologia' },
    { nome: 'Designer Gráfico', salarioBase: 5000, requisitos: { skill: 30 }, setor: 'Criativo' },
    { nome: 'Advogado', salarioBase: 10000, requisitos: { skill: 60 }, setor: 'Jurídico' },
    { nome: 'Médico', salarioBase: 15000, requisitos: { skill: 80 }, setor: 'Saúde' },
    { nome: 'Professor', salarioBase: 4000, requisitos: { skill: 40 }, setor: 'Educação' },
    { nome: 'Engenheiro', salarioBase: 12000, requisitos: { skill: 70 }, setor: 'Engenharia' },
    { nome: 'Vendedor', salarioBase: 3000, requisitos: { skill: 20 }, setor: 'Vendas' },
    { nome: 'Jogador Futebol', salarioBase: 20000, requisitos: { health: 70, skill: 50 }, setor: 'Esportes' },
    { nome: 'Jogador Basquete', salarioBase: 18000, requisitos: { health: 70, skill: 50 }, setor: 'Esportes' },
    { nome: 'YouTuber', salarioBase: 5000, requisitos: { reputation: 40 }, setor: 'Mídia' },
    { nome: 'Influencer', salarioBase: 7000, requisitos: { reputation: 50 }, setor: 'Mídia' },
    { nome: 'Chef de Cozinha', salarioBase: 6000, requisitos: { skill: 50 }, setor: 'Gastronomia' },
    { nome: 'Arquiteto', salarioBase: 9000, requisitos: { skill: 60 }, setor: 'Construção' },
    { nome: 'Contador', salarioBase: 6000, requisitos: { skill: 50 }, setor: 'Financeiro' }
  ],

  // === ACTIVITIES ===
  atividades: {
    exercicio: [
      { nome: 'Academia', icone: 'fa-dumbbell', custo: 150, health: 10, mood: 5 },
      { nome: 'Corrida no Parque', icone: 'fa-running', custo: 0, health: 8, mood: 8 },
      { nome: 'Natação', icone: 'fa-swimmer', custo: 100, health: 12, mood: 6 },
      { nome: 'Yoga', icone: 'fa-spa', custo: 80, health: 6, mood: 12 },
      { nome: 'Ciclismo', icone: 'fa-bicycle', custo: 50, health: 10, mood: 10 }
    ],
    lazer: [
      { nome: 'Cinema', icone: 'fa-film', custo: 50, mood: 15, felicidade: 10 },
      { nome: 'Shopping', icone: 'fa-shopping-bag', custo: 200, mood: 12, reputation: 5 },
      { nome: 'Restaurante', icone: 'fa-utensils', custo: 150, mood: 18, health: 5 },
      { nome: 'Balada', icone: 'fa-glass-martini-alt', custo: 300, mood: 20, reputation: 8 },
      { nome: 'Viajar para praia', icone: 'fa-umbrella-beach', custo: 1000, mood: 30, health: 10 }
    ],
    estudo: [
      { nome: 'Curso Online', icone: 'fa-laptop', custo: 200, skill: 15 },
      { nome: 'Ler Livro', icone: 'fa-book', custo: 40, skill: 10 },
      { nome: 'Estudar Idioma', icone: 'fa-language', custo: 300, skill: 12 }
    ]
  },

  // === INTERACTION MESSAGES ===
  mensagensChat: {
    saudacoes: ['Oi!', 'E aí?', 'Olá!', 'Fala!', 'Eae!'],
    positivas: ['Você é incrível!', 'Adoro conversar com você!', 'Que legal!', 'Nossa, sério?', 'Haha, que legal!'],
    negativas: ['Não sei...', 'Talvez...', 'Não tenho certeza.', 'Hmm...'],
    flerte: ['Você está linda(o) hoje!', 'Que sorriso bonito!', 'Adorei nosso papo 😊', 'Quer sair comigo?']
  },

  conversasPresencial: {
    familia: [
      'Como foi seu dia?',
      'Precisa de alguma coisa?',
      'Te amo!',
      'Obrigado por tudo.'
    ],
    amigos: [
      'Vamos sair hoje?',
      'E aquele jogo ontem?',
      'Tá fazendo o que mais tarde?',
      'Já almoçou?'
    ]
  },

  // === FAMILY INTERACTIONS ===
  familia: {
    mae: {
      limiteMessada: { pobre: 100, media: 500, alta: 2000, rica: 10000 }
    },
    pai: {
      limiteMessada: { pobre: 100, media: 500, alta: 2000, rica: 10000 }
    }
  },

  interacoesFamilia: {
    pedirDinheiro: {
      opcoes: [
        { texto: 'R$ 50', valor: 50, dificuldade: 20 },
        { texto: 'R$ 200', valor: 200, dificuldade: 40 },
        { texto: 'R$ 500', valor: 500, dificuldade: 60 },
        { texto: 'R$ 1000', valor: 1000, dificuldade: 80 }
      ],
      respostas: {
        sucesso: [
          'Claro, aqui está!',
          'Tudo bem, mas use com responsabilidade.',
          'Ok, pode pegar.'
        ],
        falha: [
          'Não agora, você já pediu demais.',
          'Você precisa aprender a economizar.',
          'Dessa vez não posso.'
        ]
      }
    }
  },

  // === EMPLOYMENT DATA ===
  empregos: {
    entrada: [
      { nome: 'Atendente Loja', salario: 1500, requisitos: { idade: 18 } },
      { nome: 'Caixa Supermercado', salario: 1600, requisitos: { idade: 18 } },
      { nome: 'Entregador', salario: 1800, requisitos: { idade: 18 } },
      { nome: 'Recepcionista', salario: 1700, requisitos: { idade: 18 } },
      { nome: 'Auxiliar Administrativo', salario: 2000, requisitos: { idade: 18, skill: 20 } }
    ]
  },

  // === SOCIAL NEWS FLAVOR ===
  noticiasSociais: [
    'Nova lei aprovada no congresso!',
    'Cientistas descobrem nova espécie!',
    'Time local vence campeonato!',
    'Festival de música anunciado!',
    'Previsão de chuva para amanhã.'
  ]
};
