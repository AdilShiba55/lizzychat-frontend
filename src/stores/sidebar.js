import {defineStore} from "pinia";
import {UtRouter} from "@/util/UtRouter.js";

export const useSidebarStore = defineStore('sidebar', {
    state: () => ({
        drawer: false,
        rail: false
    }),
    getters: {
        isExpanded(state) {
            return state.rail;
        },
        isDrawer(state) {
            return state.drawer;
        }
    },
    actions: {
        changeExpanded() {
            console.log('window.innerWidth', window.innerWidth)
            if(UtRouter.isLessThan930()) {
                this.drawer = !this.drawer;
                this.rail = false;
            } else {
                this.rail = !this.rail
                window.$cookies.set('sidebarRail', this.rail)
            }
        },
        checkExpanded() {
            const value = window.$cookies.get('sidebarRail')
            if(value) {
                this.rail = value === 'true';
            }
            if(!UtRouter.isLessThan930()) {
                this.drawer = true;
            }
        },
        close() {
            this.drawer = false;
        }
    }
})
