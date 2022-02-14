import React from 'react'

export default function LiveScore() {
    return (
        <div class="sm:flex-wrap md:block col-span-7 lg:col-span-3 w-auto my-2 live-score-card">
            <div class="w-full h-full flex flex-col bg-white">
                <div class="flex border-b-2 border-gray-200 p-4">
                    <hr />
                    <div class="flex leading-4 bg-pink-100 text-red-700 mr-auto text-bold rounded py-2 px-3 match-status">
                        • Live</div>
                    <div class="flex text-bold match-tournament">
                        <img class="mr-3 w-5" src="https://assets.codepen.io/285131/pl-logo.svg" />English Premier League</div>
                    <div class="match-actions flex ml-auto">
                        <button class="btn-icon"><i class="material-icons-outlined">grade</i></button>
                        <button class="btn-icon"><i class="material-icons-outlined">add_alert</i></button>
                    </div>
                </div>
                <div class="match-content flex relative">
                    <div class="column">
                        <div class="team team--home">
                            <div class="team-logo">
                                <img src="https://assets.codepen.io/285131/whufc.svg" />
                            </div>
                            <h2 class="team-name">West Ham</h2>
                        </div>
                    </div>
                    <div class="column">
                        <div class="match-details">
                            <div class="match-date">
                                12 Aug at <strong>19:00</strong>
                            </div>
                            <div class="match-score">
                                <span class="match-score-number match-score-number--leading">2</span>
                                <span class="match-score-divider">:</span>
                                <span class="match-score-number">0</span>
                            </div>
                            <div class="match-time-lapsed">
                                72'
                            </div>
                            <div class="match-referee">
                                Referee: <strong>Joseph Hicks</strong>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="team team--away">
                            <div class="team-logo">
                                <img src="https://assets.codepen.io/285131/chelsea.svg" />
                            </div>
                            <h2 class="team-name">Chelsea</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
