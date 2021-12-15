import { ActionContext } from 'vuex'
import { getStoreAccessors } from 'vuex-typescript'
import { State as RootState } from '../state'
import { MenuItemData, MenuState, state } from './MenuItemState'

type Getters = {
  getItems: MenuItemData[]
  getInCartItems: MenuItemData[]
  getProductNames: string[]
  getTotalAmount: number
  getSubtotalAmount: number
  getSubtotal: (id: number) => number
  getTax: number
}
type MenuItemContext = ActionContext<MenuState, RootState>

export const menuItem = {
  namespaced: true,

  state,

  getters: {
    getItems(state: MenuState): MenuItemData[] {
      return state.items
    },
    getInCartItems(state: MenuState): MenuItemData[] {
      return state.items.filter((item) => item.count > 0)
    },
    getProductNames(state: MenuState): string[] {
      return state.items.map((item) => item.name)
    },
    getTotalAmount(state: MenuState): number {
      return state.totalAmount
    },
    // eslint-disable-next-line
    getSubtotalAmount(state: MenuState, ...others: any[]): number {
      const getters: Getters = others[0]
      const typedGetters = getters as Getters
      const items = typedGetters.getInCartItems
      return items.reduce((total, item) => total + item.price * item.count, 0)
    },
    getSubtotal(state: MenuState): (id: number) => number {
      return (id: number) => {
        const item = state.items[id]
        return item.count * item.price
      }
    },
    getTax(state: MenuState): number {
      return state.subtotalAmount * state.fees
    }
  },

  mutations: {
    setCount(state: MenuState, payload: { id: number; count: number }): void {
      state.items[payload.id].count += payload.count
    },
    addToCart(state: MenuState, id: number): void {
      state.items[id].count += 1
    },
    setTotalAmount(state: MenuState): void {
      state.totalAmount =
        state.subtotalAmount * state.fees + state.subtotalAmount
    },
    setSubtotalAmount(state: MenuState, totalAmount: number): void {
      state.subtotalAmount = totalAmount
    },
    setTax(state: MenuState): void {
      state.tax = state.subtotalAmount * state.fees
    }
  },

  actions: {
    updateTotalAmount(context: MenuItemContext): void {
      const total = readSubtotalAmount(context)
      commitSetSubtotalAmount(context, total)
      commitSetTotalAmount(context)
      commitSetTax(context)
    }
  }
}

// @see https://github.com/istrib/vuex-typescript
const { commit, read, dispatch } = getStoreAccessors<MenuState, RootState>(
  'menuItem'
) // We pass namespace here, if we make the module namespaced: true.

const actions = menuItem.actions
export const dispatchUpdateTotalAmount = dispatch(actions.updateTotalAmount)

const mutations = menuItem.mutations
export const commitSetTotalAmount = commit(mutations.setTotalAmount)
export const commitSetSubtotalAmount = commit(mutations.setSubtotalAmount)
export const commitSetCount = commit(mutations.setCount)
export const commitAddToCart = commit(mutations.addToCart)
export const commitSetTax = commit(mutations.setTax)

const getters = menuItem.getters
export const readProductNames = read(getters.getProductNames)
export const readTax = read(getters.getTax)
export const readTotalAmount = read(getters.getTotalAmount)
export const readSubtotalAmount = read(getters.getSubtotalAmount)
export const readGetItems = read(getters.getItems)
export const readGetInCartItems = read(getters.getInCartItems)
export const readSubtotal = read(getters.getSubtotal)
