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
          'OpenMRS is a patient-centered medical record system that is designed to be flexible and extensible. It is a platform that supports a wide range of applications for use in low-resource settings. OpenMRS is a multi-institution, non-profit collaborative led by Regenstrief Institute, a world-renowned leader in medical informatics research, and Partners In Health, a Boston-based philanthropic organization.',
      },
      {
        title: 'Tasks',
        description:
          'Find and organize what needs to be done for patients with task lists. Tasks are created both automatically based on data in the patient’s chart as well as manually by you or your colleagues.',
      },
      {
        title: 'Order basket',
        description: 'A single place for referral, imaging, drug and lab test orders.',
      },
      {
        title: 'Patient lists',
        description:
          'Service queues help you manage your clinic. Patients can be organized by priority level and you can track the wait time for each of your clinic’s key areas.',
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
  }[];
};
