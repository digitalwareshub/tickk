import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Breadcrumb from '../components/Breadcrumb';
import { Heart, Star, Zap, Crown } from 'lucide-react';
const DonationTier = ({ 
  amount, 
  title, 
  description, 
  icon: Icon, 
  features, 
  isPopular = false,
  stripeLinkPlaceholder 
}: {
  amount: number;
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  features: string[];
  isPopular?: boolean;
  stripeLinkPlaceholder: string;
}) => {
  return (
    <div className={`relative bg-white rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
      isPopular ? 'border-yellow-400 shadow-md' : 'border-gray-200'
    }`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-center mb-4">
          <div className={`p-3 rounded-full ${isPopular ? 'bg-yellow-100' : 'bg-gray-100'}`}>
            <Icon className={`w-6 h-6 ${isPopular ? 'text-yellow-600' : 'text-gray-600'}`} />
          </div>
        </div>
        
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            ${amount}
          </div>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
        
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
              {feature}
            </li>
          ))}
        </ul>
        
        <button 
          onClick={() => window.open(stripeLinkPlaceholder, '_blank')}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors duration-200 ${
            isPopular 
              ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
              : 'bg-gray-900 hover:bg-gray-800 text-white'
          }`}
        >
          ${amount}
        </button>
      </div>
    </div>
  );
};

export default function DonatePage() {
  const donationTiers = [
    {
      amount: 10,
      title: "Feature Advocate",
      description: "Help prioritize new features",
      icon: Heart,
      features: [
        "Support ongoing development",
        "Help cover server costs",
        "Influence feature roadmap",
        "Priority bug reports",
        "Beta access to new features"
      ],
      isPopular: true,
      stripeLinkPlaceholder: "https://buy.stripe.com/6oU7sL7PxabEaH32u76wE00"
    },
    {
      amount: 25,
      title: "Power User",
      description: "Support major improvements",
      icon: Star,
      features: [
        "Everything in Feature Advocate",
        "Direct feedback channel",
        "Custom feature requests",
        "Early access to pro features"
      ],
      stripeLinkPlaceholder: "https://buy.stripe.com/7sY8wP9XF4Rk7uRecP6wE01"
    },
    {
      amount: 50,
      title: "Pro Supporter",
      description: "Accelerate development",
      icon: Zap,
      features: [
        "Everything in Power User",
        "Monthly development updates",
        "Influence app direction",
        "Recognition in app credits"
      ],
      stripeLinkPlaceholder: "https://buy.stripe.com/bJedR98TB2JcaH33yb6wE02"
    },
    {
      amount: 100,
      title: "Champion Backer",
      description: "Become a development partner",
      icon: Crown,
      features: [
        "Everything in Pro Supporter",
        "Direct developer access",
        "Custom integrations discussion",
        "Lifetime supporter status",
        "Special badge in app"
      ],
      stripeLinkPlaceholder: "https://buy.stripe.com/14A28rc5NfvYeXjc4H6wE03"
    }
  ];

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Head>
        <title>Support Tickk Development | Donate to Keep Tickk Free</title>
        <meta name="description" content="Support Tickk development with a donation. Help us build new features, maintain servers, and keep the productivity app free for everyone." />
        <meta name="keywords" content="donate, support tickk, productivity app funding, open source donation, developer support" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://tickk.app/donate" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Breadcrumbs */}
        <Breadcrumb />
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Support Tickk Development
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Tickk is free and always will be. Your support helps us build new features, 
            maintain servers, and keep improving the productivity experience for everyone.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              100% goes to development
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              No subscription required
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              Secure payments via Stripe
            </div>
          </div>
        </div>

        {/* Impact Section */}
        <div className="bg-white rounded-2xl p-8 mb-16 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How Your Support Helps
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">New Features</h3>
              <p className="text-gray-600 text-sm">
                Advanced analytics, team collaboration, AI-powered insights, and more powerful productivity tools.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Maintenance & Hosting</h3>
              <p className="text-gray-600 text-sm">
                Server costs, security updates, bug fixes, and ensuring 99.9% uptime for all users.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Community Growth</h3>
              <p className="text-gray-600 text-sm">
                Better documentation, tutorials, user support, and building a thriving productivity community.
              </p>
            </div>
          </div>
        </div>

        {/* Donation Tiers */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Choose Your Support Level
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {donationTiers.map((tier, index) => (
              <DonationTier key={index} {...tier} />
            ))}
          </div>
        </div>

        {/* Thank You Section */}
        <div className="text-center bg-gray-900 text-white rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Thank You! 🙏</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Every contribution, no matter the size, makes a real difference. 
            Your support helps keep Tickk free for students, professionals, and teams worldwide.
          </p>
          <div className="mt-6 text-sm text-gray-400">
            Questions? Reach out to us at{' '}
            <a href="mailto:support@tickk.app" className="text-yellow-400 hover:text-yellow-300">
              support@tickk.app
            </a>
          </div>
        </div>

      </div>
    </Layout>
  );
}