import React, { createContext, useContext, useState } from "react";

// has a Provider JSX element that wraps the app
const WorkoutSessionContext = createContext();

// custom hook to use the workout session context
// other components can access the workout session data and methods
export const useWorkoutSession = () => {
  return useContext(WorkoutSessionContext);
};

// provider component to wrap the app and provide the workout session context
export const WorkoutSessionProvider = ({ children }) => {
  const [workoutSession, setWorkoutSession] = useState(null);

  const startWorkoutSession = (sessionData) => {
    setWorkoutSession(sessionData);
  };

  const endWorkoutSession = () => {
    setWorkoutSession(null);
    // TODO: api call to save workout session
  };

  return (
    <WorkoutSessionContext.Provider
      value={{ workoutSession, startWorkoutSession, endWorkoutSession }}
    >
      {children}
    </WorkoutSessionContext.Provider>
  );
};
