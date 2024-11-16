import {fi} from "vuetify/locale";

export const UtFile = {
    getFileFromBase64(base64Data, fileName) {
        const blob = this.getBlobFromBase64(base64Data, fileName)
        return new File([blob], fileName, {type: 'application/octet-stream'});
    },
    getUrlFromBase64(base64Data, fileName) {
        const blob = this.getBlobFromBase64(base64Data, fileName)
        return URL.createObjectURL(blob);
    },
    getBlobFromBase64(base64Data, fileName) {
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], {type: 'application/octet-stream'});
    },
    downloadFileFromByteArray(byteArray, fileName) {
        const blob = this.getBlobFromBase64(byteArray, fileName)
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}