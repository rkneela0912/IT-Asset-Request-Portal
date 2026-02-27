import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import NotificationBanner from '../components/NotificationBanner'
import './RequestForm.css'

type Step = 1 | 2 | 3

interface FormData {
  assetType: string
  assetName: string
  quantity: string
  urgency: string
  justification: string
  deliveryBuilding: string
  deliveryFloor: string
  additionalNotes: string
}

const assetTypes = [
  { value: 'laptop',     label: 'Laptop'           },
  { value: 'monitor',    label: 'Monitor'           },
  { value: 'keyboard',   label: 'Keyboard'          },
  { value: 'mouse',      label: 'Mouse'             },
  { value: 'headset',    label: 'Headset'           },
  { value: 'webcam',     label: 'Webcam'            },
  { value: 'docking',    label: 'Docking Station'   },
  { value: 'software',   label: 'Software License'  },
  { value: 'other',      label: 'Other'             },
]

const urgencyLevels = [
  { value: 'low',      label: 'Low — within 2 weeks'  },
  { value: 'medium',   label: 'Medium — within 5 days' },
  { value: 'high',     label: 'High — within 24 hours' },
]

function generateRequestId() {
  return `REQ-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`
}

export default function RequestForm() {
  const [searchParams] = useSearchParams()

  const [step, setStep] = useState<Step>(1)
  const [submitted, setSubmitted] = useState(false)
  const [requestId] = useState(generateRequestId)
  const [showBanner, setShowBanner] = useState(false)

  const [form, setForm] = useState<FormData>({
    assetType:        searchParams.get('assetId')?.startsWith('LAP') ? 'laptop'
                    : searchParams.get('assetId')?.startsWith('MON') ? 'monitor'
                    : searchParams.get('assetId')?.startsWith('SOF') ? 'software'
                    : '',
    assetName:        searchParams.get('assetName') || '',
    quantity:         '1',
    urgency:          'medium',
    justification:    '',
    deliveryBuilding: '',
    deliveryFloor:    '',
    additionalNotes:  '',
  })

  const [errors, setErrors] = useState<Partial<FormData>>({})

  function update(field: keyof FormData, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  function validateStep1(): boolean {
    const e: Partial<FormData> = {}
    if (!form.assetType) e.assetType = 'Please select an asset type.'
    if (!form.quantity || parseInt(form.quantity) < 1) e.quantity = 'Quantity must be at least 1.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function validateStep2(): boolean {
    const e: Partial<FormData> = {}
    if (!form.justification.trim() || form.justification.trim().length < 20)
      e.justification = 'Please provide at least 20 characters of justification.'
    if (!form.deliveryBuilding.trim()) e.deliveryBuilding = 'Building is required.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function nextStep() {
    if (step === 1 && validateStep1()) setStep(2)
    else if (step === 2 && validateStep2()) setStep(3)
  }

  function submit() {
    setSubmitted(true)
    setShowBanner(true)
  }

  if (submitted) {
    return (
      <div className="request-page">
        <div className="container request-container">
          {showBanner && (
            <NotificationBanner
              type="success"
              message={`Request ${requestId} submitted successfully! You'll receive a confirmation email shortly.`}
              onDismiss={() => setShowBanner(false)}
              autoDismissMs={8000}
            />
          )}
          <div className="submission-success card">
            <div className="success-icon" aria-hidden="true">✓</div>
            <h1 className="success-title">Request Submitted</h1>
            <p className="success-body">
              Your request has been received and is pending IT approval.
            </p>
            <div className="success-detail">
              <div className="success-row">
                <span className="success-label">Request ID</span>
                <span className="success-value mono">{requestId}</span>
              </div>
              <div className="success-row">
                <span className="success-label">Asset</span>
                <span className="success-value">{form.assetName || form.assetType}</span>
              </div>
              <div className="success-row">
                <span className="success-label">Quantity</span>
                <span className="success-value mono">{form.quantity}</span>
              </div>
              <div className="success-row">
                <span className="success-label">Urgency</span>
                <span className="success-value">{urgencyLevels.find(u => u.value === form.urgency)?.label}</span>
              </div>
              <div className="success-row">
                <span className="success-label">Status</span>
                <span className="badge badge-pending">Pending</span>
              </div>
            </div>
            <div className="success-actions">
              <a href="/status" className="btn btn-primary">Track This Request</a>
              <a href="/request" className="btn btn-secondary" onClick={() => window.location.reload()}>
                Submit Another
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="request-page">
      <div className="container request-container">
        <header className="page-header">
          <h1 className="page-title">Submit Asset Request</h1>
          <p className="page-subtitle">Complete all steps to submit your IT asset request for approval.</p>
        </header>

        {/* Step indicator */}
        <div className="step-indicator" aria-label="Form progress">
          {([1, 2, 3] as Step[]).map(s => (
            <div key={s} className="step-item">
              <div
                className={`step-circle${step === s ? ' step-circle--active' : step > s ? ' step-circle--done' : ''}`}
                aria-current={step === s ? 'step' : undefined}
              >
                {step > s ? '✓' : s}
              </div>
              <span className={`step-label${step === s ? ' step-label--active' : ''}`}>
                {s === 1 ? 'Asset Details' : s === 2 ? 'Justification' : 'Review'}
              </span>
              {s < 3 && <div className={`step-connector${step > s ? ' step-connector--done' : ''}`} aria-hidden="true" />}
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="request-form-card card">
          {/* Step 1 */}
          {step === 1 && (
            <fieldset className="form-step animate-in" aria-label="Step 1: Asset Details">
              <legend className="step-heading">Asset Details</legend>
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label" htmlFor="assetType">
                    Asset Type <span aria-hidden="true" className="required-star">*</span>
                  </label>
                  <select
                    id="assetType"
                    className="form-select"
                    value={form.assetType}
                    onChange={e => update('assetType', e.target.value)}
                    aria-required="true"
                    aria-invalid={!!errors.assetType}
                    aria-describedby={errors.assetType ? 'assetType-error' : undefined}
                  >
                    <option value="">Select an asset type...</option>
                    {assetTypes.map(a => (
                      <option key={a.value} value={a.value}>{a.label}</option>
                    ))}
                  </select>
                  {errors.assetType && <span id="assetType-error" className="field-error" role="alert">{errors.assetType}</span>}
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="assetName">
                    Specific Model / Name <span className="optional-tag">(optional)</span>
                  </label>
                  <input
                    id="assetName"
                    type="text"
                    className="form-input"
                    placeholder="e.g. MacBook Pro 14"
                    value={form.assetName}
                    onChange={e => update('assetName', e.target.value)}
                  />
                </div>

                <div className="form-field form-field--short">
                  <label className="form-label" htmlFor="quantity">
                    Quantity <span aria-hidden="true" className="required-star">*</span>
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    max="99"
                    className="form-input"
                    value={form.quantity}
                    onChange={e => update('quantity', e.target.value)}
                    aria-required="true"
                    aria-invalid={!!errors.quantity}
                    aria-describedby={errors.quantity ? 'quantity-error' : undefined}
                  />
                  {errors.quantity && <span id="quantity-error" className="field-error" role="alert">{errors.quantity}</span>}
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="urgency">Urgency Level</label>
                  <select
                    id="urgency"
                    className="form-select"
                    value={form.urgency}
                    onChange={e => update('urgency', e.target.value)}
                  >
                    {urgencyLevels.map(u => (
                      <option key={u.value} value={u.value}>{u.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </fieldset>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <fieldset className="form-step animate-in" aria-label="Step 2: Justification & Delivery">
              <legend className="step-heading">Justification &amp; Delivery</legend>
              <div className="form-grid">
                <div className="form-field form-field--full">
                  <label className="form-label" htmlFor="justification">
                    Business Justification <span aria-hidden="true" className="required-star">*</span>
                  </label>
                  <textarea
                    id="justification"
                    className="form-textarea"
                    placeholder="Explain why this asset is needed for your work. Include project context, team impact, or productivity reasons (min. 20 characters)."
                    value={form.justification}
                    onChange={e => update('justification', e.target.value)}
                    aria-required="true"
                    aria-invalid={!!errors.justification}
                    aria-describedby={errors.justification ? 'just-error' : 'just-hint'}
                  />
                  <span id="just-hint" className="field-hint">{form.justification.length} characters</span>
                  {errors.justification && <span id="just-error" className="field-error" role="alert">{errors.justification}</span>}
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="deliveryBuilding">
                    Delivery Building <span aria-hidden="true" className="required-star">*</span>
                  </label>
                  <input
                    id="deliveryBuilding"
                    type="text"
                    className="form-input"
                    placeholder="e.g. HQ Tower, Building B"
                    value={form.deliveryBuilding}
                    onChange={e => update('deliveryBuilding', e.target.value)}
                    aria-required="true"
                    aria-invalid={!!errors.deliveryBuilding}
                    aria-describedby={errors.deliveryBuilding ? 'building-error' : undefined}
                  />
                  {errors.deliveryBuilding && <span id="building-error" className="field-error" role="alert">{errors.deliveryBuilding}</span>}
                </div>

                <div className="form-field form-field--short">
                  <label className="form-label" htmlFor="deliveryFloor">Floor / Desk</label>
                  <input
                    id="deliveryFloor"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Floor 3, Desk 12"
                    value={form.deliveryFloor}
                    onChange={e => update('deliveryFloor', e.target.value)}
                  />
                </div>

                <div className="form-field form-field--full">
                  <label className="form-label" htmlFor="additionalNotes">Additional Notes</label>
                  <textarea
                    id="additionalNotes"
                    className="form-textarea"
                    style={{ minHeight: '80px' }}
                    placeholder="Any special configurations, accessories, or timing constraints..."
                    value={form.additionalNotes}
                    onChange={e => update('additionalNotes', e.target.value)}
                  />
                </div>
              </div>
            </fieldset>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="form-step animate-in" aria-label="Step 3: Review and Submit">
              <h2 className="step-heading">Review Your Request</h2>
              <p className="step-desc">Please confirm the details below before submitting.</p>
              <div className="review-grid">
                <div className="review-section">
                  <h3 className="review-section-title">Asset Details</h3>
                  <dl className="review-list">
                    <div className="review-row">
                      <dt>Asset Type</dt>
                      <dd>{assetTypes.find(a => a.value === form.assetType)?.label}</dd>
                    </div>
                    {form.assetName && (
                      <div className="review-row">
                        <dt>Model</dt>
                        <dd>{form.assetName}</dd>
                      </div>
                    )}
                    <div className="review-row">
                      <dt>Quantity</dt>
                      <dd className="mono">{form.quantity}</dd>
                    </div>
                    <div className="review-row">
                      <dt>Urgency</dt>
                      <dd>{urgencyLevels.find(u => u.value === form.urgency)?.label}</dd>
                    </div>
                  </dl>
                </div>
                <div className="review-section">
                  <h3 className="review-section-title">Delivery</h3>
                  <dl className="review-list">
                    <div className="review-row">
                      <dt>Building</dt>
                      <dd>{form.deliveryBuilding}</dd>
                    </div>
                    {form.deliveryFloor && (
                      <div className="review-row">
                        <dt>Floor / Desk</dt>
                        <dd>{form.deliveryFloor}</dd>
                      </div>
                    )}
                  </dl>
                </div>
                <div className="review-section review-section--full">
                  <h3 className="review-section-title">Justification</h3>
                  <p className="review-justification">{form.justification}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="form-actions">
            {step > 1 && (
              <button
                className="btn btn-secondary"
                onClick={() => setStep(prev => (prev - 1) as Step)}
              >
                Back
              </button>
            )}
            <div className="form-actions-right">
              {step < 3 ? (
                <button className="btn btn-primary" onClick={nextStep}>
                  Continue
                </button>
              ) : (
                <button className="btn btn-primary" onClick={submit}>
                  Submit Request
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
