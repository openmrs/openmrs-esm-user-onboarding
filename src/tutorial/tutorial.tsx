import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.scss';

const Tutorial = () => {
  const { t } = useTranslation();

  return <div className={styles.helpButton}>{t('tutorials', 'Tutorials')}</div>;
};

export default Tutorial;
