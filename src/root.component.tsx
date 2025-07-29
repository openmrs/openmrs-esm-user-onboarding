import React, { useState } from 'react';
import ReactJoyride, { ACTIONS, type CallBackProps, EVENTS } from 'react-joyride';
import { useDefineAppContext } from '@openmrs/esm-framework';
import { type TutorialContext, type ExtendedStep } from './types';
import CustomTooltip from './tooltip/tooltip.component';

const RootComponent: React.FC = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [steps, setSteps] = useState<ExtendedStep[]>([]);
  const [stepIndex, setStepIndex] = useState(0);

  // Set steps with default step options
  const updateSteps = (newSteps: ExtendedStep[]) => {
    setSteps(
      newSteps.map((step) => ({
        ...step,
        disableBeacon: true,
      })),
    );
  };

  useDefineAppContext<TutorialContext>('tutorial-context', {
    showTutorial,
    steps,
    setShowTutorial: (showTutorial: boolean) => setShowTutorial(showTutorial),
    setSteps: updateSteps,
  });

  const onStepChange = (index: number) => {
    const step = steps[index];
    if (step.data && step.data.autoNextOn) {
      handleAutoNext(step.data.autoNextOn, index);
    }
  };

  const waitForTarget = (index: number) => {
    setShowTutorial(false);
    const interval = setInterval(() => {
      const targetElement = document.querySelector(steps[index].target as string);
      if (targetElement) {
        setShowTutorial(true);
        clearInterval(interval);
      }
    }, 1000);
  };

  const handleAutoNext = (query: string, index: number) => {
    const interval = setInterval(() => {
      const targetElement = document.querySelector(query);
      if (targetElement) {
        setStepIndex(index + 1);
        clearInterval(interval);
      }
    }, 1000);
  };

  const currentStep = steps[stepIndex];
  const overlayStyles = currentStep?.disableOverlay
    ? { backgroundColor: 'transparent' }
    : { height: document.body.scrollHeight };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, origin, status, type } = data;
    switch (type) {
      case EVENTS.TOUR_START:
        // The target not found event is not triggered when the tour starts
        waitForTarget(0);
        break;
      case EVENTS.STEP_BEFORE:
        onStepChange(index);
        break;
      case EVENTS.STEP_AFTER:
        setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
        break;
      case EVENTS.TARGET_NOT_FOUND:
        waitForTarget(index);
        break;
      case EVENTS.TOUR_END:
        setStepIndex(0);
        setShowTutorial(false);
        break;
    }
  };

  return (
    <ReactJoyride
      callback={handleJoyrideCallback}
      continuous
      debug={false}
      disableOverlayClose={true}
      disableScrolling
      run={showTutorial}
      showProgress
      showSkipButton
      stepIndex={stepIndex}
      steps={steps}
      styles={{
        options: {
          zIndex: 10000,
        },
        overlay: overlayStyles,
      }}
      tooltipComponent={(props) => <CustomTooltip {...props} step={steps[props.index]} totalSteps={steps.length} />}
    />
  );
};
export default RootComponent;
