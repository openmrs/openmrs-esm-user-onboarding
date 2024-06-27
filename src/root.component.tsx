import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfig } from '@openmrs/esm-framework';
import { type Config } from './config-schema';
import ReactJoyride from 'react-joyride';

const Root: React.FC = () => {
  const { t } = useTranslation();
  const config = useConfig() as Config;

  const [runJoyride, setRunJoyride] = useState<boolean>(config.showTutorial);
  const steps = [
    {
      target: '[aria-label="OpenMRS"]',
      content: t('welcome', 'Welcome to OpenMRS!'),
      disableBeacon: true,
    },
  ];

  useEffect(() => {
    setRunJoyride(config.showTutorial);
  }, [config.showTutorial]);

  return <ReactJoyride steps={steps} run={runJoyride} />;
};

export default Root;
