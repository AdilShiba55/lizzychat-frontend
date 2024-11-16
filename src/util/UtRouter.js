import router from "@/router/index.js";
import {UtMobile} from "@/util/UtMobile.js";

export const UtRouter = {
    isActive(path) {
        const currentPath = router.currentRoute.value.fullPath;
        return currentPath === path || currentPath.startsWith(path + '/') || currentPath.startsWith(path + '?');
    },
    isDefaultPath(path) {
        const target = path??router.currentRoute.value.fullPath
        return target.startsWith('/explore') || target.startsWith('/faq') || target.startsWith('/premium') || target.startsWith('/myAI')
    },
    isLessThan930() {
        return window.innerWidth <= 930
    },
    openUrlBlank(url) {
        const link = document.createElement('a');
        link.href = url;
        if(!UtMobile.isMobile()) {
            link.target = '_blank';
        }
        link.click();
    }
}