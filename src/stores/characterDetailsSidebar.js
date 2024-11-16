import {defineStore} from "pinia";
import {UtRouter} from "@/util/UtRouter.js";

export const useCharacterDetailsSidebar = defineStore('characterDetailsSidebar', {
    state: () => ({
        drawer: false,
        character: null
    }),
    getters: {
        isDrawer(state) {
            return state.drawer;
        }
    },
    actions: {
        open(character) {
            this.character = character;
            this.drawer = true;
        },
        close() {
            this.drawer = false;
            this.character = null;
        }
    }
})
