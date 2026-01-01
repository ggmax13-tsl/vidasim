// ===== VIDASIM - GAME.JS =====
// Core game logic with state management, events, shops, messaging, and settings

// === GAME STATE ===
let player = null;
let gameStarted = false;
let settings = null;
let currentChatPerson = null;

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
  initializeSettings();
  loadSettings();
  applySettings();
  
  // Show splash screen
  showScreen('splash-screen');
  
  // Auto-hide splash after 2.5 seconds
  setTimeout(() => {
    showScreen('main-menu');
    checkSavedGame();
  }, 2500);
});

// === SETTINGS MANAGEMENT ===
function initializeSettings() {
  settings = {...DADOS.settingsDefaults};
}

function loadSettings() {
  try {
    const saved = localStorage.getItem(DADOS.SETTINGS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      settings = {...settings, ...parsed};
    }
  } catch (e) {
    console.error('Error loading settings:', e);
  }
}

function saveSettings() {
  try {
    localStorage.setItem(DADOS.SETTINGS_KEY, JSON.stringify(settings));
    showToast('Configurações salvas!', 'success');
  } catch (e) {
    console.error('Error saving settings:', e);
    showToast('Erro ao salvar configurações', 'error');
  }
}

function applySettings() {
  // Apply theme
  document.body.setAttribute('data-theme', settings.theme);
  
  // Apply animation speed
  document.body.classList.remove('anim-slow', 'anim-fast');
  if (settings.animationSpeed === 'slow') {
    document.body.classList.add('anim-slow');
  } else if (settings.animationSpeed === 'fast') {
    document.body.classList.add('anim-fast');
  }
  
  // Update UI elements
  if (document.getElementById('setting-theme')) {
    document.getElementById('setting-theme').value = settings.theme;
  }
  if (document.getElementById('setting-density')) {
    document.getElementById('setting-density').value = settings.eventDensity;
  }
  if (document.getElementById('setting-animation')) {
    document.getElementById('setting-animation').value = settings.animationSpeed;
  }
  if (document.getElementById('setting-language')) {
    document.getElementById('setting-language').value = settings.language;
  }
}

function changeTheme(theme) {
  settings.theme = theme;
  document.body.setAttribute('data-theme', theme);
  saveSettings();
}

function showSettings() {
  applySettings();
  document.getElementById('settings-modal').classList.add('active');
}

function closeSettings() {
  // Save all settings
  if (document.getElementById('setting-density')) {
    settings.eventDensity = document.getElementById('setting-density').value;
  }
  if (document.getElementById('setting-animation')) {
    settings.animationSpeed = document.getElementById('setting-animation').value;
  }
  if (document.getElementById('setting-language')) {
    settings.language = document.getElementById('setting-language').value;
  }
  saveSettings();
  applySettings();
  document.getElementById('settings-modal').classList.remove('active');
}

function confirmReset() {
  if (confirm('Tem certeza que deseja resetar todo o progresso? Esta ação não pode ser desfeita.')) {
    resetProgress();
  }
}

function resetProgress() {
  try {
    localStorage.removeItem(DADOS.SAVE_KEY);
    player = null;
    gameStarted = false;
    showToast('Progresso resetado!', 'success');
    setTimeout(() => {
      location.reload();
    }, 1000);
  } catch (e) {
    console.error('Error resetting progress:', e);
    showToast('Erro ao resetar progresso', 'error');
  }
}

// === SCREEN MANAGEMENT ===
function showScreen(screenId) {
  // Hide splash screen if showing
  const splashScreen = document.getElementById('splash-screen');
  if (splashScreen) {
    splashScreen.classList.remove('active');
  }
  
  // Hide all other screens
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  
  // Show target screen (can be splash or regular screen)
  const screen = document.getElementById(screenId);
  if (screen) {
    screen.classList.add('active');
  }
}

function showMainMenu() {
  showScreen('main-menu');
  checkSavedGame();
}

function checkSavedGame() {
  try {
    const saved = localStorage.getItem(DADOS.SAVE_KEY);
    const loadBtn = document.getElementById('btn-load');
    if (saved && loadBtn) {
      loadBtn.disabled = false;
    } else if (loadBtn) {
      loadBtn.disabled = true;
    }
  } catch (e) {
    console.error('Error checking saved game:', e);
  }
}

// === CHARACTER CREATION ===
function showCharacterCreation() {
  showScreen('character-creation');
  populateCityDropdown();
}

function populateCityDropdown() {
  const citySelect = document.getElementById('input-city');
  if (citySelect) {
    citySelect.innerHTML = '';
    DADOS.cidades.brasil.forEach(city => {
      const option = document.createElement('option');
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });
  }
}

function startRandomLife() {
  const gender = Math.random() > 0.5 ? 'masculino' : 'feminino';
  const names = DADOS.nomes.brasil[gender === 'masculino' ? 'masculinos' : 'femininos'];
  const name = names[Math.floor(Math.random() * names.length)];
  const socialClass = ['pobre', 'media', 'alta', 'rica'][Math.floor(Math.random() * 4)];
  const city = DADOS.cidades.brasil[Math.floor(Math.random() * DADOS.cidades.brasil.length)];
  
  createCharacter({
    name: name,
    gender: gender,
    socialClass: socialClass,
    city: city,
    country: 'Brasil'
  });
}

function startCustomLife() {
  const name = document.getElementById('input-name').value.trim() || 'Jogador';
  const gender = document.getElementById('input-gender').value;
  const socialClass = document.getElementById('input-class').value;
  const city = document.getElementById('input-city').value;
  const country = document.getElementById('input-country').value;
  
  createCharacter({
    name: name,
    gender: gender,
    socialClass: socialClass,
    city: city,
    country: country
  });
}

