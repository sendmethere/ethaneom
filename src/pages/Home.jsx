import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Awards from '@/components/sections/Awards'
import Research from '@/components/sections/Research'
import Training from '@/components/sections/Training'
import Activities from '@/components/sections/Activities'
import Skills from '@/components/sections/Skills'
import Content from '@/components/sections/Content'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Awards />
      <Research />
      <Training />
      <Activities />
      <Skills />
      <Content />
    </main>
  )
}
