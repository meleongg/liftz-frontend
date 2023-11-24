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
  // workoutSession is an object of the form: { workout, exercises, targetSets}
  const [workoutSession, setWorkoutSession] = useState(null);

  const updateWorkoutSession = (sessionData) => {
    setWorkoutSession(sessionData);
  };

  const checkActiveWorkoutSession = () => {
    return workoutSession !== null;
  };

  const endWorkoutSession = () => {
    setWorkoutSession(null);
  };

  return (
    <WorkoutSessionContext.Provider
      value={{
        workoutSession,
        updateWorkoutSession,
        endWorkoutSession,
        checkActiveWorkoutSession,
      }}
    >
      {children}
    </WorkoutSessionContext.Provider>
  );
};