function createCharacter(config) {
  const moneyByClass = {
    pobre: 100,
    media: 5000,
    alta: 50000,
    rica: 500000
  };
  
  // Generate parents
  const motherNames = DADOS.nomes.brasil.femininos;
  const fatherNames = DADOS.nomes.brasil.masculinos;
  
  player = {
    // Basic info
    name: config.name,
    lastName: DADOS.sobrenomes[Math.floor(Math.random() * DADOS.sobrenomes.length)],
    gender: config.gender,
    age: 0,
    alive: true,
    
    // Location
    country: config.country,
    city: config.city,
    language: settings.language,
    
    // Social
    socialClass: config.socialClass,
    
    // Stats (extendable)
    health: 85 + Math.floor(Math.random() * 15),
    mood: 80 + Math.floor(Math.random() * 20),
    money: moneyByClass[config.socialClass],
    reputation: 50,
    skill: 20 + Math.floor(Math.random() * 30),
    
    // Employment
    job: null,
    salary: 0,
    company: null,
    
    // Family
    parents: {
      mother: {
        name: motherNames[Math.floor(Math.random() * motherNames.length)],
        alive: true,
        affinity: 85 + Math.floor(Math.random() * 15),
        age: 25 + Math.floor(Math.random() * 10)
      },
      father: {
        name: fatherNames[Math.floor(Math.random() * fatherNames.length)],
        alive: true,
        affinity: 80 + Math.floor(Math.random() * 15),
        age: 27 + Math.floor(Math.random() * 10)
      }
    },
    
    // Relationships
    relationships: [],
    
    // Possessions
    possessions: {
      cars: [],
      phones: [],
      computers: [],
      houses: [],
      travelHistory: []
    },
    
    // Timeline
    events: []
  };
  
  startGame();
}

// === GAME START ===
function startGame() {
  gameStarted = true;
  showScreen('game-screen');
  
  // Add birth event
  addEvent(
    `Você nasceu em ${player.city}! Seus pais ${player.parents.mother.name} e ${player.parents.father.name} estão muito felizes! 👶`,
    'positive',
    'fa-baby'
  );
  
  updateUI();
  saveGame();
}

// === UI UPDATES ===
function updateUI() {
  if (!player) return;
  
  // Top bar
  document.getElementById('player-name').textContent = `${player.name} ${player.lastName}`;
  document.getElementById('player-details').textContent = `${player.age} anos • ${player.city}`;
  
  // Stats
  updateStat('health', player.health, 100);
  updateStat('mood', player.mood, 100);
  updateStat('reputation', player.reputation, 100);
  updateStat('skill', player.skill, 100);
  
  // Money (special formatting)
  const moneyPercent = Math.min(100, (player.money / 100000) * 100);
  document.getElementById('stat-money').style.width = moneyPercent + '%';
  document.getElementById('val-money').textContent = 'R$ ' + player.money.toLocaleString('pt-BR');
  
  // Age
  document.getElementById('age-display').textContent = player.age;
}

