// src/components/home/features-section.tsx

const features = [
  {
    title: 'Anonymous Reviews',
    description: 'Share your honest experience without fear of retaliation. All reviews are posted with anonymous display names.',
    icon: '🕶️'
  },
  {
    title: 'Detailed Ratings',
    description: 'Rate restaurants on management quality, work-life balance, pay & tipping, and scheduling flexibility.',
    icon: '⭐'
  },
  {
    title: 'Worker-Focused',
    description: 'Reviews by restaurant workers, for restaurant workers. Get insights that matter to your daily work experience.',
    icon: '👥'
  },
  {
    title: 'NYC Focused',
    description: 'Comprehensive coverage of New York City restaurants across all five boroughs and neighborhoods.',
    icon: '🏙️'
  }
]

export function FeaturesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Why ShiftScope?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            The first platform designed specifically for restaurant workers to share and discover workplace insights.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}