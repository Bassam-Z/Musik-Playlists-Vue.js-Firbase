import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import SignupView from '@/views/auth/SignupView'
import CreatePlaylistView from '@/views/Playlists/CreatePlaylistView'
import PlaylistDetailsView from '@/views/Playlists/PlaylistDetailsView'

//auth guard
import { projectAuth } from '@/firebase/Config'
//Erlaubt nur die angemeldte Leute
const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  console.log('currentUser: ', user)
  if(!user){
    next({name: 'Login' })
  }else{
    next()
  }
}

// const requireNoAuth = ( to, from, next) => {
//   let user = projectAuth.currentUser
//   if(user){
//     next({name: 'Login' })
//   }else{
//     next()
//   }
// }

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    // beforeEnter: requireAuth
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView
  },
  {
    path: '/playlistes/create',
    name: 'CreatePlayList',
    component: CreatePlaylistView,
    beforeEnter: requireAuth
  },
  {
    path: '/playlistes/:id',
    name: 'PlaylistDetails',
    component: PlaylistDetailsView,
    beforeEnter: requireAuth,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
