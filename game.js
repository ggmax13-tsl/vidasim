// ===== Game State Management =====

class GameState {
    constructor() {
        this.state = { ...DEFAULT_STATE };
        this.settings = { ...DEFAULT_SETTINGS };
        this.eventHistory = [];
    }

    // Clamp attributes to safe ranges
    clampAttributes() {
        this.state.health = Math.max(0, Math.min(100, this.state.health));
        this.state.mood = Math.max(0, Math.min(100, this.state.mood));
        this.state.reputation = Math.max(0, Math.min(100, this.state.reputation));
        this.state.skill = Math.max(0, Math.min(100, this.state.skill));
        this.state.money = Math.max(-10000, this.state.money); // Allow some debt
    }

    // Apply effects to state
    applyEffects(effects) {
        const multiplier = this.settings.hardcoreMode ? 1.5 : 1;
        
        Object.keys(effects).forEach(key => {
            if (key in this.state) {
                let value = effects[key];
                // Apply hardcore multiplier to negative effects
                if (value < 0 && this.settings.hardcoreMode) {
                    value *= multiplier;
                }
                this.state[key] += value;
            }
        });
        
        this.clampAttributes();
    }

    // Advance age by one year
    advanceYear() {
        this.state.age += 1;
        
        // Natural aging effects
        if (this.state.age > 40) {
            this.state.health -= Math.floor((this.state.age - 40) / 10);
        }
        
        this.clampAttributes();
    }

    // Save state to localStorage
    save() {
        try {
            const saveData = {
                state: this.state,
                settings: this.settings,
                eventHistory: this.eventHistory.slice(-50) // Keep last 50 events
            };
            localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
            return true;
        } catch (e) {
            console.error('Error saving game:', e);
            return false;
        }
    }

    // Load state from localStorage
    load() {
        try {
            const saved = localStorage.getItem(SAVE_KEY);
            if (saved) {
                const saveData = JSON.parse(saved);
                this.state = { ...DEFAULT_STATE, ...saveData.state };
                this.settings = { ...DEFAULT_SETTINGS, ...saveData.settings };
                this.eventHistory = saveData.eventHistory || [];
                this.clampAttributes();
                return true;
            }
        } catch (e) {
            console.error('Error loading game:', e);
        }
        return false;
    }

    // Reset progress
    reset() {
        this.state = { ...DEFAULT_STATE };
        this.eventHistory = [];
        localStorage.removeItem(SAVE_KEY);
    }
}

// ===== Event Selection Engine =====

class EventEngine {
    constructor(gameState) {
        this.gameState = gameState;
    }

    // Select random rarity based on weights
    selectRarity() {
        const totalWeight = Object.values(RARITIES).reduce((sum, r) => sum + r.weight, 0);
        let random = Math.random() * totalWeight;
        
        for (const [rarity, data] of Object.entries(RARITIES)) {
            random -= data.weight;
            if (random <= 0) {
                return rarity;
            }
        }
        
        return 'common';
    }

    // Select random event from a rarity pool
    selectEvent(rarity) {
        const pool = EVENTS[rarity];
        if (!pool || pool.length === 0) return null;
        
        const randomIndex = Math.floor(Math.random() * pool.length);
        return { ...pool[randomIndex], rarity };
    }

    // Generate events for a year based on density
    generateYearEvents() {
        const density = this.gameState.settings.eventDensity;
        const eventCounts = {
            low: { min: 1, max: 2 },
            medium: { min: 2, max: 3 },
            high: { min: 3, max: 4 }
        };
        
        const { min, max } = eventCounts[density] || eventCounts.medium;
        const count = Math.floor(Math.random() * (max - min + 1)) + min;
        
        const events = [];
        for (let i = 0; i < count; i++) {
            const rarity = this.selectRarity();
            const event = this.selectEvent(rarity);
            if (event) {
                events.push(event);
            }
        }
        
        return events;
    }
}

// ===== UI Renderer =====

class UIRenderer {
    constructor(gameState) {
        this.gameState = gameState;
    }

    // Update stats display
    updateStats() {
        const { health, mood, money, reputation, skill, age } = this.gameState.state;
        
        // Health
        document.getElementById('health-value').textContent = Math.round(health);
        document.getElementById('health-bar').style.width = `${health}%`;
        
        // Mood
        document.getElementById('mood-value').textContent = Math.round(mood);
        document.getElementById('mood-bar').style.width = `${mood}%`;
        
        // Money
        document.getElementById('money-value').textContent = `$${money.toLocaleString()}`;
        
        // Reputation
        document.getElementById('reputation-value').textContent = Math.round(reputation);
        document.getElementById('reputation-bar').style.width = `${reputation}%`;
        
        // Skill
        document.getElementById('skill-value').textContent = Math.round(skill);
        document.getElementById('skill-bar').style.width = `${skill}%`;
        
        // Age
        document.getElementById('age-value').textContent = `${age} anos`;
    }

