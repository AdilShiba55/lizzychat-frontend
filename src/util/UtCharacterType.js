export const UtCharacterType = {
    REAL: {
        id: 1,
        name: 'Reality',
        exampleUrl: '/character_real.jpeg'
    },
    ARTISTIC: {
        id: 2,
        name: 'Artistic',
        exampleUrl: '/character_art.jpeg'
    },
    ANIMEv1: {
        id: 3,
        name: 'Anime v1',
        exampleUrl: '/character_anime.jpeg'
    },
    ANIMEv2: {
        id: 4,
        name: 'Anime v2',
        exampleUrl: '/character_animeV2.jpeg'
    },
    getCharacterTypes() {
      return [this.REAL, this.ARTISTIC, this.ANIMEv1, this.ANIMEv2]
    },
    getCharacterTypeById(id) {
        return this.getCharacterTypes().find(item => item.id === id)
    }
}