function updateStat(statName, value, max) {
  const clamped = clamp(value, 0, max);
  const percent = (clamped / max) * 100;
  
  const fillEl = document.getElementById('stat-' + statName);
  const valueEl = document.getElementById('val-' + statName);
  
  if (fillEl) {
    fillEl.style.width = percent + '%';
  }
  if (valueEl) {
    valueEl.textContent = Math.floor(clamped);
  }
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

// === EVENT SYSTEM ===
function addEvent(text, type, icon) {
  if (!player) return;
  
  const event = {
    text: text,
    type: type,
    icon: icon,
    age: player.age,
    timestamp: Date.now()
  };
  
  player.events.unshift(event);
  
  // Render event in timeline
  const timeline = document.getElementById('timeline');
  if (timeline) {
    const eventEl = createEventElement(event);
    timeline.insertBefore(eventEl, timeline.firstChild);
    
    // Limit timeline to 50 events for performance
    while (timeline.children.length > 50) {
      timeline.removeChild(timeline.lastChild);
    }
  }
}

function createEventElement(event) {
  const div = document.createElement('div');
  div.className = `timeline-event ${event.type}`;
  
  div.innerHTML = `
    <div class="event-icon">
      <i class="fas ${event.icon}"></i>
    </div>
    <div class="event-content">
      <p class="event-text">${event.text}</p>
      <span class="event-age">${event.age} anos</span>
    </div>
  `;
  
  return div;
}

function selectRandomEvent() {
  // Get event density from settings
  const densityChance = {
    low: 0.3,
    medium: 0.5,
    high: 0.7
  }[settings.eventDensity] || 0.5;
  
  if (Math.random() > densityChance) {
    return null;
  }
  
  // Collect all events
  const allEvents = [
    ...DADOS.eventos.familia,
    ...DADOS.eventos.educacao,
    ...DADOS.eventos.financas,
    ...DADOS.eventos.saude,
    ...DADOS.eventos.hobbies,
    ...DADOS.eventos.legal,
    ...DADOS.eventos.social,
    ...DADOS.eventos.aleatorios
  ];
  
  // Filter by age appropriateness
  const appropriateEvents = allEvents.filter(e => {
    if (player.age < 6) return e.categoria === 'familia';
    if (player.age < 18) return e.categoria !== 'legal' || e.raridade !== 'epico';
    return true;
  });
  
  if (appropriateEvents.length === 0) return null;
  
  // Weighted random selection by rarity
  const totalWeight = appropriateEvents.reduce((sum, e) => {
    return sum + (DADOS.raridadePesos[e.raridade] || 1);
  }, 0);
  
  let random = Math.random() * totalWeight;
  
  for (const event of appropriateEvents) {
    const weight = DADOS.raridadePesos[event.raridade] || 1;
    if (random < weight) {
      return event;
    }
    random -= weight;
  }
  
  return appropriateEvents[0];
}

function applyEventEffects(event) {
  if (!event) return;
  
  const effects = [];
  
  if (event.health) {
    player.health = clamp(player.health + event.health, 0, 100);
    effects.push({
      text: (event.health > 0 ? '+' : '') + event.health + ' Saúde',
      type: event.health > 0 ? 'positive' : 'negative'
    });
  }
  
  if (event.mood) {
    player.mood = clamp(player.mood + event.mood, 0, 100);
    effects.push({
      text: (event.mood > 0 ? '+' : '') + event.mood + ' Humor',
      type: event.mood > 0 ? 'positive' : 'negative'
    });
  }
  
  if (event.money) {
    player.money = Math.max(0, player.money + event.money);
    effects.push({
      text: (event.money > 0 ? '+' : '') + 'R$ ' + Math.abs(event.money).toLocaleString('pt-BR'),
      type: event.money > 0 ? 'positive' : 'negative'
    });
  }
  
  if (event.reputation) {
    player.reputation = clamp(player.reputation + event.reputation, 0, 100);
    effects.push({
      text: (event.reputation > 0 ? '+' : '') + event.reputation + ' Reputação',
      type: event.reputation > 0 ? 'positive' : 'negative'
    });
  }
  
  if (event.skill) {
    player.skill = clamp(player.skill + event.skill, 0, 100);
    effects.push({
      text: (event.skill > 0 ? '+' : '') + event.skill + ' Habilidade',
      type: event.skill > 0 ? 'positive' : 'negative'
    });
  }
  
  if (event.felicidade) {
    player.mood = clamp(player.mood + event.felicidade, 0, 100);
    effects.push({
      text: (event.felicidade > 0 ? '+' : '') + event.felicidade + ' Humor',
      type: event.felicidade > 0 ? 'positive' : 'negative'
    });
  }
  
  return effects;
}

// === AGE UP ===
function ageUp() {
  if (!player || !player.alive) return;
  
  player.age++;
  
  // Age parents
  if (player.parents.mother.alive) player.parents.mother.age++;
  if (player.parents.father.alive) player.parents.father.age++;
  
  // Apply salary
  if (player.job && player.salary > 0) {
    player.money += player.salary;
    addEvent(
      `Recebeu salário: R$ ${player.salary.toLocaleString('pt-BR')}`,
      'positive',
      'fa-money-bill-wave'
    );
  }
  
  // Random event
  const event = selectRandomEvent();
  if (event) {
    const effects = applyEventEffects(event);
    addEvent(event.texto, event.health < 0 || event.mood < 0 || event.money < 0 ? 'negative' : 'positive', event.icone);
  }
  
  // Natural stat decay
  player.mood = Math.max(0, player.mood - Math.random() * 3);
  if (player.age > 50) {
    player.health = Math.max(0, player.health - (player.age > 70 ? 2 : 0.5));
  }
  
  // Check death
  if (player.health <= 0) {
    die('Problemas de saúde');
    return;
  }
  
  if (player.age > 70 && Math.random() * 100 < (player.age - 50)) {
    die('Velhice');
    return;
  }
  
  // Parent death check
  if (player.parents.mother.alive && player.parents.mother.age > 70 && Math.random() < 0.1) {
    player.parents.mother.alive = false;
    addEvent(`Sua mãe ${player.parents.mother.name} faleceu. 😢`, 'negative', 'fa-cross');
    player.mood = Math.max(0, player.mood - 30);
  }
  
  if (player.parents.father.alive && player.parents.father.age > 70 && Math.random() < 0.1) {
    player.parents.father.alive = false;
    addEvent(`Seu pai ${player.parents.father.name} faleceu. 😢`, 'negative', 'fa-cross');
    player.mood = Math.max(0, player.mood - 30);
  }
  
  updateUI();
  saveGame();
  
  showToast(`Você fez ${player.age} anos!`, 'success');
}

function die(cause) {
  player.alive = false;
  saveGame();
  
  // Show game over screen
  showScreen('gameover-screen');
  
  document.getElementById('go-name').textContent = `${player.name} ${player.lastName}`;
  document.getElementById('go-dates').textContent = `2026 - ${2026 + player.age}`;
  document.getElementById('go-cause').textContent = `Causa: ${cause}`;
  
  const statsHtml = `
    <div class="stat-item">
      <i class="fas fa-birthday-cake"></i>
      <span>${player.age} anos vividos</span>
    </div>
    <div class="stat-item">
      <i class="fas fa-wallet"></i>
      <span>R$ ${player.money.toLocaleString('pt-BR')}</span>
    </div>
    <div class="stat-item">
      <i class="fas fa-star"></i>
      <span>${player.reputation} de reputação</span>
    </div>
    <div class="stat-item">
      <i class="fas fa-briefcase"></i>
      <span>${player.job ? player.job : 'Sem emprego'}</span>
    </div>
  `;
  
  document.getElementById('go-stats').innerHTML = statsHtml;
}

// === SAVE/LOAD ===
function saveGame() {
  if (!player) return;
  
  try {
    localStorage.setItem(DADOS.SAVE_KEY, JSON.stringify(player));
  } catch (e) {
    console.error('Error saving game:', e);
    showToast('Erro ao salvar jogo', 'error');
  }
}

function loadGame() {
  try {
    const saved = localStorage.getItem(DADOS.SAVE_KEY);
    if (!saved) {
      showToast('Nenhum save encontrado', 'warning');
      return;
    }
    
    player = JSON.parse(saved);
    gameStarted = true;
    
    showScreen('game-screen');
    updateUI();
    
    // Re-render timeline
    const timeline = document.getElementById('timeline');
    if (timeline) {
      timeline.innerHTML = '';
      player.events.forEach(event => {
        const eventEl = createEventElement(event);
        timeline.appendChild(eventEl);
      });
    }
    
    showToast('Jogo carregado!', 'success');
  } catch (e) {
    console.error('Error loading game:', e);
    showToast('Erro ao carregar jogo', 'error');
  }
}

// === AGE RESTRICTIONS ===
function canDoAction(action) {
  const ageRestrictions = {
    'askMoney': 3,        // Pedir dinheiro aos 3 anos
    'shop': 16,           // Comprar coisas aos 16 anos
    'work': 14,           // Trabalhar aos 14 anos
    'date': 10,           // Namorar aos 10 anos
    'meetPeople': 5,      // Conhecer pessoas aos 5 anos
    'activities': 3,      // Fazer atividades aos 3 anos
    'conversation': 2     // Conversar aos 2 anos
  };
  
  return player.age >= (ageRestrictions[action] || 0);
}

function showAgeRestrictionMessage(action) {
  const messages = {
    'askMoney': 'Você é muito jovem para pedir dinheiro!',
    'shop': 'Você precisa ter pelo menos 16 anos para fazer compras!',
    'work': 'Você precisa ter pelo menos 14 anos para trabalhar!',
    'date': 'Você precisa ter pelo menos 10 anos para namorar!',
    'meetPeople': 'Você é muito jovem para conhecer pessoas sozinho!',
    'activities': 'Você é muito jovem para fazer esta atividade!',
    'conversation': 'Você é muito jovem para ter conversas complexas!'
  };
  
  showToast(messages[action] || 'Você é muito jovem para esta ação!', 'warning');
}

// === ACTIONS MENU ===
function showActions(category) {
  const modal = document.getElementById('actions-modal');
  const title = document.getElementById('actions-title');
  const body = document.getElementById('actions-body');
  
  modal.classList.add('active');
  
  switch (category) {
    case 'family':
      title.innerHTML = '<i class="fas fa-home"></i> Família';
      renderFamilyActions(body);
      break;
    case 'relationships':
      title.innerHTML = '<i class="fas fa-users"></i> Relacionamentos';
      renderRelationshipActions(body);
      break;
    case 'activities':
      title.innerHTML = '<i class="fas fa-running"></i> Atividades';
      renderActivityActions(body);
      break;
    case 'work':
      title.innerHTML = '<i class="fas fa-briefcase"></i> Trabalho';
      renderWorkActions(body);
      break;
    case 'shop':
      title.innerHTML = '<i class="fas fa-shopping-cart"></i> Lojas';
      renderShopActions(body);
      break;
  }
}

function closeActionsModal() {
  document.getElementById('actions-modal').classList.remove('active');
}

// === FAMILY ACTIONS ===
function renderFamilyActions(container) {
  let html = '';
  
  if (player.parents.mother.alive) {
    html += `
      <div class="action-item" onclick="interactWithFamily('mother')">
        <div class="action-item-icon" style="background: rgba(253, 121, 168, 0.2); color: #fd79a8;">
          <i class="fas fa-female"></i>
        </div>
        <div class="action-item-info">
          <h4>${player.parents.mother.name} (Mãe)</h4>
          <p>Afinidade: ${player.parents.mother.affinity}%</p>
        </div>
      </div>
    `;
  }
  
  if (player.parents.father.alive) {
    html += `
      <div class="action-item" onclick="interactWithFamily('father')">
        <div class="action-item-icon" style="background: rgba(9, 132, 227, 0.2); color: #0984e3;">
          <i class="fas fa-male"></i>
        </div>
        <div class="action-item-info">
          <h4>${player.parents.father.name} (Pai)</h4>
          <p>Afinidade: ${player.parents.father.affinity}%</p>
        </div>
      </div>
    `;
  }
  
  if (!player.parents.mother.alive && !player.parents.father.alive) {
    html = '<p style="color: var(--text-secondary); text-align: center;">Nenhum familiar disponível</p>';
  }
  
  container.innerHTML = html;
}

function interactWithFamily(member) {
  closeActionsModal();
  
  const person = member === 'mother' ? player.parents.mother : player.parents.father;
  const title = person.name;
  
  const actions = [];
  
  // Abraçar sempre disponível
  actions.push({
    text: '<i class="fas fa-heart"></i> Abraçar',
    action: () => hugFamily(member)
  });
  
  // Conversar a partir de 2 anos
  if (canDoAction('conversation')) {
    actions.push({
      text: '<i class="fas fa-comments"></i> Conversar',
      action: () => chatWithFamily(member)
    });
  }
  
  // Pedir dinheiro a partir de 3 anos
  if (canDoAction('askMoney')) {
    actions.push({
      text: '<i class="fas fa-money-bill"></i> Pedir Dinheiro',
      action: () => askForMoney(member)
    });
  }
  
  showInteractionModal(title, actions);
}

function askForMoney(member) {
  if (!canDoAction('askMoney')) {
    showAgeRestrictionMessage('askMoney');
    return;
  }
  
  closeInteractionModal();
  
  const person = member === 'mother' ? player.parents.mother : player.parents.father;
  
  showInteractionModal('Pedir quanto?', [
    { text: 'R$ 50', action: () => requestMoney(member, 50, 20) },
    { text: 'R$ 200', action: () => requestMoney(member, 200, 40) },
    { text: 'R$ 500', action: () => requestMoney(member, 500, 60) },
    { text: 'R$ 1000', action: () => requestMoney(member, 1000, 80) }
  ]);
}

function requestMoney(member, amount, difficulty) {
  closeInteractionModal();
  
  const person = member === 'mother' ? player.parents.mother : player.parents.father;
  
  if (person.affinity + Math.random() * 40 > difficulty) {
    player.money += amount;
    const response = DADOS.interacoesFamilia.pedirDinheiro.respostas.sucesso[
      Math.floor(Math.random() * DADOS.interacoesFamilia.pedirDinheiro.respostas.sucesso.length)
    ];
    showResult('success', 'Conseguiu!', `${person.name}: "${response}"`, [
      { text: `+R$ ${amount}`, type: 'positive' }
    ]);
    addEvent(`${person.name} te deu R$ ${amount}`, 'positive', 'fa-hand-holding-usd');
  } else {
    person.affinity = Math.max(0, person.affinity - 5);
    const response = DADOS.interacoesFamilia.pedirDinheiro.respostas.falha[
      Math.floor(Math.random() * DADOS.interacoesFamilia.pedirDinheiro.respostas.falha.length)
    ];
    showResult('failure', 'Recusou', `${person.name}: "${response}"`, [
      { text: '-5 Afinidade', type: 'negative' }
    ]);
  }
  
  updateUI();
  saveGame();
}

function chatWithFamily(member) {
  closeInteractionModal();
  
  const person = member === 'mother' ? player.parents.mother : player.parents.father;
  
  person.affinity = Math.min(100, person.affinity + 5);
  player.mood = Math.min(100, player.mood + 5);
  
  showResult('success', 'Boa conversa!', 'Vocês conversaram sobre a vida.', [
    { text: '+5 Afinidade', type: 'positive' },
    { text: '+5 Humor', type: 'positive' }
  ]);
  
  addEvent(`Conversou com ${person.name}`, 'positive', 'fa-comments');
  updateUI();
  saveGame();
}

function hugFamily(member) {
  closeInteractionModal();
  
  const person = member === 'mother' ? player.parents.mother : player.parents.father;
  
  person.affinity = Math.min(100, person.affinity + 8);
  player.mood = Math.min(100, player.mood + 10);
  
  showResult('success', 'Abraço caloroso!', `${person.name} te abraçou com carinho.`, [
    { text: '+8 Afinidade', type: 'positive' },
    { text: '+10 Humor', type: 'positive' }
  ]);
  
  addEvent(`Abraçou ${person.name}`, 'positive', 'fa-heart');
  updateUI();
  saveGame();
}

// === RELATIONSHIP ACTIONS ===
function renderRelationshipActions(container) {
  let html = `
    <div class="action-item" onclick="meetNewPerson()">
      <div class="action-item-icon" style="background: rgba(108, 92, 231, 0.2); color: #6c5ce7;">
        <i class="fas fa-user-plus"></i>
      </div>
      <div class="action-item-info">
        <h4>Conhecer alguém</h4>
        <p>Faça novos amigos</p>
      </div>
    </div>
  `;
  
  player.relationships.forEach((rel, index) => {
    html += `
      <div class="action-item" onclick="interactWithPerson(${index})">
        <div class="action-item-icon" style="background: rgba(108, 92, 231, 0.2); color: #6c5ce7;">
          <i class="fas fa-user"></i>
        </div>
        <div class="action-item-info">
          <h4>${rel.name}</h4>
          <p>${rel.type} • Afinidade: ${rel.affinity}%</p>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

function meetNewPerson() {
  if (!canDoAction('meetPeople')) {
    showAgeRestrictionMessage('meetPeople');
    return;
  }
  
  const gender = Math.random() > 0.5 ? 'masculino' : 'feminino';
  const names = DADOS.nomes.brasil[gender === 'masculino' ? 'masculinos' : 'femininos'];
  const name = names[Math.floor(Math.random() * names.length)];
  const lastName = DADOS.sobrenomes[Math.floor(Math.random() * DADOS.sobrenomes.length)];
  
  const person = {
    name: `${name} ${lastName}`,
    gender: gender,
    type: 'Conhecido',
    affinity: 30 + Math.floor(Math.random() * 30),
    age: player.age + Math.floor(Math.random() * 10) - 5,
    chatHistory: []
  };
  
  player.relationships.push(person);
  
  closeActionsModal();
  addEvent(`Conheceu ${person.name}!`, 'positive', 'fa-user-plus');
  showToast(`Conheceu ${person.name}!`, 'success');
  saveGame();
}

function interactWithPerson(index) {
  closeActionsModal();
  
  const person = player.relationships[index];
  
  const actions = [
    {
      text: '<i class="fas fa-comments"></i> Conversar',
      action: () => talkToPerson(index)
    },
    {
      text: '<i class="fas fa-mobile-alt"></i> Mandar Mensagem',
      action: () => openPhoneChat(index)
    }
  ];
  
  // Flertar apenas a partir de 10 anos
  if (canDoAction('date')) {
    actions.push({
      text: '<i class="fas fa-heart"></i> Flertar',
      action: () => flirtWithPerson(index)
    });
  }
  
  showInteractionModal(person.name, actions);
}

function talkToPerson(index) {
  closeInteractionModal();
  
  const person = player.relationships[index];
  
  person.affinity = Math.min(100, person.affinity + 8);
  player.mood = Math.min(100, player.mood + 5);
  
  if (person.affinity >= 60 && person.type === 'Conhecido') {
    person.type = 'Amigo';
  }
  
  showResult('success', 'Boa conversa!', `Você e ${person.name} conversaram bastante.`, [
    { text: '+8 Afinidade', type: 'positive' },
    { text: '+5 Humor', type: 'positive' }
  ]);
  
  addEvent(`Conversou com ${person.name}`, 'positive', 'fa-comments');
  updateUI();
  saveGame();
}

function flirtWithPerson(index) {
  if (!canDoAction('date')) {
    showAgeRestrictionMessage('date');
    return;
  }
  
  closeInteractionModal();
  
  const person = player.relationships[index];
  
  if (Math.random() * 100 < person.affinity + player.reputation / 2) {
    person.affinity = Math.min(100, person.affinity + 15);
    player.mood = Math.min(100, player.mood + 10);
    
    if (person.affinity >= 75 && person.type !== 'Namorando') {
      person.type = 'Ficante';
    }
    if (person.affinity >= 90 && person.type !== 'Namorando') {
      person.type = 'Namorando';
      addEvent(`Você começou a namorar ${person.name}! ❤️`, 'positive', 'fa-heart');
    }
    
    showResult('success', 'Deu certo!', `${person.name} gostou da cantada!`, [
      { text: '+15 Afinidade', type: 'positive' }
    ]);
  } else {
    person.affinity = Math.max(0, person.affinity - 10);
    player.mood = Math.max(0, player.mood - 5);
    
    showResult('failure', 'Não rolou...', `${person.name} não se interessou.`, [
      { text: '-10 Afinidade', type: 'negative' }
    ]);
  }
  
  updateUI();
  saveGame();
}

// === PHONE MESSAGING ===
function openPhoneChat(index) {
  closeInteractionModal();
  
  const person = player.relationships[index];
  currentChatPerson = index;
  
  const modal = document.getElementById('phone-modal');
  const contactName = document.getElementById('phone-contact');
  const messagesContainer = document.getElementById('chat-messages');
  
  contactName.textContent = person.name;
  modal.classList.add('active');
  
  // Render chat history
  messagesContainer.innerHTML = '';
  if (person.chatHistory && person.chatHistory.length > 0) {
    person.chatHistory.forEach(msg => {
      const msgDiv = document.createElement('div');
      msgDiv.className = `chat-message ${msg.sender === 'player' ? 'sent' : 'received'}`;
      msgDiv.innerHTML = `<div class="message-bubble">${msg.text}</div>`;
      messagesContainer.appendChild(msgDiv);
    });
  }
  
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function closePhoneModal() {
  document.getElementById('phone-modal').classList.remove('active');
  currentChatPerson = null;
}

function sendMessage() {
  if (currentChatPerson === null) return;
  
  const input = document.getElementById('chat-input-text');
  const text = input.value.trim();
  
  if (!text) return;
  
  const person = player.relationships[currentChatPerson];
  
  if (!person.chatHistory) {
    person.chatHistory = [];
  }
  
  // Add player message
  person.chatHistory.push({
    sender: 'player',
    text: text
  });
  
  // Render player message
  const messagesContainer = document.getElementById('chat-messages');
  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-message sent';
  msgDiv.innerHTML = `<div class="message-bubble">${text}</div>`;
  messagesContainer.appendChild(msgDiv);
  
  // Generate response
  setTimeout(() => {
    let response;
    const affinity = person.affinity;
    
    if (affinity > 70) {
      response = DADOS.mensagensChat.positivas[Math.floor(Math.random() * DADOS.mensagensChat.positivas.length)];
    } else if (affinity > 40) {
      response = DADOS.mensagensChat.saudacoes[Math.floor(Math.random() * DADOS.mensagensChat.saudacoes.length)];
    } else {
      response = DADOS.mensagensChat.negativas[Math.floor(Math.random() * DADOS.mensagensChat.negativas.length)];
    }
    
    person.chatHistory.push({
      sender: 'contact',
      text: response
    });
    
    const responseDiv = document.createElement('div');
    responseDiv.className = 'chat-message received';
    responseDiv.innerHTML = `<div class="message-bubble">${response}</div>`;
    messagesContainer.appendChild(responseDiv);
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Increase affinity slightly
    person.affinity = Math.min(100, person.affinity + 2);
    saveGame();
  }, 500);
  
  input.value = '';
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  saveGame();
}

// === ACTIVITY ACTIONS ===
function renderActivityActions(container) {
  let html = '<h4 style="margin-bottom: 10px; color: var(--text-secondary);">Exercícios</h4>';
  
  DADOS.atividades.exercicio.forEach((activity, index) => {
    html += `
      <div class="action-item" onclick="doActivity('exercicio', ${index})">
        <div class="action-item-icon" style="background: rgba(0, 184, 148, 0.2); color: #00b894;">
          <i class="fas ${activity.icone}"></i>
        </div>
        <div class="action-item-info">
          <h4>${activity.nome}</h4>
          <p>+${activity.health} Saúde</p>
        </div>
        <span class="action-item-price">R$ ${activity.custo}</span>
      </div>
    `;
  });
  
  html += '<h4 style="margin: 20px 0 10px; color: var(--text-secondary);">Lazer</h4>';
  
  DADOS.atividades.lazer.forEach((activity, index) => {
    html += `
      <div class="action-item" onclick="doActivity('lazer', ${index})">
        <div class="action-item-icon" style="background: rgba(253, 203, 110, 0.2); color: #fdcb6e;">
          <i class="fas ${activity.icone}"></i>
        </div>
        <div class="action-item-info">
          <h4>${activity.nome}</h4>
          <p>+${activity.mood} Humor</p>
        </div>
        <span class="action-item-price">R$ ${activity.custo}</span>
      </div>
    `;
  });
  
  html += '<h4 style="margin: 20px 0 10px; color: var(--text-secondary);">Estudo</h4>';
  
  DADOS.atividades.estudo.forEach((activity, index) => {
    html += `
      <div class="action-item" onclick="doActivity('estudo', ${index})">
        <div class="action-item-icon" style="background: rgba(52, 152, 219, 0.2); color: #3498db;">
          <i class="fas ${activity.icone}"></i>
        </div>
        <div class="action-item-info">
          <h4>${activity.nome}</h4>
          <p>+${activity.skill} Habilidade</p>
        </div>
        <span class="action-item-price">R$ ${activity.custo}</span>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

function doActivity(type, index) {
  if (!canDoAction('activities')) {
    showAgeRestrictionMessage('activities');
    return;
  }
  
  const activity = DADOS.atividades[type][index];
  
  if (player.money < activity.custo) {
    showToast('Dinheiro insuficiente!', 'error');
    return;
  }
  
  player.money -= activity.custo;
  
  const effects = [];
  
  if (activity.health) {
    player.health = Math.min(100, player.health + activity.health);
    effects.push({ text: `+${activity.health} Saúde`, type: 'positive' });
  }
  
  if (activity.mood) {
    player.mood = Math.min(100, player.mood + activity.mood);
    effects.push({ text: `+${activity.mood} Humor`, type: 'positive' });
  }
  
  if (activity.skill) {
    player.skill = Math.min(100, player.skill + activity.skill);
    effects.push({ text: `+${activity.skill} Habilidade`, type: 'positive' });
  }
  
  if (activity.felicidade) {
    player.mood = Math.min(100, player.mood + activity.felicidade);
    effects.push({ text: `+${activity.felicidade} Humor`, type: 'positive' });
  }
  
  if (activity.reputation) {
    player.reputation = Math.min(100, player.reputation + activity.reputation);
    effects.push({ text: `+${activity.reputation} Reputação`, type: 'positive' });
  }
  
  closeActionsModal();
  addEvent(`Você foi ${activity.nome.toLowerCase()}`, 'positive', activity.icone);
  showResult('success', activity.nome, `Custou R$ ${activity.custo}`, effects);
  updateUI();
  saveGame();
}

// === WORK ACTIONS ===
function renderWorkActions(container) {
  let html = '';
  
  if (player.job) {
    html += `
      <div class="action-item">
        <div class="action-item-icon" style="background: rgba(9, 132, 227, 0.2); color: #0984e3;">
          <i class="fas fa-briefcase"></i>
        </div>
        <div class="action-item-info">
          <h4>${player.job}</h4>
          <p>Salário: R$ ${player.salary.toLocaleString('pt-BR')}/ano</p>
        </div>
      </div>
      <div class="action-item" onclick="quitJob()">
        <div class="action-item-icon" style="background: rgba(214, 48, 49, 0.2); color: #d63031;">
          <i class="fas fa-door-open"></i>
        </div>
        <div class="action-item-info">
          <h4>Pedir Demissão</h4>
          <p>Sair do emprego atual</p>
        </div>
      </div>
    `;
  } else {
    if (!canDoAction('work')) {
      html += '<p style="color: var(--text-secondary); text-align: center; padding: 20px;">Você precisa ter pelo menos 14 anos para trabalhar.</p>';
    } else {
      html += '<h4 style="margin-bottom: 10px; color: var(--text-secondary);">Empregos Disponíveis</h4>';
      
      DADOS.profissoes.forEach((job, index) => {
        const meetsReqs = checkJobRequirements(job);
        html += `
          <div class="action-item ${!meetsReqs ? 'disabled' : ''}" ${meetsReqs ? `onclick="applyForJob(${index})"` : ''}>
            <div class="action-item-icon" style="background: rgba(108, 92, 231, 0.2); color: #6c5ce7;">
              <i class="fas fa-briefcase"></i>
            </div>
            <div class="action-item-info">
              <h4>${job.nome}</h4>
              <p>R$ ${(job.salarioBase * 12).toLocaleString('pt-BR')}/ano • ${job.setor}</p>
              ${!meetsReqs ? '<p style="color: var(--danger); font-size: 12px;">Requisitos não atendidos</p>' : ''}
            </div>
          </div>
        `;
      });
    }
  }
  
  container.innerHTML = html;
}

function checkJobRequirements(job) {
  if (job.requisitos.skill && player.skill < job.requisitos.skill) return false;
  if (job.requisitos.health && player.health < job.requisitos.health) return false;
  if (job.requisitos.reputation && player.reputation < job.requisitos.reputation) return false;
  return true;
}

function applyForJob(index) {
  const job = DADOS.profissoes[index];
  
  if (!checkJobRequirements(job)) {
    showToast('Você não atende aos requisitos!', 'error');
    return;
  }
  
  const chance = 50 + (player.skill / 2) + (player.reputation / 4);
  
  if (Math.random() * 100 < chance) {
    player.job = job.nome;
    player.salary = job.salarioBase * 12;
    player.company = null;
    
    closeActionsModal();
    addEvent(`Contratado como ${job.nome}!`, 'positive', 'fa-briefcase');
    showToast('Contratado!', 'success');
  } else {
    showToast('Não foi selecionado desta vez', 'error');
  }
  
  updateUI();
  saveGame();
}

function quitJob() {
  player.job = null;
  player.salary = 0;
  player.company = null;
  
  closeActionsModal();
  addEvent('Você pediu demissão', 'neutral', 'fa-door-open');
  showToast('Demitiu-se do emprego', 'warning');
  updateUI();
  saveGame();
}

// === SHOP ACTIONS ===
function renderShopActions(container) {
  const html = `
    <div class="action-item" onclick="openShop('carros')">
      <div class="action-item-icon" style="background: rgba(230, 126, 34, 0.2); color: #e67e22;">
        <i class="fas fa-car"></i>
      </div>
      <div class="action-item-info">
        <h4>Loja de Carros</h4>
        <p>Compre seu veículo dos sonhos</p>
      </div>
    </div>
    
    <div class="action-item" onclick="openShop('celulares')">
      <div class="action-item-icon" style="background: rgba(52, 152, 219, 0.2); color: #3498db;">
        <i class="fas fa-mobile-alt"></i>
      </div>
      <div class="action-item-info">
        <h4>Loja de Celulares</h4>
        <p>Últimos lançamentos</p>
      </div>
    </div>
    
    <div class="action-item" onclick="openShop('computadores')">
      <div class="action-item-icon" style="background: rgba(155, 89, 182, 0.2); color: #9b59b6;">
        <i class="fas fa-laptop"></i>
      </div>
      <div class="action-item-info">
        <h4>Loja de Computadores</h4>
        <p>PCs e Notebooks</p>
      </div>
    </div>
    
    <div class="action-item" onclick="openShop('casas')">
      <div class="action-item-icon" style="background: rgba(39, 174, 96, 0.2); color: #27ae60;">
        <i class="fas fa-home"></i>
      </div>
      <div class="action-item-info">
        <h4>Imobiliária</h4>
        <p>Compre sua casa</p>
      </div>
    </div>
    
    <div class="action-item" onclick="openShop('viagens')">
      <div class="action-item-icon" style="background: rgba(243, 156, 18, 0.2); color: #f39c12;">
        <i class="fas fa-plane"></i>
      </div>
      <div class="action-item-info">
        <h4>Agência de Viagens</h4>
        <p>Viaje pelo mundo</p>
      </div>
    </div>
  `;
  
  container.innerHTML = html;
}

function openShop(shopType) {
  if (!canDoAction('shop')) {
    closeActionsModal();
    showAgeRestrictionMessage('shop');
    return;
  }
  
  closeActionsModal();
  
  const modal = document.getElementById('actions-modal');
  const title = document.getElementById('actions-title');
  const body = document.getElementById('actions-body');
  
  modal.classList.add('active');
  
  const shopIcons = {
    carros: 'fa-car',
    celulares: 'fa-mobile-alt',
    computadores: 'fa-laptop',
    casas: 'fa-home',
    viagens: 'fa-plane'
  };
  
  const shopNames = {
    carros: 'Loja de Carros',
    celulares: 'Loja de Celulares',
    computadores: 'Loja de Computadores',
    casas: 'Imobiliária',
    viagens: 'Agência de Viagens'
  };
  
  title.innerHTML = `<i class="fas ${shopIcons[shopType]}"></i> ${shopNames[shopType]}`;
  
  renderShopItems(body, shopType);
}

function renderShopItems(container, shopType) {
  const items = DADOS.lojas[shopType];
  
  let html = '';
  
  items.forEach((item, index) => {
    let itemName, itemDesc, itemPrice;
    
    if (shopType === 'carros') {
      itemName = `${item.marca} ${item.modelo}`;
      itemDesc = `${item.ano} • ${item.tipo}`;
      itemPrice = item.preco;
    } else if (shopType === 'celulares') {
      itemName = `${item.marca} ${item.modelo}`;
      itemDesc = `${item.ano} • ${item.categoria}`;
      itemPrice = item.preco;
    } else if (shopType === 'computadores') {
      itemName = `${item.marca} ${item.modelo}`;
      itemDesc = `${item.specs}`;
      itemPrice = item.preco;
    } else if (shopType === 'casas') {
      itemName = `${item.tipo} em ${item.bairro}`;
      itemDesc = `${item.cidade} • ${item.quartos} quartos`;
      itemPrice = item.preco;
    } else if (shopType === 'viagens') {
      itemName = `${item.destino}, ${item.pais}`;
      itemDesc = `${item.duracao} dias`;
      itemPrice = item.preco;
    }
    
    html += `
      <div class="action-item" onclick="buyItem('${shopType}', ${index})">
        <div class="action-item-info">
          <h4>${itemName}</h4>
          <p>${itemDesc}</p>
        </div>
        <span class="action-item-price">R$ ${itemPrice.toLocaleString('pt-BR')}</span>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

function buyItem(shopType, index) {
  const item = DADOS.lojas[shopType][index];
  
  if (player.money < item.preco) {
    showToast('Dinheiro insuficiente!', 'error');
    return;
  }
  
  player.money -= item.preco;
  
  // Add to possessions
  const possessionMap = {
    carros: 'cars',
    celulares: 'phones',
    computadores: 'computers',
    casas: 'houses',
    viagens: 'travelHistory'
  };
  
  const possessionKey = possessionMap[shopType];
  if (!player.possessions[possessionKey]) {
    player.possessions[possessionKey] = [];
  }
  player.possessions[possessionKey].push(item);
  
  // Apply stat effects
  const effects = [];
  
  if (item.stats) {
    if (item.stats.reputation) {
      player.reputation = Math.min(100, player.reputation + item.stats.reputation);
      effects.push({ text: `+${item.stats.reputation} Reputação`, type: 'positive' });
    }
    if (item.stats.mood) {
      player.mood = Math.min(100, player.mood + item.stats.mood);
      effects.push({ text: `+${item.stats.mood} Humor`, type: 'positive' });
    }
    if (item.stats.skill) {
      player.skill = Math.min(100, player.skill + item.stats.skill);
      effects.push({ text: `+${item.stats.skill} Habilidade`, type: 'positive' });
    }
  }
  
  let itemName;
  if (shopType === 'carros') {
    itemName = `${item.marca} ${item.modelo}`;
  } else if (shopType === 'celulares') {
    itemName = `${item.marca} ${item.modelo}`;
  } else if (shopType === 'computadores') {
    itemName = `${item.marca} ${item.modelo}`;
  } else if (shopType === 'casas') {
    itemName = `${item.tipo} em ${item.bairro}`;
  } else if (shopType === 'viagens') {
    itemName = `viagem para ${item.destino}`;
  }
  
  closeActionsModal();
  addEvent(`Comprou ${itemName}!`, 'positive', shopType === 'carros' ? 'fa-car' : shopType === 'celulares' ? 'fa-mobile-alt' : shopType === 'computadores' ? 'fa-laptop' : shopType === 'casas' ? 'fa-home' : 'fa-plane');
  showResult('success', 'Compra realizada!', `Você comprou ${itemName}`, effects);
  updateUI();
  saveGame();
}

// === INTERACTION MODAL ===
function showInteractionModal(title, actions) {
  const modal = document.getElementById('interaction-modal');
  const titleEl = document.getElementById('interaction-title');
  const textEl = document.getElementById('interaction-text');
  const optionsEl = document.getElementById('interaction-options');
  
  titleEl.textContent = title;
  textEl.textContent = '';
  
  optionsEl.innerHTML = '';
  actions.forEach(action => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.innerHTML = action.text;
    btn.onclick = action.action;
    optionsEl.appendChild(btn);
  });
  
  // Add cancel button
  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'choice-btn';
  cancelBtn.innerHTML = '<i class="fas fa-times"></i> Cancelar';
  cancelBtn.onclick = closeInteractionModal;
  cancelBtn.style.background = 'var(--danger)';
  optionsEl.appendChild(cancelBtn);
  
  modal.classList.add('active');
}

function closeInteractionModal() {
  document.getElementById('interaction-modal').classList.remove('active');
}

// === RESULT MODAL ===
function showResult(type, title, text, stats) {
  const modal = document.getElementById('result-modal');
  const icon = document.getElementById('result-icon');
  const titleEl = document.getElementById('result-title');
  const textEl = document.getElementById('result-text');
  const statsEl = document.getElementById('result-stats');
  
  icon.className = 'result-icon ' + type;
  icon.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check' : 'fa-times'}"></i>`;
  
  titleEl.textContent = title;
  textEl.textContent = text;
  
  statsEl.innerHTML = '';
  if (stats) {
    stats.forEach(stat => {
      const span = document.createElement('span');
      span.className = `stat-change ${stat.type}`;
      span.textContent = stat.text;
      statsEl.appendChild(span);
    });
  }
  
  modal.classList.add('active');
}

function closeResultModal() {
  document.getElementById('result-modal').classList.remove('active');
}

// === TOAST NOTIFICATIONS ===
function showToast(message, type) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const iconClass = type === 'success' ? 'fa-check-circle' : 
                    type === 'error' ? 'fa-times-circle' : 
                    type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle';
  
  toast.innerHTML = `
    <i class="fas ${iconClass}"></i>
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// === UTILITY ===
window.addEventListener('keydown', (e) => {
  // Enter key in chat input
  if (e.key === 'Enter' && document.activeElement.id === 'chat-input-text') {
    sendMessage();
  }
  
  // Escape key closes modals
  if (e.key === 'Escape') {
    closeActionsModal();
    closeInteractionModal();
    closeResultModal();
    closePhoneModal();
    closeSettings();
  }
});
