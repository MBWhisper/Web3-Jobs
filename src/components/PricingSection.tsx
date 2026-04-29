// components/PricingSection.tsx
import React from 'react'
import { useLemonSqueezy, PLANS, PlanType } from '../hooks/useLemonSqueezy'

interface Props { jobId?: string; onSelectPlan?: (plan: PlanType) => void }

export default function PricingSection({ jobId, onSelectPlan }: Props) {
  const { openCheckout, loading } = useLemonSqueezy()
  const handleClick = async (planId: PlanType) => {
    if (onSelectPlan) onSelectPlan(planId)
    await openCheckout(planId, jobId)
  }
  return (
    <section className="pricing-section">
      <div className="pricing-header">
        <h2>Post a Web3 Job</h2>
        <p>Reach 70,000+ blockchain developers and Web3 professionals</p>
      </div>
      <div className="pricing-grid">
        {PLANS.map((plan) => (
          <div key={plan.id} className={"pricing-card" + (plan.highlighted ? " pricing-card--featured" : "")}>
            {plan.badge && <span className="pricing-badge">{plan.badge}</span>}
            <div className="pricing-card__header">
              <h3>{plan.name}</h3>
              <div className="pricing-card__price">
                <span className="pricing-card__amount">${plan.price}</span>
                <span className="pricing-card__period">/ {plan.duration}</span>
              </div>
            </div>
            <ul className="pricing-card__features">
              {plan.features.map((f) => (
                <li key={f}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  {f}
                </li>
              ))}
            </ul>
            <button
              className={"pricing-card__btn" + (plan.highlighted ? " pricing-card__btn--featured" : "")}
              onClick={() => handleClick(plan.id)}
              disabled={loading}
            >
              {loading
                ? <span className="pricing-card__btn-loader"><span className="spinner"/>Opening...</span>
                : "Get Started — $" + plan.price}
            </button>
          </div>
        ))}
      </div>
      <p className="pricing-footer">
        Secure checkout by <a href="https://lemonsqueezy.com" target="_blank" rel="noopener noreferrer">Lemon Squeezy</a>. VAT handled automatically.
      </p>
    </section>
  )
}
