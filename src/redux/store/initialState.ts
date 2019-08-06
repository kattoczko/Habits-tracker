import { AppState } from "./store";

const initialState: AppState = {
  habits: [
    {
      id: "1",
      name: "Yoga",
      done: []
    },
    { id: "2", name: "Programing", done: [] }
  ]
};

export default initialState;
