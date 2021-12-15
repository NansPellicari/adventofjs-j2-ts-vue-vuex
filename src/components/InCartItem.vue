<template>
  <component :is="tagType">
    <div class="plate">
      <img :src="`/images/${image}`" :alt="alt" class="plate" />
      <div class="quantity">{{ count }}</div>
    </div>
    <div class="content">
      <p class="menu-item">{{ name }}</p>
      <p class="price">{{ price | currency }}</p>
    </div>
    <div class="quantity__wrapper">
      <button class="decrease" @click="decrease">
        <img src="/images/chevron.svg" />
      </button>
      <div class="quantity">{{ count }}</div>
      <button class="increase" @click="increase">
        <img src="/images/chevron.svg" />
      </button>
    </div>
    <div class="subtotal">{{ subtotal | currency }}</div>
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

  get subtotal(): number {
    return menuItem.readSubtotal(this.$store)(this.id)
  }

  decrease(): void {
    menuItem.commitSetCount(this.$store, { id: this.id, count: -1 })
    menuItem.dispatchUpdateTotalAmount(this.$store)
  }
  increase(): void {
    menuItem.commitSetCount(this.$store, { id: this.id, count: 1 })
    menuItem.dispatchUpdateTotalAmount(this.$store)
  }
}
</script>

<style></style>
