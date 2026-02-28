# IT Asset Request Portal

A modern enterprise web application for managing IT asset requests — built with **React 19 + TypeScript**, deployed on **Microsoft Power Pages**, and developed with **Claude Code** (Anthropic) as an AI development partner.

> Built by [EPMPoint, Inc.](https://epmpoint.com) · Read the full build story on the EPMPoint blog.

---

## Overview

Most organisations manage IT asset requests through a mix of emails, spreadsheets, and verbal approvals. This portal replaces that process with a clean, structured, self-service system where:

- **Employees** can browse available assets, submit structured requests, and track status in real time — without chasing IT.
- **IT Admins** can manage a full approval queue, action requests, and view metrics from a single dashboard.

---

## Live Demo

Deployed at: **[https://epmpoint-im.powerappsportals.com](https://epmpoint-im.powerappsportals.com)**

---

## Screenshots

### Home Page
![Home Page](appscreenshots/Home%20page%20of%20the%20IT%20Asset%20Request%20Portal%20%E2%80%94%20hero%20section%20with%20navigation%20and%20call-to-action%20buttons.png)

### Asset Catalog
![Asset Catalog](appscreenshots/Asset%20Catalog%20%E2%80%94%20category%20filter%20tabs%20and%20the%20asset%20card%20grid%20showing%20laptops%2C%20monitors%2C%20peripherals%20and%20software.png)

### Request Form
![Request Form](appscreenshots/Request%20Form%20%E2%80%94%20Step%201%20(Asset%20Details)%20and%20Step%203%20(Confirmation%20screen%20with%20generated%20Request%20ID).png)

### Status Tracker
![Status Tracker](appscreenshots/Status%20Tracker%20%E2%80%94%20request%20table%20with%20search%2C%20status%20filter%20buttons%2C%20and%20an%20expanded%20IT%20note%20row.png)

### Admin Dashboard
![Admin Dashboard](appscreenshots/Admin%20Dashboard%20%E2%80%94%20metric%20cards%2C%20approval%20queue%20table%20with%20Approve_Reject%20actions%2C%20and%20category%20bar%20chart.png)

---

## Features

- **Asset Catalog** — Responsive card grid with category filter tabs (All, Laptops, Monitors, Peripherals, Software). Out-of-stock items are clearly labelled and request buttons disabled.
- **3-Step Request Form** — Asset Details → Review → Confirmation, with client-side validation, quantity bounds, and a generated Request ID. Pre-populates asset type from catalog via URL query params.
- **Status Tracker** — Live search (by Request ID, asset name, or category), status filter buttons, and expandable IT admin notes per request.
- **Admin Dashboard** — Metric cards (total, pending, approved, avg. fulfilment time), full approval queue with inline Approve/Reject actions, and a category bar chart.
- **Accessible by default** — ARIA labels, `aria-pressed` filter states, `aria-live` form errors, `scope="col"` table headers, keyboard navigation throughout.
- **Design token system** — CSS custom properties for colour, spacing, typography, and border radii, keeping the visual language consistent with no CSS-in-JS overhead.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + TypeScript |
| Build tool | Vite 6 |
| Routing | React Router v7 |
| Styling | Plain CSS with custom properties (design tokens) |
| Hosting | Microsoft Power Pages (code site / SPA mode) |
| Deployment CLI | Power Platform CLI (PAC CLI) v1.44+ |
| AI Dev Partner | Claude Code (Anthropic) |

---

## Project Structure

```
it-asset-request-portal/
├── src/
│   ├── pages/
│   │   ├── Home.tsx / Home.css
│   │   ├── Catalog.tsx / Catalog.css
│   │   ├── RequestForm.tsx / RequestForm.css
│   │   ├── StatusTracker.tsx / StatusTracker.css
│   │   └── AdminDashboard.tsx / AdminDashboard.css
│   ├── components/
│   │   ├── Layout.tsx / Layout.css
│   │   ├── Navbar.tsx / Navbar.css
│   │   ├── Footer.tsx / Footer.css
│   │   ├── StatusBadge.tsx
│   │   └── NotificationBanner.tsx / NotificationBanner.css
│   ├── styles/
│   │   └── theme.css          # Global CSS custom properties
│   ├── App.tsx                # Router configuration (5 routes)
│   └── main.tsx
├── appscreenshots/            # UI screenshots for docs
├── dist/                      # Production build output (gitignored)
├── powerpages.config.json     # Power Pages deployment config
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm (comes with Node)

### Local Development

```bash
# 1. Clone the repo
git clone https://github.com/rkneela0912/IT-Asset-Request-Portal.git
cd IT-Asset-Request-Portal

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Production Build

```bash
npm run build
```

Output goes to `dist/` — three files: `index.html`, a CSS bundle, and a JS bundle.

---

## Deploying to Microsoft Power Pages

### Prerequisites

- A [Microsoft Power Platform](https://powerplatform.microsoft.com/) environment with Power Pages enabled
- [PAC CLI](https://aka.ms/PowerAppsCLI) v1.44 or later

```bash
# Install or upgrade PAC CLI
npm install -g @microsoft/powerplatform-cli
```

### Deployment Steps

```bash
# 1. Build the app
npm run build

# 2. Authenticate with your Power Platform environment
pac auth create --url https://<your-org>.crm.dynamics.com

# 3. (First time only) Allow .js file uploads in Dataverse
pac env update-settings --name BlockedAttachments --value ""

# 4. Upload the code site
pac pages upload-code-site --rootPath .

# 5. Activate the site (first time only)
pac pages activate-site --siteId <your-site-id>
```

> For a full walkthrough of the deployment process, see the EPMPoint blog article included in this repo (`epmpoint-blog-article.html`).

---

## Roadmap

The current portal uses mock data. Planned integrations within the Power Platform ecosystem:

- [ ] **Dataverse integration** — Connect forms and tracker to real Dataverse tables for persistent, multi-user data
- [ ] **Authentication** — Microsoft Entra ID sign-in via Power Pages identity providers; role-based access (employees vs. IT admins)
- [ ] **Notifications** — Power Automate flows triggering email / Teams messages on request approval or rejection
- [ ] **Reporting** — Historical trend data, Excel export, and Power BI embedded analytics in the admin dashboard

---

## Contributing

Contributions are welcome! Here's how to get involved:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please keep PRs focused — one feature or fix per PR. For larger changes, open an issue first to discuss the approach.

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

## Built By

**[Ranjit Neela](https://ranjithneela.com)** — Developer at EPMPoint, Inc., specialising in Microsoft Power Platform, enterprise web applications, and AI-assisted development workflows.

- Website: [ranjithneela.com](https://ranjithneela.com)
- GitHub: [@rkneela0912](https://github.com/rkneela0912)

---

## About EPMPoint

[EPMPoint, Inc.](https://epmpoint.com) helps organisations design and deliver technology-driven solutions across the Microsoft Power Platform ecosystem.

Built with Claude Code · Deployed on Microsoft Power Pages
