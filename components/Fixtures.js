import React, { useState, useMemo } from 'react';
import Fixture from './Fixture';

const Fixtures = ({ fixtures }) => {
    // currentStatus: "Scheduled" shows upcoming, "Completed" shows finished fixtures
    const [currentStatus, setCurrentStatus] = useState("Scheduled");

    const filteredFixtures = useMemo(() => {
        const allFixtures = fixtures || [];
        if (currentStatus === "Completed") {
            // Sort descending and take 10 recent fixtures
            return allFixtures
                .filter(f => f.status === "Completed")
                .sort((a, b) => new Date(b.matchDate) - new Date(a.matchDate))
                .slice(0, 5);
        } else {
            // For scheduled fixtures, sort by ascending date
            return allFixtures
                .filter(f => f.status === "Scheduled")
                .sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate));
        }
    }, [fixtures, currentStatus]);

    return (
        <div className="w-full bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl shadow-2xl p-6">
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 text-3xl md:text-4xl font-bold text-center mb-8">
                {currentStatus === "Scheduled" ? "Upcoming Fixtures" : "Recent Completed Fixtures"}
            </h1>

            <div className="flex justify-center space-x-4 mb-6">
                <button
                    onClick={() => setCurrentStatus("Completed")}
                    className={`px-6 py-3 rounded-xl transition-all font-semibold shadow-lg hover:scale-105 ${currentStatus === "Completed" ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : "bg-gray-700/50 text-white"}`}
                >
                    Completed
                </button>
                <button
                    onClick={() => setCurrentStatus("Scheduled")}
                    className={`px-6 py-3 rounded-xl transition-all font-semibold shadow-lg hover:scale-105 ${currentStatus === "Scheduled" ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : "bg-gray-700/50 text-white"}`}
                >
                    Upcoming
                </button>
            </div>

            <div className="px-2 md:px-6 lg:px-12 xl:px-16 2xl:px-24 mb-6 space-y-4">
                {filteredFixtures.length === 0 ? (
                    <div className="flex justify-center items-center py-8">
                        <h1 className="text-xl font-semibold bg-gradient-to-r from-red-400 to-pink-400 text-transparent bg-clip-text">
                            No {currentStatus} Fixtures
                        </h1>
                    </div>
                ) : (
                    filteredFixtures.map(fixtureItem => (
                        <div key={fixtureItem._id} className="mb-4">
                            <Fixture fixture={fixtureItem} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Fixtures;