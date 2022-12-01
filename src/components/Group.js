import React, { useEffect } from 'react'

const Group = ({ groupLetter, groupTeams }) => {

    return (
        <div className='border-2 border-red-700 p-4 rounded-xl bg-white'>
            <div className='text-center'>
                <p className='text-2xl font-bold'>Group {groupLetter}</p>
            </div>
            <div className='h-px w-full border-t mb-2 mt-2' />
            {
                groupTeams.map((team, i) => {
                    return (
                        <div className='flex justify-between text-xl space-y-4 items-center'>
                            <p className='font-bold'>{team.name}</p>
                            <p className='font-bold'>{team.points}</p>
                        </div>
                    )

                })
            }
        </div>
    )
}

export default Group