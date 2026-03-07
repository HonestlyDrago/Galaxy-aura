'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: LucideIcon
  color: string
}

export function StatCard({
  title,
  value,
  change,
  icon: Icon,
  color,
}: StatCardProps) {
  return (
    <Card className="p-6 border border-border relative overflow-hidden group">
      {/* Background gradient */}
      <div
        className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${color} opacity-10 rounded-full group-hover:opacity-20 transition-opacity`}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-foreground">{value}</h3>
          </div>
          <div className={`p-2 rounded-lg bg-gradient-to-br ${color} bg-opacity-10`}>
            <Icon size={24} className="text-primary" />
          </div>
        </div>

        <p className="text-xs text-accent">{change}</p>
      </div>
    </Card>
  )
}