    // Render an event card
    renderEvent(event) {
        const card = document.createElement('div');
        card.className = `event-card ${event.rarity}`;
        
        // Header
        const header = document.createElement('div');
        header.className = 'event-header';
        
        const title = document.createElement('h3');
        title.className = 'event-title';
        title.textContent = event.title;
        
        const rarityBadge = document.createElement('span');
        rarityBadge.className = `event-rarity ${event.rarity}`;
        rarityBadge.textContent = RARITIES[event.rarity].label;
        
        header.appendChild(title);
        header.appendChild(rarityBadge);
        card.appendChild(header);
        
        // Description
        const description = document.createElement('p');
        description.className = 'event-description';
        description.textContent = event.description;
        card.appendChild(description);
        
        // Effects
        if (event.effects && Object.keys(event.effects).length > 0) {
            const effectsContainer = document.createElement('div');
            effectsContainer.className = 'event-effects';
            
            Object.entries(event.effects).forEach(([key, value]) => {
                const badge = document.createElement('span');
                badge.className = `effect-badge ${value > 0 ? 'positive' : 'negative'}`;
                badge.textContent = `${this.getEffectIcon(key)} ${value > 0 ? '+' : ''}${value}`;
                effectsContainer.appendChild(badge);
            });
            
            card.appendChild(effectsContainer);
        }
        
        // Choices
        if (event.choices) {
            const choicesContainer = document.createElement('div');
            choicesContainer.className = 'event-choices';
            
            event.choices.forEach((choice, index) => {
                const button = document.createElement('button');
                button.className = 'choice-btn';
                button.textContent = choice.text;
                button.onclick = () => this.handleChoice(event, choice, card);
                choicesContainer.appendChild(button);
            });
            
            card.appendChild(choicesContainer);
        }
        
        return card;
    }

    // Get icon for effect type
    getEffectIcon(effectType) {
        const icons = {
            health: '❤️',
            mood: '😊',
            money: '💰',
            reputation: '⭐',
            skill: '🎓'
        };
        return icons[effectType] || '';
    }

    // Handle choice selection
    handleChoice(event, choice, card) {
        // Apply choice effects
        this.gameState.applyEffects(choice.effects);
        this.updateStats();
        
        // Disable all choice buttons
        const buttons = card.querySelectorAll('.choice-btn');
        buttons.forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.5';
        });
        
        // Show chosen effects
        const effectsDiv = document.createElement('div');
        effectsDiv.className = 'event-effects';
        effectsDiv.style.marginTop = '0.5rem';
        
        Object.entries(choice.effects).forEach(([key, value]) => {
            const badge = document.createElement('span');
            badge.className = `effect-badge ${value > 0 ? 'positive' : 'negative'}`;
            badge.textContent = `${this.getEffectIcon(key)} ${value > 0 ? '+' : ''}${value}`;
            effectsDiv.appendChild(badge);
        });
        
        card.appendChild(effectsDiv);
        
        // Save game
        this.gameState.save();
    }

    // Add event to timeline
    addEventToTimeline(event) {
        const timeline = document.getElementById('timeline');
        const card = this.renderEvent(event);
        timeline.appendChild(card);
        
        // Scroll to bottom
        setTimeout(() => {
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }

    // Clear timeline
    clearTimeline() {
        document.getElementById('timeline').innerHTML = '';
    }

    // Apply theme
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }

    // Set animation speed
    setAnimationSpeed(speed) {
        const speeds = {
            slow: '0.5s',
            normal: '0.3s',
            fast: '0.15s'
        };
        document.documentElement.style.setProperty('--anim-duration', speeds[speed] || speeds.normal);
    }
}

// ===== Shop System =====

class ShopSystem {
    constructor(gameState, uiRenderer) {
        this.gameState = gameState;
        this.uiRenderer = uiRenderer;
    }

