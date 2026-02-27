import { useEffect } from 'react'
import './NotificationBanner.css'

type BannerType = 'success' | 'error' | 'info' | 'warning'

interface NotificationBannerProps {
  type: BannerType
  message: string
  onDismiss?: () => void
  autoDismissMs?: number
}

const icons: Record<BannerType, string> = {
  success: '✓',
  error:   '✕',
  info:    'ℹ',
  warning: '⚠',
}

export default function NotificationBanner({
  type,
  message,
  onDismiss,
  autoDismissMs,
}: NotificationBannerProps) {
  useEffect(() => {
    if (autoDismissMs && onDismiss) {
      const t = setTimeout(onDismiss, autoDismissMs)
      return () => clearTimeout(t)
    }
  }, [autoDismissMs, onDismiss])

  return (
    <div
      className={`notification-banner notification-banner--${type}`}
      role="alert"
      aria-live="polite"
    >
      <span className="notification-icon" aria-hidden="true">{icons[type]}</span>
      <span className="notification-message">{message}</span>
      {onDismiss && (
        <button
          className="notification-dismiss"
          onClick={onDismiss}
          aria-label="Dismiss notification"
        >
          ×
        </button>
      )}
    </div>
  )
}
