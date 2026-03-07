import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Settings as SettingsIcon, Save } from 'lucide-react'

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-1">Settings</h1>
        <p className="text-muted-foreground">
          Configure your store settings
        </p>
      </div>

      {/* Store Settings */}
      <Card className="p-6 border border-border">
        <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
          <SettingsIcon size={24} />
          Store Configuration
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Store Name
            </label>
            <Input
              defaultValue="Galaxy Aura"
              placeholder="Your store name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Store Email
            </label>
            <Input
              type="email"
              defaultValue="hello@galaxyaura.com"
              placeholder="Store email address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Currency
            </label>
            <select className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground">
              <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>GBP (£)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Timezone
            </label>
            <select className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground">
              <option>Pacific Time (PT)</option>
              <option>Mountain Time (MT)</option>
              <option>Central Time (CT)</option>
              <option>Eastern Time (ET)</option>
            </select>
          </div>

          <Button className="gap-2">
            <Save size={20} />
            Save Changes
          </Button>
        </div>
      </Card>

      {/* Shipping Settings */}
      <Card className="p-6 border border-border">
        <h2 className="text-xl font-semibold text-foreground mb-6">
          Shipping Settings
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Default Shipping Cost
            </label>
            <Input
              type="number"
              defaultValue="15.00"
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Free Shipping Threshold
            </label>
            <Input
              type="number"
              defaultValue="100.00"
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>

          <Button className="gap-2">
            <Save size={20} />
            Save Changes
          </Button>
        </div>
      </Card>

      {/* About */}
      <Card className="p-6 border border-border text-muted-foreground">
        <h2 className="text-lg font-semibold text-foreground mb-4">About</h2>
        <div className="space-y-2 text-sm">
          <p>Galaxy Aura Admin Dashboard v1.0.0</p>
          <p>Powered by React, TypeScript, and Tailwind CSS</p>
          <p>© 2025 Galaxy Aura. All rights reserved.</p>
        </div>
      </Card>
    </div>
  )
}
