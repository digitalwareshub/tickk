/**
 * ADHD Productivity Tools Collection Page
 * SEO-optimized collection page targeting "ADHD productivity tools" keywords
 * 
 * SEO Elements:
 * - 50-100 word description
 * - FAQ section with Schema.org markup
 * - Internal linking to blog posts
 * - CollectionPage structured data
 * - ADHD-specific content sections
 */

import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'
import Breadcrumb from '@/components/Breadcrumb'
import FAQSection from '@/components/FAQSection'
import { adhdFAQs } from '@/lib/faq-data'

export default function ADHDProductivityTools() {
  return (
    <>
      <Head>
        <title>Best ADHD Productivity Tools 2025 - Apps for Neurodivergent Minds | Tickk</title>
        <meta 
          name="description" 
          content="Discover ADHD-friendly productivity tools designed for neurodivergent minds. Voice-first apps, executive function support, and brain dump methods that actually work for ADHD."
        />
        <meta 
          name="keywords" 
          content="ADHD productivity tools, neurodivergent task manager, ADHD apps, executive function support, ADHD voice app, brain dump for ADHD, focus mode app, ADHD-friendly software, productivity for racing thoughts" 
        />
        <link rel="canonical" href="https://tickk.app/adhd-productivity-tools" />
        
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://tickk.app/adhd-productivity-tools" />
        <meta property="og:title" content="Best ADHD Productivity Tools 2025 - Neurodivergent Apps" />
        <meta property="og:description" content="ADHD-friendly productivity tools with voice input, executive function support, and brain dump methods. Free, no signup, works offline." />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best ADHD Productivity Tools 2025" />
        <meta name="twitter:description" content="Apps designed for neurodivergent minds, not against them" />
        
        {/* Schema.org CollectionPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Best ADHD Productivity Tools 2025",
              "description": "Comprehensive guide to productivity tools specifically designed for ADHD and neurodivergent individuals",
              "url": "https://tickk.app/adhd-productivity-tools",
              "inLanguage": "en-US",
              "about": {
                "@type": "Thing",
                "name": "ADHD Productivity Software"
              }
            })
          }}
        />
      </Head>

      <Layout className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-violet-900">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Breadcrumb />
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="heading-primary text-gray-900 dark:text-white mb-4">
              Best ADHD Productivity Tools 2025
            </h1>
            <p className="text-responsive text-gray-700 dark:text-slate-200">
              Apps designed for neurodivergent minds, not against them
            </p>
          </div>

          {/* SEO Description - 50-100 words */}
          <section className="mb-12 prose dark:prose-invert max-w-none">
            <p className="text-responsive leading-relaxed text-gray-700 dark:text-slate-200">
              ADHD brains work differently. Traditional productivity tools assume linear thinking, sustained focus, 
              and consistent executive function - luxuries many ADHD individuals don&apos;t have. The right productivity 
              tools for ADHD accommodate working memory challenges, reduce decision fatigue, and capture racing thoughts 
              without friction. This guide explores productivity strategies and tools specifically designed for ADHD 
              brains, focusing on low-barrier capture, flexible organization, and dopamine-friendly interfaces that 
              work with your neurodivergence, not against it.
            </p>
          </section>

          {/* Why Traditional Apps Fail ADHD Section */}
          <section className="mb-12">
            <h2 className="heading-secondary text-gray-900 dark:text-white mb-6">
              Why Traditional Productivity Apps Fail ADHD Minds
            </h2>
            <div className="space-y-4">
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg">
                <h3 className="heading-secondary text-gray-900 dark:text-white mb-2">
                  ❌ Forced Categorization
                </h3>
                <p className="text-responsive text-gray-700 dark:text-slate-200">
                  &ldquo;Is this a task, note, or reminder?&rdquo; This decision point while capturing thoughts creates 
                  cognitive friction and decision fatigue. ADHD individuals often abandon the tool at this barrier.
                </p>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg">
                <h3 className="heading-secondary text-gray-900 dark:text-white mb-2">
                  ❌ Visual Overwhelm
                </h3>
                <p className="text-responsive text-gray-700 dark:text-slate-200">
                  Complex UIs with multiple sidebars, dropdown menus, and feature bloat. Every visual element 
                  competes for attention, triggering analysis paralysis.
                </p>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg">
                <h3 className="heading-secondary text-gray-900 dark:text-white mb-2">
                  ❌ Typing Friction
                </h3>
                <p className="text-responsive text-gray-700 dark:text-slate-200">
                  Thoughts move faster than typing allows. By the time you finish typing one thought, three more 
                  have appeared and disappeared. Typing is a barrier, not a tool.
                </p>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg">
                <h3 className="heading-secondary text-gray-900 dark:text-white mb-2">
                  ❌ Perfectionism Traps
                </h3>
                <p className="text-responsive text-gray-700 dark:text-slate-200">
                  &ldquo;Should I create a project? Add tags? Set a priority?&rdquo; Tools that encourage detailed 
                  organization prevent starting. Perfect is the enemy of done for ADHD.
                </p>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg">
                <h3 className="heading-secondary text-gray-900 dark:text-white mb-2">
                  ❌ Overwhelming Task Lists
                </h3>
                <p className="text-responsive text-gray-700 dark:text-slate-200">
                  Seeing 47 uncompleted tasks triggers shame and avoidance. Traditional apps show everything 
                  at once, which is paralyzing for ADHD individuals.
                </p>
              </div>
            </div>
          </section>

          {/* What ADHD-Friendly Tools Look Like */}
          <section className="mb-12">
            <h2 className="heading-secondary text-gray-900 dark:text-white mb-6">
              What Makes Productivity Tools ADHD-Friendly?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-6 rounded-r-lg">
                <h3 className="heading-secondary text-gray-900 dark:text-white mb-3">
                  ✅ Brain Dump First
                </h3>
                <p className="text-responsive text-gray-700 dark:text-gray-300">
                  Capture everything without immediate organization. Let the racing thoughts flow without 
                  barriers. Categorize later when executive function is available.
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-6 rounded-r-lg">
                <h3 className="heading-secondary text-gray-900 dark:text-white mb-3">
                  ✅ Voice-First Input
                </h3>
                <p className="text-responsive text-gray-700 dark:text-gray-300">
                  Bypass typing completely. Speak at the speed of thought. Voice input eliminates the 
                  physical barrier between thinking and capturing.
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-6 rounded-r-lg">
                <h3 className="heading-secondary text-gray-900 dark:text-white mb-3">
                  ✅ Minimal UI
                </h3>
                <p className="text-responsive text-gray-700 dark:text-gray-300">
                  Clean interfaces with one clear action. No visual clutter. Large buttons. High contrast. 
                  Everything designed to reduce cognitive load.
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-6 rounded-r-lg">
                <h3 className="heading-secondary text-gray-900 dark:text-white mb-3">
                  ✅ Focus Mode
                </h3>
                <p className="text-responsive text-gray-700 dark:text-gray-300">
                  Show only one task at a time. Remove the overwhelm of seeing everything. Single-tasking 
                  support for scattered attention.
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-6 rounded-r-lg">
                <h3 className="heading-secondary text-gray-900 dark:text-white mb-3">
                  ✅ Keyboard Shortcuts
                </h3>
                <p className="text-responsive text-gray-700 dark:text-gray-300">
                  Command Palette (⌘K) for instant access to any feature. No hunting through menus. 
                  Muscle memory beats visual scanning.
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-6 rounded-r-lg">
                <h3 className="heading-secondary text-gray-900 dark:text-white mb-3">
                  ✅ Automatic Organization
                </h3>
                <p className="text-responsive text-gray-700 dark:text-gray-300">
                  Let the app categorize. NLP determines if something is a task or note automatically. 
                  Removes decision fatigue from the capture process.
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-6 rounded-r-lg">
                <h3 className="heading-secondary text-gray-900 dark:text-white mb-3">
                  ✅ No Signup Required
                </h3>
                <p className="text-responsive text-gray-700 dark:text-gray-300">
                  Instant access. No activation energy barrier. ADHD individuals need tools that work 
                  immediately, not after account creation.
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-6 rounded-r-lg">
                <h3 className="heading-secondary text-gray-900 dark:text-white mb-3">
                  ✅ Visual Progress Tracking
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Dopamine hits from completion. Streak tracking. Celebration of small wins. 
                  Positive reinforcement for ADHD motivation.
                </p>
              </div>
            </div>
          </section>

          {/* Why Tickk Works for ADHD Section */}
          <section className="mb-12 bg-gradient-to-br from-orange-100 to-orange-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl spacing-responsive">
            <h2 className="heading-secondary text-gray-900 dark:text-white mb-6 text-center">
              How tickk Specifically Helps ADHD Brains
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  1
                </div>
                <div>
                  <h3 className="heading-secondary text-gray-900 dark:text-white mb-2">
                    Brain Dump Mode: Capture Racing Thoughts
                  </h3>
                  <p className="text-responsive text-gray-700 dark:text-gray-300">
                    Speak continuously without interruption. The app captures every word without forcing 
                    you to categorize. Perfect for ADHD hyperfocus moments when ideas flow rapidly.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  2
                </div>
                <div>
                  <h3 className="heading-secondary text-gray-900 dark:text-white mb-2">
                    Automatic NLP Classification
                  </h3>
                  <p className="text-responsive text-gray-700 dark:text-gray-300">
                    Compromise.js analyzes your speech and determines if it&rsquo;s a task or note automatically. 
                    You never face the &ldquo;where does this go?&rdquo; decision that stops ADHD individuals.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  3
                </div>
                <div>
                  <h3 className="heading-secondary text-gray-900 dark:text-white mb-2">
                    Focus Mode: One Task at a Time
                  </h3>
                  <p className="text-responsive text-gray-700 dark:text-gray-300">
                    Shows only the current task, hiding the overwhelming backlog. Reduces visual clutter 
                    and decision paralysis. Perfect for task initiation challenges.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  4
                </div>
                <div>
                  <h3 className="heading-secondary text-gray-900 dark:text-white mb-2">
                    Command Palette (⌘K): Instant Access
                  </h3>
                  <p className="text-responsive text-gray-700 dark:text-gray-300">
                    Type what you want instead of hunting through menus. Reduces working memory load 
                    and visual scanning. Muscle memory replaces executive function.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  5
                </div>
                <div>
                  <h3 className="heading-secondary text-gray-900 dark:text-white mb-2">
                    Zero Friction Start: No Signup
                  </h3>
                  <p className="text-responsive text-gray-700 dark:text-gray-300">
                    Works immediately when you land on the page. No activation energy barrier. 
                    ADHD individuals need tools that work NOW, not after account setup.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  6
                </div>
                <div>
                  <h3 className="heading-secondary text-gray-900 dark:text-white mb-2">
                    Works Offline: No Dependency on Internet
                  </h3>
                  <p className="text-responsive text-gray-700 dark:text-gray-300">
                    Capture thoughts anytime, anywhere. No &ldquo;I&rsquo;ll do it later when I have wifi&rdquo; friction. 
                    PWA functionality means it works like a native app.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Link
                href="/"
                className="btn-responsive inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white font-semibold transition-colors shadow-lg"
              >
                Try tickk Free - Built for ADHD Minds
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </section>

          {/* Executive Function Support Section */}
          <section className="mb-12">
            <h2 className="heading-secondary text-gray-900 dark:text-white mb-6">
              Executive Function Support Features
            </h2>
            <div className="bg-white dark:bg-slate-800 rounded-xl spacing-responsive shadow-lg">
              <div className="space-y-6">
                <div>
                  <h3 className="heading-secondary text-gray-900 dark:text-white mb-2 flex items-center">
                    <span className="text-2xl mr-3">🎯</span>
                    Task Initiation
                  </h3>
                  <p className="text-responsive text-gray-700 dark:text-gray-300 ml-11">
                    Focus Mode shows only one task, reducing the overwhelm that prevents starting. 
                    Voice input lowers activation energy compared to typing.
                  </p>
                </div>
                
                <div>
                  <h3 className="heading-secondary text-gray-900 dark:text-white mb-2 flex items-center">
                    <span className="text-2xl mr-3">🧠</span>
                    Working Memory
                  </h3>
                  <p className="text-responsive text-gray-700 dark:text-gray-300 ml-11">
                    Capture thoughts externally so working memory isn&rsquo;t consumed by remembering. 
                    The app becomes your external hard drive.
                  </p>
                </div>
                
                <div>
                  <h3 className="heading-secondary text-gray-900 dark:text-white mb-2 flex items-center">
                    <span className="text-2xl mr-3">⏱️</span>
                    Time Blindness
                  </h3>
                  <p className="text-responsive text-gray-700 dark:text-gray-300 ml-11">
                    Automatic timestamps on every item. Streak tracking builds time awareness. 
                    Relative time display (&ldquo;2 hours ago&rdquo;) is more intuitive.
                  </p>
                </div>
                
                <div>
                  <h3 className="heading-secondary text-gray-900 dark:text-white mb-2 flex items-center">
                    <span className="text-2xl mr-3">🔀</span>
                    Organization
                  </h3>
                  <p className="text-responsive text-gray-700 dark:text-gray-300 ml-11">
                    Automatic categorization via NLP. You don&rsquo;t decide where things go - the app does. 
                    Reduces decision fatigue by 90%.
                  </p>
                </div>
                
                <div>
                  <h3 className="heading-secondary text-gray-900 dark:text-white mb-2 flex items-center">
                    <span className="text-2xl mr-3">🎨</span>
                    Impulse Control
                  </h3>
                  <p className="text-responsive text-gray-700 dark:text-gray-300 ml-11">
                    Capture impulsive thoughts immediately without disrupting current focus. 
                    Voice input takes 2 seconds vs 30+ seconds for typing and filing.
                  </p>
                </div>
                
                <div>
                  <h3 className="heading-secondary text-gray-900 dark:text-white mb-2 flex items-center">
                    <span className="text-2xl mr-3">✅</span>
                    Task Completion
                  </h3>
                  <p className="text-responsive text-gray-700 dark:text-gray-300 ml-11">
                    Visual progress bars and streak tracking provide dopamine reinforcement. 
                    Celebrating small wins builds momentum.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Real User Testimonials Section */}
          <section className="mb-12">
            <h2 className="heading-secondary text-gray-900 dark:text-white mb-6 text-center">
              What ADHD Users Say About tickk
            </h2>
            <div className="space-y-4">
              <blockquote className="bg-gray-50 dark:bg-slate-800 p-6 rounded-lg border-l-4 border-orange-500">
                <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                  &ldquo;First productivity app that actually works with my ADHD brain instead of against it. 
                  The brain dump feature is life-changing - I can finally capture my racing thoughts before 
                  they disappear.&rdquo;
                </p>
                <footer className="text-sm text-gray-600 dark:text-gray-400">
                  — Reddit user, r/ADHD
                </footer>
              </blockquote>
              
              <blockquote className="bg-gray-50 dark:bg-slate-800 p-6 rounded-lg border-l-4 border-orange-500">
                <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                  &ldquo;I&rsquo;ve tried Notion, Todoist, Things, Asana... every &lsquo;productivity system&rsquo; failed because 
                  they require executive function I don&rsquo;t have. Tickk just works. Voice input + automatic 
                  organization = game changer.&rdquo;
                </p>
                <footer className="text-sm text-gray-600 dark:text-gray-400">
                  — Reddit user, r/productivity
                </footer>
              </blockquote>
              
              <blockquote className="bg-gray-50 dark:bg-slate-800 p-6 rounded-lg border-l-4 border-orange-500">
                <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                  &ldquo;Focus Mode is perfect for my scattered attention. Seeing only one task at a time removes 
                  the overwhelm. I actually START things now instead of just thinking about starting them.&rdquo;
                </p>
                <footer className="text-sm text-gray-600 dark:text-gray-400">
                  — GitHub user review
                </footer>
              </blockquote>
            </div>
          </section>

          {/* Related Resources Section - INTERNAL LINKING */}
          <section className="mb-12 bg-gray-50 dark:bg-slate-800 rounded-xl spacing-responsive">
            <h2 className="heading-secondary text-gray-900 dark:text-white mb-6">
              Related Resources
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link 
                href="/blog/adhd-voice-technology-perfect-match"
                className="block p-4 bg-white dark:bg-slate-700 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  ADHD & Voice Technology: Perfect Match →
                </h3>
                <p className="text-base text-gray-600 dark:text-gray-400">
                  Deep dive into why voice input is revolutionary for ADHD brains.
                </p>
              </Link>
              
              <Link 
                href="/blog/braindump-first-organize-later-productivity"
                className="block p-4 bg-white dark:bg-slate-700 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Braindump-First Productivity Method →
                </h3>
                <p className="text-base text-gray-600 dark:text-gray-400">
                  Why capturing thoughts before organizing works better for ADHD minds.
                </p>
              </Link>
              
              <Link
                href="/blog/voice-productivity-vs-ai-tools-local-processing-wins"
                className="block p-4 bg-white dark:bg-slate-700 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Privacy-First Productivity: Local vs Cloud →
                </h3>
                <p className="text-base text-gray-600 dark:text-gray-400">
                  Why local processing wins for ADHD-friendly privacy protection.
                </p>
              </Link>

              <Link
                href="/blog/mobile-voice-productivity-capture-ideas-on-the-go"
                className="block p-4 bg-white dark:bg-slate-700 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Mobile Voice Productivity Guide →
                </h3>
                <p className="text-base text-gray-600 dark:text-gray-400">
                  Capture ideas on the go with mobile voice productivity.
                </p>
              </Link>
              
              <Link 
                href="/blog/braindump-first-organize-later-productivity"
                className="block p-4 bg-white dark:bg-slate-700 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Braindump-First Productivity Method →
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The cognitive science behind capturing before categorizing.
                </p>
              </Link>
              
              <Link 
                href="/voice-productivity-apps"
                className="block p-4 bg-white dark:bg-slate-700 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Best Voice Productivity Apps →
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Compare the best speech recognition software for hands-free workflows.
                </p>
              </Link>
              
              <Link 
                href="/features"
                className="block p-4 bg-white dark:bg-slate-700 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Explore All Tickk Features →
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Complete feature guide including Focus Mode and Command Palette.
                </p>
              </Link>
            </div>
          </section>

          {/* FAQ Section */}
          <FAQSection faqs={adhdFAQs} title="ADHD Productivity FAQ" showSchema={true} />

          {/* CTA Section */}
          <section className="text-center spacing-responsive">
            <h2 className="heading-secondary mb-4 text-gray-900 dark:text-slate-50">
              Ready to Try Productivity That Actually Works for ADHD?
            </h2>
            <p className="text-responsive mb-8 text-gray-700 dark:text-slate-200">
              100% free. No signup. No executive function required to start.
            </p>
            <Link
              href="/"
              className="btn-responsive inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white font-semibold transition-colors shadow-lg"
            >
              Start Using tickk Now - Built for Your Brain
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </section>
        </div>
      </Layout>
    </>
  )
}
