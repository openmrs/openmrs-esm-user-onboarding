import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Tutorials from './modal.component';
import { OnboardingProvider } from '../onboarding-context';
import RootComponent from '../root.component';

const Tutorial = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <OnboardingProvider>
      <div onClick={handleOpenModal}>{t('tutorials', 'Tutorials')}</div>
      <Tutorials open={isModalOpen} onClose={handleCloseModal} />
      <RootComponent />
    </OnboardingProvider>
  );
};

export default Tutorial;
