import React from 'react';
import { useTranslation } from 'react-i18next';
import { useConfig, useAppContext, navigate } from '@openmrs/esm-framework';
import styles from './styles.scss';
import { type TutorialContext } from '../types';
import { ModalHeader, ModalBody } from '@carbon/react';

const TutorialModal = ({ open, onClose }) => {
  const { t } = useTranslation();
  const config = useConfig();
  const tutorials = config.tutorialData;
  const tutorialContext = useAppContext<TutorialContext>('tutorial-context');

  const handleWalkthroughClick = (index: number) => {
    const basePath = window.getOpenmrsSpaBase();
    const homePath = `${basePath}home`;
    const currentPath = window.location.pathname;
    const tutorial = tutorials[index];

    const setTutorialSteps = () => {
      tutorialContext.setSteps(tutorial.steps);
      tutorialContext.setShowTutorial(true);
    };

    if (currentPath === homePath) {
      setTutorialSteps();
    } else {
      navigate({ to: homePath });

      const intervalId = setInterval(() => {
        if (window.location.pathname === homePath) {
          setTutorialSteps();
          clearInterval(intervalId);
        }
      }, 100);
    }
    onClose();
  };

  return (
    <React.Fragment>
      <ModalHeader closeModal={onClose} title={t('tutorial', 'Tutorial')}>
        <p className={styles.description}>
          {t('modalDescription', 'Find walkthroughs and video tutorials on some of the core features of OpenMRS.')}
        </p>
      </ModalHeader>
      <ModalBody className={styles.tutorialModal}>
        {tutorials.map((tutorial, index) => (
          <div className={styles.tutorialItem} key={index}>
            <h3 className={styles.tutorialTitle}>{tutorial.title}</h3>
            <p className={styles.tutorialDescription}>{tutorial.description}</p>
            <div className={styles.walkthrough} onClick={() => handleWalkthroughClick(index)}>
              {t('walkthrough', 'Walkthrough')}
            </div>
          </div>
        ))}
      </ModalBody>
    </React.Fragment>
  );
};

export default TutorialModal;
