import VueRouter from 'vue-router'
import LatestScores from './components/LatestScores'
import Game from './components/Game'
import WatIsWat from './components/WatIsWat'

const routes = [
  { path: '/scores', component: LatestScores },
  { path: '/watiswat', component: WatIsWat },
  { path: '/', component: Game },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes, // short for `routes: routes`
  linkActiveClass: 'is-active'  // bulma

})
export default router
