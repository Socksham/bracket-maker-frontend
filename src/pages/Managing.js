import {
  Bracket,
  RoundProps,
  Seed,
  SingleLineSeed,
  SeedItem,
  SeedTeam,
  RenderSeedProps,
} from "react-brackets";

import { useEffect, useState } from "react";
import { FaTrophy } from "react-icons/fa";

const CustomSeed = ({ seed, breakpoint, roundIndex, seedIndex, rounds }) => {

  const [team1, setTeam1] = useState(seed.teams[0]?.name);
  const [team2, setTeam2] = useState(seed.teams[1]?.name);
  const [winner, setWinner] = useState(-1);
  const nextRoundIndex = roundIndex + 1;
  const nextRoundSeedIndex = Math.floor(seedIndex/2);
  const nextRoundSeedTeamIndex = seedIndex % 2;
  console.log(roundIndex, seedIndex, rounds[roundIndex].seeds[seedIndex].teams, nextRoundSeedIndex, nextRoundSeedTeamIndex);

  const updateBracket = () => {
    var roundsString = JSON.stringify(rounds);
    console.log(roundsString);
  };

  // mobileBreakpoint is required to be passed down to a seed
  return (
    <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
      <SeedItem>
        <div>
          <SeedTeam>
            <div className="flex justify-between">
              <input
                type="text"
                className="text-black"
                value={team1}
                onChange={(e) => setTeam1(e.target.value)}
              />
              <div
                className="m-2"
                onClick={() => {
                  if (winner == 0) {
                    setWinner(-1);
                  } else {
                    setWinner(0);
                    if(roundIndex < rounds.length - 1) {
                      rounds[nextRoundIndex].seeds[nextRoundSeedIndex].teams[nextRoundSeedTeamIndex] = {name: team1};
                    }
                  }
                  updateBracket();
                }}
              >
                <FaTrophy color={winner == 0 ? "gold" : "white"} />
              </div>
            </div>
          </SeedTeam>
          <SeedTeam>
            <div className="flex">
              <input
                type="text"
                className="text-black"
                value={team2}
                onChange={(e) => setTeam2(e.target.value)}
              />
              <div
                className="m-2"
                onClick={() => {
                  if (winner == 1) {
                    setWinner(-1);
                  } else {
                    setWinner(1);
                    if(roundIndex < rounds.length - 1) {
                      rounds[nextRoundIndex].seeds[nextRoundSeedIndex].teams[nextRoundSeedTeamIndex] = {name: team2};
                    }
                  }
                  updateBracket();
                }}
              >
                <FaTrophy color={winner == 1 ? "gold" : "white"} />
              </div>
            </div>
          </SeedTeam>
        </div>
      </SeedItem>
      <div
        className="cursor-pointer w-full text-center py-1 bg-slate-900 text-white"
        onClick={updateBracket}
      >
        <p>Save</p>
      </div>
    </Seed>
  );
};

function Managing() {
  const [rounds, setRounds] = useState([
    {
      title: "Round of 16",
      seeds: [
        {
          id: 1,
          date: new Date().toDateString(),
          teams: [{ name: "England" }, { name: "America" }],
        },
        {
          id: 2,
          date: new Date().toDateString(),
          teams: [{ name: "Mexico" }, { name: "India" }],
        },
        {
          id: 3,
          date: new Date().toDateString(),
          teams: [{ name: "Germany" }, { name: "France" }],
        },
        {
          id: 4,
          date: new Date().toDateString(),
          teams: [{ name: "Guatemala" }, { name: "South Korea" }],
        },
        {
          id: 5,
          date: new Date().toDateString(),
          teams: [{ name: "West Indies" }, { name: "Qatar" }],
        },
        {
          id: 6,
          date: new Date().toDateString(),
          teams: [{ name: "South Africa" }, { name: "West Africa" }],
        },
        {
          id: 7,
          date: new Date().toDateString(),
          teams: [{ name: "Netherlands" }, { name: "Antarctica" }],
        },
        {
          id: 8,
          date: new Date().toDateString(),
          teams: [{ name: "New Zealand" }, { name: "Australia" }],
        },
      ],
    },
    {
      title: "Round of 8",
      seeds: [
        {
          id: 9,
          date: new Date().toDateString(),
          teams: [{ name: "England" }, { name: "India" }],
        },
        {
          id: 10,
          date: new Date().toDateString(),
          teams: [{ name: "France" }, { name: "South Korea" }],
        },
        {
          id: 11,
          date: new Date().toDateString(),
          teams: [{ name: "Qatar" }, { name: "South Africa" }],
        },
        {
          id: 12,
          date: new Date().toDateString(),
          teams: [{ name: "Netherlands" }, { name: "Australia" }],
        },
      ],
    },
    {
      title: "Final 4",
      seeds: [
        {
          id: 13,
          date: new Date().toDateString(),
          teams: [{ name: "India" }, { name: "America" }],
        },
        {
          id: 14,
          date: new Date().toDateString(),
          teams: [{ name: "Qatar" }, { name: "Netherlands" }],
        },
      ],
    },
    {
      title: "Championship",
      seeds: [
        {
          id: 15,
          date: new Date().toDateString(),
          teams: [{ name: "India" }, { name: "Qatar" }],
        },
      ],
    },
  ]);

  useEffect(() => {
    //TODO: call the mongo database, get the bracket string, convert to json, parse json
  }, []);

  return <Bracket rounds={rounds} renderSeedComponent={CustomSeed} />;
}

export default Managing;
