import Fixtures from '../components/Fixtures';
import Gallery from '../components/Gallery';
import League from '../components/League';
import LiveScore from '../components/LiveScore';
import PointsTable from '../components/PointsTable';
import Results from '../components/Results';
import Stories from '../components/Stories';
import { useRouter } from 'next/router';

// Helper function to fetch data
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
    const [fixtures, liveData, tableData] = await Promise.all([
      fetchData('fixtures'),
      fetchData('scoreboard?limit=1'),
      fetchData('tables'),
    ]);

    return {
      props: {
        fixtures: fixtures.data,
        liveData: liveData.data,
        tableData: tableData.data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        fixtures: [],
        liveData: [],
        tableData: [],
      },
    };
  }
}

export default function Home({ fixtures, liveData, tableData }) {

  const uniqueTournamentTitles = Array.from(
    new Set(tableData.map((table) => table.tournament_title))
  );

  const router = useRouter();

  const recentResults = fixtures
    .filter((fixture) => fixture.status === "Completed" && fixture.score)
    .slice(0, 5).reverse();
  // console.log("yo results", recentResults);

  // Get upcoming fixtures (sorted by date)
  const upcomingFixtures = fixtures
    .filter((fixture) => fixture.status === "Scheduled")
    .sort((a, b) => new Date(a.time) - new Date(b.time))
    .slice(0, 21);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
      <main className="mx-2 md:mx-6 lg:mx-12 xl:mx-24 2xl:mx-36">
        <section className="py-6">
          <Results results={recentResults} />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-7 xl:grid-cols-12 gap-4 w-full mb-8 items-stretch">
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

          {/* Live Score Section */}
          <div className="col-span-3 md:col-span-3 xl:col-span-4 h-full">
            <button
              className="w-full transform transition-all hover:scale-[1.02] cursor-pointer h-full focus:outline-none"
              onClick={() => router.push('/live')}
            >
              <div className="bg-gradient-to-br from-blue-800 to-purple-900 rounded-2xl p-4 shadow-2xl hover:shadow-blue-500/20 h-full">
                <LiveScore initialData={liveData} />
              </div>
            </button>
          </div>
        </div>

        {/* Gallery & Points Table Section */}
        <div className="grid grid-cols-1 xl:grid-cols-7 gap-2 w-full mb-8">
          <div className="xl:col-span-4">
            <div className="bg-gray-800 rounded-2xl p-4 md:p-4 shadow-2xl h-full">
              <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 text-xl md:text-2xl font-bold mb-4">
                Match Gallery
              </h2>
              <Gallery />
            </div>
          </div>

          <div className="xl:col-span-3">
            <div className="bg-gray-800 rounded-2xl p-4 md:p-6 shadow-2xl h-full">
              <PointsTable
                points={tableData}
                tournaments={uniqueTournamentTitles}
              />
            </div>
          </div>
        </div>

        {/* League Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-6 shadow-2xl">
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 text-2xl font-bold mb-4">
              Leagues Overview
            </h2>
            <League />
          </div>
        </section>

        {/* Fixtures Section */}
        <section className="pb-8">
          <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl">
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-2xl font-bold mb-4">
              Upcoming Fixtures
            </h2>
            <Fixtures fixtures={fixtures} />
          </div>
        </section>
      </main>
    </div>
  );
}
