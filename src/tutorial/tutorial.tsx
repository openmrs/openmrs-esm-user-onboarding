import React from 'react';
import { useTranslation } from 'react-i18next';
import { showModal } from '@openmrs/esm-framework';
import { MenuItem } from '@carbon/react';
import styles from './styles.scss';

const Tutorial = () => {
  const { t } = useTranslation();

  const handleOpenModal = () => {
    const dispose = showModal('tutorial-modal', {
      onClose: () => dispose(),
    });
  };

  return (
    <>
      <MenuItem 
        onClick={handleOpenModal}
        label={t('tutorials', 'Tutorials')}
        className={styles.tutorialMenuItem}
      />
    </>
  );
};

export default Tutorial;
