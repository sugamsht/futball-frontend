import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from "react-query";

const fetchLiveScore = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/scoreboard`);
    return response.data;
};

export default function LiveScore({ initialData }) {
    const { data, isLoading, isError, error } = useQuery('scoreboard', fetchLiveScore, {
        initialData,
        refetchInterval: 30000, // refetch every 30 seconds
        refetchOnWindowFocus: false, // don't refetch when the window is in focus
    });

    const [liveData, setLiveData] = useState(initialData);

    useEffect(() => {
        if (data) {
            setLiveData(data);
        }
    }, [data]);

    if (isLoading) {
        return (
            <div className="w-full bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-8 text-center">
                <div className="text-cyan-400 animate-pulse">
                    Loading live scores...
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="w-full bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-8 text-center text-red-400">
                Error loading scores: {error.message}
            </div>
        );
    }

    const live = liveData?.[0];

    return (
        <div className="w-full bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl shadow-2xl overflow-hidden hover:transform hover:scale-[1.01] transition-all duration-300">
            <div className="p-6 space-y-6">
                {/* Match Status Header */}
                <div className="flex items-center justify-between bg-gray-700/30 backdrop-blur-sm rounded-xl p-4 border border-cyan-400/20">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-red-400 font-semibold">LIVE</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <img
                            src={`./logo/${live?.fixObject?.tournament_title.trim().toLowerCase().replace(/\s+/g, '')}.png`}
                            onError={(e) => {
                                e.target.src = '/logo.png';
                            }}
                            alt="Tournament Logo"
                            className="w-8 h-8 object-contain"
                        />
                        <span className="text-gray-300 font-medium">
                            {live?.fixObject?.tournament_title}
                        </span>
                    </div>
                </div>

                {/* Teams and Score */}
                <div className="grid grid-cols-3 gap-6 items-center">
                    {/* Home Team */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative group w-20 h-20">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative bg-gray-700 rounded-xl p-2">
                                <img
                                    src={`./logo/${live?.fixObject?.team1Object?.[0]?.logo}`}
                                    alt="Home Team"
                                    className="w-16 h-16 object-contain"
                                    onError={(e) => {
                                        e.target.src = '/logo.png';
                                    }}
                                />
                            </div>
                        </div>
                        <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                            {live?.fixObject?.team1Object?.[0]?.name}
                        </h2>
                    </div>

                    {/* Score and Time */}
                    <div className="text-center space-y-3">
                        <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                            <span>{live?.score1}</span>
                            <span className="mx-2 text-gray-400">:</span>
                            <span>{live?.score2}</span>
                        </div>
                        <div className="text-sm text-cyan-400 font-medium">
                            {live?.timer}'
                        </div>
                        <div className="text-xs text-gray-400">
                            {live?.fixObject?.date}
                        </div>
                    </div>

                    {/* Away Team */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative group w-20 h-20">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-cyan-400/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative bg-gray-700 rounded-xl p-2">
                                <img
                                    src={`./logo/${live?.fixObject?.team2Object?.[0]?.logo}`}
                                    alt="Away Team"
                                    className="w-16 h-16 object-contain"
                                    onError={(e) => {
                                        e.target.src = '/logo.png';
                                    }}
                                />
                            </div>
                        </div>
                        <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            {live?.fixObject?.team2Object?.[0]?.name}
                        </h2>
                    </div>
                </div>

                {/* Match Details */}
                <div className="bg-gray-700/30 backdrop-blur-sm rounded-xl p-4 border border-cyan-400/20">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-400">Referee:</span>
                            <span className="text-cyan-400 font-medium">
                                {live?.referee || 'TBD'}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-400">Venue:</span>
                            <span className="text-purple-400 font-medium">
                                {live?.fixObject?.stadium || 'TBD'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}