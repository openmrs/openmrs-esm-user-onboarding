import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '@carbon/react';
import { useConfig } from '@openmrs/esm-framework';
import styles from './styles.scss';

const TutorialModal = ({ open, onClose }) => {
  const { t } = useTranslation();
  const config = useConfig();
  const tutorialData = config.tutorialData;

  return (
    <Modal open={open} onRequestClose={onClose} passiveModal modalHeading={t('tutorial', 'Tutorials')}>
      <p className={styles.description}>
        {t('modalDescription', 'Find walkthroughs and video tutorials on some of the core features of OpenMRS.')}
      </p>
      <div className={styles.tutorialModal}>
        {tutorialData.map((tutorial, index) => (
          <div className={styles.tutorialItem} key={index}>
            <h3>{tutorial.title}</h3>
            <p>{tutorial.description}</p>
            <div className={styles.walkthrough}>{t('walkthrough', 'Walkthrough')}</div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default TutorialModal;
