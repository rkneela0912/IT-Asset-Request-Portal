import { useState } from 'react'
import StatusBadge from '../components/StatusBadge'
import './StatusTracker.css'

type Status = 'pending' | 'approved' | 'rejected' | 'fulfilled'

interface Request {
  id: string
  asset: string
  category: string
  quantity: number
  submitted: string
  status: Status
  updatedAt: string
  note?: string
}

const mockRequests: Request[] = [
  {
    id: 'REQ-2026-4821',
    asset: 'MacBook Pro 14"',
    category: 'Laptop',
    quantity: 1,
    submitted: '2026-02-20',
    status: 'approved',
    updatedAt: '2026-02-21',
    note: 'Approved. Will be delivered within 2 business days.',
  },
  {
    id: 'REQ-2026-3197',
    asset: 'Dell UltraSharp 27" Monitor',
    category: 'Monitor',
    quantity: 2,
    submitted: '2026-02-18',
    status: 'fulfilled',
    updatedAt: '2026-02-22',
    note: 'Delivered to HQ Tower, Floor 3.',
  },
  {
    id: 'REQ-2026-7543',
    asset: 'Microsoft 365 Business',
    category: 'Software',
    quantity: 3,
    submitted: '2026-02-24',
    status: 'pending',
    updatedAt: '2026-02-24',
  },
  {
    id: 'REQ-2026-2019',
    asset: 'Logitech MX Master 3',
    category: 'Peripheral',
    quantity: 1,
    submitted: '2026-02-15',
    status: 'rejected',
    updatedAt: '2026-02-16',
    note: 'Rejected: Please resubmit with manager approval signature.',
  },
  {
    id: 'REQ-2026-0882',
    asset: 'Docking Station',
    category: 'Peripheral',
    quantity: 1,
    submitted: '2026-02-10',
    status: 'fulfilled',
    updatedAt: '2026-02-13',
  },
]

const statusFilters: { value: 'all' | Status; label: string }[] = [
  { value: 'all',       label: 'All Requests' },
  { value: 'pending',   label: 'Pending'      },
  { value: 'approved',  label: 'Approved'     },
  { value: 'fulfilled', label: 'Fulfilled'    },
  { value: 'rejected',  label: 'Rejected'     },
]

export default function StatusTracker() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | Status>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = mockRequests.filter(r => {
    const matchesSearch =
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.asset.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="status-page">
      <div className="container">
        <header className="page-header">
          <h1 className="page-title">My Requests</h1>
          <p className="page-subtitle">Track the status of your submitted IT asset requests.</p>
        </header>

        {/* Search + filter bar */}
        <div className="tracker-controls">
          <div className="search-wrap">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="10" y1="10" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type="search"
              className="form-input tracker-search"
              placeholder="Search by Request ID, asset, or category..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search requests"
            />
          </div>
          <div className="status-filter-group" role="group" aria-label="Filter by status">
            {statusFilters.map(f => (
              <button
                key={f.value}
                className={`status-filter-btn${statusFilter === f.value ? ' status-filter-btn--active' : ''}`}
                onClick={() => setStatusFilter(f.value)}
                aria-pressed={statusFilter === f.value}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="empty-state card" role="status">
            <span className="empty-icon" aria-hidden="true">📋</span>
            <p className="empty-text">No requests match your search.</p>
          </div>
        ) : (
          <div className="tracker-table-wrap card">
            <table className="data-table" aria-label="My IT asset requests">
              <thead>
                <tr>
                  <th scope="col">Request ID</th>
                  <th scope="col">Asset</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Submitted</th>
                  <th scope="col">Status</th>
                  <th scope="col">Last Updated</th>
                  <th scope="col"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <>
                    <tr key={r.id} className="animate-in">
                      <td>
                        <span className="mono request-id">{r.id}</span>
                      </td>
                      <td>
                        <div className="asset-cell">
                          <span className="asset-cell-name">{r.asset}</span>
                          <span className="asset-cell-cat">{r.category}</span>
                        </div>
                      </td>
                      <td>
                        <span className="mono">{r.quantity}</span>
                      </td>
                      <td>
                        <span className="mono date-cell">{r.submitted}</span>
                      </td>
                      <td>
                        <StatusBadge status={r.status} />
                      </td>
                      <td>
                        <span className="mono date-cell">{r.updatedAt}</span>
                      </td>
                      <td>
                        {r.note && (
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}
                            aria-expanded={expandedId === r.id}
                            aria-controls={`note-${r.id}`}
                          >
                            {expandedId === r.id ? 'Hide' : 'Details'}
                          </button>
                        )}
                      </td>
                    </tr>
                    {expandedId === r.id && r.note && (
                      <tr key={`${r.id}-note`} id={`note-${r.id}`} className="note-row">
                        <td colSpan={7}>
                          <div className={`note-content note-content--${r.status}`}>
                            <span className="note-label">IT Note:</span>
                            {r.note}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="results-count" aria-live="polite">
          Showing <span className="mono">{filtered.length}</span> of <span className="mono">{mockRequests.length}</span> requests
        </p>
      </div>
    </div>
  )
}
