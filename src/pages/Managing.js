import {
  Bracket,
  RoundProps,
  Seed,
  SingleLineSeed,
  SeedItem,
  SeedTeam,
  RenderSeedProps,
} from "react-brackets";

import {
  getManagingBracket,
  updateManagingBracket,
} from "../features/managingBracket/managingBracketService.js";

import { useEffect, useState, useReducer } from "react";
import { FaTrophy } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const CustomSeed = ({ seed, breakpoint, roundIndex, seedIndex, rounds }) => {
  const isLineConnector =
    rounds[roundIndex].seeds.length === rounds[roundIndex + 1]?.seeds.length;

  const Wrapper = isLineConnector ? SingleLineSeed : Seed;

  const [team1, setTeam1] = useState(seed.teams[0]?.name);
  const [team2, setTeam2] = useState(seed.teams[1]?.name);
  const [winner, setWinner] = useState(-1);

  const nextRoundIndex = roundIndex + 1;
  const nextRoundSeedIndex = Math.floor(seedIndex / 2);
  const nextRoundSeedTeamIndex = seedIndex % 2;
  const [winnerTeamName, setWinnerTeamName] = useState("");
  //   console.log(
  //     roundIndex,
  //     seedIndex,
  //     rounds[roundIndex].seeds[seedIndex].teams,
  //     nextRoundSeedIndex,
  //     nextRoundSeedTeamIndex
  //   );

  const dispatch = useDispatch();

  const updateBracket = () => {
    console.log(roundIndex, seedIndex % 2);
    var tempRounds = JSON.parse(JSON.stringify(rounds));
    tempRounds[roundIndex].seeds[seedIndex].teams[seedIndex % 2].name = team1;
    tempRounds[roundIndex].seeds[seedIndex].teams[seedIndex % 2].name = team2;
    tempRounds[nextRoundIndex].seeds[nextRoundSeedIndex].teams[
      nextRoundSeedTeamIndex
    ] = winnerTeamName;
    // var roundsString = JSON.stringify(tempRounds)
    // console.log(roundsString)
    dispatch(updateManagingBracket(tempRounds));
  };

  // mobileBreakpoint is required to be passed down to a seed
  return (
    <Wrapper mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
      <SeedItem>
        <div className="p-1">
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
                    if (roundIndex < rounds.length - 1) {
                      rounds[nextRoundIndex].seeds[nextRoundSeedIndex].teams[
                        nextRoundSeedTeamIndex
                      ] = { name: team1 };
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
                    if (roundIndex < rounds.length - 1) {
                      rounds[nextRoundIndex].seeds[nextRoundSeedIndex].teams[
                        nextRoundSeedTeamIndex
                      ] = { name: team2 };
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
    </Wrapper>
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

  let { bracketId } = useParams();

  const [outOfDate, setOutOfDate] = useState(false);

  useEffect(() => {
    //TODO: call the mongo database, get the bracket string, convert to json, parse json

    // Call local storage and see if there's a value we can compare to

    const currentLocalStorage = JSON.parse(
      localStorage.getItem(`world_cup_bracket_${bracketId}`)
    );
    if (currentLocalStorage === null) {
      // Get default/bracketID bracket from MongoDB and continue to load
    } else {
      setRounds(currentLocalStorage);
    }
  }, []);

  return <Bracket rounds={rounds} renderSeedComponent={CustomSeed} />;
}

export default Managing;
