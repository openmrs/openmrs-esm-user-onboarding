import {Type} from '@openmrs/esm-framework';

export const configSchema = {
  showTutorial: {
    _type: Type.Boolean,
    _default: false,
    _description: 'Enable or Disable Onboarding Walkthrough',
  },
  tutorialData: {
    _type: Type.Array,
    _description: 'List of tutorials to be displayed in the modal',
    _default: [
      {
        title: 'Basic Tutorial',
        description: 'Learn how to efficiently search for patients, register new patients, access user settings, and view ongoing visits and appointments.',
        steps: [{
          target: '[aria-label="OpenMRS"]',
          content: 'Welcome to OpenMRS! This is the main dashboard where you can navigate to various features of the system.'
        },
          {
            target: '[name="SearchPatientIcon"]',
            content: 'This is the search icon. Use it to find patients in the system quickly.'
          },
          {
            target: '[name="AddPatientIcon"]',
            content: 'This is the add patient icon. Click here to register a new patient into the system.'
          },
          {
            target: '[name="User"]',
            content: 'The user icon. Click here to change your user preferences and settings.'
          },
          {
            target: '[data-extension-id="active-visits-widget"]',
            content: 'This table displays active visits. Here you can see all the ongoing patient visits.'
          },
          {
            target: '[data-extension-id="home-appointments"]',
            content: 'This table shows appointments. View and manage patient appointments from this section.'
          },
        ],
      },
      {
        title: 'Option Tutorial',
        description: 'Optional Tutorial for debugging purposes',
        steps: [{
          target: '[aria-label="OpenMRS"]',
          content: 'Welcome to OpenMRS! This is the main dashboard where you can navigate to various features of the system.'
        },
          {
            target: '[name="SearchPatientIcon"]',
            content: 'This is the search icon. Use it to find patients in the system quickly.'
          }]
      }
    ]
  }
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
