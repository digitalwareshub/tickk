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
      'JSON import/export',
      'Basic CSV export',
      'Experience transforms',
      'Starter templates',
      'Mind map preview',
    ],
  },
  PRO: {
    name: 'Tickk Pro',
    features: [
      'Unlimited smart transforms',
      'Full mind maps',
      'Advanced exports (Markdown, DOCX)',
      'Saved transform workflows',
      'Unlimited templates',
      'Bulk actions',
      'Future premium features included',
    ],
  },
};
