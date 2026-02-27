import { useState } from 'react'
import StatusBadge from '../components/StatusBadge'
import NotificationBanner from '../components/NotificationBanner'
import './AdminDashboard.css'

type Status = 'pending' | 'approved' | 'rejected' | 'fulfilled'

interface AdminRequest {
  id: string
  employee: string
  department: string
  asset: string
  quantity: number
  urgency: 'low' | 'medium' | 'high'
  submitted: string
  status: Status
}

const initialRequests: AdminRequest[] = [
  { id: 'REQ-2026-7543', employee: 'Sarah Chen',     department: 'Engineering',   asset: 'Microsoft 365 Business',  quantity: 3, urgency: 'medium', submitted: '2026-02-24', status: 'pending'   },
  { id: 'REQ-2026-9821', employee: 'Marcus Webb',     department: 'Design',        asset: 'MacBook Pro 14"',         quantity: 1, urgency: 'high',   submitted: '2026-02-23', status: 'pending'   },
  { id: 'REQ-2026-6614', employee: 'Priya Sharma',   department: 'Marketing',     asset: 'LG UltraWide 34"',        quantity: 1, urgency: 'low',    submitted: '2026-02-22', status: 'pending'   },
  { id: 'REQ-2026-5502', employee: 'Tom Rodriguez',  department: 'Finance',       asset: 'Logitech MX Keys',        quantity: 2, urgency: 'medium', submitted: '2026-02-21', status: 'pending'   },
  { id: 'REQ-2026-4821', employee: 'Neela Ranjith',  department: 'Engineering',   asset: 'MacBook Pro 14"',         quantity: 1, urgency: 'medium', submitted: '2026-02-20', status: 'approved'  },
  { id: 'REQ-2026-3197', employee: 'Lisa Park',      department: 'Operations',    asset: 'Dell UltraSharp 27"',     quantity: 2, urgency: 'low',    submitted: '2026-02-18', status: 'fulfilled' },
  { id: 'REQ-2026-2019', employee: 'James Walker',   department: 'Sales',         asset: 'Logitech MX Master 3',   quantity: 1, urgency: 'low',    submitted: '2026-02-15', status: 'rejected'  },
]

const categoryData = [
  { label: 'Laptops',     value: 38, color: 'var(--color-primary)' },
  { label: 'Monitors',    value: 27, color: '#0284c7'              },
  { label: 'Peripherals', value: 21, color: 'var(--color-success)' },
  { label: 'Software',    value: 14, color: 'var(--color-warning)' },
]

