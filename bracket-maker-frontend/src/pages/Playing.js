import {
    Bracket,
    RoundProps,
    Seed,
    SingleLineSeed,
    SeedItem,
    SeedTeam,
    RenderSeedProps,
} from "react-brackets";
import { getPlayingBracket, updateLocalPlayingBracket } from "../features/playingBracket/playingBracketSlice";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";

const CustomSeed = ({ seed, breakpoint, roundIndex, seedIndex, rounds }) => {
    // ------ assuming rounds is the losers brackets rounds ------
    // losers rounds usually got some identical seeds amount like (2 - 2 - 1 - 1)

    const isLineConnector =
        rounds[roundIndex].seeds.length === rounds[roundIndex + 1]?.seeds.length;

    const Wrapper = isLineConnector ? SingleLineSeed : Seed;

    const [team1, setTeam1] = useState(seed.teams[0]?.name);
    const [team2, setTeam2] = useState(seed.teams[1]?.name);

    // const updateBracket = () => {
    //     var roundsString = JSON.stringify(rounds)
    //     console.log(roundsString)
    // }

    const dispatch = useDispatch();

    const updateBracket = () => {
        console.log(roundIndex, seedIndex % 2)
        var tempRounds = JSON.parse(JSON.stringify(rounds));
        tempRounds[roundIndex].seeds[seedIndex].teams[seedIndex % 2].name = team1
        tempRounds[roundIndex].seeds[seedIndex].teams[seedIndex % 2].name = team2
        // var roundsString = JSON.stringify(tempRounds)
        // console.log(roundsString)
        dispatch(updateLocalPlayingBracket(tempRounds))
    }

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
            <SeedItem>
                <div>
                    <SeedTeam>
                        <div>
                            <input
                                type="text"
                                className="text-black"
                                value={team1}
                                onChange={(e) => setTeam1(e.target.value)}
                            />
                        </div>
                    </SeedTeam>
                    <SeedTeam>
                        <div>
                            <input
                                type="text"
                                className="text-black"
                                value={team2}
                                onChange={(e) => setTeam2(e.target.value)}
                            />
                        </div>
                    </SeedTeam>
                </div>
            </SeedItem>
            <div className="cursor-pointer w-full text-center py-1 bg-slate-900 text-white" onClick={updateBracket}>
                <p>Save</p>
            </div>
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

    const navigate = useNavigate()
    const dispatch = useDispatch();
    
    const [test, setTest] = useState("")

    const { user } = useSelector((state) => state.auth);
    let { bracketId } = useParams();

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

        console.log(bracketId)

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
        {
            JSON.stringify(localPlayingBracket) !== '{}' &&
            <Bracket rounds={localPlayingBracket} renderSeedComponent={CustomSeed} />
        }
        </> 
    )
    
}

export default Playing;
