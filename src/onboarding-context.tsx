import React, { createContext, useContext, useState } from 'react';

const OnboardingContext = createContext({
  runJoyride: false,
  steps: [],
  startOnboarding: (steps) => {},
  stopOnboarding: () => {},
});

export const OnboardingProvider = ({ children }) => {
  const [runJoyride, setRunJoyride] = useState(false);
  const [steps, setSteps] = useState([]);

  const startOnboarding = (newSteps) => {
    setSteps(newSteps);
    setRunJoyride(true);
  };

  const stopOnboarding = () => {
    setRunJoyride(false);
  };
  return (
    <OnboardingContext.Provider value={{ runJoyride, steps, startOnboarding, stopOnboarding }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => useContext(OnboardingContext);
