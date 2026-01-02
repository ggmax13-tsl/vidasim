# VidaSim - Simulador de Vida

Um simulador de vida completo e imersivo construído com HTML, CSS e JavaScript puro. Viva uma vida virtual desde o nascimento até a morte, tomando decisões que afetam sua trajetória.

## 🎮 Características

### Gameplay Core
- **Início de Vida Customizável**: Escolha nome, gênero, classe social, país e cidade
- **Sistema de Envelhecimento**: Progrida ano a ano, com eventos e mudanças
- **Vida Aleatória**: Comece com características geradas aleatoriamente
- **Morte e Game Over**: A vida termina por saúde ou idade avançada

### Atributos e Stats
- **Health (Saúde)**: Afetada por atividades, eventos e idade
- **Mood (Humor)**: Influenciada por interações sociais e eventos
- **Money (Dinheiro)**: Ganhe através de empregos e perca com compras
- **Reputation (Reputação)**: Construa sua imagem pública
- **Skill (Habilidade)**: Desenvolva através de estudos e trabalho
- **Age (Idade)**: Avança anualmente com eventos apropriados

### Relacionamentos
- **Família**: Interaja com pais, converse, peça dinheiro, abrace
- **Amigos e Conhecidos**: Conheça novas pessoas, converse e desenvolva amizades
- **Namoro**: Permitido a partir dos 10 anos; flerte e desenvolva relacionamentos
- **Sistema de Afinidade**: Cada relacionamento tem um nível de afinidade que afeta interações
- **Chat no Celular**: Envie mensagens para seus contatos via telefone
- **Conversas Presenciais**: Interações diretas com pessoas

### Eventos Dinâmicos
- **Categorias**: Família, Educação, Finanças, Saúde, Hobbies, Legal, Social, Aleatórios
- **Raridades**: Comum (70%), Raro (25%), Épico (5%)
- **Densidade Configurável**: Baixa, Média, Alta (nas configurações)
- **Efeitos Múltiplos**: Eventos podem afetar vários atributos simultaneamente
- **Idade Apropriada**: Eventos filtrados pela idade do personagem

### Lojas e Compras (Catálogos Reais)

#### 🚗 Carros
Marcas reais como:
- **Luxo**: Ferrari (F8 Tributo, 488 GTB), Lamborghini (Huracán), Porsche (911 Turbo S)
- **Premium**: Mercedes-Benz (S-Class), BMW (M5), Audi (RS6)
- **Médio**: Toyota (Corolla), Honda (Civic), Volkswagen (Jetta), Ford (Fusion)
- **Econômico**: Volkswagen (Gol), Fiat (Uno), Chevrolet (Onix), Renault (Kwid)

#### 📱 Celulares
Marcas reais como:
- **Flagship**: Apple (iPhone 15 Pro Max, Pro), Samsung (Galaxy S23 Ultra, Z Fold 5)
- **Intermediário**: Samsung (Galaxy A54), Xiaomi (Redmi Note 12 Pro, Poco F5), Motorola (Moto G Power)
- **Básico**: Motorola (Moto E32), Nokia (G20), LG (K62)

#### 💻 Computadores
Marcas reais como:
- **Premium Gaming/Work**: Apple (MacBook Pro M3 Max), Dell (Alienware Aurora), MSI (Titan GT77), Asus (ROG Strix Scar)
- **Intermediário**: Lenovo (IdeaPad Gaming 3), HP (Pavilion Gaming), Acer (Nitro 5), Dell (Inspiron 15)
- **Básico**: Lenovo (IdeaPad 3), HP (Essential)
- **Componentes**: GPUs Nvidia/AMD, Periféricos Razer/Logitech/Corsair

#### 🏠 Casas
Imóveis em cidades reais brasileiras:
- São Paulo (Jardins, Vila Madalena)
- Rio de Janeiro (Copacabana, Leblon)
- Brasília (Lago Sul)
- Curitiba (Batel)
- Porto Alegre (Moinhos de Vento)
- Salvador (Barra)

