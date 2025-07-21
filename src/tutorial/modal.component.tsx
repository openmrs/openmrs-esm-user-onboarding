import React from 'react';
import { ArrowRight } from '@carbon/react/icons';
import { ModalHeader, ModalBody, Link } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { useConfig, useAppContext, navigate } from '@openmrs/esm-framework';
import { type TutorialContext } from '../types';
import styles from './styles.scss';

const TutorialModal = ({ open, onClose }) => {
  const { t } = useTranslation();
  const config = useConfig();
  const tutorials = config.tutorialData;
  const tutorialContext = useAppContext<TutorialContext>('tutorial-context');

  const handleWalkthroughClick = (index: number) => {
    const basePath = window.getOpenmrsSpaBase();
    const homePath = `${basePath}home/service-queues`;
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
      <ModalHeader closeModal={onClose} title={t('tutorial', 'Tutorial')} className={styles.modalHeader}>
        <p className={styles.description}>
          {t('modalDescription', 'Find walkthroughs and video tutorials on some of the core features of OpenMRS.')}
        </p>
      </ModalHeader>
      <ModalBody className={styles.tutorialModal}>
        <ul>
          {tutorials.map((tutorial, index) => (
            <li className={styles.tutorialItem} key={index}>
              <h3 className={styles.tutorialTitle}>{tutorial.title}</h3>
              <p className={styles.tutorialDescription}>{tutorial.description}</p>
              <Link
                onClick={() => handleWalkthroughClick(index)}
                className={styles.tutorialLink}
                renderIcon={() => <ArrowRight aria-label="Arrow Right" />}
              >
                {t('walkthrough', 'Walkthrough')}
              </Link>
            </li>
          ))}
        </ul>
      </ModalBody>
    </React.Fragment>
  );
};

export default TutorialModal;
