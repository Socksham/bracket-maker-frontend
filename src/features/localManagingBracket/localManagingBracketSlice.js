import { createSlice } from "@reduxjs/toolkit";

export const localManagingBracketSlice = createSlice({
  name: "localManagingBracket",
  initialState: {
    bracket: {rounds: [
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
    ]},
  },
  reducers: {
    updateLocalManagingBracket: (state, action) => {
      console.log("payload", action.payload)
      state.bracket = {rounds: action.payload};
    },
  },
});

export const { updateLocalManagingBracket } = localManagingBracketSlice.actions;

export default localManagingBracketSlice.reducer;
