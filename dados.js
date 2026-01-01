// Game Data and Configuration

const GAME_DATA = {
    // Default player attributes
    defaults: {
        age: 18,
        health: 100,
        mood: 100,
        money: 1000,
        reputation: 50,
        skills: {
            intelligence: 50,
            charisma: 50,
            fitness: 50
        }
    },

    // Event categories with weights and rarities
    eventCategories: {
        career: { weight: 15, color: '#3b82f6' },
        education: { weight: 12, color: '#6366f1' },
        health: { weight: 10, color: '#10b981' },
        finance: { weight: 13, color: '#f59e0b' },
        relationship: { weight: 14, color: '#ec4899' },
        social: { weight: 12, color: '#8b5cf6' },
        hobby: { weight: 10, color: '#14b8a6' },
        legal: { weight: 5, color: '#ef4444' },
        news: { weight: 9, color: '#6b7280' }
    },

    // Events catalog
    events: [
        // Career Events
        {
            id: 'career_promotion',
            category: 'career',
            rarity: 'rare',
            title: 'Job Promotion!',
            description: 'Your hard work has paid off! Your boss offers you a promotion with better pay and responsibilities.',
            effects: { money: 5000, reputation: 10, mood: 15 },
            choices: [
                { text: 'Accept the promotion', effects: { money: 5000, reputation: 10, mood: 15 } },
                { text: 'Decline and ask for more', effects: { money: 8000, reputation: -5, mood: 5 } }
            ]
        },
        {
            id: 'career_fired',
            category: 'career',
            rarity: 'common',
            title: 'Unexpected Layoff',
            description: 'The company is downsizing and you\'ve been let go. Time to look for new opportunities.',
            effects: { money: -2000, mood: -20, reputation: -5 }
        },
        {
            id: 'career_startup',
            category: 'career',
            rarity: 'epic',
            title: 'Startup Opportunity',
            description: 'A friend invites you to join their startup as a co-founder. It\'s risky but could be huge!',
            effects: { money: -10000, mood: 10 },
            choices: [
                { text: 'Invest and join', effects: { money: -10000, mood: 10, reputation: 15 } },
                { text: 'Play it safe', effects: { mood: -5 } }
            ]
        },
        {
            id: 'career_freelance',
            category: 'career',
            rarity: 'common',
            title: 'Freelance Project',
            description: 'You land a freelance gig that pays well but requires extra hours.',
            effects: { money: 3000, health: -5, mood: 5 }
        },

        // Education Events
        {
            id: 'edu_scholarship',
            category: 'education',
            rarity: 'rare',
            title: 'Scholarship Award',
            description: 'You\'ve been awarded a scholarship for your academic achievements!',
            effects: { money: 8000, reputation: 15, mood: 20 }
        },
        {
            id: 'edu_exam_fail',
            category: 'education',
            rarity: 'common',
            title: 'Failed Exam',
            description: 'You didn\'t study enough and failed an important exam.',
            effects: { mood: -15, reputation: -5 }
        },
        {
            id: 'edu_course',
            category: 'education',
            rarity: 'common',
            title: 'Online Course',
            description: 'You discover an interesting online course that could boost your skills.',
            effects: { money: -500, mood: 5 },
            choices: [
                { text: 'Enroll in the course', effects: { money: -500, mood: 5, reputation: 5 } },
                { text: 'Skip it', effects: {} }
            ]
        },
        {
            id: 'edu_graduation',
            category: 'education',
            rarity: 'epic',
            title: 'Graduation Day!',
            description: 'You\'ve completed your degree! Your family is proud and future looks bright.',
            effects: { mood: 25, reputation: 20, money: -1000 }
        },

        // Health Events
        {
            id: 'health_gym',
            category: 'health',
            rarity: 'common',
            title: 'Gym Membership',
            description: 'You\'re thinking about getting a gym membership to improve your fitness.',
            effects: { money: -600, health: 10, mood: 10 },
            choices: [
                { text: 'Join the gym', effects: { money: -600, health: 10, mood: 10 } },
                { text: 'Exercise at home', effects: { health: 5, mood: 5 } }
            ]
        },
        {
            id: 'health_injury',
            category: 'health',
            rarity: 'rare',
            title: 'Sports Injury',
            description: 'You injured yourself during physical activity and need medical attention.',
            effects: { health: -20, mood: -10, money: -2000 }
        },
        {
            id: 'health_checkup',
            category: 'health',
            rarity: 'common',
            title: 'Health Checkup',
            description: 'Your annual health checkup shows you\'re in good shape!',
            effects: { health: 5, mood: 5, money: -300 }
        },
        {
            id: 'health_illness',
            category: 'health',
            rarity: 'common',
            title: 'Caught a Cold',
            description: 'You caught a cold and need to rest for a few days.',
            effects: { health: -15, mood: -10, money: -500 }
        },

        // Finance Events
        {
            id: 'finance_inheritance',
            category: 'finance',
            rarity: 'epic',
            title: 'Inheritance',
            description: 'A distant relative left you a substantial inheritance!',
            effects: { money: 50000, mood: 15 }
        },
        {
            id: 'finance_investment_win',
            category: 'finance',
            rarity: 'rare',
            title: 'Investment Payoff',
            description: 'Your investment has paid off handsomely!',
            effects: { money: 10000, mood: 20, reputation: 5 }
        },
        {
            id: 'finance_investment_loss',
            category: 'finance',
            rarity: 'common',
            title: 'Investment Loss',
            description: 'Your investment didn\'t work out as planned.',
            effects: { money: -5000, mood: -15 }
        },
        {
            id: 'finance_lottery',
            category: 'finance',
            rarity: 'common',
            title: 'Lottery Ticket',
            description: 'You see a lottery ticket at the store.',
            effects: {},
            choices: [
                { text: 'Buy a ticket ($50)', effects: { money: -50, mood: 5 } },
                { text: 'Save your money', effects: { mood: -2 } }
            ]
        },
        {
            id: 'finance_tax_refund',
            category: 'finance',
            rarity: 'common',
            title: 'Tax Refund',
            description: 'You received a tax refund! Unexpected money is always nice.',
            effects: { money: 2000, mood: 10 }
        },
        {
            id: 'finance_expense',
            category: 'finance',
            rarity: 'common',
            title: 'Unexpected Expense',
            description: 'Your car broke down and needs expensive repairs.',
            effects: { money: -3000, mood: -10 }
        },

        // Relationship Events
        {
            id: 'rel_marriage',
            category: 'relationship',
            rarity: 'epic',
            title: 'Marriage Proposal',
            description: 'Your partner proposes marriage! This could be the start of a new chapter.',
            effects: { mood: 30, money: -15000, reputation: 10 },
            choices: [
                { text: 'Say yes!', effects: { mood: 30, money: -15000, reputation: 10 } },
                { text: 'Not ready yet', effects: { mood: -20, reputation: -10 } }
            ]
        },
        {
            id: 'rel_breakup',
            category: 'relationship',
            rarity: 'common',
            title: 'Relationship Ends',
            description: 'Your relationship has come to an end. Time heals all wounds.',
            effects: { mood: -25, reputation: -5 }
        },
        {
            id: 'rel_new_friend',
            category: 'relationship',
            rarity: 'common',
            title: 'New Friend',
            description: 'You met someone interesting and formed a new friendship!',
            effects: { mood: 10, reputation: 5 }
        },
        {
            id: 'rel_baby',
            category: 'relationship',
            rarity: 'rare',
            title: 'New Baby!',
            description: 'You\'re having a baby! Your family is growing.',
            effects: { mood: 25, money: -8000, reputation: 15 }
        },
        {
            id: 'rel_date',
            category: 'relationship',
            rarity: 'common',
            title: 'First Date',
            description: 'Someone interesting asked you out on a date.',
            effects: { mood: 5, money: -200 },
            choices: [
                { text: 'Go on the date', effects: { mood: 10, money: -200, reputation: 3 } },
                { text: 'Politely decline', effects: { mood: -3 } }
            ]
        },
        {
            id: 'rel_anniversary',
            category: 'relationship',
            rarity: 'rare',
            title: 'Anniversary Celebration',
            description: 'It\'s your anniversary! Time to celebrate with someone special.',
            effects: { mood: 15, money: -1000 }
        },

        // Social Events
        {
            id: 'social_party',
            category: 'social',
            rarity: 'common',
            title: 'Party Invitation',
            description: 'You\'re invited to a big party this weekend.',
            effects: { mood: 10, money: -300, reputation: 5 },
            choices: [
                { text: 'Attend the party', effects: { mood: 10, money: -300, reputation: 5 } },
                { text: 'Stay home', effects: { mood: -5, health: 5 } }
            ]
        },
        {
            id: 'social_viral',
            category: 'social',
            rarity: 'epic',
            title: 'Viral Post!',
            description: 'Your social media post went viral! You gained thousands of followers.',
            effects: { reputation: 25, mood: 20 }
        },
        {
            id: 'social_drama',
            category: 'social',
            rarity: 'common',
            title: 'Social Drama',
            description: 'You got caught up in some social media drama.',
            effects: { reputation: -10, mood: -15 }
        },
        {
            id: 'social_volunteer',
            category: 'social',
            rarity: 'common',
            title: 'Volunteer Opportunity',
            description: 'A local charity is looking for volunteers.',
            effects: {},
            choices: [
                { text: 'Volunteer', effects: { reputation: 10, mood: 15 } },
                { text: 'Too busy', effects: { mood: -3 } }
            ]
        },

        // Hobby Events
        {
            id: 'hobby_instrument',
            category: 'hobby',
            rarity: 'common',
            title: 'Learn an Instrument',
            description: 'You\'ve always wanted to learn guitar. Now might be the time!',
            effects: {},
            choices: [
                { text: 'Buy a guitar', effects: { money: -800, mood: 15 } },
                { text: 'Maybe later', effects: { mood: -5 } }
            ]
        },
        {
            id: 'hobby_competition',
            category: 'hobby',
            rarity: 'rare',
            title: 'Competition Win',
            description: 'You won a competition related to your hobby!',
            effects: { money: 2000, reputation: 10, mood: 20 }
        },
        {
            id: 'hobby_travel',
            category: 'hobby',
            rarity: 'rare',
            title: 'Travel Opportunity',
            description: 'A chance to travel to an exotic destination!',
            effects: {},
            choices: [
                { text: 'Book the trip', effects: { money: -5000, mood: 30, health: 10 } },
                { text: 'Save the money', effects: { mood: -10 } }
            ]
        },
        {
            id: 'hobby_art',
            category: 'hobby',
            rarity: 'common',
            title: 'Art Class',
            description: 'You find an interesting art class in your area.',
            effects: { money: -400, mood: 10, reputation: 3 }
        },

        // Legal Events
        {
            id: 'legal_fine',
            category: 'legal',
            rarity: 'common',
            title: 'Parking Ticket',
            description: 'You got a parking ticket. Annoying but not the end of the world.',
            effects: { money: -150, mood: -5 }
        },
        {
            id: 'legal_lawsuit',
            category: 'legal',
            rarity: 'rare',
            title: 'Legal Trouble',
            description: 'You\'re involved in a legal dispute that requires a lawyer.',
            effects: { money: -10000, mood: -20, reputation: -15 }
        },
        {
            id: 'legal_jury',
            category: 'legal',
            rarity: 'common',
            title: 'Jury Duty',
            description: 'You\'ve been called for jury duty.',
            effects: { mood: -10, reputation: 5 }
        },

        // News/Random Events
        {
            id: 'news_market',
            category: 'news',
            rarity: 'common',
            title: 'Market News',
            description: 'The stock market is doing well. A good time for investors.',
            effects: { mood: 3 }
        },
        {
            id: 'news_weather',
            category: 'news',
            rarity: 'common',
            title: 'Perfect Weather',
            description: 'The weather has been absolutely perfect lately.',
            effects: { mood: 5, health: 3 }
        },
        {
            id: 'news_festival',
            category: 'news',
            rarity: 'common',
            title: 'Local Festival',
            description: 'There\'s a festival happening in town this weekend.',
            effects: { mood: 5, money: -100 }
        },
        {
            id: 'news_discovery',
            category: 'news',
            rarity: 'rare',
            title: 'Scientific Breakthrough',
            description: 'Exciting news! Scientists made a major breakthrough.',
            effects: { mood: 10 }
        }
    ],

    // Shop items
    shop: {
        cars: [
            {
                id: 'car_economy',
                name: 'Economy Car',
                price: 15000,
                effects: { mood: 10, reputation: 5 },
                description: 'A reliable and affordable vehicle'
            },
            {
                id: 'car_luxury',
                name: 'Luxury Sedan',
                price: 50000,
                effects: { mood: 25, reputation: 20 },
                description: 'Drive in style and comfort'
            },
            {
                id: 'car_sports',
                name: 'Sports Car',
                price: 80000,
                effects: { mood: 40, reputation: 30 },
                description: 'Fast, flashy, and fun!'
            }
        ],
        phones: [
            {
                id: 'phone_basic',
                name: 'Basic Phone',
                price: 300,
                effects: { mood: 5, reputation: 2 },
                description: 'Gets the job done'
            },
            {
                id: 'phone_mid',
                name: 'Mid-Range Phone',
                price: 800,
                effects: { mood: 10, reputation: 5 },
                description: 'Good features at a fair price'
            },
            {
                id: 'phone_premium',
                name: 'Premium Phone',
                price: 1500,
                effects: { mood: 15, reputation: 10 },
                description: 'Latest technology in your pocket'
            }
        ]
    },

    // Companies for career events
    companies: [
        'TechCorp', 'StartupXYZ', 'Global Industries', 'Creative Studios',
        'Finance Group', 'Retail Chain', 'Healthcare Plus', 'Education First'
    ],

    // Names for relationship events
    names: {
        male: ['James', 'John', 'Michael', 'David', 'Chris', 'Alex', 'Ryan', 'Matt'],
        female: ['Emma', 'Sarah', 'Jessica', 'Emily', 'Lisa', 'Anna', 'Maria', 'Sophie']
    }
};

// Configuration for event density
const EVENT_DENSITY = {
    low: { min: 1, max: 2 },
    medium: { min: 2, max: 3 },
    high: { min: 3, max: 5 }
};

// Rarity weights for event selection
const RARITY_WEIGHTS = {
    common: 70,
    rare: 25,
    epic: 5
};
