export const UtAgeLook = {
    YOUNG: {
        id: 2,
        name: 'Young'
    },
    ADULT: {
        id: 3,
        name: 'Adult'
    },
    MIDDLE_AGED_ADULT: {
        id: 4,
        name: 'Middle aged adult'
    },
    OLD: {
        id: 5,
        name: 'Old'
    },

    getAgeLookIdByAge(age) {
        return age <= 23 ? this.YOUNG : this.ADULT
    }
}