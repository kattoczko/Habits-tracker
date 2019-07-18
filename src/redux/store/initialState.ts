interface Habit {
  id: number;
  name: string;
  done: string[];
}

interface initialStateTypes {
  habits: Habit[];
}

const initialState: initialStateTypes = {
  habits: [
    {
      id: 1,
      name: "Yoga",
      done: ["2019, 6, 17", "2019, 6, 15", "2019, 6, 14"]
    },
    { id: 2, name: "Programing", done: ["2019, 6, 15"] }
  ]
};

export default initialState;
