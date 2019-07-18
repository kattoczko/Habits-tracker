import { State } from "../../types";

const initialState: State = {
  habits: [
    {
      id: 1,
      name: "Yoga",
      done: []
    },
    { id: 2, name: "Programing", done: [] }
  ]
};

export default initialState;
