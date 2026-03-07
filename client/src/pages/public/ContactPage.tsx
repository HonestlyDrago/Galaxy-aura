import React, { useState } from 'react'
import { PublicLayout } from '@/components/public/layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle,
  Instagram,
  Facebook,
  Twitter,
} from 'lucide-react'

const CONTACT_INFO = [
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['support@galaxyaura.com', 'sales@galaxyaura.com'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['+1 (888) 429-2872', 'Mon – Fri, 9am – 6pm EST'],
  },
  {
    icon: MapPin,
    title: 'Our Office',
    lines: ['123 Crystal Lane', 'New York, NY 10001, USA'],
  },
  {
    icon: Clock,
    title: 'Business Hours',
    lines: ['Mon – Fri: 9am – 6pm EST', 'Sat: 10am – 4pm EST'],
  },
]

const FAQ_ITEMS = [
  {
    q: 'How long does shipping take?',
    a: 'Domestic orders typically arrive in 3–5 business days. International orders take 7–14 business days depending on the destination.',
  },
  {
    q: 'Do you accept returns?',
    a: 'Yes — we offer a 30-day hassle-free return policy. If you are not completely happy, we will sort it out.',
  },
  {
    q: 'Are the crystals genuine?',
    a: 'Absolutely. Every crystal used in our lamps is genuine and ethically sourced. We include a certificate of authenticity with each order.',
  },
  {
    q: 'Can I track my order?',
    a: 'Yes — once your order ships you will receive a tracking number via email. You can also view order status in your Account page.',
  },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setLoading(true)
    // Simulate sending
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  return (
    <PublicLayout cartCount={0}>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <MessageSquare size={14} />
            Get in Touch
          </div>
          <h1 className="text-5xl font-serif font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-lg">
            Have a question, a custom order request, or just want to say hello? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

            {/* Left: Contact info */}
            <div className="space-y-5">
              {CONTACT_INFO.map(({ icon: Icon, title, lines }) => (
                <Card key={title} className="p-5 border border-border flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1">{title}</p>
                    {lines.map((line) => (
                      <p key={line} className="text-sm text-muted-foreground">{line}</p>
                    ))}
                  </div>
                </Card>
              ))}

              {/* Social */}
              <Card className="p-5 border border-border">
                <p className="font-semibold text-sm mb-3">Follow Us</p>
                <div className="flex gap-3">
                  {[
                    { Icon: Instagram, label: 'Instagram' },
                    { Icon: Facebook, label: 'Facebook' },
                    { Icon: Twitter, label: 'Twitter' },
                  ].map(({ Icon, label }) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={label}
                      className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 border border-border">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-green-500" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">
                      Thanks for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <Button variant="outline" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-serif font-bold mb-1">Send a Message</h2>
                    <p className="text-muted-foreground text-sm mb-6">We typically respond within 24 hours.</p>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <Label htmlFor="name">Full Name <span className="text-destructive">*</span></Label>
                          <Input
                            id="name"
                            placeholder="Jane Doe"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="email">Email Address <span className="text-destructive">*</span></Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="jane@example.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          placeholder="What's this about?"
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="message">Message <span className="text-destructive">*</span></Label>
                        <textarea
                          id="message"
                          rows={5}
                          placeholder="Tell us how we can help..."
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          required
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                        />
                      </div>
                      <Button type="submit" className="w-full gap-2" disabled={loading}>
                        {loading ? (
                          <>
                            <span className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Quick answers to the questions we hear most often.</p>
          </div>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <Card
                key={i}
                className="border border-border overflow-hidden cursor-pointer"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="px-6 py-4 flex items-center justify-between gap-4">
                  <p className="font-semibold text-sm">{item.q}</p>
                  <span className={`text-muted-foreground transition-transform shrink-0 ${openFaq === i ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </div>
                {openFaq === i && (
                  <div className="px-6 pb-4 border-t border-border">
                    <p className="text-sm text-muted-foreground leading-relaxed pt-3">{item.a}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
