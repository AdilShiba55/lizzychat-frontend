import {UtCharacterType} from "@/util/UtCharacterType.js";

export const UtEyesColor = {
    BROWN: {
        id: 1,
        name: 'Brown',
        exampleUrl: '/eyes-brown.webp'
    },
    BLUE: {
        id: 2,
        name: 'Blue',
        exampleUrl: '/eyes-blue.webp'
    },
    GREEN: {
        id: 3,
        name: 'Green',
        exampleUrl: '/eyes-green.webp'
    },
    YELLOW: {
        id: 4,
        name: 'Yellow',
        exampleUrl: '/eyes-yellow.webp'
    },
    RED: {
        id: 5,
        name: 'Red',
        exampleUrl: '/eyes-red.webp'
    },
    GRAY: {
        id: 6,
        name: 'Gray',
        color: 'gray'
    },

    getEyesColors(adminMode) {
        const items = [this.BROWN, this.BLUE, this.GREEN, this.YELLOW, this.RED]
        if(adminMode) {
            items.push(this.GRAY)
        }
        return items;
    },
    getEyesColorsByCharacterTypeId(characterTypeId, adminMode) {
        console.log('characterTypeId', characterTypeId)
        if(characterTypeId === UtCharacterType.REAL.id) {
            return [this.BROWN, this.BLUE, this.GREEN]
        } else {
            return this.getEyesColors(adminMode)
        }
    }
}