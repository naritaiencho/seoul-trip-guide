import Aurora from './components/Aurora'
import Nav from './components/Nav'
import Hero from './components/Hero'
import TripOverview from './components/TripOverview'
import Areas from './components/Areas'
import SisterPicks from './components/SisterPicks'
import Gourmet from './components/Gourmet'
import Spots from './components/Spots'
import Hotels from './components/Hotels'
import Plans from './components/Plans'
import Tips from './components/Tips'
import Shiori from './components/Shiori'
import FloatingShiori from './components/FloatingShiori'
import Footer from './components/Footer'
import { TripProvider } from './store/TripStore'

export default function App() {
  return (
    <TripProvider>
      <div className="relative">
        <Aurora />
        <Nav />
        <Hero />
        <main>
          <TripOverview />
          <Areas />
          <SisterPicks />
          <Gourmet />
          <Spots />
          <Hotels />
          <Plans />
          <Tips />
          <Shiori />
        </main>
        <FloatingShiori />
        <Footer />
      </div>
    </TripProvider>
  )
}
