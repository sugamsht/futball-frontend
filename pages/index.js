import Head from 'next/head'
import Fixtures from '../components/Fixtures'
import Footer from '../components/Footer'
import Gallery from '../components/Gallery'
import League from '../components/League'
import Menu from '../components/Menu'
import PointsTable from '../components/PointsTable'
import Results from '../components/Results'
import Stories from '../components/Stories'

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
      <main>
        < Results />
        <Stories />
        <div className='grid grid-cols-6 gap-2'>
          <Gallery />
          <PointsTable />
        </div>
        <League />
        <Fixtures />
      </main>
      <Footer />
    </div>
  )
}
