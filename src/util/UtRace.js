export const UtRace = {
    HUMAN: {
        id: 1,
        name: 'Human'
    },
    ELF: {
        id: 2,
        name: 'Elf'
    },
    FURRY: {
        id: 3,
        name: 'Furry',
    },
    getRaces() {
        return [this.HUMAN, this.ELF, this.FURRY]
    }
}