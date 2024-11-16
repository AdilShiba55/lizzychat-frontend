export const UtEthnicity = {
    CAUCASIAN: {
        id: 1,
        name: 'Caucasian',
        exampleUrl: '/ethnicity-caucasian.webp'
    },
    LATINA: {
        id: 2,
        name: 'Latina',
        exampleUrl: '/ethnicity-latina.webp'
    },
    ASIAN: {
        id: 3,
        name: 'Asian',
        exampleUrl: '/ethnicity-asian.webp'
    },
    ARAB: {
        id: 4,
        name: 'Arab',
        exampleUrl: '/ethnicity-arab.webp'
    },
    AFRO: {
        id: 5,
        name: 'Afro',
        exampleUrl: '/ethnicity-afro.webp'
    },
    getEthnicities() {
        return [this.CAUCASIAN, this.LATINA, this.ASIAN, this.ARAB, this.AFRO]
    }
}