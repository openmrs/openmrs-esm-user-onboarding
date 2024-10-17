import React from 'react';
import { useTranslation } from 'react-i18next';
import { showModal } from '@openmrs/esm-framework';
import styles from './styles.scss'

const Tutorial = () => {
  const { t } = useTranslation();

  const handleOpenModal = () => {
    const dispose = showModal('tutorial-modal', {
      onClose: () => dispose(),
      size: 'sm',
    });
  };

  return (
    <>
      <div onClick={handleOpenModal} className={styles.tutorialsText}>{t('tutorials', 'Tutorials')}</div>
    </>
  );
};

export default Tutorial;
