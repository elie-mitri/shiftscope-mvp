// src/components/reviews/rating-input.tsx
import { useState } from 'react'

interface RatingInputProps {
  label: string
  description?: string
  value: number
  onChange: (value: number) => void
  required?: boolean
}

export function RatingInput({ label, description, value, onChange, required }: RatingInputProps) {
  const [hoverValue, setHoverValue] = useState(0)

  const handleClick = (rating: number) => {
    onChange(rating)
  }

  const handleMouseEnter = (rating: number) => {
    setHoverValue(rating)
  }

  const handleMouseLeave = () => {
    setHoverValue(0)
  }

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1: return 'Poor'
      case 2: return 'Fair'
      case 3: return 'Good'
      case 4: return 'Very Good'
      case 5: return 'Excellent'
      default: return ''
    }
  }

  const displayValue = hoverValue || value
  const ratingText = getRatingText(displayValue)

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <div>
          <label className="block text-sm font-medium text-gray-900">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
        </div>
        
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center" onMouseLeave={handleMouseLeave}>
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => handleClick(rating)}
                onMouseEnter={() => handleMouseEnter(rating)}
                className={`text-2xl sm:text-3xl p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded touch-manipulation ${
                  rating <= displayValue
                    ? 'text-yellow-400 hover:text-yellow-500'
                    : 'text-gray-300 hover:text-yellow-300'
                }`}
                aria-label={`Rate ${rating} stars`}
                style={{ minWidth: '40px', minHeight: '40px' }}
              >
                ★
              </button>
            ))}
          </div>
          
          <div className="text-right flex-shrink-0">
            {displayValue > 0 && (
              <div className="text-sm">
                <div className="font-medium text-gray-900">{displayValue}/5</div>
                <div className="text-gray-600 text-xs">{ratingText}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {required && value === 0 && (
        <p className="text-sm text-red-600">This rating is required</p>
      )}
    </div>
  )
}