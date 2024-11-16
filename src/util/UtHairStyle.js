export const UtHairStyle = {
    SHORT: {
        id: 1,
        name: 'Short',
        exampleUrl: '/hair-style-short.webp'
    },
    LONG: {
        id: 2,
        name: 'Long',
        exampleUrl: '/hair-style-long.webp'
    },
    PONYTAIL: {
        id: 3,
        name: 'Ponytail',
        exampleUrl: '/hair-style-ponytail.webp'
    },
    PIGTAILS: {
        id: 4,
        name: 'Pigtails',
        exampleUrl: '/hair-style-pigtails.webp'
    },
    CURLY: {
        id: 5,
        name: 'Curly',
        exampleUrl: '/hair-style-curly.webp'
    },

    getHairStyles() {
        return [this.SHORT, this.LONG, this.PONYTAIL, this.PIGTAILS, this.CURLY]
    }
}