#### ✈️ Viagens
Destinos internacionais e nacionais:
- Paris (França), Tóquio (Japão), Nova York (EUA)
- Cancún (México), Roma (Itália), Dubai (EAU)
- Fernando de Noronha (Brasil)

### Trabalho e Carreira
- **Profissões Diversas**: 
  - Tecnologia: Desenvolvedor Web, Designer Gráfico
  - Saúde: Médico
  - Educação: Professor
  - Esportes: Jogador de Futebol, Jogador de Basquete
  - Mídia: YouTuber, Influencer
  - Outros: Advogado, Engenheiro, Chef, Arquiteto, Contador
- **Requisitos**: Skill, saúde ou reputação mínima
- **Salários Anuais**: Variam por profissão
- **Empresas**: Google, Microsoft, Apple, Amazon, Petrobras, Banco do Brasil, Ambev, Vale
- **Criar Empresas**: Placeholder para futuro

### Atividades
- **Exercícios**: Academia, corrida, natação, yoga, ciclismo (melhoram saúde)
- **Lazer**: Cinema, shopping, restaurante, balada, viagens (melhoram humor)
- **Estudo**: Cursos online, leitura, idiomas (melhoram habilidade)

### Interface Mobile-First
- **Barra Superior Fixa**: Nome do jogador, idade, cidade, botões de configuração e save
- **Grid de Stats Responsivo**: 6 cards com ícones e barras de progresso
- **Timeline com aria-live**: Histórico de eventos acessível
- **Barra Inferior de Ações**: 6 botões principais (Envelhecer, Família, Pessoas, Atividades, Trabalho, Lojas)
- **Padding Seguro**: Conteúdo não sobrepõe a barra inferior em mobile
- **Modais Responsivos**: Diálogos para ações, interações, resultados, chat, configurações

### Temas e Personalização
- **Tema Claro/Escuro**: Alternável nas configurações
- **Velocidade de Animação**: Lenta, Normal, Rápida
- **Densidade de Eventos**: Baixa, Média, Alta
- **Idioma**: Português (BR), Inglês (placeholder)
- **Modo Avançado/Hardcore**: Placeholders para expansão futura

### Sistema de Mensagens
- **Chat no Celular**: Interface de mensagens estilo WhatsApp
- **Conversas Contextuais**: Respostas baseadas em afinidade
- **Histórico Persistente**: Mensagens salvas por contato
- **Conversas Presenciais**: Ações de conversa diretas

### Persistência
- **LocalStorage**: Salva automático e manual
- **Tratamento Defensivo**: Try-catch em todas operações de storage
- **Reset de Progresso**: Opção nas configurações com confirmação
- **Verificação de Save**: Botão de carregar desabilitado se não houver save

### Visual e Animações
- **Splash Screen**: Animação de loading ao iniciar
- **Gradientes**: Em botões e elementos principais
- **Sombras**: Elevação em cards e modais
- **Transições Suaves**: Em todas interações
- **Cards Animados**: Efeito hover e entrada
- **Toast Notifications**: Feedback visual de ações

## 📁 Estrutura do Projeto

```
vidasim/
├── index.html      # Layout mobile-first com todas telas e modais
├── style.css       # Estilos com CSS variables para temas
├── dados.js        # Catálogos de dados (eventos, lojas, profissões)
├── game.js         # Lógica principal do jogo
└── README.md       # Esta documentação
```

## 🚀 Como Executar

1. Clone o repositório
2. Abra `index.html` em qualquer navegador moderno
3. Não requer build ou dependências externas

**Ou** use um servidor local:
```bash
# Python 3
python -m http.server 8000

# Node.js http-server
npx http-server
```

Acesse: `http://localhost:8000`

## 🏗️ Arquitetura

