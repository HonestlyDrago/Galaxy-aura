import React from 'react'
import { Card } from '@/components/ui/card'
import { AlertCircle, TrendingDown } from 'lucide-react'

const mockAlerts = [
  {
    id: 1,
    product: 'Crystal Aura Lamp',
    current: 5,
    low: 10,
    severity: 'critical',
  },
  {
    id: 2,
    product: 'Moonstone Sphere',
    current: 8,
    low: 10,
    severity: 'warning',
  },
  {
    id: 3,
    product: 'Aurora Pendant',
    current: 12,
    low: 15,
    severity: 'info',
  },
]

export function InventoryAlerts() {
  return (
    <Card className="p-6 border border-border">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle size={20} className="text-yellow-400" />
          <h2 className="text-xl font-semibold text-foreground">
            Inventory Alerts
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Products running low on stock
        </p>
      </div>

      <div className="space-y-3">
        {mockAlerts.map((alert) => (
          <div
            key={alert.id}
            className="p-3 rounded-lg bg-muted/40 border border-border/50 hover:bg-muted/60 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm font-medium text-foreground">
                {alert.product}
              </p>
              <span
                className={`text-xs px-2 py-1 rounded font-semibold ${
                  alert.severity === 'critical'
                    ? 'bg-red-500/20 text-red-400'
                    : alert.severity === 'warning'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-blue-500/20 text-blue-400'
                }`}
              >
                {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingDown size={16} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {alert.current} / {alert.low} units
                </span>
              </div>
              <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent"
                  style={{ width: `${(alert.current / alert.low) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
