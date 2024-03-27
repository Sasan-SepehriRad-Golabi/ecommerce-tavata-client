import MainPage from "@/components/MainPage.vue"
import Login from "@/components/LoginPage.vue"
import FilterMembersModification from "@/components/FilterMembersModification.vue"
import CarouselImagesModification from "@/components/CarouselImagesModification.vue"
import profilePage from "@/components/userProfile.vue"
import portfolio from "@/components/portfilopage.vue"
import contactAdmin from "@/components/sendMessage.vue"
import userMessages from "@/components/userMessages.vue"
import ZarrinPAlResult from "@/components/ZarrinPalOk.vue"
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/cim",
    component: CarouselImagesModification
  },
  {
    path: "/filtermembers/:fi",
    component: FilterMembersModification
  },
  {
    path: "/user/zarRes/:cont(.*)",
    component: ZarrinPAlResult
  },
  {
    path: "/profile",
    component: profilePage
  },
  {
    path: "/portfolio",
    component: portfolio
  },
  {
    path: "/contactAdmin",
    component: contactAdmin,
  },
  {
    path: "/userMessages",
    component: userMessages
  },
  {
    path: "/",
    name: "main",
    component: MainPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