### dados.js
Contém todos os dados do jogo em estrutura JSON:
- **SAVE_KEY, SETTINGS_KEY**: Constantes para localStorage
- **settingsDefaults**: Configurações padrão
- **nomes, sobrenomes**: Nomes brasileiros por gênero
- **paises, cidades, linguas**: Localidades
- **eventos**: Array de eventos por categoria com raridades
- **raridadePesos**: Pesos para seleção aleatória ponderada
- **lojas**: Catálogos de carros, celulares, computadores, casas, viagens
- **empresas, profissoes**: Lista de trabalhos disponíveis
- **atividades**: Exercícios, lazer, estudo
- **mensagensChat, conversasPresencial**: Diálogos
- **familia, interacoesFamilia**: Dados de família
- **empregos**: Trabalhos de entrada
- **noticiasSociais**: Flavor text

### game.js - Principais Funções

#### Inicialização
- `initializeSettings()`: Carrega configurações padrão
- `loadSettings()`: Busca configurações do localStorage
- `saveSettings()`: Persiste configurações
- `applySettings()`: Aplica tema e animações

#### Gerenciamento de Telas
- `showScreen(id)`: Exibe tela específica
- `showMainMenu()`: Volta ao menu principal
- `checkSavedGame()`: Verifica se há save

#### Criação de Personagem
- `showCharacterCreation()`: Mostra tela de criação
- `startRandomLife()`: Vida aleatória
- `startCustomLife()`: Vida customizada
- `createCharacter(config)`: Cria objeto do jogador

#### Sistema de Jogo
- `startGame()`: Inicia partida
- `updateUI()`: Atualiza interface
- `updateStat(name, value, max)`: Atualiza stat individual
- `clamp(value, min, max)`: Limita valores

#### Eventos
- `addEvent(text, type, icon)`: Adiciona ao timeline
- `createEventElement(event)`: Cria DOM do evento
- `selectRandomEvent()`: Seleção ponderada por raridade
- `applyEventEffects(event)`: Aplica efeitos aos stats

#### Progressão
- `ageUp()`: Envelhece 1 ano, dispara eventos
- `die(cause)`: Termina jogo e mostra tela de game over

#### Persistência
- `saveGame()`: Salva no localStorage
- `loadGame()`: Carrega do localStorage
- `resetProgress()`: Limpa todos dados

#### Ações
- `showActions(category)`: Abre modal de ações
- `closeActionsModal()`: Fecha modal

#### Família
- `renderFamilyActions()`: Lista membros da família
- `interactWithFamily(member)`: Interação com pai/mãe
- `askForMoney(member)`: Pedir dinheiro
- `requestMoney(member, amount, difficulty)`: Executa pedido
- `chatWithFamily(member)`: Conversar
- `hugFamily(member)`: Abraçar

#### Relacionamentos
- `renderRelationshipActions()`: Lista relacionamentos
- `meetNewPerson()`: Conhecer nova pessoa
- `interactWithPerson(index)`: Interação com pessoa
- `talkToPerson(index)`: Conversar
- `flirtWithPerson(index)`: Flertar

#### Mensagens
- `openPhoneChat(index)`: Abre chat do celular
- `closePhoneModal()`: Fecha chat
- `sendMessage()`: Envia mensagem e gera resposta

#### Atividades
- `renderActivityActions()`: Lista atividades
- `doActivity(type, index)`: Realiza atividade

#### Trabalho
- `renderWorkActions()`: Lista empregos
- `checkJobRequirements(job)`: Verifica requisitos
- `applyForJob(index)`: Candidata-se a emprego
- `quitJob()`: Demite-se

#### Lojas
- `renderShopActions()`: Lista categorias de lojas
- `openShop(type)`: Abre loja específica
- `renderShopItems(container, type)`: Lista itens
- `buyItem(type, index)`: Compra item

#### Modais
- `showInteractionModal(title, actions)`: Modal genérico de interação
- `closeInteractionModal()`: Fecha modal
- `showResult(type, title, text, stats)`: Mostra resultado de ação
- `closeResultModal()`: Fecha resultado
- `showToast(message, type)`: Notificação toast

### style.css - Organização

#### CSS Variables
- `:root`: Tema light com cores, sombras, bordas
- `[data-theme="dark"]`: Override para tema dark

