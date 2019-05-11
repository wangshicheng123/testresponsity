import Vue from 'vue'
import Router from 'vue-router'
import Movie from "@/views/Movie.vue"
import Music from "@/views/Music.vue"
import Book from "@/views/Book.vue"
import Photo from "@/views/Photo.vue"

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/movie",
      component: Movie,
      name: "movie"
    },
    {
      path: "/music",
      component: Music,
      name: "music"
    },{
      path: "/book",
      component: Book,
      name: "book"
    },{
      path: "/photo",
      component: Photo,
      name: "photo"
    },
    {
      path: "/",
      redirect: "/movie"
    }
  ]
})
