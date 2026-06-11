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
import Footer from './components/Footer'

export default function App() {
  return (
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
      </main>
      <Footer />
    </div>
  )
}
