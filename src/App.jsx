import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PortfolioProvider } from '@/context/PortfolioContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Home from '@/pages/Home'

export default function App() {
  return (
    <BrowserRouter>
      <PortfolioProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </PortfolioProvider>
    </BrowserRouter>
  )
}
