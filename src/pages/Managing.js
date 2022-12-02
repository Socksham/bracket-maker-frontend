import {
  Bracket,
  RoundProps,
  Seed,
  SingleLineSeed,
  SeedItem,
  SeedTeam,
  RenderSeedProps,
} from "react-brackets";

import { getManagingBracket } from "../features/managingBracket/managingBracketSlice.js";

import { updateLocalManagingBracket } from "../features/localManagingBracket/localManagingBracketSlice";

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
  const [winner, setWinner] = useState(seed.winner);

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
  let { bracketId } = useParams();
  //   const { bracket } = useSelector((state) => state.localManagingBracket);

  const updateBracket = (team) => {
    // console.log(roundIndex, seedIndex % 2);
    var tempRounds = JSON.parse(JSON.stringify(rounds));
    if (roundIndex < rounds.length - 1) {
      console.log(winner);
      tempRounds[roundIndex].seeds[seedIndex].winner = winner;
      tempRounds[nextRoundIndex].seeds[nextRoundSeedIndex].teams[
        nextRoundSeedTeamIndex
      ] = { name: team };
    }
    console.log("2", tempRounds);
    // callBack();
    var roundsString = JSON.stringify(tempRounds);
    dispatch(updateLocalManagingBracket(tempRounds));
    // window.location.reload(false);
  };

  // mobileBreakpoint is required to be passed down to a seed
  return (
    <Wrapper mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
      {console.log("rerender")}
      <SeedItem>
        <div className="p-1">
          <SeedTeam>
            <div className="w-full flex justify-between items-center">
              {/* <input
                type="text"
                className="text-black"
                value={team1}
                onChange={(e) => setTeam1(e.target.value)}
              /> */}
              <p className="text-white">{seed.teams[0]?.name}</p>
              <div
                className="m-2"
                onClick={() => {
                  updateBracket(seed.teams[0]?.name, 0);
                  setWinner(0);
                  // if (roundIndex < rounds.length - 1) {
                  //   rounds[nextRoundIndex].seeds[nextRoundSeedIndex].teams[
                  //     nextRoundSeedTeamIndex
                  //   ] = { name: team1 };
                  //   seed.winner = 0;
                  // }
                }}
              >
                <FaTrophy color={winner == 0 ? "gold" : "white"} />
              </div>
            </div>
          </SeedTeam>
          <SeedTeam>
            <div className="w-full flex justify-between items-center">
              {/* <input
                type="text"
                className="text-black"
                value={team2}
                onChange={(e) => setTeam2(e.target.value)}
              /> */}
              <p className="text-white text-center">{seed.teams[1]?.name}</p>
              <div
                className="m-2"
                onClick={() => {
                  updateBracket(seed.teams[1]?.name, 1);
                  setWinner(1);
                  // if (roundIndex < rounds.length - 1) {
                  //   rounds[nextRoundIndex].seeds[nextRoundSeedIndex].teams[
                  //     nextRoundSeedTeamIndex
                  //   ] = { name: team2 };
                  //   seed.winner = 1;
                  // }
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
          winner: 0,
        },
        {
          id: 2,
          date: new Date().toDateString(),
          teams: [{ name: "Mexico" }, { name: "India" }],
          winner: 1,
        },
        {
          id: 3,
          date: new Date().toDateString(),
          teams: [{ name: "Germany" }, { name: "France" }],
          winner: 0,
        },
        {
          id: 4,
          date: new Date().toDateString(),
          teams: [{ name: "Guatemala" }, { name: "South Korea" }],
          winner: 1,
        },
        {
          id: 5,
          date: new Date().toDateString(),
          teams: [{ name: "West Indies" }, { name: "Qatar" }],
          winner: 0,
        },
        {
          id: 6,
          date: new Date().toDateString(),
          teams: [{ name: "South Africa" }, { name: "West Africa" }],
          winner: 1,
        },
        {
          id: 7,
          date: new Date().toDateString(),
          teams: [{ name: "Netherlands" }, { name: "Antarctica" }],
          winner: 0,
        },
        {
          id: 8,
          date: new Date().toDateString(),
          teams: [{ name: "New Zealand" }, { name: "Australia" }],
          winner: 1,
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
          winner: 1,
        },
        {
          id: 10,
          date: new Date().toDateString(),
          teams: [{ name: "France" }, { name: "South Korea" }],
          winner: 1,
        },
        {
          id: 11,
          date: new Date().toDateString(),
          teams: [{ name: "Qatar" }, { name: "South Africa" }],
          winner: 0,
        },
        {
          id: 12,
          date: new Date().toDateString(),
          teams: [{ name: "Netherlands" }, { name: "Australia" }],
          winner: 1,
        },
      ],
    },
    {
      title: "Final 4",
      seeds: [
        {
          id: 13,
          date: new Date().toDateString(),
          teams: [{ name: "India" }, { name: "France" }],
          winner: 1,
        },
        {
          id: 14,
          date: new Date().toDateString(),
          teams: [{ name: "Qatar" }, { name: "Netherlands" }],
          winner: 0,
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
          winner: 0,
        },
      ],
    },
  ]);

  let { bracketId } = useParams();
  const { bracket } = useSelector((state) => state.localManagingBracket);

  const [outOfDate, setOutOfDate] = useState(false);

  //   useEffect(() => {
  //     //TODO: call the mongo database, get the bracket string, convert to json, parse json

  //     // Call local storage and see if there's a value we can compare to

  //     console.log("herejw4triw45b9i", bracket.rounds);
  //     setRounds(bracket.rounds);
  //     // const currentLocalStorage = JSON.parse(
  //     //   localStorage.getItem(`world_cup_bracket_${bracketId}`)
  //     // );
  //     // if (currentLocalStorage === null) {
  //     //   // Get default/bracketID bracket from MongoDB and continue to load
  //     // } else {
  //     //   setRounds(currentLocalStorage);
  //     //   console.log(currentLocalStorage);
  //     // }
  //   }, [bracket.rounds]);

  return (
    <div className="">
      <Bracket rounds={bracket.rounds} renderSeedComponent={CustomSeed} />
      <div className="w-full bg-blue" onClick={() => {}}>
        Submit
      </div>
    </div>
  );
}

export default Managing;
