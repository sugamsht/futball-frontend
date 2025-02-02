import Fixtures from '../components/Fixtures'
import Gallery from '../components/Gallery'
import League from '../components/League'
import LiveScore from '../components/LiveScore'
import PointsTable from '../components/PointsTable'
import Results from '../components/Results'
import Stories from '../components/Stories'

import Link from 'next/link'

async function fetchData(apiPath) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${apiPath}`);
    return await res.json();
  } catch (error) {
    console.error(`Error fetching ${apiPath} data:`, error);
    return [];
  }
}

export async function getServerSideProps() {
  try {
    const [data, liveData, tableData] = await Promise.all([
      fetchData('tournaments'),
      fetchData('scoreboard'),
      fetchData('tables'),
    ]);

    return {
      props: {
        apiData: data,
        liveData,
        tableData,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        apiData: [],
        liveData: [],
        tableData: [],
      },
    };
  }
}


export default function Home({ apiData, liveData, tableData }) {
  // Extract most recent non-empty results from all tournaments
  const recentResults = apiData.reduce((results, tournament) => {
    if (tournament.resultList) {
      // Filter out empty or undefined results
      const filteredResults = tournament.resultList.filter(result => result);
      results.push(...filteredResults.slice(0, 5));
    }
    return results;
  }, []);

  const allFixtures = apiData
    .flatMap((tournament) => tournament.fixtureList)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 21);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
      <main className='mx-2 md:mx-6 lg:mx-12 xl:mx-24 2xl:mx-36'>
        <section className='py-6'>
          <Results results={recentResults} />
        </section>

        <div className='grid grid-cols-1 md:grid-cols-7 xl:grid-cols-12 gap-4 w-full mb-8 items-stretch'>
          {/* Stories Section */}
          <div className="col-span-4 md:col-span-4 xl:col-span-8 h-full w-full">
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-6 shadow-2xl h-full">
              <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 text-2xl font-bold mb-4">
                Top Stories
              </h2>
              <div className="h-[calc(100%-3rem)] overflow-y-auto">
                <Stories />
              </div>
            </div>
          </div>

          {/* LiveScore Section */}
          <div className="col-span-3 md:col-span-3 xl:col-span-4 h-full w-full">
            <Link href="/live" passHref>
              <div className="transform transition-all hover:scale-[1.02] cursor-pointer h-full">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 shadow-2xl hover:shadow-blue-500/20 h-full">
                  <LiveScore initialData={liveData} />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Gallery & Points Table Section */}
        <div className='grid grid-cols-1 md:grid-cols-6 gap-4 w-full mb-8'>
          <div className="md:col-span-4">
            <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl">
              <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 text-2xl font-bold mb-4">
                Match Gallery
              </h2>
              <Gallery />
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl">
              <PointsTable
                view={'w-full h-full overflow-hidden'}
                points={tableData.message}
                tournaments={apiData && apiData.map(tournament => tournament.title)}
              />
            </div>
          </div>
        </div>

        {/* League Section */}
        <section className='mb-8'>
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-6 shadow-2xl">
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 text-2xl font-bold mb-4">
              Leagues Overview
            </h2>
            <League />
          </div>
        </section>

        {/* Fixtures Section */}
        <section className='pb-8'>
          <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl">
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-2xl font-bold mb-4">
              Upcoming Fixtures
            </h2>
            <Fixtures fixture={allFixtures} />
          </div>
        </section>
      </main>
    </div>
  )

}
