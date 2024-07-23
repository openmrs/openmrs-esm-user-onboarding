import { Type } from '@openmrs/esm-framework';

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
            content: 'This is the search icon. Use it to find patients in the system quickly.',
          },
          {
            target: '[name="AddPatientIcon"]',
            content: 'This is the add patient icon. Click here to register a new patient into the system.',
          },
          {
            target: '[name="User"]',
            content: 'The user icon. Click here to change your user preferences and settings.',
          },
          {
            target: '[data-extension-id="active-visits-widget"]',
            content: 'This table displays active visits. Here you can see all the ongoing patient visits.',
          },
          {
            target: '[data-extension-id="home-appointments"]',
            content: 'This table shows appointments. View and manage patient appointments from this section.',
          },
        ],
      },
      {
        title: 'Tutorial for demo purposes',
        description: 'This tutorial is for demo / debugging purposes only',
        steps: [
          {
            target: '[aria-label="OpenMRS"]',
            title: 'Let us walk through the tutorial features together.',
            disableBeacon: true,
          },
          {
            target: '[data-extension-id="clinical-appointments-dashboard-link"]',
            title:
              'Click on this link. This step is configured to be automatic and will take you to the next step. Once the given query selector resolves an element on the page, it will proceed automatically.',
            hideCloseButton: true,
            hideNextButton: true,
            disableOverlayClose: true,
            spotlightClicks: true,
            data: {
              autoNextOn: '[data-extension-id="clinical-appointments-dashboard"]',
            },
          },
          {
            target: '[data-extension-id="clinical-appointments-dashboard"]',
            title: 'Congrats! You have reached the clinical appointments dashboard.',
            disableOverlayClose: true,
          },
          {
            target: '[aria-label="OpenMRS"]',
            title:
              'Now, let’s see how this behaves when elements take a bit longer to load. Set your network throttling to "Slow 3G" and hit "Next".',
            disableOverlayClose: true,
            hideBackButton: true,
          },
          {
            target: '[data-extension-id="laboratory-dashboard-link"]',
            title:
              'Let\'s navigate to the laboratory page. Our next target is the "Tests Ordered" table. I’ll disappear once you reach the laboratory page and reappear when the table is loaded. See you there!',
            hideCloseButton: true,
            hideNextButton: true,
            disableOverlayClose: true,
            spotlightClicks: true,
            data: {
              autoNextOn: '[data-extension-id="laboratory-dashboard"]',
            },
          },
          {
            target: '[data-extension-id="all-lab-requests-table"] table',
            title:
              "It's me again. By default, I'll wait for the element to appear, so you don't have to worry about slow components when writing a new tutorial.",
            disableOverlayClose: true,
            hideBackButton: true,
          },
          {
            target: '[aria-label="OpenMRS"]',
            title:
              "Now let's do a fun exercise. Can you find out how to view a patient's allergies on your own? Feel free to turn off network throttling. ;) ",
          },
          {
            target: '[data-extension-slot-name="patient-chart-allergies-dashboard-slot"]',
            title:
              'Great job! You found the allergies section! This is the end of the tutorial. Feel free to explore the system on your own or check out the other tutorials.',
          },
          {
            target: 'button[type="submit"]',
            title: 'Register Patient',
            content: "Click this button to register the patient's information into the system.",
            disableBeacon: true,
          },
        ],
      },

      {
        title: 'Tutorial for demo purposes',
        description: 'This tutorial is for demo / debugging purposes only',
        steps: [
          {
            target: '[aria-label="OpenMRS"]',
            title: 'Let us walk through the tutorial features together.',
            disableBeacon: true,
          },
          {
            target: '[data-extension-id="clinical-appointments-dashboard-link"]',
            title: 'Click on this link. This step is configured to be automatic and will take you to the next step. Once the given query selector resolves an element on the page, it will proceed automatically.',
            hideCloseButton: true,
            hideNextButton: true,
            disableOverlayClose: true,
            spotlightClicks: true,
            data: {
              autoNextOn: '[data-extension-id="clinical-appointments-dashboard"]',
            }
          },
          {
            target: '[data-extension-id="clinical-appointments-dashboard"]',
            title: 'Congrats! You have reached the clinical appointments dashboard.',
            disableOverlayClose: true,
          },
          {
            target: '[aria-label="OpenMRS"]',
            title: 'Now, let’s see how this behaves when elements take a bit longer to load. Set your network throttling to "Slow 3G" and hit "Next".',
            disableOverlayClose: true,
            hideBackButton: true,
          },
          {
            target: '[data-extension-id="laboratory-dashboard-link"]',
            title: 'Let\'s navigate to the laboratory page. Our next target is the "Tests Ordered" table. I’ll disappear once you reach the laboratory page and reappear when the table is loaded. See you there!',
            hideCloseButton: true,
            hideNextButton: true,
            disableOverlayClose: true,
            spotlightClicks: true,
            data: {
              autoNextOn: '[data-extension-id="laboratory-dashboard"]',
            }
          },
          {
            target: '[data-extension-id="all-lab-requests-table"] table',
            title: 'It\'s me again. By default, I\'ll wait for the element to appear, so you don\'t have to worry about slow components when writing a new tutorial.',
            disableOverlayClose: true,
            hideBackButton: true,
          },
          {
            target: '[aria-label="OpenMRS"]',
            title: 'Now let\'s do a fun exercise. Can you find out how to view a patient\'s allergies on your own? Feel free to turn off network throttling. ;) ',
          },
          {
            target: '[data-extension-slot-name="patient-chart-allergies-dashboard-slot"]',
            title: 'Great job! You found the allergies section! This is the end of the tutorial. Feel free to explore the system on your own or check out the other tutorials.',
          }
        ]
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
      title: string;
      content: string;
      disableBeacon: boolean;
      data?: {
        autoNextOn?: boolean;
      }
    }[];
  }[];
};
