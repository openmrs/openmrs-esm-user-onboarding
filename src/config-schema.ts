import { Type } from '@openmrs/esm-framework';

export const configSchema = {
  showTutorial: {
    _type: Type.Boolean,
    _default: false,
    _description: 'Enable or Disable Onboarding Walkthrough',
  },
  tutorialData: {
    _type: Type.Array,
    _default: [
      {
        id: 1,
        title: 'Sample Demo',
        description:
          'OpenMRS is a patient-centered medical record system that is designed to be flexible and extensible. It is a platform that supports a wide range of applications for use in low-resource settings. OpenMRS is a multi-institution, non-profit collaborative led by Regenstrief Institute, a world-renowned leader in medical informatics research, and Partners In Health, a Boston-based philanthropic organization.',
      },
      {
        id: 2,
        title: 'Tasks',
        description:
          'Find and organize what needs to be done for patients with task lists. Tasks are created both automatically based on data in the patient’s chart as well as manually by you or your colleagues.',
      },
      {
        id: 3,
        title: 'Order basket',
        description: 'A single place for referral, imaging, drug and lab test orders.',
      },
      {
        id: 4,
        title: 'Patient lists',
        description:
          'Service queues help you manage your clinic. Patients can be organized by priority level and you can track the wait time for each of your clinic’s key areas.',
      },
    ],
    _description: 'List of tutorials to be displayed in the modal',
  },
  tutorialSteps: {
    _type: Type.Array,
    _default: [
      {
        tutorialId: 1,
        steps: [
          {
            target: '[aria-label="OpenMRS"]',
            content: 'This is the Sample demo logo.',
            disableBeacon: true,
          },
        ],
      },
      {
        tutorialId: 2,
        steps: [
          {
            target: '[aria-label="OpenMRS"]',
            content: 'This is the Tasks section. Here you can find and organize tasks for patients.',
            disableBeacon: true,
          },
        ],
      },
      {
        tutorialId: 3,
        steps: [
          {
            target: '[aria-label="OpenMRS"]',
            content: 'This is the Order Basket. A single place for referral, imaging, drug, and lab test orders.',
            disableBeacon: true,
          },
        ],
      },
      {
        tutorialId: 4,
        steps: [
          {
            target: '[aria-label="OpenMRS"]',
            content: 'This is the Patient Lists section. Here you can manage and organize patient queues.',
            disableBeacon: true,
          },
        ],
      },
    ],
    _description: 'Steps for the onboarding tutorial',
  },
};

export type Config = {
  showTutorial: boolean;
  tutorialData: {
    id: number;
    title: string;
    description: string;
  }[];
  tutorialSteps: {
    tutorialId: number;
    steps: {
      target: string;
      content: string;
      disableBeacon: boolean;
    }[];
  }[];
};
