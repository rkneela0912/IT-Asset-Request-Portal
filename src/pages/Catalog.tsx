import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Catalog.css'

type Category = 'all' | 'laptops' | 'monitors' | 'peripherals' | 'software'

interface Asset {
  id: string
  name: string
  category: Exclude<Category, 'all'>
  description: string
  specs: string
  imageId: string
  available: boolean
}

const assets: Asset[] = [
  {
    id: 'LAP-001',
    name: 'MacBook Pro 14"',
    category: 'laptops',
    description: 'Apple M4 Pro chip, 24GB RAM, 512GB SSD. Ideal for engineering and design teams.',
    specs: 'M4 Pro · 24GB · 512GB',
    imageId: 'EJMTKCZ00I0',
    available: true,
  },
  {
    id: 'LAP-002',
    name: 'Dell XPS 15',
    category: 'laptops',
    description: 'Intel Core i9, 32GB RAM, 1TB SSD. Windows flagship for power users.',
    specs: 'Core i9 · 32GB · 1TB',
    imageId: '_sGlFU5kvNE',
    available: true,
  },
  {
    id: 'LAP-003',
    name: 'ThinkPad X1 Carbon',
    category: 'laptops',
    description: 'Ultra-lightweight business laptop. 16GB RAM, 512GB SSD, LTE ready.',
    specs: 'Core i7 · 16GB · 512GB',
    imageId: 'DdiwOzeqkDU',
    available: true,
  },
  {
    id: 'MON-001',
    name: 'Dell UltraSharp 27"',
    category: 'monitors',
    description: '4K IPS display with USB-C hub. Perfect for detail-oriented work.',
    specs: '27" 4K IPS · USB-C 90W',
    imageId: 'XWPoEJnLQAc',
    available: true,
  },
  {
    id: 'MON-002',
    name: 'LG 34" UltraWide',
    category: 'monitors',
    description: 'Curved ultrawide display for multitasking and creative workflows.',
    specs: '34" 3440×1440 · 100Hz',
    imageId: 'rjXukZYsO_0',
    available: true,
  },
  {
    id: 'MON-003',
    name: 'Samsung 32" 4K',
    category: 'monitors',
    description: 'High-brightness 4K VA panel. Excellent for data analysis and spreadsheets.',
    specs: '32" 4K VA · HDR600',
    imageId: 'gyRa86ExKTw',
    available: false,
  },
  {
    id: 'PER-001',
    name: 'Logitech MX Keys',
    category: 'peripherals',
    description: 'Wireless keyboard with backlit keys and multi-device pairing.',
    specs: 'Wireless · Backlit · Multi-device',
    imageId: '2PLFgAKVpe0',
    available: true,
  },
  {
    id: 'PER-002',
    name: 'Logitech MX Master 3',
    category: 'peripherals',
    description: 'Advanced wireless mouse with ergonomic design and MagSpeed scroll.',
    specs: 'Wireless · 8000 DPI · USB-C',
    imageId: 'MPqxFO94AKU',
    available: true,
  },
  {
    id: 'SOF-001',
    name: 'Microsoft 365 Business',
    category: 'software',
    description: 'Full Office suite with 1TB OneDrive, Teams, and enterprise security.',
    specs: 'Annual license · Cloud + Desktop',
    imageId: 'ieDXimQcLeM',
    available: true,
  },
  {
    id: 'SOF-002',
    name: 'Adobe Creative Cloud',
    category: 'software',
    description: 'All-apps subscription: Photoshop, Illustrator, Premiere, and 20+ more.',
    specs: 'Annual license · All apps',
    imageId: 'KuMvKpNwh4k',
    available: true,
  },
]

const categories: { value: Category; label: string }[] = [
  { value: 'all',        label: 'All Assets' },
  { value: 'laptops',    label: 'Laptops'    },
  { value: 'monitors',   label: 'Monitors'   },
  { value: 'peripherals',label: 'Peripherals'},
  { value: 'software',   label: 'Software'   },
]

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const navigate = useNavigate()

  const filtered = assets.filter(a =>
    activeCategory === 'all' || a.category === activeCategory
  )

  function handleRequest(assetId: string, assetName: string) {
    navigate(`/request?assetId=${encodeURIComponent(assetId)}&assetName=${encodeURIComponent(assetName)}`)
  }

  return (
    <div className="catalog-page">
      <div className="container">
        <header className="page-header">
          <h1 className="page-title">Asset Catalog</h1>
          <p className="page-subtitle">Browse and request from our inventory of approved IT assets.</p>
        </header>

        {/* Category filter */}
        <nav className="catalog-filters" aria-label="Filter by category" role="tablist">
          {categories.map(cat => (
            <button
              key={cat.value}
              role="tab"
              aria-selected={activeCategory === cat.value}
              className={`catalog-filter-btn${activeCategory === cat.value ? ' catalog-filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat.value)}
            >
              {cat.label}
              {cat.value !== 'all' && (
                <span className="filter-count">
                  {assets.filter(a => a.category === cat.value).length}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Asset grid */}
        <div className="assets-grid" role="list">
          {filtered.map((asset, i) => (
            <article
              key={asset.id}
              className="asset-card card animate-in"
              style={{ animationDelay: `${i * 0.06}s` }}
              role="listitem"
            >
              <div className="asset-img-wrap">
                <img
                  src={`https://images.unsplash.com/photo-${asset.imageId}?w=480&h=260&fit=crop`}
                  alt={asset.name}
                  className="asset-img"
                  loading="lazy"
                />
                {!asset.available && (
                  <span className="asset-unavailable-tag" aria-label="Currently unavailable">
                    Out of stock
                  </span>
                )}
              </div>
              <div className="asset-body">
                <div className="asset-meta">
                  <span className="asset-id mono">{asset.id}</span>
                  <span className="badge badge-primary">{asset.category}</span>
                </div>
                <h2 className="asset-name">{asset.name}</h2>
                <p className="asset-specs mono">{asset.specs}</p>
                <p className="asset-desc">{asset.description}</p>
                <button
                  className="btn btn-primary btn-sm asset-request-btn"
                  onClick={() => handleRequest(asset.id, asset.name)}
                  disabled={!asset.available}
                  aria-label={`Request ${asset.name}`}
                >
                  {asset.available ? 'Request This' : 'Unavailable'}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
