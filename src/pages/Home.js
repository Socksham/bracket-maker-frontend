import React from 'react'
import Group from '../components/Group'

const Home = () => {

    const groupTeams = [
        [
            {name: "Netherlands", points: 4},
            {name: "Ecuador", points: 4},
            {name: "Senegal", points: 3},
            {name: "Qatar", points: 0},
        ]
    ]

    return (
        <div>
            <div className='grid grid-cols-3 gap-6 bg-red-700 p-4'>
                <Group groupLetter="A" groupTeams={groupTeams[0]} />
                <Group groupLetter="A" groupTeams={groupTeams[0]} />
                <Group groupLetter="A" groupTeams={groupTeams[0]} />
                <Group groupLetter="A" groupTeams={groupTeams[0]} />
                <Group groupLetter="A" groupTeams={groupTeams[0]} />
                <Group groupLetter="A" groupTeams={groupTeams[0]} />
            </div>
        </div>
    )
}

export default Home