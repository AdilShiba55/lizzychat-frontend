export const UtClothes = {
    DRESS: {
        id: 4,
        name: 'Dress'
    },
    TSHIRT: {
        id: 5,
        name: 'T-shirt'
    },
    SWEATER: {
        id: 6,
        name: 'Sweater'
    },
    JACKET: {
        id: 8,
        name: 'Jacket'
    },
    COAT: {
        id: 13,
        name: 'Coat'
    },

    getClothes() {
        return [this.DRESS, this.TSHIRT, this.SWEATER, this.JACKET, this.COAT]
    }
}