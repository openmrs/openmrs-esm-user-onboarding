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
        title: 'Sample Demo',
        description:
          'This is a Sample Demo',
        steps: [
          {
            target: '[aria-label="OpenMRS"]',
            content: 'This is the OpenMRS logo. Click here to go back to the home page.',
            disableBeacon: true,
          },
        ],
      },
      {
        title: 'Tasks',
        description:
          'Find and organize what needs to be done for patients with task lists. Tasks are created both automatically based on data in the patient’s chart as well as manually by you or your colleagues.',
        steps: [
          {
            target: '[aria-label="OpenMRS"]',
            content: 'This is the Tasks section. Here you can find and organize tasks for patients.',
            disableBeacon: true,
          },
        ],
      },
      {
        title: 'Order basket',
        description: 'A single place for referral, imaging, drug and lab test orders.',
        steps: [
          {
            target: '[aria-label="OpenMRS"]',
            content: 'This is the Order Basket. A single place for referral, imaging, drug, and lab test orders.',
            disableBeacon: true,
          },
        ],
      },
      {
        title: 'Patient lists',
        description:
          'Service queues help you manage your clinic. Patients can be organized by priority level and you can track the wait time for each of your clinic’s key areas.',
        steps: [
          {
            target: '[aria-label="OpenMRS"]',
            content: 'This is the Patient Lists section. Here you can manage and organize patient queues.',
            disableBeacon: true,
          },
        ],
      },
    ],
    _description: 'List of tutorials to be displayed in the modal',
  },
};

export type Config = {
  showTutorial: boolean;
  tutorialData: {
    title: string;
    description: string;
    steps: {
      target: string;
      content: string;
      disableBeacon: boolean;
    }[];
  }[];
};
