import React, { useEffect } from 'react'

const BracketItem = ({ bracket }) => {

    useEffect(() => {
        
    }, []) 

    return (
        <div className='bg-stone-50 w-48 py-10 cursor-pointer border-black border-2 rounded-xl'>
            <div className='w-full h-full grid place-items-center'>
                <p className='text-xl font-semibold'>BRACKET</p>
            </div>
        </div>
    )
}

export default BracketItem