export const UtBreastSize = {
    SMALL: {
        id: 1,
        name: 'Small'
    },
    MEDIUM: {
        id: 2,
        name: 'Medium'
    },
    LARGE: {
        id: 3,
        name: 'Large'
    },
    HUGE: {
        id: 4,
        name: 'Huge'
    },

    getBreastSizeByBodyTypeId(bodyTypeId) {
        return [this.SMALL, this.MEDIUM, this.LARGE, this.HUGE].find(item => item.id === bodyTypeId)
    }
}