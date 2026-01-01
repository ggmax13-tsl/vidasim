// ===== GAME.JS - Life Simulator Core Logic =====

// Game State
let gameState = {
    health: 100,
    mood: 100,
    money: 1000,
    reputation: 50,
    skill: 10,
    age: 18,
    inventory: {
        cars: [],
        phones: []
    },
    settings: { ...DADOS.SETTINGS_DEFAULTS }
};

let currentChoiceCallback = null;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initGame();
});

function initGame() {
    // Show splash screen with loading animation
    const splash = document.getElementById('splash-screen');
    splash.classList.add('active');
    
    // Load saved game or initialize new game
    loadGame();
    
    // Hide splash after 2 seconds
    setTimeout(() => {
        splash.classList.remove('active');
        document.getElementById('game-container').classList.remove('hidden');
        
        // Add welcome event
        addTimelineEvent({
            title: 'Welcome to Life Simulator!',
            description: 'Your life journey begins. Make wise choices!',
            icon: '🎮',
            rarity: 'common',
            effects: { mood: 10 }
        });
        
        updateUI();
    }, 2000);
    
    // Setup event listeners
    setupEventListeners();
}

function setupEventListeners() {
    // Age up button
    document.getElementById('age-btn').addEventListener('click', ageUp);
    
    // Shop button
    document.getElementById('shop-btn').addEventListener('click', openShop);
    
    // Settings button
    document.getElementById('settings-btn').addEventListener('click', openSettings);
    
    // Dialog close buttons
    document.querySelectorAll('.dialog-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('dialog').close();
        });
    });
    
    // Settings dialog save button
    document.querySelector('.dialog-save').addEventListener('click', saveSettings);
    
    // Reset button
    document.getElementById('reset-btn').addEventListener('click', confirmReset);
    
    // Theme select
    document.getElementById('theme-select').addEventListener('change', (e) => {
        applyTheme(e.target.value);
    });
    
    // Shop tabs
    document.querySelectorAll('.shop-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            switchShopTab(e.target.dataset.tab);
        });
    });
    
    // Confirm dialog buttons
    document.getElementById('confirm-cancel').addEventListener('click', () => {
        document.getElementById('confirm-dialog').close();
    });
    
    document.getElementById('confirm-ok').addEventListener('click', () => {
        if (currentChoiceCallback) {
            currentChoiceCallback();
            currentChoiceCallback = null;
        }
        document.getElementById('confirm-dialog').close();
    });
}

// ===== GAME LOGIC =====
function ageUp() {
    gameState.age++;
    
    // Apply age effects
    const ageEffects = {
        health: -1,
        mood: -2
    };
    
    applyEffects(ageEffects);
    
    // Random event generation based on event density
    const densityMultiplier = DADOS.EVENT_DENSITY[gameState.settings.eventDensity];
    if (Math.random() < densityMultiplier) {
        const event = selectRandomEvent();
        if (event) {
            addTimelineEvent(event);
        }
    }
    
    // Random flavor text (lower probability)
    if (Math.random() < 0.2) {
        const flavor = DADOS.FLAVOR[Math.floor(Math.random() * DADOS.FLAVOR.length)];
        addFlavorText(flavor);
    }
    
    // Random windfall/setback (lower probability)
    if (Math.random() < 0.1) {
        if (Math.random() < 0.5) {
            const windfall = DADOS.WINDFALLS[Math.floor(Math.random() * DADOS.WINDFALLS.length)];
            addTimelineEvent({
                title: windfall.text,
                description: 'Lucky you!',
                icon: windfall.icon,
                rarity: 'common',
                effects: windfall.effects
            });
        } else {
            const setback = DADOS.SETBACKS[Math.floor(Math.random() * DADOS.SETBACKS.length)];
            addTimelineEvent({
                title: setback.text,
                description: 'Bad luck...',
                icon: setback.icon,
                rarity: 'common',
                effects: setback.effects
            });
        }
    }
    
    updateUI();
    saveGame();
}

function selectRandomEvent() {
    // Get all event categories
    const categories = Object.keys(DADOS.EVENTS);
    const category = categories[Math.floor(Math.random() * categories.length)];
    
    // Select rarity based on weights
    const rarity = selectRarity();
    
    // Get events of that category and rarity
    const events = DADOS.EVENTS[category][rarity];
    if (!events || events.length === 0) return null;
    
    const event = events[Math.floor(Math.random() * events.length)];
    return { ...event, rarity };
}

function selectRarity() {
    const total = DADOS.RARITY_WEIGHTS.common + DADOS.RARITY_WEIGHTS.rare + DADOS.RARITY_WEIGHTS.epic;
    const rand = Math.random() * total;
    
    if (rand < DADOS.RARITY_WEIGHTS.common) return 'common';
    if (rand < DADOS.RARITY_WEIGHTS.common + DADOS.RARITY_WEIGHTS.rare) return 'rare';
    return 'epic';
}

