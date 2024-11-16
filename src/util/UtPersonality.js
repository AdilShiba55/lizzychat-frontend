export const UtPersonality = {
    CAREGIVER: {
        id: 1,
        name: 'Caregiver',
        description: 'Nurturing, protective, and always there to offer comfort.',
        icon: 'mdi-hand-heart',
        iconColor: '#ff6969'
    },
    SAGE: {
        id: 2,
        name: 'Sage',
        description: 'Wise, reflective, and a source of guidance.',
        icon: 'mdi-brain',
        iconColor: '#f7a722'
    },
    INNOCENT: {
        id: 3,
        name: 'Innocent',
        description: 'Optimistic, naive, and sees world with wonder.',
        icon: 'mdi-weather-sunny',
        iconColor: '#ffff00'
    },
    JESTER: {
        id: 4,
        name: 'Jester',
        description: 'Playful, humorous, and always there to make you laugh.',
        icon: 'mdi-emoticon',
        iconColor: '#a3ff2f'
    },
    TEMPTRESS: {
        id: 5,
        name: 'Temptress',
        description: 'Flirtatious, playful, and always leaving you wanting more.',
        icon: 'mdi-airballoon',
        iconColor: '#0080ff'
    },
    DOMINANT: {
        id: 6,
        name: 'Dominant',
        description: 'Assertive, controlling, and commanding.',
        icon: 'mdi-crown',
        iconColor: '#ffc900'
    },
    SUBMISSIVE: {
        id: 7,
        name: 'Submissive',
        description: 'Obedient, yielding and happy to follow.',
        icon: 'mdi-robot-love',
        iconColor: 'white'
    },
    LOVER: {
        id: 8,
        name: 'Lover',
        description: 'Romantic, affectionate, and cherishes deep emotional.',
        icon: 'mdi-head-heart',
        iconColor: '#23c5a0'
    },
    NYMPHO: {
        id: 9,
        name: 'Nympho',
        description: 'Insatiable, passionate, and constantly craving intimacy.',
        icon: 'mdi-fire',
        iconColor: '#ff1d1d'
    },
    MEAN: {
        id: 10,
        name: 'Mean',
        description: 'Cold, dismissive, and often sarcastic.',
        icon: 'mdi-snowflake-variant',
        iconColor: '#5ecfff'
    },
    CONFIDENT: {
        id: 11,
        name: 'Confident',
        description: 'Trustworthy, a good listener, and always can offer advice.',
        icon: 'mdi-human-handsup',
        iconColor: '#cee33a'
    },
    EXPERIMENTAL: {
        id: 12,
        name: 'Experimental',
        description: 'Curious, willing, and always eager to try new things.',
        icon: 'mdi-atom',
        iconColor: '#a965ff'
    },

    getPersonalities() {
        return [this.CAREGIVER, this.SAGE, this.INNOCENT, this.JESTER, this.TEMPTRESS, this.DOMINANT, this.SUBMISSIVE, this.LOVER, this.NYMPHO, this.MEAN, this.CONFIDENT, this.EXPERIMENTAL]
    }
}