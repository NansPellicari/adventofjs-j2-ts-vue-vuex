export interface MenuItemData {
  name: string
  price: number
  image: string
  alt: string
  count: number
  id: number
}

export interface MenuState {
  totalAmount: number
  fees: number
  items: MenuItemData[]
  subtotalAmount: number
  tax: number
}

export const state: MenuState = {
  totalAmount: 0,
  subtotalAmount: 0,
  tax: 0,
  fees: 0.097,
  items: [
    {
      name: 'French Fries with Ketchup',
      price: 223,
      image: 'plate__french-fries.png',
      alt: 'French Fries',
      count: 1,
      id: 0
    },
    {
      name: 'Salmon and Vegetables',
      price: 512,
      image: 'plate__salmon-vegetables.png',
      alt: 'Salmon and Vegetables',
      count: 0,
      id: 1
    },
    {
      name: 'Spaghetti Meat Sauce',
      price: 782,
      image: 'plate__spaghetti-meat-sauce.png',
      alt: 'Spaghetti with Meat Sauce',
      count: 0,
      id: 2
    },
    {
      name: 'Bacon, Eggs, and Toast',
      price: 599,
      image: 'plate__bacon-eggs.png',
      alt: 'Bacon, Eggs, and Toast',
      count: 0,
      id: 3
    },
    {
      name: 'Chicken Salad with Parmesan',
      price: 698,
      image: 'plate__chicken-salad.png',
      alt: 'Chicken Salad with Parmesan',
      count: 0,
      id: 4
    },
    {
      name: 'Fish Sticks and Fries',
      price: 634,
      image: 'plate__fish-sticks-fries.png',
      alt: 'Fish Sticks and Fries',
      count: 0,
      id: 5
    }
  ]
}

export type MenuItemState = typeof state
