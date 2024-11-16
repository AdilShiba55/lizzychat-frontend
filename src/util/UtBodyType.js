export const UtBodyType = {
    SLIM: {
        id: 1,
        name: 'Slim',
        exampleUrl: '/body-type-slim.webp'
    },
    ATHLETIC: {
        id: 2,
        name: 'Athletic',
        exampleUrl: '/body-type-athletic.webp'
    },
    VOLUPTUOUS: {
        id: 3,
        name: 'Voluptuous',
        exampleUrl: '/body-type-volup.webp'
    },
    CURVY: {
        id: 4,
        name: 'Curvy',
        exampleUrl: '/body-type-curvy.webp'
    },

    getBodyTypes() {
        return [this.SLIM, this.ATHLETIC, this.VOLUPTUOUS, this.CURVY]
    }
}