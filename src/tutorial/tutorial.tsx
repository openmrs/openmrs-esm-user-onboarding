import React from 'react';
import { useTranslation } from 'react-i18next';


const Tutorial = () => {
  const { t } = useTranslation();

  return <div >{t('tutorials', 'Tutorials')}</div>;
};

export default Tutorial;
