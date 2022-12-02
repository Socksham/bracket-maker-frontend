import {
  Bracket,
  RoundProps,
  Seed,
  SingleLineSeed,
  SeedItem,
  SeedTeam,
  RenderSeedProps,
} from "react-brackets";
import { getPlayingBracket } from "../features/playingBracket/playingBracketSlice";
import { updateLocalPlayingBracket } from "../features/localPlayingBracket/localPlayingBracketSlice";
import { FaTrophy } from "react-icons/fa";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const CustomSeed = ({ seed, breakpoint, roundIndex, seedIndex, rounds }) => {
  // ------ assuming rounds is the losers brackets rounds ------
  // losers rounds usually got some identical seeds amount like (2 - 2 - 1 - 1)

  const isLineConnector =
    rounds[roundIndex].seeds.length === rounds[roundIndex + 1]?.seeds.length;

  const Wrapper = isLineConnector ? SingleLineSeed : Seed;

  const [winner, setWinner] = useState(seed.winner);
  const [team1, setTeam1] = useState(seed.teams[0]?.name);
  const [team2, setTeam2] = useState(seed.teams[1]?.name);

  // const updateBracket = () => {
  //     var roundsString = JSON.stringify(rounds)
  //     console.log(roundsString)
  // }

  const dispatch = useDispatch();

  const updateBracket = () => {
    console.log(roundIndex, seedIndex % 2);
    var tempRounds = JSON.parse(JSON.stringify(rounds));
    tempRounds[roundIndex].seeds[seedIndex].teams[seedIndex % 2].name = team1;
    tempRounds[roundIndex].seeds[seedIndex].teams[seedIndex % 2].name = team2;
    // var roundsString = JSON.stringify(tempRounds)
    // console.log(roundsString)
    dispatch(updateLocalPlayingBracket(tempRounds));
  };

  // const {
  //     playingBrackets,
  //     playingBracket,
  //     localPlayingBracket,
  //     isPlayingLoading,
  //     isPlayingError,
  //     playingMessage,
  //     isPlayingLocked,
  // } = useSelector((state) => state.playingBracket);

  // useEffect(() => {
  //     if (isPlayingError) {
  //         console.log(playingMessage);
  //     }

  //     dispatch(getPlayingBracket({ bracketId }));

  //     // return () => {
  //     //     playingReset()
  //     // }
  // }, [user, navigate, isPlayingError, playingMessage, dispatch]);

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

function Playing() {
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
          teams: [{ name: "Netherlands" }, { name: "Antarctica" }],
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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  let { bracketId } = useParams();
  const { bracket } = useSelector((state) => state.localPlayingBracket);

  const {
    playingBrackets,
    playingBracket,
    localPlayingBracket,
    isPlayingLoading,
    isPlayingError,
    playingMessage,
    isPlayingLocked,
  } = useSelector((state) => state.playingBracket);

  useEffect(() => {
    if (isPlayingError) {
      console.log(playingMessage);
    }

    if (!user) {
      navigate("/login");
    }

    console.log(bracketId);

    dispatch(getPlayingBracket({ bracketId }));
  }, [user, navigate, isPlayingError, playingMessage, dispatch]);

  // useEffect(() => {
  //     console.log(playingBracket)
  //     if(playingBracket !== ""){
  //         var tempBracket = JSON.parse(playingBracket.bracket)
  //         console.log(tempBracket)
  //     }
  // }, [playingBracket])

  return (
    <>
      {JSON.stringify(localPlayingBracket) !== "{}" && (
        <div className="">
          <Bracket rounds={bracket.rounds} renderSeedComponent={CustomSeed} />
          <div className="w-full bg-blue" onClick={() => {}}>
            Submit
          </div>
        </div>
      )}
    </>
  );
}

export default Playing;
