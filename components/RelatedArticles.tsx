/**
 * Related Articles Component
 * Displays related content links for internal linking and SEO
 * 
 * Features:
 * - Grid layout (2 columns on desktop, 1 on mobile)
 * - Hover effects with elevation
 * - Dark mode support
 * - Fully responsive
 * - Optimized for internal linking strategy
 * 
 * Usage:
 * import RelatedArticles from '@/components/RelatedArticles'
 * 
 * <RelatedArticles 
 *   articles={[
 *     {
 *       title: "Article Title",
 *       href: "/blog/article-slug",
 *       description: "Brief description of the article"
 *     }
 *   ]}
 * />
 */

import Link from 'next/link'

interface RelatedArticle {
  title: string
  href: string
  description: string
}

interface RelatedArticlesProps {
  articles: RelatedArticle[]
  title?: string
}

export default function RelatedArticles({ 
  articles, 
  title = "Related Articles" 
}: RelatedArticlesProps) {
  return (
    <section className="py-12 px-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {title}
        </h2>
        
        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {articles.map((article, index) => (
            <Link
              key={index}
              href={article.href}
              className="block p-6 bg-white dark:bg-slate-700 rounded-lg hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group"
            >
              {/* Article Title with Arrow */}
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                {article.title}
                <span className="inline-block ml-1 transform group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </h3>
              
              {/* Article Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {article.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
