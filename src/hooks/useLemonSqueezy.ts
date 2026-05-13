// hooks/useLemonSqueezy.ts
import { useState } from 'react'
import supabase from '../lib/supabase'

export const CHECKOUT_URLS = {
  basic:    'https://web3work.lemonsqueezy.com/checkout/buy/88d71395-1252-4db7-baf3-0d67374ce799',
  bundle:   'https://web3work.lemonsqueezy.com/checkout/buy/3363ea30-9d08-4201-b8f6-5bab78b286b5',
  featured: 'https://web3work.lemonsqueezy.com/checkout/buy/dda8f3b3-b221-4424-879d-ee51608ce8ca',
  premium:  'https://web3work.lemonsqueezy.com/checkout/buy/74268782-e64b-4206-a9ae-8a164b51b8b1',
} as const

export type PlanType = keyof typeof CHECKOUT_URLS

export const PLANS = [
  { id: 'basic' as PlanType, name: 'Basic Listing', price: 49, duration: '30 days',
    features: ['1 job post','Listed for 30 days','Standard visibility','Apply link included'],
    highlighted: false, badge: null },
  { id: 'featured' as PlanType, name: 'Featured Listing', price: 99, duration: '30 days',
    features: ['1 featured job post','⚡ Top of results','Highlighted badge','Listed for 30 days','3x more visibility'],
    highlighted: true, badge: 'Most Popular' },
  { id: 'bundle' as PlanType, name: 'Bundle 3 Posts', price: 129, duration: '90 days',
    features: ['3 job posts','Listed for 90 days','Save 12% vs single','Standard visibility'],
    highlighted: false, badge: 'Best Value' },
  { id: 'premium' as PlanType, name: 'Web3 Jobs Premium', price: 199, duration: '30 days',
    features: ['Unlimited job posts','Premium badge','Featured placement','Priority support','Analytics'],
    highlighted: false, badge: null },
]

export function useLemonSqueezy() {
  const [loading, setLoading] = useState(false)
  const openCheckout = async (plan: PlanType, jobId?: string) => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const url = new URL(CHECKOUT_URLS[plan])
      if (jobId) url.searchParams.set('checkout[custom][job_id]', jobId)
      if (user?.id) {
        url.searchParams.set('checkout[custom][user_id]', user.id)
        url.searchParams.set('checkout[email]', user.email ?? '')
      }
      url.searchParams.set('checkout[custom][plan]', plan)
      url.searchParams.set('dark', '1')
      window.open(url.toString(), '_blank', 'noopener,noreferrer')
    } finally { setLoading(false) }
  }
  return { openCheckout, loading }
}