export default function AdminDashboard() {
  const [requests, setRequests] = useState<AdminRequest[]>(initialRequests)
  const [banner, setBanner] = useState<{ type: 'success' | 'info'; message: string } | null>(null)

  const pending   = requests.filter(r => r.status === 'pending').length
  const approved  = requests.filter(r => r.status === 'approved').length
  const fulfilled = requests.filter(r => r.status === 'fulfilled').length
  const total     = requests.length

  function changeStatus(id: string, status: Status) {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r))
    const actionLabel = status === 'approved' ? 'approved' : 'rejected'
    setBanner({ type: status === 'approved' ? 'success' : 'info', message: `Request ${id} has been ${actionLabel}.` })
  }

  const urgencyColor: Record<'low' | 'medium' | 'high', string> = {
    low:    'var(--color-success)',
    medium: 'var(--color-warning)',
    high:   'var(--color-danger)',
  }

  return (
    <div className="admin-page">
      <div className="container">
        <header className="page-header admin-page-header">
          <div>
            <h1 className="page-title">IT Admin Dashboard</h1>
            <p className="page-subtitle">Review and action incoming asset requests.</p>
          </div>
          <span className="admin-badge">Admin View</span>
        </header>

        {banner && (
          <NotificationBanner
            type={banner.type}
            message={banner.message}
            onDismiss={() => setBanner(null)}
            autoDismissMs={5000}
          />
        )}

        {/* Metric cards */}
        <div className="metric-grid">
          <div className="metric-card card animate-in">
            <div className="metric-label">Total Requests</div>
            <div className="metric-value mono">{total}</div>
            <div className="metric-sub">all time</div>
            <div className="metric-accent metric-accent--blue" aria-hidden="true" />
          </div>
          <div className="metric-card card animate-in">
            <div className="metric-label">Pending Approval</div>
            <div className="metric-value mono">{pending}</div>
            <div className="metric-sub">awaiting action</div>
            <div className="metric-accent metric-accent--amber" aria-hidden="true" />
          </div>
          <div className="metric-card card animate-in">
            <div className="metric-label">Approved</div>
            <div className="metric-value mono">{approved + fulfilled}</div>
            <div className="metric-sub">approved or fulfilled</div>
            <div className="metric-accent metric-accent--green" aria-hidden="true" />
          </div>
          <div className="metric-card card animate-in">
            <div className="metric-label">Avg. Fulfillment</div>
            <div className="metric-value mono">2.4d</div>
            <div className="metric-sub">business days</div>
            <div className="metric-accent metric-accent--blue" aria-hidden="true" />
          </div>
        </div>

        <div className="admin-main-grid">
          {/* Approval queue */}
          <section className="approval-section" aria-labelledby="queue-heading">
            <h2 id="queue-heading" className="section-title">Approval Queue</h2>
            <div className="tracker-table-wrap card">
              <table className="data-table" aria-label="Pending approval requests">
                <thead>
                  <tr>
                    <th scope="col">Request ID</th>
                    <th scope="col">Employee</th>
                    <th scope="col">Asset</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Urgency</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((r, i) => (
                    <tr
                      key={r.id}
                      className="animate-in"
                      style={{ animationDelay: `${i * 0.04}s` }}
                    >
                      <td><span className="mono request-id">{r.id}</span></td>
                      <td>
                        <div className="employee-cell">
                          <span className="employee-name">{r.employee}</span>
                          <span className="employee-dept">{r.department}</span>
                        </div>
                      </td>
                      <td>
                        <span className="asset-label">{r.asset}</span>
                        <br />
                        <span className="mono date-cell">{r.submitted}</span>
                      </td>
                      <td><span className="mono">{r.quantity}</span></td>
                      <td>
                        <span
                          className="urgency-dot"
                          style={{ color: urgencyColor[r.urgency] }}
                          aria-label={`Urgency: ${r.urgency}`}
                        >
                          ● {r.urgency}
                        </span>
                      </td>
                      <td><StatusBadge status={r.status} /></td>
                      <td>
                        {r.status === 'pending' ? (
                          <div className="action-btns">
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() => changeStatus(r.id, 'approved')}
                              aria-label={`Approve request ${r.id}`}
                            >
                              Approve
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => changeStatus(r.id, 'rejected')}
                              aria-label={`Reject request ${r.id}`}
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="action-done">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Category breakdown */}
          <section className="breakdown-section" aria-labelledby="breakdown-heading">
            <h2 id="breakdown-heading" className="section-title">Requests by Category</h2>
            <div className="breakdown-card card">
              <div className="bar-chart" aria-label="Bar chart of requests by category">
                {categoryData.map(item => (
                  <div key={item.label} className="bar-row">
                    <span className="bar-label">{item.label}</span>
                    <div className="bar-track" role="meter" aria-valuenow={item.value} aria-valuemin={0} aria-valuemax={100} aria-label={`${item.label}: ${item.value}%`}>
                      <div
                        className="bar-fill"
                        style={{ width: `${item.value}%`, background: item.color }}
                      />
                    </div>
                    <span className="bar-value mono">{item.value}%</span>
                  </div>
                ))}
              </div>

              <hr className="divider" />

              <div className="summary-stats">
                <div className="summary-item">
                  <span className="summary-label">Pending review</span>
                  <span className="summary-value mono badge badge-pending">{pending}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Actioned today</span>
                  <span className="summary-value mono badge badge-approved">3</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Rejected this month</span>
                  <span className="summary-value mono badge badge-rejected">2</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