function applyEffects(effects) {
    if (!effects) return;
    
    // Apply hardcore multiplier if enabled
    const hardcoreMultiplier = gameState.settings.hardcore ? 1.5 : 1.0;
    
    // Apply each effect with clamping
    if (effects.health !== undefined) {
        const change = effects.health * (effects.health < 0 ? hardcoreMultiplier : 1);
        gameState.health = clamp(gameState.health + change, 0, 100);
    }
    if (effects.mood !== undefined) {
        const change = effects.mood * (effects.mood < 0 ? hardcoreMultiplier : 1);
        gameState.mood = clamp(gameState.mood + change, 0, 100);
    }
    if (effects.money !== undefined) {
        const change = effects.money * (effects.money < 0 ? hardcoreMultiplier : 1);
        gameState.money = Math.max(0, gameState.money + change);
    }
    if (effects.reputation !== undefined) {
        gameState.reputation = clamp(gameState.reputation + effects.reputation, 0, 100);
    }
    if (effects.skill !== undefined) {
        gameState.skill = clamp(gameState.skill + effects.skill, 0, 100);
    }
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

// ===== UI RENDERING =====
function updateUI() {
    // Update stat values
    document.getElementById('health-value').textContent = Math.floor(gameState.health);
    document.getElementById('mood-value').textContent = Math.floor(gameState.mood);
    document.getElementById('money-value').textContent = `$${Math.floor(gameState.money)}`;
    document.getElementById('reputation-value').textContent = Math.floor(gameState.reputation);
    document.getElementById('skill-value').textContent = Math.floor(gameState.skill);
    document.getElementById('age-value').textContent = gameState.age;
    
    // Update stat card colors based on values
    updateStatCardColors();
}

function updateStatCardColors() {
    const stats = ['health', 'mood', 'reputation', 'skill'];
    stats.forEach(stat => {
        const value = gameState[stat];
        const card = document.querySelector(`#${stat}-value`).closest('.stat-card');
        
        if (value < 30) {
            card.style.borderColor = 'var(--color-danger)';
        } else if (value < 60) {
            card.style.borderColor = 'var(--color-warning)';
        } else {
            card.style.borderColor = 'var(--color-success)';
        }
    });
}

function addTimelineEvent(event) {
    const timeline = document.getElementById('timeline');
    const eventCard = document.createElement('div');
    eventCard.className = `event-card ${event.rarity}`;
    
    // Build effects HTML
    let effectsHTML = '';
    if (event.effects) {
        effectsHTML = '<div class="event-effects">';
        for (const [key, value] of Object.entries(event.effects)) {
            const sign = value > 0 ? '+' : '';
            const type = value > 0 ? 'positive' : 'negative';
            const label = key.charAt(0).toUpperCase() + key.slice(1);
            effectsHTML += `<span class="effect-badge ${type}">${sign}${value} ${label}</span>`;
        }
        effectsHTML += '</div>';
    }
    
    eventCard.innerHTML = `
        <div class="event-header">
            <span class="event-icon">${event.icon}</span>
            <h3 class="event-title">${event.title}</h3>
            <span class="event-rarity ${event.rarity}">${event.rarity}</span>
        </div>
        <p class="event-description">${event.description}</p>
        ${effectsHTML}
    `;
    
    timeline.insertBefore(eventCard, timeline.firstChild);
    
    // Apply effects if no choices
    if (!event.choices && event.effects) {
        applyEffects(event.effects);
        updateUI();
    }
    
    // Show choices dialog if event has choices
    if (event.choices) {
        showChoices(event);
    }
    
    // Limit timeline to last 20 events
    while (timeline.children.length > 20) {
        timeline.removeChild(timeline.lastChild);
    }
}

function addFlavorText(text) {
    const timeline = document.getElementById('timeline');
    const flavorCard = document.createElement('div');
    flavorCard.className = 'event-card common';
    flavorCard.style.opacity = '0.7';
    flavorCard.innerHTML = `
        <div class="event-header">
            <span class="event-icon">💭</span>
            <h3 class="event-title">Daily Life</h3>
        </div>
        <p class="event-description">${text}</p>
    `;
    timeline.insertBefore(flavorCard, timeline.firstChild);
}

function showChoices(event) {
    const dialog = document.getElementById('choice-dialog');
    const title = document.getElementById('choice-title');
    const description = document.getElementById('choice-description');
    const options = document.getElementById('choice-options');
    
    title.textContent = event.title;
    description.textContent = event.description;
    
    options.innerHTML = '';
    event.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = choice.text;
        button.addEventListener('click', () => {
            applyEffects(choice.effects);
            updateUI();
            dialog.close();
        });
        options.appendChild(button);
    });
    
    dialog.showModal();
}

