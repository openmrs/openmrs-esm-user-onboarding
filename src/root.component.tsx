import React from 'react';
import ReactJoyride from 'react-joyride';
import { useOnboarding } from './onboarding-context';

const RootComponent: React.FC = () => {
  const { runJoyride, steps } = useOnboarding();
  return <ReactJoyride steps={steps} run={runJoyride} />;
};
export default RootComponent;
