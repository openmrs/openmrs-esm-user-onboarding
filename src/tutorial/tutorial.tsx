import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Tutorials from './modal.component';
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
    <>
      <div onClick={handleOpenModal}>{t('tutorials', 'Tutorials')}</div>
      <Tutorials open={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default Tutorial;
