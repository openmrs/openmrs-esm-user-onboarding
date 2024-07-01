import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal } from '@carbon/react';

const tutorialData = [
  {
    title: 'Patient search',
    description:
      'Quickly find patients by name, ID, or other identifiers. You can also search for patients by their attributes',
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
];

const TutorialModal = ({ open, onClose }) => {
  const { t } = useTranslation();

  return (
    <Modal open={open} onRequestClose={onClose} passiveModal modalHeading={t('modalHeading', 'Tutorials')}>
      <p>{t('modalDescription', 'Find walkthroughs and video tutorials on some of the core features of OpenMRS.')}</p>
      <div>
        {tutorialData.map((tutorial, index) => (
          <div key={index}>
            <h4>{t(`tutorials.${index}.title`, tutorial.title)}</h4>
            <p>{t(`tutorials.${index}.description`, tutorial.description)}</p>
            <a>{t('walkthrough', 'Walkthrough')}</a>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default TutorialModal;
