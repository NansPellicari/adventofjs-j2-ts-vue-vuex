import * as Vuex from 'vuex'
import { menuItem } from './menuItem/store'
import { State } from './state'

export const createStore = (): Vuex.Store<State> =>
  new Vuex.Store<State>({
    modules: {
      menuItem
    }
  })
