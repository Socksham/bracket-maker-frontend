import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Spinner from "../components/Spinner";
import {
    createPlayingBracket,
    getPlayingBrackets,
} from "../features/playingBracket/playingBracketSlice";
import {
    getManagingBrackets,
    createManagingBracket,
} from "../features/managingBracket/managingBracketSlice";
import BracketItem from "../components/BracketItem";

function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [joinCode1, setJoinCode1] = useState("");
    const [joinCode2, setJoinCode2] = useState("");
    const [joinCode3, setJoinCode3] = useState("");
    const [joinCode4, setJoinCode4] = useState("");

    const [lockDate, setLockDate] = useState(new Date());
    const [bracketName, setBracketName] = useState("");

    const [clicked1, setClicked1] = useState(false);
    const [clicked2, setClicked2] = useState(false);
    const { user } = useSelector((state) => state.auth);

    const {
        playingBrackets,
        playingBracket,
        isPlayingLoading,
        isPlayingError,
        playingMessage,
        isPlayingLocked,
    } = useSelector((state) => state.playingBracket);

    const {
        isManagingError,
        isManagingLoading,
        isManagingSuccess,
        managingBracket,
        managingBrackets,
        managingMessage,
        managingLockDate,
    } = useSelector((state) => state.managingBracket);

    useEffect(() => {
        if (isPlayingError) {
            console.log(playingMessage);
        }

        if (!user) {
            navigate("/login");
        }

        dispatch(getPlayingBrackets());

    }, [user, navigate, isPlayingError, playingMessage, dispatch]);

    useEffect(() => {
        if (isManagingError) {
            console.log(managingMessage);
        }

        if (!user) {
            navigate("/login");
        }

        dispatch(getManagingBrackets());
        
    }, [user, navigate, isManagingError, managingMessage, dispatch]);

    const joinBracket = async (e) => {
        e.preventDefault();
        var joinCode = joinCode1 + joinCode2 + joinCode3 + joinCode4;
        dispatch(createPlayingBracket({ joinCode }));

        setJoinCode1("");
        setJoinCode2("");
        setJoinCode3("");
        setJoinCode4("");

        setClicked1(false);
    };

    const createBracket = async (e) => {
        e.preventDefault();

        dispatch(createManagingBracket({ bracketName, lockDate }))
    };

    // if (isPlayingLoading) {
    //     return <Spinner />;
    // }

    return (
        <>
        {
            console.log("Managing: " + managingBrackets)
        }
            <div className="flex w-full justify-end">
                <p className="text-2xl font-semibold">Welcome {user && user.name}</p>
            </div>

            <div className="w-full h-1 bg-black mb-2" />

            <div className="w-full mb-4">
                <div className="mb-2 flex w-full items-center justify-between">
                    <p className="text-2xl font-semibold">Managing</p>
                    <div className="flex items-center space-x-2">
                        <div
                            className="bg-black text-white rounded-full px-4 py-1 cursor-pointer"
                            onClick={() => {
                                setClicked2(!clicked2);
                            }}
                        >
                            <p>Create a Bracket!</p>
                        </div>
                    </div>
                </div>
                <div className="">
                    {managingBrackets.length > 0 ? (
                        <div className="flex space-x-2">
                            {managingBrackets.map((bracket) => (
                                <BracketItem key={bracket._id} bracket={bracket} />
                            ))}
                        </div>
                    ) : (
                        <h3>You are not managing any brackets yet!</h3>
                    )}
                </div>
            </div>

            <div className="w-full">
                <div className="mb-2 flex w-full items-center justify-between">
                    <p className="text-2xl font-semibold">Playing</p>
                    <div className="flex items-center space-x-2">
                        <div
                            className="bg-black text-white rounded-full px-4 py-1 cursor-pointer"
                            onClick={() => {
                                setClicked1(!clicked1);
                            }}
                        >
                            <p>Join a Bracket!</p>
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
                <div>
                    {clicked1 && (
                        <div
                            class="relative z-10"
                            aria-labelledby="modal-title"
                            role="dialog"
                            aria-modal="true"
                        >
                            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                            <div class="fixed inset-0 z-10 overflow-y-auto">
                                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                    <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full">
                                            <div class="sm:flex sm:items-start w-full">
                                                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex w-full justify-center">
                                                    <div>
                                                        <p class="text-lg font-medium leading-6 text-gray-900">
                                                            Enter Join Code
                                                        </p>
                                                        <div class="mt-2">
                                                            <div className="flex space-x-4">
                                                                <input
                                                                    type="text"
                                                                    className="w-12 h-16 text-center text-xl outline-black border border-slate-400 rounded-lg"
                                                                    value={joinCode1}
                                                                    onChange={(e) => {
                                                                        setJoinCode1(e.target.value);
                                                                    }}
                                                                    maxLength={1}
                                                                />
                                                                <input
                                                                    type="text"
                                                                    className="w-12 h-16 text-center text-xl outline-black border border-slate-400 rounded-lg"
                                                                    value={joinCode2}
                                                                    onChange={(e) => {
                                                                        setJoinCode2(e.target.value);
                                                                    }}
                                                                />
                                                                <input
                                                                    type="text"
                                                                    className="w-12 h-16 text-center text-xl outline-black border border-slate-400 rounded-lg"
                                                                    value={joinCode3}
                                                                    onChange={(e) => {
                                                                        setJoinCode3(e.target.value);
                                                                    }}
                                                                />
                                                                <input
                                                                    type="text"
                                                                    className="w-12 h-16 text-center text-xl outline-black border border-slate-400 rounded-lg"
                                                                    value={joinCode4}
                                                                    onChange={(e) => {
                                                                        setJoinCode4(e.target.value);
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button
                                                type="button"
                                                class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                                onClick={(e) => {
                                                    joinBracket(e);
                                                }}
                                            >
                                                Join
                                            </button>
                                            <button
                                                type="button"
                                                class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                onClick={() => {
                                                    setClicked1(!clicked1);
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    {clicked2 && (
                        <div
                            class="relative z-10"
                            aria-labelledby="modal-title"
                            role="dialog"
                            aria-modal="true"
                        >
                            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                            <div class="fixed inset-0 z-10 overflow-y-auto">
                                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                    <div class="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                        <div class="bg-white rounded-lg px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full">
                                            <div class="sm:flex sm:items-start w-full">
                                                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                    <div>
                                                        <p class="text-lg font-medium leading-6 text-gray-900">
                                                            Initial information
                                                        </p>
                                                        <div class="mt-2">
                                                            <div className="flex space-x-4">
                                                                <input
                                                                    type="text"
                                                                    value={bracketName}
                                                                    onChange={(e) => {
                                                                        setBracketName(e.target.value);
                                                                    }}
                                                                    placeholder="Bracket name..."
                                                                    className="h-min outline-none border-b focus:border-black"
                                                                />
                                                                <div className="">
                                                                    <p>Lock date:</p>
                                                                    <ReactDatePicker
                                                                        selected={lockDate}
                                                                        onChange={(date) => setLockDate(date)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="rounded-lg bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button
                                                type="button"
                                                class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                                onClick={(e) => {
                                                    createBracket(e);
                                                }}
                                            >
                                                Create
                                            </button>
                                            <button
                                                type="button"
                                                class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                onClick={() => {
                                                    setClicked2(!clicked2);
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Dashboard;
