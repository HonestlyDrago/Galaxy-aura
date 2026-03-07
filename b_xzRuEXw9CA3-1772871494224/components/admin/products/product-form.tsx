'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useProducts } from '@/hooks/useProducts'
import { ArrowLeft, Save } from 'lucide-react'

interface ProductFormProps {
  mode: 'create' | 'edit'
  productId?: string
}

export function ProductForm({ mode, productId }: ProductFormProps) {
  const { products } = useProducts()
  const product = productId ? products.find((p) => p.id === productId) : null

  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    sku: product?.sku || '',
    price: product?.price || 0,
    cost: product?.cost || 0,
    stock: product?.stock || 0,
    category: product?.category || 'Lamps & Lighting',
    published: product?.published || false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Product name is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.sku.trim()) newErrors.sku = 'SKU is required'
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0'
    if (formData.stock < 0) newErrors.stock = 'Stock cannot be negative'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('Form submitted:', formData)
      // Here you would call your tRPC mutation to save the product
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : type === 'number'
            ? parseFloat(value)
            : value,
    }))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft size={20} />
            Back to Products
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {mode === 'create' ? 'Create Product' : 'Edit Product'}
          </h1>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6 border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                Product Name
              </label>
              <Input
                name="name"
                placeholder="Enter product name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && (
                <p className="text-xs text-destructive mt-1">{errors.name}</p>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <Textarea
                name="description"
                placeholder="Enter product description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className={errors.description ? 'border-destructive' : ''}
              />
              {errors.description && (
                <p className="text-xs text-destructive mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* SKU */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                SKU
              </label>
              <Input
                name="sku"
                placeholder="e.g., CAL-001"
                value={formData.sku}
                onChange={handleChange}
                className={errors.sku ? 'border-destructive' : ''}
              />
              {errors.sku && (
                <p className="text-xs text-destructive mt-1">{errors.sku}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Lamps & Lighting</option>
                <option>Decorative Items</option>
                <option>Accessories</option>
                <option>Gifts</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Sale Price
              </label>
              <Input
                name="price"
                type="number"
                placeholder="0.00"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className={errors.price ? 'border-destructive' : ''}
              />
              {errors.price && (
                <p className="text-xs text-destructive mt-1">{errors.price}</p>
              )}
            </div>

            {/* Cost */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Cost Price
              </label>
              <Input
                name="cost"
                type="number"
                placeholder="0.00"
                value={formData.cost}
                onChange={handleChange}
                step="0.01"
                min="0"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Stock Quantity
              </label>
              <Input
                name="stock"
                type="number"
                placeholder="0"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                className={errors.stock ? 'border-destructive' : ''}
              />
              {errors.stock && (
                <p className="text-xs text-destructive mt-1">{errors.stock}</p>
              )}
            </div>
          </div>
        </Card>

        {/* Publish Status */}
        <Card className="p-6 border border-border">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm font-medium text-foreground">
              Publish this product
            </span>
          </label>
          <p className="text-xs text-muted-foreground mt-2">
            Published products are visible to customers
          </p>
        </Card>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button type="submit" className="gap-2">
            <Save size={20} />
            {mode === 'create' ? 'Create Product' : 'Save Changes'}
          </Button>
          <Link href="/admin/products">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>
      </form>
    </div>
  )
}
