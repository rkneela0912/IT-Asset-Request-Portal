import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import RequestForm from './pages/RequestForm'
import StatusTracker from './pages/StatusTracker'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/"        element={<Home />}           />
        <Route path="/catalog" element={<Catalog />}        />
        <Route path="/request" element={<RequestForm />}    />
        <Route path="/status"  element={<StatusTracker />}  />
        <Route path="/admin"   element={<AdminDashboard />} />
      </Routes>
    </Layout>
  )
}
