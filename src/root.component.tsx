import React from 'react';
import ReactJoyride, {ACTIONS, type CallBackProps, EVENTS, type Step} from 'react-joyride';
import {useDefineAppContext} from "@openmrs/esm-framework"
import {type TutorialContext} from "./types";

const RootComponent: React.FC = () => {

  const [showTutorial, setShowTutorial] = React.useState(false);
  const [steps, setSteps] = React.useState([]);
  const [stepIndex, setStepIndex] = React.useState(0);

  useDefineAppContext<TutorialContext>('tutorial-context', {
    showTutorial,
    steps,
    setShowTutorial: (showTutorial: boolean) => setShowTutorial(showTutorial),
    setSteps: (steps: Step[]) => setSteps(steps)
  });

  const handleJoyrideCallback = (data: CallBackProps) => {
    const {action, index, origin, status, type} = data;

    switch (type) {
      case EVENTS.STEP_AFTER:
      case EVENTS.TARGET_NOT_FOUND:
        setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
        break;
      case EVENTS.TOUR_END:
        setStepIndex(0)
        setShowTutorial(false);
        break;
    }
  }

  return <ReactJoyride
    continuous
    debug
    disableScrolling
    showProgress
    showSkipButton
    steps={steps}
    stepIndex={stepIndex}
    run={showTutorial}
    callback={handleJoyrideCallback}
    styles={{
      options: {
        zIndex: 10000,
      },
    }}
  />;
};
export default RootComponent;
