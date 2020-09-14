import Vue from 'vue'

import DefaultView from '../components/defaultView.vue'

import Home from '../components/views/home.vue'
import About from '../components/views/about.vue'

let posts = []
let postNames = []
const ComponentContext = require.context('../components/views/posts', true, /\.vue$/i, 'lazy');
ComponentContext.keys().forEach((componentFilePath) => {
  const componentName = componentFilePath.split('/').pop().split('.')[0]
  let comp = Vue.component(componentName, () => ComponentContext(componentFilePath))
  postNames.push(componentName)
  posts.push(comp)
});

let postRoutes = {
  path: '/posts',
  component: DefaultView,
  children: []
}

for (let i = 0; i < posts.length; i++ ) {
  let thePost = posts[i]
  let name = postNames[i]
  let child = {
    path: name,
    name: name,
    component: thePost,
  }
  postRoutes.children.push(child)
}


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
      }
    ]
  }
]

routes.push(postRoutes)

export default routes
