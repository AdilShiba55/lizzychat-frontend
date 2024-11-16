export const UtClothesColor = {
    BLACK: {
        id: 1,
        name: 'Black',
        color: '#000000'
    },
    WHITE: {
        id: 2,
        name: 'White',
        color: '#f1f1f1'
    },
    GRAY: {
        id: 3,
        name: 'Gray',
        color: '#939393'
    },
    RED: {
        id: 4,
        name: 'Red',
        color: '#ff4747'
    },
    BLUE: {
        id: 5,
        name: 'Blue',
        color: '#478eff'
    },
    GREEN: {
        id: 6,
        name: 'Green',
        color: '#71ff62'
    },
    VIOLET: {
        id: 7,
        name: 'Violet',
        color: '#c154ff'
    },
    PINK: {
        id: 8,
        name: 'Pink',
        color: '#f96cff'
    },
    YELLOW: {
        id: 9,
        name: 'Yellow',
        color: '#ffe25a'
    },

    getClothesColors() {
        return [this.BLACK, this.WHITE, this.GRAY, this.RED, this.BLUE, this.GREEN, this.VIOLET, this.PINK, this.YELLOW]
    }
}