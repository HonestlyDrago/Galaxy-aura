import { useState, useCallback } from 'react'
import type { CartItem, Cart } from '@/types/cart'

// Mock cart state - replace with real backend
const MOCK_CART: Cart = {
  items: [],
  total: 0,
}

export function useCart() {
  const [cart, setCart] = useState<Cart>(MOCK_CART)

  const addItem = useCallback((item: CartItem) => {
    setCart((prev) => {
      const existingItem = prev.items.find((i) => i.productId === item.productId)
      
      let updatedItems: CartItem[]
      if (existingItem) {
        updatedItems = prev.items.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      } else {
        updatedItems = [...prev.items, item]
      }

      const total = updatedItems.reduce((sum: any, i: any) => sum + i.price * i.quantity, 0)
      return { items: updatedItems, total }
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    setCart((prev) => {
      const updatedItems = prev.items.filter((i) => i.productId !== productId)
      const total = updatedItems.reduce((sum: any, i: any) => sum + i.price * i.quantity, 0)
      return { items: updatedItems, total }
    })
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }

    setCart((prev) => {
      const updatedItems = prev.items.map((i) =>
        i.productId === productId ? { ...i, quantity } : i
      )
      const total = updatedItems.reduce((sum: any, i: any) => sum + i.price * i.quantity, 0)
      return { items: updatedItems, total }
    })
  }, [removeItem])

  const clearCart = useCallback(() => {
    setCart({ items: [], total: 0 })
  }, [])

  const getItemCount = useCallback(() => {
    return cart.items.reduce((sum: any, item: any) => sum + item.quantity, 0)
  }, [cart.items])

  return {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemCount,
    isEmpty: cart.items.length === 0,
  }
}
