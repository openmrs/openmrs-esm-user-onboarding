import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '@carbon/react';
import { useConfig } from '@openmrs/esm-framework';
import { useOnboarding } from '../onboarding-context';
import styles from './styles.scss';

const TutorialModal = ({ open, onClose }) => {
  const { t } = useTranslation();
  const config = useConfig();
  const tutorialData = config.tutorialData;
  const tutorialSteps = config.tutorialSteps;
  const { startOnboarding } = useOnboarding();

  const handleWalkthroughClick = (tutorialId) => {
    const steps = tutorialSteps.find((tutorial) => tutorial.tutorialId === tutorialId)?.steps;
    if (steps) {
      startOnboarding(steps);
    }
    onClose();
  };

  return (
    <Modal open={open} onRequestClose={onClose} passiveModal modalHeading={t('tutorial', 'Tutorials')}>
      <p className={styles.description}>
        {t('modalDescription', 'Find walkthroughs and video tutorials on some of the core features of OpenMRS.')}
      </p>
      <div className={styles.tutorialModal}>
        {tutorialData.map((tutorial) => (
          <div className={styles.tutorialItem} key={tutorial.id}>
            <h3 className={styles.tutorialTitle}>{tutorial.title}</h3>
            <p className={styles.tutorialDescription}>{tutorial.description}</p>
            <div className={styles.walkthrough} onClick={() => handleWalkthroughClick(tutorial.id)}>
              {t('walkthrough', 'Walkthrough')}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default TutorialModal;
