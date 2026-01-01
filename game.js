// VidaSim - Main Game Logic

class LifeSimulator {
    constructor() {
        this.state = this.loadState() || this.createNewGame();
        this.settings = this.loadSettings();
        this.purchasedItems = this.loadPurchasedItems();
        this.init();
    }

    // Initialize the game
    init() {
        this.applySplashScreen();
        this.applyTheme(this.settings.theme);
        this.applyAnimationSpeed(this.settings.animationSpeed);
        this.bindEventListeners();
        this.updateUI();
        this.updateSettingsUI();
    }

    // Create a new game state
    createNewGame() {
        return {
            age: GAME_DATA.defaults.age,
            health: GAME_DATA.defaults.health,
            mood: GAME_DATA.defaults.mood,
            money: GAME_DATA.defaults.money,
            reputation: GAME_DATA.defaults.reputation,
            skills: { ...GAME_DATA.defaults.skills },
            timeline: [],
            relationships: [],
            children: 0
        };
    }

    // Load state from localStorage
    loadState() {
        try {
            const saved = localStorage.getItem('vidasim_state');
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            console.error('Failed to load state:', e);
            return null;
        }
    }

    // Save state to localStorage
    saveState() {
        try {
            localStorage.setItem('vidasim_state', JSON.stringify(this.state));
        } catch (e) {
            console.error('Failed to save state:', e);
        }
    }

    // Load settings from localStorage
    loadSettings() {
        try {
            const saved = localStorage.getItem('vidasim_settings');
            return saved ? JSON.parse(saved) : {
                theme: 'light',
                eventDensity: 'medium',
                animationSpeed: 'normal',
                advancedMode: false,
                language: 'en'
            };
        } catch (e) {
            return {
                theme: 'light',
                eventDensity: 'medium',
                animationSpeed: 'normal',
                advancedMode: false,
                language: 'en'
            };
        }
    }

    // Save settings to localStorage
    saveSettings() {
        try {
            localStorage.setItem('vidasim_settings', JSON.stringify(this.settings));
        } catch (e) {
            console.error('Failed to save settings:', e);
        }
    }