#### Componentes
- **Splash Screen**: Animação de loading
- **Screens**: Gerenciamento de telas
- **Main Menu**: Layout centralizado
- **Character Creation**: Formulário estilizado
- **Game Screen**: Layout principal do jogo
- **Top Bar**: Barra fixa superior
- **Stats Grid**: Grade responsiva de stats
- **Timeline**: Lista de eventos com aria-live
- **Bottom Bar**: Barra fixa inferior com ações
- **Modals**: Diálogos overlay
- **Action Items**: Lista de ações clicáveis
- **Settings**: Formulário de configurações
- **Result Modal**: Feedback de ações
- **Phone Modal**: Chat de mensagens
- **Game Over**: Tela de morte
- **Toast**: Notificações temporárias

#### Responsividade
- Mobile-first approach
- Breakpoint em 768px
- Grid adaptativo
- Font-sizes reduzidos em mobile

#### Acessibilidade
- `prefers-reduced-motion`: Desabilita animações
- ARIA labels no timeline
- Contraste adequado
- Focus states visíveis

## 🎯 Extensibilidade

O código está estruturado para fácil expansão:

### Adicionar Novos Eventos
Em `dados.js`, adicione ao array apropriado:
```javascript
DADOS.eventos.novaCategoria.push({
  texto: 'Descrição do evento',
  raridade: 'comum', // comum, raro, epico
  health: 10, // opcional
  mood: -5, // opcional
  money: 100, // opcional
  categoria: 'novaCategoria',
  icone: 'fa-icon-name'
});
```

### Adicionar Itens às Lojas
Em `dados.js`:
```javascript
DADOS.lojas.carros.push({
  marca: 'Tesla',
  modelo: 'Model S',
  ano: 2024,
  preco: 500000,
  tipo: 'sedan',
  stats: { reputation: 40, mood: 30 },
  raridade: 'premium'
});
```

### Adicionar Profissões
```javascript
DADOS.profissoes.push({
  nome: 'Astronauta',
  salarioBase: 50000,
  requisitos: { skill: 90, health: 85 },
  setor: 'Aeroespacial'
});
```

### Novos Stats
1. Adicione variável no `createCharacter()`
2. Crie card em `index.html`
3. Adicione color variable em `style.css`
4. Implemente `updateStat()` em `game.js`

### Modo Hardcore/Avançado
Implementação futura sugerida:
- Stats decaem mais rápido
- Eventos mais raros e impactantes
- Requisitos de trabalho mais altos
- Permadeath (sem carregar após morte)

## 🐛 Tratamento de Erros

- **Try-catch** em todas operações de localStorage
- **Validações** de entrada do usuário
- **Fallbacks** para dados faltantes
- **Console.error** para debug
- **Toasts** para feedback visual de erros

## 📱 Compatibilidade

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Android)

## 📝 Notas de Desenvolvimento

- **Sem Build Step**: HTML/CSS/JS puro, sem transpilação
- **Sem Dependências**: Apenas Font Awesome via CDN
- **Performance**: Timeline limitada a 50 eventos
- **Storage**: ~5MB de limite no localStorage
- **Animações**: Respeitam `prefers-reduced-motion`

## 🔮 Roadmap Futuro

- [ ] Sistema de conquistas
- [ ] Modo multiplayer (competição de vidas)
- [ ] Mais idiomas (EN, ES, FR)
- [ ] Modo hardcore funcional
- [ ] Exportar/importar save
- [ ] Gráficos de estatísticas ao longo da vida
- [ ] Sistema de educação expandido (faculdade, pós-graduação)
- [ ] Mais categorias de lojas (roupas, joias, pets)
- [ ] Sistema de saúde expandido (doenças específicas, tratamentos)
- [ ] Sistema legal expandido (crimes, prisão, julgamentos)
- [ ] Criação de empresas funcional
- [ ] Filhos e árvore genealógica
- [ ] Herança após morte

## 👥 Contribuindo

Este é um projeto educacional. Contribuições são bem-vindas:
1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto é open source e está disponível sob a licença MIT.

---

**VidaSim** - Viva uma vida inteira em minutos! 🎮
