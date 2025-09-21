/**
 * Quick analytics test script
 * Run this in the browser console to test GA4 tracking
 */

// Test if GA is loaded
console.log('=== Analytics Test ===');
console.log('GA Tracking ID:', process?.env?.NEXT_PUBLIC_GA_ID || 'Not found in process.env');
console.log('Window gtag:', typeof window.gtag);
console.log('Window dataLayer:', window.dataLayer?.length || 'Not found');

// Test manual event firing
if (typeof window.gtag === 'function') {
  console.log('✅ GA4 is loaded - firing test event...');
  
  window.gtag('event', 'test_analytics', {
    event_category: 'testing',
    event_label: 'manual_test',
    custom_parameters: {
      test_timestamp: Date.now(),
      user_agent: navigator.userAgent.substring(0, 50)
    }
  });
  
  console.log('✅ Test event fired! Check Network tab for:');
  console.log('- URL containing: googletagmanager.com');
  console.log('- URL containing: google-analytics.com/g/collect');
} else {
  console.error('❌ GA4 not loaded properly');
}

// Check for environment variables
console.log('Environment check:');
console.log('- NODE_ENV:', process?.env?.NODE_ENV || 'undefined');
console.log('- Expected GA ID: G-CJNM0FTPW5');
