import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PortfolioProvider } from '@/context/PortfolioContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Home from '@/pages/Home'
import Skeleton from '@/pages/Skeleton'
import Presentation from '@/pages/Presentation'

export default function App() {
  return (
    <BrowserRouter>
      <PortfolioProvider>
        <Routes>
          <Route path="/" element={<><Header /><Home /><Footer /></>} />
          <Route path="/skeleton" element={<Skeleton />} />
          <Route path="/presentation" element={<Presentation />} />
        </Routes>
      </PortfolioProvider>
    </BrowserRouter>
  )
}
