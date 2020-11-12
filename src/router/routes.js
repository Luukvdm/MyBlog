import defaultView from "../components/defaultView.vue";

import home from "../components/views/home.vue";
import about from "../components/views/about.vue";
import blogPost from "../components/views/blogPost.vue";
import blogPostCat from "../components/views/blogPostCat.vue";

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')

const routes = [
  {
    path: "/",
    component: defaultView,
    children: [
      {
        path: "home",
        alias: "",
        name: "Home",
        component: home
      },
      {
        path: "about",
        name: "About",
        component: about
      },
      {
        path: "posts/:id",
        name: "Blog Posts",
        component: blogPost
      },
      {
        path: "posts/cat/:cat",
        name: "Blog Post Categories",
        component: blogPostCat
      }
    ]
  }
];

export default routes;
