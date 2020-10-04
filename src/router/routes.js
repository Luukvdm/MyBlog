import DefaultView from '../components/defaultView.vue'

import Home from '../components/views/home.vue'
import About from '../components/views/about.vue'
import BlogPost from '../components/views/blogPost.vue'

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')

const routes = [
  {
    path: '/',
    component: DefaultView,
    children: [
      {
        path: 'home',
        alias: '',
        name: 'Home',
        component: Home,
      },
      {
        path: 'about',
        name: 'About',
        component: About,
      },
      {
        path: 'posts/:id',
        name: 'Blog Posts',
        component: BlogPost
      }
    ]
  }
]

export default routes
