import {type Step} from "react-joyride";

export interface Tutorial {
  title: string;
  description: string;
  steps: Step[];
}

export interface TutorialContext {
  showTutorial: boolean;
  steps: Step[];
  setShowTutorial: (showTutorial: boolean) => void;
  setSteps: (steps: Step[]) => void;
}

