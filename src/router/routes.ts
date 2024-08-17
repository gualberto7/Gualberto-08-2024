import { type RouteRecordRaw } from 'vue-router'
import mainLayout from '@/shared/layouts/mainLayout.vue'
import Home from '@/home/Home.vue'
import {
  HOME_ROUTE_PATH,
  TEAM_ROUTE_PATH,
  POKEMON_DETAIL_PATH,
  HOME_ROUTE_NAME,
  TEAM_ROUTE_NAME,
  POKEMON_DETAIL_NAME
} from '@/shared/constants/routes'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: mainLayout,
    children: [
      {
        path: HOME_ROUTE_PATH,
        name: HOME_ROUTE_NAME,
        component: Home
      },
      {
        path: TEAM_ROUTE_PATH,
        name: TEAM_ROUTE_NAME,
        component: () => import('@/pokemon/Team.vue')
      },
      {
        path: POKEMON_DETAIL_PATH,
        props: true,
        name: POKEMON_DETAIL_NAME,
        component: () => import('@/pokemon/Detail.vue'),
        beforeEnter: (to, from, next) => {
          const { name } = to.params
          if (validatePokemonName(name as string)) {
            next()
          } else {
            next({ name: 'home' })
          }
        }
      }
    ]
  }
]

const validatePokemonName = (name: string) => {
  const regex = /^[a-zA-Z]+$/
  return regex.test(name)
}
