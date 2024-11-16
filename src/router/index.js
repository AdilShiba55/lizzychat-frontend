import { createRouter, createWebHistory } from 'vue-router'
import {useAuthStore} from "@/stores/auth.js";
import {UtRouter} from "@/util/UtRouter.js";
import {UtScroll} from "@/util/UtScroll.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      component: () => import('../layout/AppLayout.vue'),
      redirect: '/explore',
      children: [
        {
          path: '/profile',
          component: () => import('../views/ProfilePage.vue')
        },
        {
          path: '/explore',
          component: () => import('../views/ExplorePage.vue')
        },
        {
          path: '/chat',
          component: () => import('../views/ChatItemsPage.vue')
        },
        {
          path: '/chat/:characterId',
          component: () => import('../views/ChatPage.vue')
        },
        {
          path: '/premium',
          component: () => import('../views/PremiumPage.vue')
        },
        {
          path: '/faq',
          component: () => import('../views/FaqPage.vue')
        },
        {
          path: '/payment/confirm/:sourceId',
          component: () => import('../views/PaymentRedirectPage.vue')
        },
        {
          path: '/gallery',
          component: () => import('../views/ImagesPage.vue')
        },
        {
          path: '/myAI',
          component: () => import('../views/MyAIPage.vue')
        },
        {
          path: '/myAI/edit',
          component: () => import('../views/EditCharacterPage.vue')
        },
        {
          path: '/myAI/edit/:characterId',
          component: () => import('../views/EditCharacterPage.vue')
        }
      ]
    },
    {
      path: '/adminka',
      component: () => import('../layout/AdminkaLayout.vue'),
      redirect: '/adminka/user',
      children: [
        {
          path: '/adminka/user',
          component: () => import('../views/UserAdminPage.vue')
        },
        {
          path: '/adminka/character',
          component: () => import('../views/CharacterAdminPage.vue')
        },
        {
          path: '/adminka/request',
          component: () => import('../views/ContactRequestAdminPage.vue')
        },
        {
          path: '/adminka/faq',
          component: () => import('../views/FaqAdminPage.vue')
        },
        {
          path: '/adminka/playground-image',
          component: () => import('../views/ImagePlaygroundAdminPage.vue')
        },
        {
          path: '/adminka/character/edit',
          component: () => import('../views/EditCharacterPage.vue')
        },
        {
          path: '/adminka/character/edit/:characterId',
          component: () => import('../views/EditCharacterPage.vue')
        }
      ]
    }
  ]
});

export default router

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isDefaultPath = UtRouter.isDefaultPath(to.fullPath)
  const isAdminka = to.fullPath.startsWith('/adminka')
  // console.log('isAdmin', authStore.isAdmin)
  if((!authStore.isAuthorized && !isDefaultPath) || (isAdminka && !authStore.isAdmin)) {
    next('/explore')
  } else {
    next()
  }
  UtScroll.scrollAppToTop()
})
