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
    const res = await fetch(`${process.env.Backend_URL}/api/${apiPath}`);
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
    <div className="bg-gray-700 overflow-x-hidden">
      <main className='mx-2 md:mx-10 lg:mx-40 2xl:mx-64'>
        <Results results={recentResults} />

        <div className='grid grid-cols-1 md:grid-cols-7 2xl:grid-cols-12 gap-2 w-full'>
          <div className="col-span-4 md:col-span-4 2xl:col-span-8 flex h-full w-full">
            <Stories />
          </div>
          <Link href="/live" passHref>
            <div className="col-span-3 md:col-span-3 2xl:col-span-4 flex h-full w-full">
              <LiveScore initialData={liveData} />
            </div>
          </Link>
        </div>

        <div className='grid grid-cols-6 gap-2 w-full'>
          <Gallery />
          <PointsTable
            view={'hidden md:block col-span-2 w-auto h-[30rem] my-2 bg-gray-700 items-center justify-center float-right'}
            points={tableData.message}
            tournaments={apiData && apiData.map(tournament => tournament.title)}
          />
        </div>

        <League />
        <Fixtures fixture={allFixtures} />
      </main>
    </div>
  )
}