    // Load purchased items from localStorage
    loadPurchasedItems() {
        try {
            const saved = localStorage.getItem('vidasim_purchased');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    }

    // Save purchased items to localStorage
    savePurchasedItems() {
        try {
            localStorage.setItem('vidasim_purchased', JSON.stringify(this.purchasedItems));
        } catch (e) {
            console.error('Failed to save purchased items:', e);
        }
    }

    // Splash screen animation
    applySplashScreen() {
        setTimeout(() => {
            document.getElementById('splash-screen').style.display = 'none';
            document.getElementById('app').classList.remove('hidden');
        }, 2500);
    }

    // Bind event listeners
    bindEventListeners() {
        // Next Year button
        document.getElementById('next-year-btn').addEventListener('click', () => {
            this.nextYear();
        });

        // Settings button
        document.getElementById('settings-btn').addEventListener('click', () => {
            this.openSettings();
        });

        document.getElementById('close-settings-btn').addEventListener('click', () => {
            this.closeSettings();
        });

        // Settings controls
        document.getElementById('theme-select').addEventListener('change', (e) => {
            this.settings.theme = e.target.value;
            this.applyTheme(e.target.value);
            this.saveSettings();
        });

        document.getElementById('event-density-select').addEventListener('change', (e) => {
            this.settings.eventDensity = e.target.value;
            this.saveSettings();
        });

        document.getElementById('animation-speed-select').addEventListener('change', (e) => {
            this.settings.animationSpeed = e.target.value;
            this.applyAnimationSpeed(e.target.value);
            this.saveSettings();
        });

        document.getElementById('advanced-mode-toggle').addEventListener('change', (e) => {
            this.settings.advancedMode = e.target.checked;
            this.saveSettings();
            this.updateUI();
        });

        // Shop button
        document.getElementById('shop-btn').addEventListener('click', () => {
            this.openShop();
        });

        document.getElementById('close-shop-btn').addEventListener('click', () => {
            this.closeShop();
        });

        // Shop categories
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.showShopCategory(e.target.dataset.category);
            });
        });

        // Reset button
        document.getElementById('reset-btn').addEventListener('click', () => {
            if (confirm('Are you sure you want to reset your life? This cannot be undone.')) {
                this.resetGame();
            }
        });

        // Close modals when clicking outside
        document.getElementById('settings-modal').addEventListener('click', (e) => {
            if (e.target.id === 'settings-modal') {
                this.closeSettings();
            }
        });

        document.getElementById('shop-modal').addEventListener('click', (e) => {
            if (e.target.id === 'shop-modal') {
                this.closeShop();
            }
        });
    }

    // Apply theme
    applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
    }

    // Apply animation speed
    applyAnimationSpeed(speed) {
        document.body.classList.remove('animation-slow', 'animation-fast');
        if (speed === 'slow') {
            document.body.classList.add('animation-slow');
        } else if (speed === 'fast') {
            document.body.classList.add('animation-fast');
        }
    }

    // Update settings UI
    updateSettingsUI() {
        document.getElementById('theme-select').value = this.settings.theme;
        document.getElementById('event-density-select').value = this.settings.eventDensity;
        document.getElementById('animation-speed-select').value = this.settings.animationSpeed;
        document.getElementById('advanced-mode-toggle').checked = this.settings.advancedMode;
    }

    // Update UI
    updateUI() {
        // Update attributes
        document.getElementById('age-value').textContent = this.state.age;
        document.getElementById('money-value').textContent = this.formatMoney(this.state.money);
        
        // Update bars
        this.updateBar('health', this.state.health);
        this.updateBar('mood', this.state.mood);
        this.updateBar('reputation', this.state.reputation);

        // Update timeline
        this.renderTimeline();
    }

    // Update attribute bar
    updateBar(attribute, value) {
        const clamped = this.clampValue(value, 0, 100);
        document.getElementById(`${attribute}-bar`).style.width = `${clamped}%`;
        document.getElementById(`${attribute}-value`).textContent = Math.round(clamped);
    }

    // Format money
    formatMoney(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    // Clamp value between min and max
    clampValue(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    // Apply effects to attributes
    applyEffects(effects) {
        if (effects.health !== undefined) {
            this.state.health = this.clampValue(this.state.health + effects.health, 0, 100);
        }
        if (effects.mood !== undefined) {
            this.state.mood = this.clampValue(this.state.mood + effects.mood, 0, 100);
        }
        if (effects.money !== undefined) {
            this.state.money += effects.money;
        }
        if (effects.reputation !== undefined) {
            this.state.reputation = this.clampValue(this.state.reputation + effects.reputation, 0, 100);
        }
    }

    // Get random events for the year
    getRandomEvents() {
        const density = EVENT_DENSITY[this.settings.eventDensity];
        const numEvents = Math.floor(Math.random() * (density.max - density.min + 1)) + density.min;
        const events = [];

        for (let i = 0; i < numEvents; i++) {
            const event = this.selectRandomEvent();
            if (event) {
                events.push(this.processEvent(event));
            }
        }

        return events;
    }

    // Select random event based on weights and rarities
    selectRandomEvent() {
        // First, select rarity
        const rarity = this.selectRarity();
        
        // Filter events by rarity
        const availableEvents = GAME_DATA.events.filter(e => e.rarity === rarity);
        
        if (availableEvents.length === 0) return null;

        // Select random event from available events
        return availableEvents[Math.floor(Math.random() * availableEvents.length)];
    }

    // Select rarity based on weights
    selectRarity() {
        const rand = Math.random() * 100;
        let cumulative = 0;

        for (const [rarity, weight] of Object.entries(RARITY_WEIGHTS)) {
            cumulative += weight;
            if (rand <= cumulative) {
                return rarity;
            }
        }

        return 'common';
    }

    // Process event (add personalization)
    processEvent(event) {
        const processed = { ...event };
        
        // Add random company name if career event
        if (event.category === 'career' && Math.random() > 0.5) {
            const company = GAME_DATA.companies[Math.floor(Math.random() * GAME_DATA.companies.length)];
            processed.description = processed.description.replace('company', company);
        }

        // Add random name if relationship event
        if (event.category === 'relationship' && Math.random() > 0.5) {
            const gender = Math.random() > 0.5 ? 'male' : 'female';
            const name = GAME_DATA.names[gender][Math.floor(Math.random() * GAME_DATA.names[gender].length)];
            processed.description = processed.description.replace('someone', name).replace('Someone', name);
        }

        return processed;
    }

    // Progress to next year
    nextYear() {
        this.state.age++;
        
        // Natural attribute decay
        this.state.health = this.clampValue(this.state.health - 1, 0, 100);
        this.state.mood = this.clampValue(this.state.mood - 2, 0, 100);

        // Generate events for the year
        const events = this.getRandomEvents();
        
        // Add events to timeline
        events.forEach(event => {
            const timelineEvent = {
                age: this.state.age,
                ...event
            };

            // Apply effects if no choices
            if (!event.choices || event.choices.length === 0) {
                this.applyEffects(event.effects || {});
                timelineEvent.resolved = true;
            } else {
                timelineEvent.resolved = false;
            }

            this.state.timeline.unshift(timelineEvent);
        });

        // Save and update
        this.saveState();
        this.updateUI();

        // Scroll to top of timeline
        const timeline = document.getElementById('timeline');
        timeline.scrollTop = 0;
    }

    // Render timeline
    renderTimeline() {
        const timeline = document.getElementById('timeline');
        
        if (this.state.timeline.length === 0) {
            timeline.innerHTML = `
                <div class="timeline-empty">
                    <p>Your life story begins here...</p>
                    <p class="timeline-hint">Tap "Next Year" to continue</p>
                </div>
            `;
            return;
        }

        timeline.innerHTML = this.state.timeline.map((event, index) => {
            return this.renderEventCard(event, index);
        }).join('');

        // Bind choice buttons
        this.bindChoiceButtons();
    }

    // Render event card
    renderEventCard(event, index) {
        const effectsBadges = this.renderEffectsBadges(event.effects || {});
        const choices = event.choices && !event.resolved ? this.renderChoices(event.choices, index) : '';

        return `
            <div class="event-card rarity-${event.rarity}" data-index="${index}">
                <div class="event-header">
                    <div class="event-meta">
                        <span class="event-age">Age ${event.age}</span>
                        <span class="event-category ${event.category}">${this.capitalize(event.category)}</span>
                    </div>
                </div>
                <h3 class="event-title">${event.title}</h3>
                <p class="event-description">${event.description}</p>
                ${effectsBadges ? `<div class="event-effects">${effectsBadges}</div>` : ''}
                ${choices ? `<div class="event-choices">${choices}</div>` : ''}
            </div>
        `;
    }

    // Render effects badges
    renderEffectsBadges(effects) {
        const badges = [];

        for (const [key, value] of Object.entries(effects)) {
            if (value === 0) continue;
            
            const isPositive = value > 0;
            const sign = isPositive ? '+' : '';
            const cssClass = isPositive ? 'positive' : 'negative';
            
            let label = key;
            if (key === 'money') {
                badges.push(`<span class="effect-badge ${cssClass}">${sign}${this.formatMoney(value)}</span>`);
            } else {
                badges.push(`<span class="effect-badge ${cssClass}">${this.capitalize(key)} ${sign}${value}</span>`);
            }
        }

        return badges.join('');
    }

    // Render choices
    renderChoices(choices, eventIndex) {
        return choices.map((choice, choiceIndex) => {
            return `
                <button class="choice-btn" data-event-index="${eventIndex}" data-choice-index="${choiceIndex}">
                    ${choice.text}
                </button>
            `;
        }).join('');
    }

    // Bind choice buttons
    bindChoiceButtons() {
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const eventIndex = parseInt(e.target.dataset.eventIndex);
                const choiceIndex = parseInt(e.target.dataset.choiceIndex);
                this.handleChoice(eventIndex, choiceIndex);
            });
        });
    }

    // Handle choice
    handleChoice(eventIndex, choiceIndex) {
        const event = this.state.timeline[eventIndex];
        const choice = event.choices[choiceIndex];

        // Apply effects
        this.applyEffects(choice.effects);

        // Mark event as resolved
        event.resolved = true;
        event.chosenOption = choiceIndex;

        // Save and update
        this.saveState();
        this.updateUI();
    }

    // Open settings modal
    openSettings() {
        document.getElementById('settings-modal').classList.remove('hidden');
    }

    // Close settings modal
    closeSettings() {
        document.getElementById('settings-modal').classList.add('hidden');
    }

    // Open shop modal
    openShop() {
        document.getElementById('shop-modal').classList.remove('hidden');
        this.showShopCategory('cars');
    }

    // Close shop modal
    closeShop() {
        document.getElementById('shop-modal').classList.add('hidden');
    }

    // Show shop category
    showShopCategory(category) {
        const items = GAME_DATA.shop[category];
        const container = document.getElementById('shop-items');
        
        container.innerHTML = items.map(item => {
            const canAfford = this.state.money >= item.price;
            const alreadyPurchased = this.purchasedItems.includes(item.id);
            
            return `
                <div class="shop-item">
                    <div class="shop-item-info">
                        <h3>${item.name}</h3>
                        <p class="shop-item-price">${this.formatMoney(item.price)}</p>
                        <p class="shop-item-effects">${item.description}</p>
                        <p class="shop-item-effects">${this.renderEffectsBadges(item.effects)}</p>
                    </div>
                    <button 
                        class="buy-btn" 
                        ${!canAfford || alreadyPurchased ? 'disabled' : ''}
                        data-item-id="${item.id}"
                        data-category="${category}"
                    >
                        ${alreadyPurchased ? 'Owned' : canAfford ? 'Buy' : 'Too Expensive'}
                    </button>
                </div>
            `;
        }).join('');

        // Bind buy buttons
        document.querySelectorAll('.buy-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = e.target.dataset.itemId;
                const category = e.target.dataset.category;
                this.buyItem(category, itemId);
            });
        });
    }

    // Buy item
    buyItem(category, itemId) {
        const item = GAME_DATA.shop[category].find(i => i.id === itemId);
        
        if (!item) return;
        if (this.state.money < item.price) return;
        if (this.purchasedItems.includes(itemId)) return;

        // Deduct money
        this.state.money -= item.price;

        // Apply effects
        this.applyEffects(item.effects);

        // Add to purchased items
        this.purchasedItems.push(itemId);

        // Add to timeline
        this.state.timeline.unshift({
            age: this.state.age,
            category: 'finance',
            rarity: 'common',
            title: `Purchased ${item.name}`,
            description: `You bought a ${item.name} for ${this.formatMoney(item.price)}.`,
            effects: { money: -item.price, ...item.effects },
            resolved: true
        });

        // Save and update
        this.saveState();
        this.savePurchasedItems();
        this.updateUI();
        this.showShopCategory(category);
    }

    // Reset game
    resetGame() {
        localStorage.removeItem('vidasim_state');
        localStorage.removeItem('vidasim_purchased');
        this.state = this.createNewGame();
        this.purchasedItems = [];
        this.saveState();
        this.updateUI();
    }

    // Utility: Capitalize first letter
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.game = new LifeSimulator();
});
