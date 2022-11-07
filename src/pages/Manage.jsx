import {
  Bracket,
  RoundProps,
  Seed,
  SingleLineSeed,
  SeedItem,
  SeedTeam,
  RenderSeedProps,
} from "react-brackets";

import { useState } from "react";

const CustomSeed = ({ seed, breakpoint, roundIndex, seedIndex }) => {
  // ------ assuming rounds is the losers brackets rounds ------
  // losers rounds usually got some identical seeds amount like (2 - 2 - 1 - 1)

  const isLineConnector =
    rounds[roundIndex].seeds.length === rounds[roundIndex + 1]?.seeds.length;

  const Wrapper = isLineConnector ? SingleLineSeed : Seed;

  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");


  // mobileBreakpoint is required to be passed down to a seed
  return (
    <Wrapper mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
      <SeedItem>
        <div>
          <SeedTeam style={{ color: "red" }}>
            <input
              type="text"
              value={team1}
              onChange={(e) => setTeam1(e.target.value)}
            />
          </SeedTeam>

          <SeedTeam style={{ color: "red" }}>
            <input
              type="text"
              value={team2}
              onChange={(e) => setTeam2(e.target.value)}
            />
          </SeedTeam>
        </div>
      </SeedItem>
    </Wrapper>
  );
};

const rounds = [
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
];

function Manage() {
  return <Bracket rounds={rounds} renderSeedComponent={CustomSeed} />;
}

export default Manage;
