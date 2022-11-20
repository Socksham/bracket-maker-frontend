import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const BracketItem = ({ bracket }) => {

    const navigate = useNavigate();

    return (
        <>
            {
                bracket.managingBracket ?
                    <div className='bg-stone-50 w-48 py-10 cursor-pointer border-black border-2 rounded-xl' onClick={() => { navigate(`playing/${bracket._id}`) }}>
                        <div className='w-full h-full grid place-items-center'>
                            <p className='text-xl font-semibold'>{bracket.name}</p>
                            <p className='text-xl font-semibold'>{bracket.joinCode}</p>
                        </div>
                    </div>
                    :

                    <div className='bg-stone-50 w-48 py-10 cursor-pointer border-black border-2 rounded-xl' onClick={() => { navigate(`managing/${bracket._id}`) }}>
                        <div className='w-full h-full grid place-items-center'>
                            <p className='text-xl font-semibold'>{bracket.name}</p>
                            <p className='text-xl font-semibold'>{bracket.joinCode}</p>
                        </div>
                    </div>
            }

        </>

    )
}

export default BracketItem