/**
 * Analytics Dashboard Component
 * Real-time analytics visualization for user behavior tracking
 */

import { useEffect, useState } from 'react';

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  conversionRate: number;
  topUserSegments: Array<{ segment: string; count: number; percentage: number }>;
  topContentEngagement: Array<{ content: string; type: string; interactions: number }>;
  userFlow: Array<{ step: string; users: number; dropoffRate: number }>;
  performanceMetrics: {
    averageLoadTime: number;
    bounceRate: number;
    averageSessionDuration: number;
  };
  realTimeUsers: number;
}

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

export default function AnalyticsDashboard({ isVisible, onClose }: Props) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');

  useEffect(() => {
    if (!isVisible) return;

    // Simulate fetching analytics data
    const fetchAnalytics = async () => {
      setLoading(true);
      
      // In a real implementation, this would fetch from your analytics API
      // For now, we'll simulate the data structure
      const mockData: AnalyticsData = {
        pageViews: 2847,
        uniqueVisitors: 1923,
        conversionRate: 12.4,
        topUserSegments: [
          { segment: 'ADHD Focused', count: 487, percentage: 25.3 },
          { segment: 'Students', count: 384, percentage: 20.0 },
          { segment: 'Professionals', count: 346, percentage: 18.0 },
          { segment: 'Accessibility', count: 192, percentage: 10.0 },
          { segment: 'Creative', count: 154, percentage: 8.0 },
          { segment: 'Parents', count: 138, percentage: 7.2 }
        ],
        topContentEngagement: [
          { content: 'ADHD Use Case Card', type: 'use_case', interactions: 892 },
          { content: 'FAQ: Free ADHD App', type: 'faq', interactions: 654 },
          { content: 'Hero CTA Button', type: 'cta', interactions: 543 },
          { content: 'Interactive Demo', type: 'demo', interactions: 432 },
          { content: 'Students Use Case', type: 'use_case', interactions: 321 }
        ],
        userFlow: [
          { step: 'Landing Page View', users: 1923, dropoffRate: 0 },
          { step: 'Scroll to Use Cases', users: 1547, dropoffRate: 19.5 },
          { step: 'Use Case Interaction', users: 1234, dropoffRate: 20.2 },
          { step: 'FAQ Section View', users: 987, dropoffRate: 20.0 },
          { step: 'CTA Click', users: 654, dropoffRate: 33.7 },
          { step: 'App Visit', users: 487, dropoffRate: 25.5 }
        ],
        performanceMetrics: {
          averageLoadTime: 1.2,
          bounceRate: 34.2,
          averageSessionDuration: 2.8
        },
        realTimeUsers: 47
      };

      // Simulate API delay
      setTimeout(() => {
        setData(mockData);
        setLoading(false);
      }, 500);
    };

    fetchAnalytics();

    // Set up real-time updates
    const interval = setInterval(fetchAnalytics, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [isVisible, selectedTimeframe]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gray-900 text-white p-6 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">tickk Analytics Dashboard</h2>
              <p className="text-gray-300 mt-1">Real-time user behavior insights</p>
            </div>
            <div className="flex items-center gap-4">
              <select 
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="bg-gray-800 text-white px-3 py-2 rounded border border-gray-700"
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
              <button
                onClick={onClose}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading analytics data...</p>
          </div>
        ) : data ? (
          <div className="p-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                <h3 className="text-sm font-medium opacity-90">Page Views</h3>
                <p className="text-3xl font-bold mt-2">{data.pageViews.toLocaleString()}</p>
                <p className="text-sm opacity-75 mt-1">+12% from yesterday</p>
              </div>
              
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
                <h3 className="text-sm font-medium opacity-90">Unique Visitors</h3>
                <p className="text-3xl font-bold mt-2">{data.uniqueVisitors.toLocaleString()}</p>
                <p className="text-sm opacity-75 mt-1">+8% from yesterday</p>
              </div>
              
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
                <h3 className="text-sm font-medium opacity-90">Conversion Rate</h3>
                <p className="text-3xl font-bold mt-2">{data.conversionRate}%</p>
                <p className="text-sm opacity-75 mt-1">+2.3% from yesterday</p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
                <h3 className="text-sm font-medium opacity-90">Real-time Users</h3>
                <p className="text-3xl font-bold mt-2">{data.realTimeUsers}</p>
                <p className="text-sm opacity-75 mt-1">Currently active</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* User Segments */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top User Segments</h3>
                <div className="space-y-4">
                  {data.topUserSegments.map((segment, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${
                          index === 0 ? 'bg-orange-500' : 
                          index === 1 ? 'bg-blue-500' : 
                          index === 2 ? 'bg-green-500' : 
                          index === 3 ? 'bg-purple-500' : 
                          index === 4 ? 'bg-pink-500' : 'bg-gray-500'
                        }`}></div>
                        <span className="font-medium">{segment.segment}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{segment.count}</div>
                        <div className="text-sm text-gray-600">{segment.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content Engagement */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Engagement</h3>
                <div className="space-y-4">
                  {data.topContentEngagement.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{item.content}</div>
                        <div className="text-sm text-gray-600 capitalize">{item.type}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{item.interactions}</div>
                        <div className="text-sm text-gray-600">interactions</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* User Flow */}
              <div className="bg-gray-50 p-6 rounded-lg lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Funnel</h3>
                <div className="space-y-4">
                  {data.userFlow.map((step, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{step.step}</span>
                          <div className="text-right">
                            <span className="font-semibold">{step.users.toLocaleString()}</span>
                            {step.dropoffRate > 0 && (
                              <span className="text-red-600 text-sm ml-2">-{step.dropoffRate}%</span>
                            )}
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all ${
                              index === 0 ? 'bg-green-500' : 
                              step.dropoffRate < 20 ? 'bg-green-400' :
                              step.dropoffRate < 30 ? 'bg-yellow-400' : 'bg-red-400'
                            }`}
                            style={{ width: `${(step.users / data.userFlow[0].users) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-gray-50 p-6 rounded-lg lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{data.performanceMetrics.averageLoadTime}s</div>
                    <div className="text-sm text-gray-600">Average Load Time</div>
                    <div className="text-xs text-green-600 mt-1">Excellent ({"<"}2s)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{data.performanceMetrics.bounceRate}%</div>
                    <div className="text-sm text-gray-600">Bounce Rate</div>
                    <div className="text-xs text-green-600 mt-1">Good ({"<"}40%)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{data.performanceMetrics.averageSessionDuration}m</div>
                    <div className="text-sm text-gray-600">Avg. Session Duration</div>
                    <div className="text-xs text-green-600 mt-1">Excellent ({">"}2m)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="mt-8 bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-900 mb-3">🎯 Key Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-orange-800 mb-2">ADHD-Focused Content Performing Well</h4>
                  <p className="text-sm text-orange-700">
                    25.3% of users identify as ADHD-focused, making it your top segment. 
                    The ADHD use case card has the highest engagement rate.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-orange-800 mb-2">Strong FAQ Engagement</h4>
                  <p className="text-sm text-orange-700">
                    FAQ section shows high engagement, especially ADHD-related questions. 
                    Consider expanding with more targeted questions.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-orange-800 mb-2">Conversion Opportunity</h4>
                  <p className="text-sm text-orange-700">
                    33.7% drop-off between FAQ viewing and CTA clicks. 
                    Consider adding more CTAs in the FAQ section.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-orange-800 mb-2">Excellent Performance</h4>
                  <p className="text-sm text-orange-700">
                    Page loads in 1.2s with 34.2% bounce rate - both excellent metrics 
                    that support good user experience and SEO.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-gray-600">Failed to load analytics data</p>
          </div>
        )}
      </div>
    </div>
  );
}
