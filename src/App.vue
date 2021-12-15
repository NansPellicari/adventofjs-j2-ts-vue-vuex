<template>
  <div id="app">
    <div class="wrapper menu">
      <div class="panel">
        <h1>To Go Menu</h1>
        <ul class="menu">
          <MenuItem
            v-for="MenuItem in MenuItems"
            :key="MenuItem.id"
            :item="MenuItem"
            :id="MenuItem.id"
          />
        </ul>
      </div>

      <div class="panel cart">
        <h1>Your Cart</h1>

        <ul class="cart-summary" v-if="InCartItems.length > 0">
          <InCartItem
            v-for="InCartItem in InCartItems"
            :key="InCartItem.id"
            :item="InCartItem"
            :id="InCartItem.id"
          />
        </ul>
        <p class="empty" v-else>Your cart is empty.</p>

        <div class="totals" v-if="InCartItems.length > 0">
          <div class="line-item">
            <div class="label">Subtotal:</div>
            <div class="amount price subtotal">{{ subtotal | currency }}</div>
          </div>
          <div class="line-item">
            <div class="label">Tax:</div>
            <div class="amount price tax">{{ tax | currency }}</div>
          </div>
          <div class="line-item total">
            <div class="label">Total:</div>
            <div class="amount price total">{{ total | currency }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MenuItem from './components/MenuItem.vue'
import InCartItem from './components/InCartItem.vue'
import '@/assets/styles.css'
import { MenuItemData } from '@/store/menuItem/MenuItemState'
import * as menuItem from '@/store/menuItem/store'

@Component({
  components: {
    MenuItem,
    InCartItem
  }
})
export default class App extends Vue {
  mounted(): void {
    menuItem.dispatchUpdateTotalAmount(this.$store)
  }
  get MenuItems(): MenuItemData[] {
    return menuItem.readGetItems(this.$store)
  }
  get InCartItems(): MenuItemData[] {
    return menuItem.readGetInCartItems(this.$store)
  }
  get tax(): number {
    return menuItem.readTax(this.$store)
  }
  get subtotal(): number {
    return menuItem.readSubtotalAmount(this.$store)
  }
  get total(): number {
    return menuItem.readTotalAmount(this.$store)
  }
}
</script>

<style></style>
