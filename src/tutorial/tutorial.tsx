import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Tutorials from './modal.component';

const Tutorial = () => {
  const { t } = useTranslation();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <div onClick={handleOpenModal}>{t('tutorials', 'Tutorials')}</div>
      <Tutorials open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Tutorial;
