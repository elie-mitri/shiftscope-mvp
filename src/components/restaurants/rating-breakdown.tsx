// src/components/restaurants/rating-breakdown.tsx
interface RatingBreakdownProps {
  breakdown: {
    overall: number
    management: number
    work_life_balance: number
    pay_tipping: number
    scheduling: number
  }
}

export function RatingBreakdown({ breakdown }: RatingBreakdownProps) {
  const categories = [
    { key: 'overall', label: 'Overall Experience', value: breakdown.overall || 0 },
    { key: 'management', label: 'Management', value: breakdown.management || 0 },
    { key: 'work_life_balance', label: 'Work-Life Balance', value: breakdown.work_life_balance || 0 },
    { key: 'pay_tipping', label: 'Pay & Tipping', value: breakdown.pay_tipping || 0 },
    { key: 'scheduling', label: 'Scheduling', value: breakdown.scheduling || 0 },
  ]

  const getStarDisplay = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <div className="flex items-center">
        {Array(fullStars).fill(0).map((_, i) => (
          <span key={`full-${i}`} className="text-yellow-400">★</span>
        ))}
        {hasHalfStar && <span className="text-yellow-400">☆</span>}
        {Array(emptyStars).fill(0).map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300">★</span>
        ))}
      </div>
    )
  }

  const getBarColor = (rating: number) => {
    if (rating >= 4) return 'bg-green-500'
    if (rating >= 3) return 'bg-yellow-500'
    if (rating >= 2) return 'bg-orange-500'
    return 'bg-red-500'
  }

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div key={category.key} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">
              {category.label}
            </span>
            <div className="flex items-center gap-2">
              {getStarDisplay(category.value)}
              <span className="text-sm font-semibold text-gray-900 min-w-[2rem] text-right">
                {category.value.toFixed(1)}
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${getBarColor(category.value)}`}
              style={{ width: `${(category.value / 5) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}