    openShop(shopType) {
        const dialog = document.getElementById('shop-dialog');
        const title = document.getElementById('shop-title');
        const itemsContainer = document.getElementById('shop-items');
        
        title.textContent = shopType === 'cars' ? '🚗 Loja de Veículos' : '📱 Loja de Celulares';
        itemsContainer.innerHTML = '';
        
        const items = SHOPS[shopType] || [];
        items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'shop-item';
            
            const info = document.createElement('div');
            info.className = 'shop-item-info';
            
            const name = document.createElement('div');
            name.className = 'shop-item-name';
            name.textContent = item.name;
            
            const price = document.createElement('div');
            price.className = 'shop-item-price';
            price.textContent = `$${item.price.toLocaleString()}`;
            
            info.appendChild(name);
            info.appendChild(price);
            
            const button = document.createElement('button');
            button.className = 'shop-item-btn';
            button.textContent = 'Comprar';
            button.disabled = this.gameState.state.money < item.price;
            button.onclick = () => this.buyItem(shopType, item);
            
            itemDiv.appendChild(info);
            itemDiv.appendChild(button);
            itemsContainer.appendChild(itemDiv);
        });
        
        dialog.showModal();
    }

    buyItem(shopType, item) {
        if (this.gameState.state.money >= item.price) {
            this.gameState.state.money -= item.price;
            this.gameState.state.inventory[shopType === 'cars' ? 'car' : 'phone'] = item.id;
            this.gameState.applyEffects(item.effects);
            this.uiRenderer.updateStats();
            this.gameState.save();
            
            // Close shop and show success
            document.getElementById('shop-dialog').close();
            
            // Add purchase event to timeline
            const purchaseEvent = {
                id: `purchase_${item.id}`,
                category: 'shop',
                title: `🛒 Compra: ${item.name}`,
                description: `Você comprou ${item.name} por $${item.price.toLocaleString()}!`,
                rarity: 'common',
                effects: item.effects,
                choices: null
            };
            this.uiRenderer.addEventToTimeline(purchaseEvent);
        }
    }
}

// ===== Settings Manager =====

class SettingsManager {
    constructor(gameState, uiRenderer) {
        this.gameState = gameState;
        this.uiRenderer = uiRenderer;
    }

    loadSettings() {
        // Theme
        const themeSelect = document.getElementById('theme-select');
        themeSelect.value = this.gameState.settings.theme;
        this.uiRenderer.applyTheme(this.gameState.settings.theme);
        
        // Event density
        const densitySelect = document.getElementById('event-density-select');
        densitySelect.value = this.gameState.settings.eventDensity;
        
        // Animation speed
        const animSpeedSelect = document.getElementById('animation-speed-select');
        animSpeedSelect.value = this.gameState.settings.animationSpeed;
        this.uiRenderer.setAnimationSpeed(this.gameState.settings.animationSpeed);
        
        // Advanced mode
        const advancedToggle = document.getElementById('advanced-mode-toggle');
        advancedToggle.checked = this.gameState.settings.advancedMode;
        
        // Hardcore mode
        const hardcoreToggle = document.getElementById('hardcore-mode-toggle');
        hardcoreToggle.checked = this.gameState.settings.hardcoreMode;
        
        // Show/hide hardcore setting based on advanced mode
        this.toggleHardcoreSetting(this.gameState.settings.advancedMode);
    }

    saveSettings() {
        // Theme
        const theme = document.getElementById('theme-select').value;
        this.gameState.settings.theme = theme;
        this.uiRenderer.applyTheme(theme);
        
        // Event density
        this.gameState.settings.eventDensity = document.getElementById('event-density-select').value;
        
        // Animation speed
        const animSpeed = document.getElementById('animation-speed-select').value;
        this.gameState.settings.animationSpeed = animSpeed;
        this.uiRenderer.setAnimationSpeed(animSpeed);
        
        // Advanced mode
        const advancedMode = document.getElementById('advanced-mode-toggle').checked;
        this.gameState.settings.advancedMode = advancedMode;
        this.toggleHardcoreSetting(advancedMode);
        
        // Hardcore mode
        this.gameState.settings.hardcoreMode = document.getElementById('hardcore-mode-toggle').checked;
        
        this.gameState.save();
    }

    toggleHardcoreSetting(show) {
        const hardcoreSetting = document.getElementById('hardcore-setting');
        hardcoreSetting.style.display = show ? 'block' : 'none';
    }
}

// ===== Confirmation Dialog =====

class ConfirmationDialog {
    show(title, message) {
        return new Promise((resolve) => {
            const dialog = document.getElementById('confirm-dialog');
            const titleEl = document.getElementById('confirm-title');
            const messageEl = document.getElementById('confirm-message');
            const yesBtn = document.getElementById('confirm-yes-btn');
            const noBtn = document.getElementById('confirm-no-btn');
            
            titleEl.textContent = title;
            messageEl.textContent = message;
            
            const handleYes = () => {
                dialog.close();
                yesBtn.removeEventListener('click', handleYes);
                noBtn.removeEventListener('click', handleNo);
                resolve(true);
            };
            
            const handleNo = () => {
                dialog.close();
                yesBtn.removeEventListener('click', handleYes);
                noBtn.removeEventListener('click', handleNo);
                resolve(false);
            };
            
            yesBtn.addEventListener('click', handleYes);
            noBtn.addEventListener('click', handleNo);
            
            dialog.showModal();
        });
    }
}

// ===== Main Game Controller =====

