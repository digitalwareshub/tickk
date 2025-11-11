import { useState, useEffect } from 'react'

export function useDarkMode() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check localStorage for saved preference - default to light mode
    const saved = localStorage.getItem('tickk_dark_mode')
    const shouldBeDark = saved ? JSON.parse(saved) : false // Default to light mode
    
    setIsDark(shouldBeDark)
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleDark = () => {
    setIsDark(prev => {
      const newValue = !prev
      localStorage.setItem('tickk_dark_mode', JSON.stringify(newValue))
      
      if (newValue) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      
      return newValue
    })
  }

  return { isDark, toggleDark }
}
