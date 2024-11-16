export const UtScroll = {scrollAppToTop() {
        document.getElementById('app').scrollTo(0,0)
    },
    removeLayoutMaxWidth() {
        const vMain = document.getElementsByClassName('v-main')[0]
        vMain.style.maxWidth = 'unset'
    },
    returnLayoutMaxWidth() {
        const vMain = document.getElementsByClassName('v-main')[0]
        vMain.style.maxWidth = '1500px'
    }
}