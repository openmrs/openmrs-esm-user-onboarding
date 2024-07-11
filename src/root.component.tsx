import React from 'react';
import ReactJoyride, {type Step} from 'react-joyride';
import {useAppContext, useDefineAppContext} from "@openmrs/esm-framework"
import {type TutorialContext} from "./types";

const RootComponent: React.FC = () => {

  const [showTutorial, setShowTutorial] = React.useState(false);
  const [steps, setSteps] = React.useState([]);

  useDefineAppContext<TutorialContext>('tutorial-context', {
    showTutorial,
    steps,
    setShowTutorial: (showTutorial: boolean) => setShowTutorial(showTutorial),
    setSteps: (steps: Step[]) => setSteps(steps)
  });

  return <ReactJoyride steps={steps} run={showTutorial}/>;
};
export default RootComponent;
