import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export { stripePromise };

// Subscription plans configuration
export const SUBSCRIPTION_PLANS = {
  MONTHLY: {
    name: 'Monthly Premium',
    description: 'Full access to all parenting resources and tools',
    price: '$14.99',
    priceId: 'price_monthly', // This would be your actual Stripe price ID
    interval: 'month',
    features: [
      'Access to all book summaries',
      'Personalized parenting insights',
      'Progress tracking',
      'Expert guidance tools',
      'Community access',
      'Priority support'
    ]
  },
  YEARLY: {
    name: 'Yearly Premium',
    description: 'Full access with 2 months free',
    price: '$149.99',
    priceId: 'price_yearly', // This would be your actual Stripe price ID
    interval: 'year',
    originalPrice: '$179.88',
    savings: 'Save $29.89',
    features: [
      'Everything in Monthly',
      '2 months FREE',
      'Annual parenting assessment',
      'Exclusive yearly content',
      'Priority customer support'
    ]
  }
} as const;

export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount / 100);
};
