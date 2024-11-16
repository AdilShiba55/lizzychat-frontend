import {UtCharacterType} from "@/util/UtCharacterType.js";

export const UtHairColor = {
    BLONDE: {
        id: 1,
        name: 'Blonde',
        exampleColor: '#C8A27B'
    },
    BRUNETTE: {
        id: 2,
        name: 'Brunette',
        exampleColor: '#8B5337'
    },
    BLACK: {
        id: 3,
        name: 'Black',
        exampleColor: 'black'
    },
    LIGHT_RED: {
        id: 4,
        name: 'Light Red',
        exampleColor: '#ff5a5a'
    },
    PINK: {
        id: 5,
        name: 'Pink',
        exampleColor: '#DA4FA2'
    },
    WHITE: {
        id: 6,
        name: 'White',
        exampleColor: '#e0e0e0'
    },
    LIGHT_BLUE: {
        id: 7,
        name: 'Light Blue',
        exampleColor: '#5dcdff'
    },
    LIGHT_GREEN: {
        id: 8,
        name: 'Light Green',
        exampleColor: '#62ff5f'
    },
    PURPLE: {
        id: 9,
        name: 'Purple',
        exampleColor: '#AC70C9'
    },
    DARK_BLUE: {
        id: 10,
        name: 'Dark Blue',
        exampleColor: '#006fa4'
    },
    DARK_GREEN: {
        id: 11,
        name: 'Dark Green',
        exampleColor: '#038000'
    },
    DARK_RED: {
        id: 12,
        name: 'Dark Red',
        exampleColor: '#940000'
    },

    getHairColors() {
        return [this.BLONDE, this.BRUNETTE, this.BLACK, this.LIGHT_RED, this.PINK, this.WHITE, this.LIGHT_BLUE, this.LIGHT_GREEN, this.PURPLE, this.DARK_BLUE, this.DARK_GREEN, this.DARK_RED]
    },
    getHairColorsByCharacterTypeId(characterTypeId) {
        if(characterTypeId === UtCharacterType.REAL.id) {
            return [this.BLONDE, this.BRUNETTE, this.BLACK, this.DARK_RED, this.DARK_BLUE, this.DARK_GREEN]
        } else {
            return this.getHairColors()
        }
    }
}