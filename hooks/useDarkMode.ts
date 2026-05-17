import { useState, useEffect } from 'react'

export function useDarkMode() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Tickk now defaults to the SHRP-style dark theme across the app.
    const shouldBeDark = true
    
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
