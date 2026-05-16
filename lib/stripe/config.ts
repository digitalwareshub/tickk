/**
 * Tickk Pro pricing configuration
 */

export const isCheckoutConfigured = (): boolean => {
  return false;
};

/**
 * Pricing tiers
 */
export const PRICING = {
  FREE: {
    name: 'Free',
    price: 0,
    features: [
      'Unlimited voice brain dumps',
      'Organize into tasks and notes',
      'Local storage',
      'PWA install',
      'Basic export',
    ],
  },
  PRO: {
    name: 'Tickk Pro - Lifetime Access',
    lifetimePrice: 29,
    features: [
      'Mind maps',
      'Advanced exports (Markdown, CSV, DOCX)',
      'Smart transforms',
      'Productivity templates',
      'Bulk actions',
      'Future premium features included',
    ],
  },
};
