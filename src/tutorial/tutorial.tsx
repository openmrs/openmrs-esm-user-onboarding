import React from 'react';
import { useTranslation } from 'react-i18next';
import { showModal, useConfig } from '@openmrs/esm-framework';
import { type Config } from '../config-schema';

const Tutorial = () => {
  const { t } = useTranslation();
  const config = useConfig() as Config;
  const showTutorial = config?.enableTutorials;
  const handleOpenModal = () => {
    const dispose = showModal('tutorial-modal', {
      onClose: () => dispose(),
      size: 'sm',
    });
  };

  return showTutorial ? <div onClick={handleOpenModal}>{t('tutorials', 'Tutorials')}</div> : null;
};

export default Tutorial;
