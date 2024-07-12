import React from 'react';
import { useTranslation } from 'react-i18next';
import { showModal } from '@openmrs/esm-framework';

const Tutorial = () => {
  const { t } = useTranslation();

  const handleOpenModal = () => {
    const dispose = showModal('tutorial-modal', {
      onClose: () => dispose(),
    });
  };

  return (
    <>
      <div onClick={handleOpenModal}>{t('tutorials', 'Tutorials')}</div>
    </>
  );
};

export default Tutorial;