class GameController {
    constructor() {
        this.gameState = new GameState();
        this.eventEngine = new EventEngine(this.gameState);
        this.uiRenderer = new UIRenderer(this.gameState);
        this.shopSystem = new ShopSystem(this.gameState, this.uiRenderer);
        this.settingsManager = new SettingsManager(this.gameState, this.uiRenderer);
        this.confirmDialog = new ConfirmationDialog();
        this.isProcessing = false;
    }

    init() {
        // Hide splash and show app
        setTimeout(() => {
            const splash = document.getElementById('splash-screen');
            splash.classList.add('fade-out');
            setTimeout(() => {
                splash.style.display = 'none';
                document.getElementById('app').style.display = 'flex';
                this.start();
            }, 500);
        }, 2000);
    }

    start() {
        // Load saved game or start new
        const loaded = this.gameState.load();
        
        // Initialize UI
        this.settingsManager.loadSettings();
        this.uiRenderer.updateStats();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Show welcome message for new game
        if (!loaded) {
            this.showWelcomeMessage();
        }
    }

    showWelcomeMessage() {
        const welcomeEvent = {
            id: 'welcome',
            category: 'news',
            title: '🎮 Bem-vindo ao VidaSim!',
            description: 'Sua jornada pela vida começa aos 18 anos. Tome decisões, enfrente desafios e construa seu futuro. Cada ano traz novos eventos e oportunidades. Boa sorte!',
            rarity: 'common',
            effects: {},
            choices: null
        };
        this.uiRenderer.addEventToTimeline(welcomeEvent);
    }

    setupEventListeners() {
        // Next year button
        document.getElementById('next-year-btn').addEventListener('click', () => {
            this.advanceYear();
        });
        
        // Settings button
        document.getElementById('settings-btn').addEventListener('click', () => {
            document.getElementById('settings-dialog').showModal();
        });
        
        // Close settings
        document.getElementById('close-settings-btn').addEventListener('click', () => {
            this.settingsManager.saveSettings();
            document.getElementById('settings-dialog').close();
        });
        
        // Close shop
        document.getElementById('close-shop-btn').addEventListener('click', () => {
            document.getElementById('shop-dialog').close();
        });
        
        // Reset progress
        document.getElementById('reset-progress-btn').addEventListener('click', async () => {
            const confirmed = await this.confirmDialog.show(
                'Resetar Progresso',
                'Tem certeza que deseja resetar todo o progresso? Esta ação não pode ser desfeita.'
            );
            
            if (confirmed) {
                this.resetGame();
            }
        });
        
        // Settings change listeners
        document.getElementById('theme-select').addEventListener('change', () => {
            this.settingsManager.saveSettings();
        });
        
        document.getElementById('advanced-mode-toggle').addEventListener('change', () => {
            this.settingsManager.saveSettings();
        });
    }

    async advanceYear() {
        if (this.isProcessing) return;
        
        this.isProcessing = true;
        const button = document.getElementById('next-year-btn');
        button.disabled = true;
        
        // Advance age
        this.gameState.advanceYear();
        
        // Generate and show events
        const events = this.eventEngine.generateYearEvents();
        
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            
            // Apply immediate effects
            if (event.effects && !event.choices) {
                this.gameState.applyEffects(event.effects);
            }
            
            // Add to timeline
            this.uiRenderer.addEventToTimeline(event);
            
            // Add to history
            this.gameState.eventHistory.push({
                age: this.gameState.state.age,
                eventId: event.id,
                title: event.title
            });
            
            // Wait between events for better UX
            if (i < events.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 300));
            }
        }
        
        // Update stats
        this.uiRenderer.updateStats();
        
        // Check game over conditions
        if (this.gameState.state.health <= 0) {
            this.gameOver('Sua saúde chegou a zero. Game Over!');
            return;
        }
        
        // Save game
        this.gameState.save();
        
        button.disabled = false;
        this.isProcessing = false;
    }

    gameOver(message) {
        const gameOverEvent = {
            id: 'game_over',
            category: 'news',
            title: '💀 Game Over',
            description: message,
            rarity: 'epic',
            effects: {},
            choices: null
        };
        this.uiRenderer.addEventToTimeline(gameOverEvent);
        
        document.getElementById('next-year-btn').disabled = true;
    }

    resetGame() {
        this.gameState.reset();
        this.uiRenderer.clearTimeline();
        this.uiRenderer.updateStats();
        this.settingsManager.loadSettings();
        this.showWelcomeMessage();
        document.getElementById('settings-dialog').close();
        document.getElementById('next-year-btn').disabled = false;
        this.isProcessing = false;
    }
}

// ===== Initialize Game =====

let game;

document.addEventListener('DOMContentLoaded', () => {
    game = new GameController();
    game.init();
});
