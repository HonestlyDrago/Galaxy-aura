'use client'

import React from 'react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DollarSign,
  ShoppingCart,
  Package,
  TrendingUp,
  AlertCircle,
} from 'lucide-react'
import { StatCard } from './stat-card'
import { RecentOrders } from './recent-orders'
import { InventoryAlerts } from './inventory-alerts'

const salesData = [
  { name: 'Jan', sales: 4200, orders: 24 },
  { name: 'Feb', sales: 3800, orders: 22 },
  { name: 'Mar', sales: 5200, orders: 29 },
  { name: 'Apr', sales: 4600, orders: 25 },
  { name: 'May', sales: 6200, orders: 34 },
  { name: 'Jun', sales: 7100, orders: 38 },
]

export function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-1">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your store overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="$28,450"
          change="+12.5%"
          icon={DollarSign}
          color="from-primary to-accent"
        />
        <StatCard
          title="Total Orders"
          value="1,248"
          change="+8.2%"
          icon={ShoppingCart}
          color="from-accent to-primary"
        />
        <StatCard
          title="Products"
          value="156"
          change="+3 new"
          icon={Package}
          color="from-cyan-500 to-blue-500"
        />
        <StatCard
          title="Growth"
          value="23.5%"
          change="+2.3% vs last month"
          icon={TrendingUp}
          color="from-orange-500 to-red-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <Card className="lg:col-span-2 p-6 border border-border">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-1">
              Sales Overview
            </h2>
            <p className="text-sm text-muted-foreground">
              Last 6 months performance
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: 'var(--foreground)' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="var(--primary)"
                strokeWidth={2}
                name="Sales ($)"
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="var(--accent)"
                strokeWidth={2}
                name="Orders"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Inventory Alerts */}
        <InventoryAlerts />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Recent Orders */}
        <RecentOrders />
      </div>
    </div>
  )
}
