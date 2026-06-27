import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Breadcrumb from '../components/Breadcrumb';
import {
  Check,
  Heart,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react';

type SupportTierProps = {
  amount: number;
  title: string;
  description: string;
  stripeLink: string;
  isSuggested?: boolean;
};

const SupportTier = ({
  amount,
  title,
  description,
  stripeLink,
  isSuggested = false,
}: SupportTierProps) => {
  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        isSuggested
          ? 'border-yellow-400 shadow-md'
          : 'border-gray-200 shadow-sm'
      }`}
    >
      {isSuggested && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="whitespace-nowrap rounded-full bg-yellow-400 px-4 py-1 text-sm font-semibold text-black">
            Suggested
          </span>
        </div>
      )}

      <div className="flex h-full flex-col p-6">
        <div className="mb-5 flex justify-center">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full ${
              isSuggested ? 'bg-yellow-100' : 'bg-gray-100'
            }`}
          >
            <Heart
              className={`h-6 w-6 ${
                isSuggested ? 'text-yellow-700' : 'text-gray-700'
              }`}
            />
          </div>
        </div>

        <div className="mb-6 text-center">
          <h3 className="mb-2 text-lg font-bold text-gray-900">
            {title}
          </h3>

          <div className="mb-3 text-4xl font-bold text-white">
            ${amount}
          </div>

          <p className="text-sm leading-6 text-gray-600">
            {description}
          </p>
        </div>

        <div className="mb-6 space-y-3 border-t border-gray-100 pt-5">
          <div className="flex items-center text-sm text-gray-600">
            <Check className="mr-3 h-4 w-4 flex-shrink-0 text-green-600" />
            One-time contribution
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Check className="mr-3 h-4 w-4 flex-shrink-0 text-green-600" />
            No subscription
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Check className="mr-3 h-4 w-4 flex-shrink-0 text-green-600" />
            No account required
          </div>
        </div>

        <a
          href={stripeLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Support Tickk with a one-time contribution of $${amount}`}
          className={`mt-auto block w-full rounded-lg px-4 py-3 text-center font-semibold transition-colors duration-200 ${
            isSuggested
              ? 'bg-yellow-500 text-black hover:bg-yellow-400'
              : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}
        >
          Contribute ${amount}
        </a>
      </div>
    </div>
  );
};

export default function DonatePage() {
  const supportTiers: SupportTierProps[] = [
    {
      amount: 10,
      title: 'A little support',
      description:
        'A simple way to say that Tickk has been useful to you.',
      stripeLink: 'https://buy.stripe.com/6oU7sL7PxabEaH32u76wE00',
      isSuggested: true,
    },
    {
      amount: 25,
      title: 'A helpful boost',
      description:
        'Help support ongoing improvements, maintenance, and bug fixes.',
      stripeLink: 'https://buy.stripe.com/7sY8wP9XF4Rk7uRecP6wE01',
    },
    {
      amount: 50,
      title: 'Generous support',
      description:
        'Support more development time for improving the Tickk experience.',
      stripeLink: 'https://buy.stripe.com/bJedR98TB2JcaH33yb6wE02',
    },
    {
      amount: 100,
      title: 'Major support',
      description:
        'Make a larger contribution toward Tickk’s continued development.',
      stripeLink: 'https://buy.stripe.com/14A28rc5NfvYeXjc4H6wE03',
    },
  ];

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Head>
        <title>Support Tickk | One-Time Contribution</title>

        <meta
          name="description"
          content="Support the continued development of Tickk with an optional one-time contribution. No subscription and no account required."
        />

        <meta name="robots" content="index, follow" />

        <link rel="canonical" href="https://tickk.app/donate" />

        <meta
          property="og:title"
          content="Support Tickk Development"
        />

        <meta
          property="og:description"
          content="Help support the continued development and maintenance of Tickk with an optional one-time contribution."
        />

        <meta
          property="og:url"
          content="https://tickk.app/donate"
        />

        <meta property="og:type" content="website" />
      </Head>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb />

        {/* Hero */}
        <section className="mx-auto mb-16 max-w-3xl pt-6 text-center">
          <div className="mb-5 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100">
              <Heart className="h-7 w-7 text-yellow-700" />
            </div>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Support Tickk
          </h1>

          <p className="mb-6 text-lg leading-8 text-gray-600 md:text-xl">
            Tickk is an independently developed voice brain-dump app.
            If it has helped you capture ideas, organise thoughts, or get
            something out of your head, you can support its continued
            development with a one-time contribution.
          </p>

          <p className="text-base leading-7 text-gray-500">
            Supporting Tickk is completely optional. Contributions do not
            unlock additional features, and Tickk remains available whether
            you contribute or not.
          </p>
        </section>

        {/* Trust points */}
        <section className="mb-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-7 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Sparkles className="h-6 w-6 text-blue-700" />
            </div>

            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              Improve Tickk
            </h2>

            <p className="text-sm leading-6 text-gray-600">
              Support usability improvements, better workflows, and thoughtful
              additions to the product.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-7 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Wrench className="h-6 w-6 text-green-700" />
            </div>

            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              Maintain the product
            </h2>

            <p className="text-sm leading-6 text-gray-600">
              Help with maintenance, browser compatibility, bug fixes, and
              keeping the app reliable.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-7 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <ShieldCheck className="h-6 w-6 text-purple-700" />
            </div>

            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              Support an independent tool
            </h2>

            <p className="text-sm leading-6 text-gray-600">
              Help sustain a focused, privacy-conscious product without
              turning every useful feature into a subscription.
            </p>
          </div>
        </section>

        {/* Contribution options */}
        <section className="mb-16">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-gray-900">
              Choose an amount
            </h2>

            <p className="text-gray-600">
              Every amount supports the same work. Choose whatever feels
              comfortable.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {supportTiers.map((tier) => (
              <SupportTier key={tier.amount} {...tier} />
            ))}
          </div>
        </section>

        {/* Payment note */}
        <section className="mb-16 rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm md:p-8">
          <ShieldCheck className="mx-auto mb-4 h-7 w-7 text-gray-700" />

          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Secure one-time payment
          </h2>

          <p className="mx-auto max-w-2xl text-sm leading-6 text-gray-600">
            Payments are securely processed by Stripe. Tickk does not receive
            or store your complete card details. This is a voluntary payment
            supporting an independent software product and is not a charitable
            donation.
          </p>
        </section>

        {/* Thank you */}
        <section className="rounded-2xl bg-gray-900 px-6 py-10 text-center text-white md:px-10">
          <h2 className="mb-4 text-2xl font-bold">
            Thank you for supporting Tickk
          </h2>

          <p className="mx-auto max-w-2xl leading-7 text-gray-300">
            Whether you contribute, share Tickk with someone, report a problem,
            or simply continue using it, your support is appreciated.
          </p>

          <p className="mt-6 text-sm text-gray-400">
            Questions about a payment? Contact{' '}
            <a
              href="mailto:write@digiwares.xyz"
              className="text-yellow-400 hover:text-yellow-300"
            >
              write@digiwares.xyz
            </a>
          </p>
        </section>
      </main>
    </Layout>
  );
}