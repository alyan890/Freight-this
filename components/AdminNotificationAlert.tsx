'use client'

import { useEffect, useState } from 'react'

export default function AdminNotificationAlert() {
  const [totalNotifications, setTotalNotifications] = useState(0)

  useEffect(() => {
    let isMounted = true

    const fetchCounts = async () => {
      try {
        const res = await fetch('/api/admin/counts')
        if (!res.ok) return

        const data = await res.json()
        const total = (data.jobs || 0)

        if (!isMounted) return
        setTotalNotifications(total)

        // Mark all as viewed so next visit starts fresh
        await fetch('/api/admin/counts', { method: 'POST', body: JSON.stringify({ type: 'jobs' }) })

        if (total > 0) {
          playNotificationSound()
        }
      } catch (error) {
        console.error('Failed to fetch admin counts', error)
      }
    }

    fetchCounts()

    return () => {
      isMounted = false
    }
  }, [])

  const playNotificationSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const now = audioContext.currentTime

      // Create oscillators for a pleasant chime sound
      const osc1 = audioContext.createOscillator()
      const osc2 = audioContext.createOscillator()
      const gain = audioContext.createGain()

      // Set frequencies for a pleasant chime (C and E notes)
      osc1.frequency.value = 523.25 // C5
      osc2.frequency.value = 659.25 // E5

      // Set waveform
      osc1.type = 'sine'
      osc2.type = 'sine'

      // Connect to gain
      osc1.connect(gain)
      osc2.connect(gain)
      gain.connect(audioContext.destination)

      // Set volume
      gain.gain.setValueAtTime(0.3, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5)

      // Play the sound
      osc1.start(now)
      osc2.start(now)
      osc1.stop(now + 0.5)
      osc2.stop(now + 0.5)
    } catch (error) {
      console.error('Error playing notification sound:', error)
    }
  }

  if (totalNotifications === 0) return null

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-lg p-4 flex items-center gap-3 shadow-md">
      <div className="flex-shrink-0">
        <svg className="w-6 h-6 text-amber-600 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a6 6 0 100 12 6 6 0 000-12zM9 9a1 1 0 112 0 1 1 0 01-2 0z"></path>
        </svg>
      </div>
      <div>
        <h3 className="font-semibold text-amber-900">New Notifications</h3>
        <p className="text-sm text-amber-800">
          You have <span className="font-bold text-lg text-amber-700">{totalNotifications}</span> pending item{totalNotifications !== 1 ? 's' : ''} waiting for review
        </p>
      </div>
    </div>
  )
}
