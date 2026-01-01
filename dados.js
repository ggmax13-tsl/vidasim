// ===== DADOS.JS - Data Catalogs =====

const DADOS = {
    // Constants
    SAVE_KEY: 'life_simulator_save',
    
    // Event Rarity Weights
    RARITY_WEIGHTS: {
        common: 70,
        rare: 25,
        epic: 5
    },
    
    // Settings Defaults
    SETTINGS_DEFAULTS: {
        theme: 'light',
        eventDensity: 'medium',
        animationSpeed: 'normal',
        hardcore: false,
        advanced: false,
        language: 'en'
    },
    
    // Event Density Multipliers
    EVENT_DENSITY: {
        low: 0.3,
        medium: 0.6,
        high: 0.9
    },
    
    // Animation Speed Multipliers
    ANIMATION_SPEED: {
        slow: 1.5,
        normal: 1.0,
        fast: 0.5
    },
    
    // Shop Catalogs
    SHOP: {
        cars: [
            { id: 'bike', name: 'Bicycle', icon: '🚲', price: 300, reputation: 1 },
            { id: 'scooter', name: 'Scooter', icon: '🛵', price: 1500, reputation: 2 },
            { id: 'sedan', name: 'Sedan', icon: '🚗', price: 15000, reputation: 5 },
            { id: 'suv', name: 'SUV', icon: '🚙', price: 35000, reputation: 8 },
            { id: 'sports', name: 'Sports Car', icon: '🏎️', price: 75000, reputation: 15 },
            { id: 'luxury', name: 'Luxury Car', icon: '🚘', price: 150000, reputation: 25 }
        ],
        phones: [
            { id: 'basic', name: 'Basic Phone', icon: '📱', price: 100, reputation: 1 },
            { id: 'smartphone', name: 'Smartphone', icon: '📱', price: 500, reputation: 3 },
            { id: 'premium', name: 'Premium Phone', icon: '📱', price: 1200, reputation: 6 },
            { id: 'flagship', name: 'Flagship Phone', icon: '📱', price: 1500, reputation: 10 }
        ]
    },
    
    // Events by Category and Rarity
    EVENTS: {
        // Career/Education Events
        career: {
            common: [
                {
                    title: 'Job Offer',
                    description: 'You received a job offer at a local company.',
                    icon: '💼',
                    effects: { money: 500, skill: 5, reputation: 3 },
                    choices: null
                },
                {
                    title: 'Training Workshop',
                    description: 'Your company offered a free training workshop.',
                    icon: '🎓',
                    effects: { skill: 10, mood: 5 },
                    choices: null
                },
                {
                    title: 'Overtime Request',
                    description: 'Your boss asked if you can work overtime this weekend.',
                    icon: '⏰',
                    effects: null,
                    choices: [
                        { text: 'Accept (Tired but paid)', effects: { money: 200, health: -10, mood: -5 } },
                        { text: 'Decline (Stay healthy)', effects: { health: 5, mood: 5, reputation: -2 } }
                    ]
                },
                {
                    title: 'Office Party',
                    description: 'There\'s an office party tonight. Will you attend?',
                    icon: '🎉',
                    effects: null,
                    choices: [
                        { text: 'Attend (Network)', effects: { reputation: 5, mood: 10, money: -50 } },
                        { text: 'Skip (Rest at home)', effects: { health: 5, mood: -5 } }
                    ]
                }
            ],
            rare: [
                {
                    title: 'Promotion Opportunity',
                    description: 'You\'ve been offered a promotion!',
                    icon: '⭐',
                    effects: { money: 2000, skill: 10, reputation: 10, mood: 15 },
                    choices: null
                },
                {
                    title: 'Business Trip',
                    description: 'Your company wants to send you on a business trip abroad.',
                    icon: '✈️',
                    effects: null,
                    choices: [
                        { text: 'Accept (Adventure)', effects: { money: 1000, reputation: 8, skill: 12, mood: 20 } },
                        { text: 'Decline (Stay home)', effects: { mood: 5, reputation: -5 } }
                    ]
                },
                {
                    title: 'Certification Course',
                    description: 'You found a certification course that could boost your career.',
                    icon: '📜',
                    effects: null,
                    choices: [
                        { text: 'Enroll (Invest in yourself)', effects: { money: -1500, skill: 25, reputation: 8 } },
                        { text: 'Skip (Save money)', effects: { money: 100 } }
                    ]
                }
            ],
            epic: [
                {
                    title: 'Dream Job Offer',
                    description: 'A prestigious company offered you your dream job!',
                    icon: '🌟',
                    effects: { money: 10000, skill: 20, reputation: 25, mood: 30 },
                    choices: null
                },
                {
                    title: 'Start Your Own Company',
                    description: 'You have a revolutionary business idea. Start your company?',
                    icon: '🚀',
                    effects: null,
                    choices: [
                        { text: 'Take the risk', effects: { money: -5000, skill: 30, reputation: 15, mood: 25 } },
                        { text: 'Play it safe', effects: { money: 500, mood: -10 } }
                    ]
                }
            ]
        },
        
        // Family/Relationships Events
        family: {
            common: [
                {
                    title: 'Family Dinner',
                    description: 'Your family invited you for dinner.',
                    icon: '🍽️',
                    effects: { mood: 10, health: 5 },
                    choices: null
                },
                {
                    title: 'Friend\'s Birthday',
                    description: 'Your friend invited you to their birthday party.',
                    icon: '🎂',
                    effects: { mood: 8, money: -30 },
                    choices: null
                },
                {
                    title: 'Argument with Family',
                    description: 'You had a disagreement with a family member.',
                    icon: '😠',
                    effects: { mood: -10, health: -5 },
                    choices: null
                },
                {
                    title: 'New Friend',
                    description: 'You made a new friend at a social event.',
                    icon: '👥',
                    effects: { mood: 12, reputation: 3 },
                    choices: null
                }
            ],
            rare: [
                {
                    title: 'Marriage Proposal',
                    description: 'Someone special asked you to marry them!',
                    icon: '💍',
                    effects: null,
                    choices: [
                        { text: 'Say Yes!', effects: { mood: 40, reputation: 10, money: -3000 } },
                        { text: 'Need more time', effects: { mood: -15, reputation: -5 } }
                    ]
                },
                {
                    title: 'Baby on the Way',
                    description: 'You\'re going to be a parent!',
                    icon: '👶',
                    effects: { mood: 30, reputation: 8, money: -2000 },
                    choices: null
                },
                {
                    title: 'Family Inheritance',
                    description: 'A distant relative left you an inheritance.',
                    icon: '💰',
                    effects: { money: 5000, mood: 10 },
                    choices: null
                }
            ],
            epic: [
                {
                    title: 'Dream Wedding',
                    description: 'You\'re planning your dream wedding!',
                    icon: '💒',
                    effects: { mood: 50, reputation: 20, money: -10000 },
                    choices: null
                },
                {
                    title: 'Twins Arrived',
                    description: 'Surprise! You had twins!',
                    icon: '👶👶',
                    effects: { mood: 40, reputation: 15, money: -5000, health: -10 },
                    choices: null
                }
            ]
        },
        
        // Finance/Investments Events
        finance: {
            common: [
                {
                    title: 'Garage Sale',
                    description: 'You sold some old items at a garage sale.',
                    icon: '💵',
                    effects: { money: 150, mood: 5 },
                    choices: null
                },
                {
                    title: 'Unexpected Bill',
                    description: 'You received an unexpected utility bill.',
                    icon: '📄',
                    effects: { money: -200, mood: -5 },
                    choices: null
                },
                {
                    title: 'Tax Refund',
                    description: 'You received a tax refund!',
                    icon: '💸',
                    effects: { money: 500, mood: 10 },
                    choices: null
                }
            ],
            rare: [
                {
                    title: 'Investment Opportunity',
                    description: 'A friend told you about a promising investment.',
                    icon: '📈',
                    effects: null,
                    choices: [
                        { text: 'Invest $2000', effects: { money: -2000, skill: 5 } },
                        { text: 'Pass', effects: { mood: -5 } }
                    ]
                },
                {
                    title: 'Stock Market Gain',
                    description: 'Your investments paid off!',
                    icon: '💹',
                    effects: { money: 3000, mood: 20, skill: 8 },
                    choices: null
                },
                {
                    title: 'Real Estate Deal',
                    description: 'You found a great deal on property.',
                    icon: '🏠',
                    effects: null,
                    choices: [
                        { text: 'Buy it', effects: { money: -15000, reputation: 12 } },
                        { text: 'Too expensive', effects: { mood: -8 } }
                    ]
                }
            ],
            epic: [
                {
                    title: 'Lottery Win!',
                    description: 'You won the lottery!',
                    icon: '🎰',
                    effects: { money: 50000, mood: 50, reputation: 15 },
                    choices: null
                },
                {
                    title: 'Major Investment Success',
                    description: 'Your investment multiplied by 10x!',
                    icon: '💎',
                    effects: { money: 25000, skill: 20, reputation: 20, mood: 40 },
                    choices: null
                }
            ]
        },
        
        // Health/Imprevistos Events
        health: {
            common: [
                {
                    title: 'Gym Session',
                    description: 'You had a great workout at the gym.',
                    icon: '💪',
                    effects: { health: 10, mood: 8, money: -20 },
                    choices: null
                },
                {
                    title: 'Common Cold',
                    description: 'You caught a cold.',
                    icon: '🤧',
                    effects: { health: -15, mood: -10, money: -50 },
                    choices: null
                },
                {
                    title: 'Healthy Meal',
                    description: 'You prepared a nutritious meal.',
                    icon: '🥗',
                    effects: { health: 8, mood: 5, money: -30 },
                    choices: null
                },
                {
                    title: 'Good Sleep',
                    description: 'You had a great night\'s sleep.',
                    icon: '😴',
                    effects: { health: 12, mood: 10 },
                    choices: null
                }
            ],
            rare: [
                {
                    title: 'Medical Emergency',
                    description: 'You need to visit the emergency room.',
                    icon: '🚑',
                    effects: { health: -25, money: -1500, mood: -15 },
                    choices: null
                },
                {
                    title: 'Dental Work',
                    description: 'You need dental treatment.',
                    icon: '🦷',
                    effects: null,
                    choices: [
                        { text: 'Get treatment', effects: { health: 10, money: -800, mood: -10 } },
                        { text: 'Wait (risky)', effects: { health: -5, money: 0 } }
                    ]
                },
                {
                    title: 'Fitness Challenge',
                    description: 'You joined a 30-day fitness challenge.',
                    icon: '🏃',
                    effects: { health: 20, mood: 15, skill: 5, money: -100 },
                    choices: null
                }
            ],
            epic: [
                {
                    title: 'Life-Changing Recovery',
                    description: 'You completely transformed your health!',
                    icon: '✨',
                    effects: { health: 40, mood: 35, reputation: 15, skill: 10 },
                    choices: null
                },
                {
                    title: 'Major Surgery',
                    description: 'You need major surgery.',
                    icon: '🏥',
                    effects: { health: -30, money: -10000, mood: -25 },
                    choices: null
                }
            ]
        },
        
        // Hobbies Events
        hobbies: {
            common: [
                {
                    title: 'Movie Night',
                    description: 'You watched a great movie.',
                    icon: '🎬',
                    effects: { mood: 10, money: -15 },
                    choices: null
                },
                {
                    title: 'Reading Session',
                    description: 'You finished an interesting book.',
                    icon: '📚',
                    effects: { mood: 8, skill: 5 },
                    choices: null
                },
                {
                    title: 'Gaming Marathon',
                    description: 'You played video games all weekend.',
                    icon: '🎮',
                    effects: { mood: 12, health: -8, skill: 3 },
                    choices: null
                },
                {
                    title: 'Nature Walk',
                    description: 'You went for a peaceful walk in nature.',
                    icon: '🌳',
                    effects: { mood: 15, health: 10 },
                    choices: null
                }
            ],
            rare: [
                {
                    title: 'Hobby Tournament',
                    description: 'You won a tournament for your hobby!',
                    icon: '🏆',
                    effects: { mood: 25, reputation: 10, money: 500, skill: 10 },
                    choices: null
                },
                {
                    title: 'Creative Breakthrough',
                    description: 'Your creative project is gaining attention!',
                    icon: '🎨',
                    effects: { mood: 20, reputation: 12, skill: 15, money: 300 },
                    choices: null
                },
                {
                    title: 'Travel Adventure',
                    description: 'You went on an amazing trip!',
                    icon: '🗺️',
                    effects: { mood: 30, health: 8, money: -2000, reputation: 8 },
                    choices: null
                }
            ],
            epic: [
                {
                    title: 'World Champion',
                    description: 'You became a world champion in your hobby!',
                    icon: '🥇',
                    effects: { mood: 50, reputation: 30, money: 10000, skill: 30 },
                    choices: null
                },
                {
                    title: 'Around the World Trip',
                    description: 'You\'re traveling around the world!',
                    icon: '🌍',
                    effects: { mood: 45, health: 15, money: -15000, reputation: 20, skill: 25 },
                    choices: null
                }
            ]
        },
        
        // Legal/Trouble Events
        legal: {
            common: [
                {
                    title: 'Parking Ticket',
                    description: 'You got a parking ticket.',
                    icon: '🚗',
                    effects: { money: -100, mood: -8 },
                    choices: null
                },
                {
                    title: 'Minor Dispute',
                    description: 'You had a minor dispute with a neighbor.',
                    icon: '🏘️',
                    effects: { mood: -10, reputation: -3 },
                    choices: null
                }
            ],
            rare: [
                {
                    title: 'Traffic Violation',
                    description: 'You were caught speeding.',
                    icon: '🚨',
                    effects: null,
                    choices: [
                        { text: 'Pay fine', effects: { money: -500, mood: -15 } },
                        { text: 'Contest it', effects: { money: -300, skill: 5, mood: -8 } }
                    ]
                },
                {
                    title: 'Legal Consultation',
                    description: 'You need legal advice for a matter.',
                    icon: '⚖️',
                    effects: { money: -800, mood: -12, skill: 8 },
                    choices: null
                }
            ],
            epic: [
                {
                    title: 'Major Lawsuit',
                    description: 'You\'re involved in a major lawsuit.',
                    icon: '⚠️',
                    effects: null,
                    choices: [
                        { text: 'Settle', effects: { money: -20000, mood: -30, reputation: -15 } },
                        { text: 'Fight it', effects: { money: -10000, mood: -25, skill: 15 } }
                    ]
                }
            ]
        }
    },
    
    // Social Media/News Flavor Events
    FLAVOR: [
        'Your post got 100 likes! 📱',
        'Someone commented on your photo. 💬',
        'You gained new followers. 👥',
        'Breaking news trending online. 📰',
        'A viral video made you laugh. 😂',
        'You shared a meme with friends. 🤣',
        'Checking the weather forecast. 🌤️',
        'Reading the daily news. 📰',
        'Scrolling through social media. 📱',
        'Watching trending videos. 📹'
    ],
    
    // Companies/Jobs Names
    COMPANIES: [
        'TechCorp', 'InnovateLabs', 'FutureWorks', 'Global Systems', 
        'Digital Dynamics', 'Quantum Solutions', 'Apex Industries',
        'Pioneer Group', 'NextGen Tech', 'Stellar Enterprises'
    ],
    
    // Windfalls/Setbacks
    WINDFALLS: [
        { text: 'Found money on the street!', icon: '💵', effects: { money: 50, mood: 10 } },
        { text: 'Won a small prize!', icon: '🎁', effects: { money: 200, mood: 15 } },
        { text: 'Received a gift card!', icon: '🎫', effects: { money: 100, mood: 8 } },
        { text: 'Got a refund!', icon: '💰', effects: { money: 150, mood: 10 } }
    ],
    
    SETBACKS: [
        { text: 'Lost your wallet.', icon: '😰', effects: { money: -200, mood: -15 } },
        { text: 'Phone screen cracked.', icon: '📱', effects: { money: -300, mood: -12 } },
        { text: 'Car broke down.', icon: '🚗', effects: { money: -500, mood: -20, health: -5 } },
        { text: 'Appliance stopped working.', icon: '🔧', effects: { money: -400, mood: -15 } }
    ]
};

// Export for use in game.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DADOS;
}
