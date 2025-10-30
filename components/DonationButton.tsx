/**
 * DonationButton Component
 * Buy Me a Coffee style donation button for supporting free app development
 */

import { useState } from 'react'

interface DonationButtonProps {
  variant?: 'coffee' | 'heart' | 'star'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function DonationButton({ 
  variant = 'coffee', 
  size = 'md', 
  className = '' 
}: DonationButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getIcon = () => {
    switch (variant) {
      case 'coffee':
        return '☕'
      case 'heart':
        return '❤️'
      case 'star':
        return '⭐'
      default:
        return '☕'
    }
  }

  const getText = () => {
    switch (variant) {
      case 'coffee':
        return 'Buy me a coffee'
      case 'heart':
        return 'Support development'
      case 'star':
        return 'Sponsor this project'
      default:
        return 'Buy me a coffee'
    }
  }

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  return (
    <a
      href="https://buymeacoffee.com/tickkapp" // Replace with your actual link
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center gap-2 
        bg-yellow-400 hover:bg-yellow-500 
        text-black font-semibold rounded-lg 
        transition-all duration-200 
        transform hover:scale-105 
        shadow-lg hover:shadow-xl
        border-2 border-yellow-600
        ${sizeClasses[size]}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={`text-xl transition-transform duration-200 ${isHovered ? 'animate-bounce' : ''}`}>
        {getIcon()}
      </span>
      <span>{getText()}</span>
      
      {/* Optional: Add a little arrow */}
      <svg 
        className="w-4 h-4 transition-transform duration-200" 
        style={{ transform: isHovered ? 'translateX(2px)' : 'translateX(0)' }}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  )
}