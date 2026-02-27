type Status = 'pending' | 'approved' | 'rejected' | 'fulfilled'

interface StatusBadgeProps {
  status: Status
}

const labels: Record<Status, string> = {
  pending:   'Pending',
  approved:  'Approved',
  rejected:  'Rejected',
  fulfilled: 'Fulfilled',
}

const dots: Record<Status, string> = {
  pending:   '●',
  approved:  '●',
  rejected:  '●',
  fulfilled: '●',
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`badge badge-${status}`} aria-label={`Status: ${labels[status]}`}>
      <span aria-hidden="true">{dots[status]}</span>
      {labels[status]}
    </span>
  )
}
