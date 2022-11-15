import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import Spinner from "../components/Spinner";
import { getGoals, reset } from "../features/goals/goalSlice";
import { createPlayingBracket, getPlayingBrackets, playingReset } from "../features/playingBracket/playingBracketSlice";
import BracketItem from "../components/BracketItem";

function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [joinCode, setJoinCode] = useState("")

    const { user } = useSelector((state) => state.auth);
    // const { goals, isLoading, isError, message } = useSelector(
    //     (state) => state.goals
    // );

    const { playingBrackets, playingBracket, isPlayingLoading, isPlayingError, playingMessage } = useSelector(
        (state) => state.playingBracket
    );

    useEffect(() => {
        if (isPlayingError) {
            console.log(playingMessage);
        }

        if (!user) {
            navigate("/login");
        }

        dispatch(getPlayingBrackets());

        return () => {
            dispatch(playingReset());
        };
    }, [user, navigate, isPlayingError, playingMessage, dispatch]);

    const joinBracket = async (e) => {
        e.preventDefault()
        dispatch(createPlayingBracket({ joinCode }))
        setJoinCode("")
    }

    // if (isPlayingLoading) {
    //     return <Spinner />;
    // }

    return (
        <>
            <div className="flex w-full justify-end">
                <p className="text-2xl font-semibold">Welcome {user && user.name}</p>
            </div>

            {/* <GoalForm /> */}
            <div className="w-full h-1 bg-black mb-2"/>

            <div className="w-full mb-4">
                <div className="mb-2">
                    <p className="text-2xl font-semibold">Managing</p>
                </div>
                <div className="flex space-x-2">
                    <BracketItem />
                    <BracketItem />
                </div>
            </div>

            <div className="w-full">
                <div className="mb-2 flex w-full items-center justify-between">
                    <p className="text-2xl font-semibold">Playing</p>
                    <div className="flex items-center space-x-2">
                        <input className="border-black border-2 px-2 rounded" type="text" placeholder="Enter code..." value={joinCode} onChange={(e) => {setJoinCode(e.target.value)}} />
                        <div className="bg-black text-white rounded-full px-4 py-1" onClick={(e) => {joinBracket(e)}}>
                            <p>Join Bracket</p>
                        </div>
              
                    </div>
                </div>
                <div className="">
                    {playingBrackets.length > 0 ? (
                        <div className="flex space-x-2">
                            {playingBrackets.map((bracket) => (
                                <BracketItem key={bracket._id} bracket={bracket} />
                            ))}
                        </div>
                    ) : (
                        <h3>You are not playing in any brackets yet!</h3>
                    )}
                </div>
            </div>
        </>
    );
}

export default Dashboard;