// ===== SHOP SYSTEM =====
function openShop() {
    const dialog = document.getElementById('shop-dialog');
    switchShopTab('cars');
    dialog.showModal();
}

function switchShopTab(tab) {
    // Update tab buttons
    document.querySelectorAll('.shop-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    
    // Render shop items
    const container = document.getElementById('shop-items');
    container.innerHTML = '';
    
    const items = DADOS.SHOP[tab];
    items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'shop-item';
        itemCard.innerHTML = `
            <div class="shop-item-icon">${item.icon}</div>
            <div class="shop-item-name">${item.name}</div>
            <div class="shop-item-price">$${item.price}</div>
        `;
        itemCard.addEventListener('click', () => purchaseItem(item, tab));
        container.appendChild(itemCard);
    });
}

function purchaseItem(item, category) {
    if (gameState.money >= item.price) {
        // Check if already owned
        if (gameState.inventory[category].includes(item.id)) {
            showConfirm('Already Owned', 'You already own this item!');
            return;
        }
        
        gameState.money -= item.price;
        gameState.reputation += item.reputation;
        gameState.inventory[category].push(item.id);
        
        addTimelineEvent({
            title: `Purchased ${item.name}`,
            description: `You bought a ${item.name}!`,
            icon: item.icon,
            rarity: 'common',
            effects: { reputation: item.reputation }
        });
        
        updateUI();
        saveGame();
        document.getElementById('shop-dialog').close();
    } else {
        showConfirm('Not Enough Money', `You need $${item.price} but only have $${Math.floor(gameState.money)}.`);
    }
}

// ===== SETTINGS SYSTEM =====
function openSettings() {
    const dialog = document.getElementById('settings-dialog');
    
    // Load current settings
    document.getElementById('theme-select').value = gameState.settings.theme;
    document.getElementById('density-select').value = gameState.settings.eventDensity;
    document.getElementById('animation-select').value = gameState.settings.animationSpeed;
    document.getElementById('hardcore-check').checked = gameState.settings.hardcore;
    document.getElementById('advanced-check').checked = gameState.settings.advanced;
    document.getElementById('language-select').value = gameState.settings.language;
    
    dialog.showModal();
}

function saveSettings() {
    gameState.settings.theme = document.getElementById('theme-select').value;
    gameState.settings.eventDensity = document.getElementById('density-select').value;
    gameState.settings.animationSpeed = document.getElementById('animation-select').value;
    gameState.settings.hardcore = document.getElementById('hardcore-check').checked;
    gameState.settings.advanced = document.getElementById('advanced-check').checked;
    gameState.settings.language = document.getElementById('language-select').value;
    
    applyTheme(gameState.settings.theme);
    applyAnimationSpeed(gameState.settings.animationSpeed);
    
    saveGame();
    document.getElementById('settings-dialog').close();
}

function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
}

function applyAnimationSpeed(speed) {
    const multiplier = DADOS.ANIMATION_SPEED[speed];
    document.documentElement.style.setProperty('--transition-fast', `${150 * multiplier}ms ease`);
    document.documentElement.style.setProperty('--transition-normal', `${300 * multiplier}ms ease`);
    document.documentElement.style.setProperty('--transition-slow', `${500 * multiplier}ms ease`);
}

function confirmReset() {
    currentChoiceCallback = resetGame;
    showConfirm('Reset Progress', 'Are you sure you want to reset all progress? This cannot be undone!');
}

function resetGame() {
    localStorage.removeItem(DADOS.SAVE_KEY);
    location.reload();
}

function showConfirm(title, message) {
    const dialog = document.getElementById('confirm-dialog');
    document.getElementById('confirm-title').textContent = title;
    document.getElementById('confirm-message').textContent = message;
    dialog.showModal();
}

// ===== SAVE/LOAD SYSTEM =====
function saveGame() {
    try {
        const saveData = JSON.stringify(gameState);
        localStorage.setItem(DADOS.SAVE_KEY, saveData);
    } catch (e) {
        console.error('Failed to save game:', e);
    }
}

function loadGame() {
    try {
        const saveData = localStorage.getItem(DADOS.SAVE_KEY);
        if (saveData) {
            const loaded = JSON.parse(saveData);
            // Merge with default settings to handle new settings
            gameState = {
                ...gameState,
                ...loaded,
                settings: { ...DADOS.SETTINGS_DEFAULTS, ...loaded.settings }
            };
            applyTheme(gameState.settings.theme);
            applyAnimationSpeed(gameState.settings.animationSpeed);
        }
    } catch (e) {
        console.error('Failed to load game:', e);
        // If load fails, start fresh
        gameState = {
            health: 100,
            mood: 100,
            money: 1000,
            reputation: 50,
            skill: 10,
            age: 18,
            inventory: {
                cars: [],
                phones: []
            },
            settings: { ...DADOS.SETTINGS_DEFAULTS }
        };
    }
}
