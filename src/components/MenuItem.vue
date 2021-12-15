<template>
  <component :is="tagType">
    <div class="plate">
      <img :src="`/images/${image}`" :alt="alt" class="plate" />
    </div>
    <div class="content">
      <p class="menu-item">{{ name }}</p>
      <p class="price">{{ price | currency }}</p>
      <button class="in-cart" v-if="isInCart">
        <img src="/images/check.svg" alt="Check" />
        {{ btnText }}
      </button>
      <button class="add" @click="addToCart" v-else>Add to Cart</button>
    </div>
  </component>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { MenuItemData } from '@/store/menuItem/MenuItemState'
import * as menuItem from '@/store/menuItem/store'

interface MenuItemCompData {
  tagType: string
}

@Component
export default class MenuItem extends Vue {
  @Prop() private item!: MenuItemData
  @Prop() private id!: number
  @Prop() private tag!: string

  data(): MenuItemCompData {
    return {
      tagType: this.tag || 'li'
    }
  }
  get btnText(): string {
    return this.item.count > 0 ? 'In Cart' : 'add to cart'
  }
  get isInCart(): boolean {
    return this.item.count > 0
  }
  get price(): number {
    return this.item.price
  }
  get name(): string {
    return this.item.name
  }
  get image(): string {
    return this.item.image
  }
  get alt(): string {
    return this.item.alt
  }
  get count(): number {
    return this.item.count
  }

  addToCart(): void {
    menuItem.commitAddToCart(this.$store, this.id)
    menuItem.dispatchUpdateTotalAmount(this.$store)
  }
}
</script>

<style></style>
