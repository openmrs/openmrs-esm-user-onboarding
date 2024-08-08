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
          content: 'Welcome to OpenMRS! This is the main dashboard where you can navigate to various features of the system.',
          disableBeacon: true
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
        ],
      },
      {
        title: 'Patient Registration Tutorial',
        description: 'Learn how to register a new patient into the system.',
        steps: [
          {
            target: '[name="AddPatientIcon"]',
            title: 'Add Patient',
            content: 'Click here to add a patient to the system.',
            disableBeacon: true,
            disableOverlayClose: true,
            spotlightClicks: true,
            hideCloseButton: true,
            hideNextButton: true,
            hideFooter: true,
            data: {
              autoNextOn: '#demographics',
            },
          },
          {
            target: '#demographics',
            title: 'Demographics',
            content:
              'This is the Demographics section. Here you can find various fields and information related to the patient.',
            disableBeacon: true,
            hideBackButton: true,
          },
          {
            target: '#contact',
            title: 'Contact Details',
            content: "Here you can update the patient's contact information.",
            disableBeacon: true,
          },
          {
            target: '#relationships',
            title: 'Relationships',
            content: "In this section, you can manage the patient's relationships.",
            disableBeacon: true,
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
        title: 'Patient Chart Tutorial',
        description:
          'Patient chart is the main point of interaction between healthcare professionals and patient data, where you can manage everything related to a single patient.',
        steps: [
          {
            target: '[data-testid="searchPatientIcon"]',
            title: 'Search icon',
            content:
              'To access the patient chart, first, you need to select a patient. To start, click here to open the search box so that we can search for a patient.',
            disableBeacon: true,
            disableOverlayClose: true,
            spotlightClicks: true,
            hideNextButton: true,
            data: {
              autoNextOn: '[data-testid="patientSearchBar"]',
            },
          },
          {
            target: '[data-testid="patientSearchBar"]',
            title: 'Search box',
            content:
              'Now, enter the name or the ID of the patient here. Some example patient names that you can search for are: John, Smith, Mary.',
            hideNextButton: true,
            hideBackButton: true,
            disableOverlayClose: true,
            spotlightClicks: true,
            data: {
              autoNextOn: '[data-testid="floatingSearchResultsContainer"]',
            },
          },
          {
            target: '[data-testid="floatingSearchResultsContainer"]',
            title: 'Search results',
            content: 'Click on the patient you want to go to their patient chart.',
            spotlightClicks: true,
            disableOverlayClose: true,
            disableOverlay : true,
            placement: 'left',
            hideNextButton: true,
            hideBackButton: true,
            data: {
              autoNextOn: '[data-extension-slot-name="action-menu-patient-chart-items-slot"]',
            },
          },
          {
            target: 'body',
            title: 'Patient Chart',
            content: 'Welcome to the Patient Chart View! Here, you can quickly see everything about your patient's health history, visits, medications, allergies, and test results—all in one place. It's designed to help you provide the best care efficiently.',
            spotlightClicks: true,
            disableOverlayClose: true,
            hideBackButton: true,
            placement: 'center',
          },
          {
            target: '[data-extension-id="patient-banner"]',
            title: 'Patient header',
            content:
              'The patient header contains all the key information you need to identify the patient you are currently viewing. You can click on the "Show Details" button to see additional patient information.',
            disableOverlayClose: true,
            spotlightClicks: true,
            hideBackButton: true,
          },
          {
            target: '[aria-label="Left navigation"]',
            title: 'Left panel',
            content:
              'The left panel shows the sections of the patient chart. Currently, we are on the patient summary page.',
            disableOverlayClose: true,
            spotlightClicks: true,
            placement: 'right',
          },
          {
            target: '[data-extension-slot-name="patient-chart-summary-dashboard-slot"]',
            title: 'Patient summary widgets',
            content:
              'Patient Summary is a personalized view made up of widgets that show essential features and information for quick access.',
            disableOverlayClose: true,
          },
          {
            target: '[data-extension-slot-name="action-menu-patient-chart-items-slot"]',
            title: 'Siderail',
            content:
              'The siderail contains a series of links that take users to different tabs in the Workspace, such as the order basket, visit notes, and clinical forms. Once open, the Workspace is persistent across pages (for example, all pages within the patient chart).',
          },
          {
            target: 'body',
            title:
              "Great job! You've completed the tutorial. Now, take a moment to explore the Patient Chart View and discover all its features. Feel free to navigate around and get comfortable with the layout. If you need to return to the home page, just click the close button in the top right corner. Happy exploring!",
            disableOverlayClose: true,
            placement: 'center',
          },
        ],
      },
    ],
  },
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
      };
    }[];
  }[];
};
