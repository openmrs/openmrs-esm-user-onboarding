import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { useAppContext, useConfig, navigate } from '@openmrs/esm-framework';
import TutorialModal from './modal.component';

jest.mock('@openmrs/esm-framework', () => ({
  useConfig: jest.fn(),
  useAppContext: jest.fn(),
  navigate: jest.fn(),
}));

const setShowTutorial = jest.fn();
const setSteps = jest.fn();

const mockUseAppContext = jest.mocked(useAppContext);
const mockUseConfig = jest.mocked(useConfig);
const mockNavigate = jest.mocked(navigate);

const mockTutorialData = [
  {
    title: 'Basic Tutorial',
    description: 'This Shows Basic Tutorials',
    steps: [
      { target: '[aria-label="OpenMRS"]', content: 'Welcome to OpenMRS' },
      { target: '[aria-label="NavBar"]', content: 'This is the Navbar' },
    ],
  },
  {
    title: 'Patient Registration Tutorial',
    description: 'This Shows how to register a patient in OpenMRS',
    steps: [
      {
        target: '[aria-label="add-btn"]',
        content: 'This is the Add Patient button',
      },
      {
        target: '[aria-label="register-form"]',
        content: 'This is the Registration form',
      },
      {
        target: '[aria-label="register-btn"]',
        content: 'This is the Register button',
      },
    ],
  },
];

mockUseConfig.mockReturnValue({
  tutorialData: mockTutorialData,
});

mockUseAppContext.mockReturnValue({
  setShowTutorial,
  setSteps,
});

describe('TutorialModal', () => {
  afterEach(() => {
    delete window.location;
    window.location = { pathname: '/patient-registration' } as any;
  });

  test('sends correct data to the root component when walkthrough button is clicked', async () => {
    const user = userEvent.setup();

    (window as any).getOpenmrsSpaBase = jest.fn(() => '/spa-base/');
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/patient-registration',
      },
    });

    render(<TutorialModal open={true} onClose={jest.fn()} />);

    const walkthroughButton = screen.getAllByText('Walkthrough');
    await user.click(walkthroughButton[0]);

    expect(mockNavigate).toHaveBeenCalledWith(
      expect.objectContaining({
        to: expect.stringContaining('/spa-base/home/service-queues'),
      }),
    );
    Object.defineProperty(window.location, 'pathname', {
      value: '/spa-base/home/service-queues',
    });

    await waitFor(() => expect(setSteps).toHaveBeenCalledWith(mockTutorialData[0].steps));
    await waitFor(() => expect(setShowTutorial).toHaveBeenCalledWith(true));
  });

  test('renders tutorials properly', async () => {
    render(<TutorialModal open={true} onClose={jest.fn()} />);

    mockTutorialData.forEach((tutorial) => {
      expect(screen.getByText(tutorial.title)).toBeInTheDocument();
      expect(screen.getByText(tutorial.description)).toBeInTheDocument();
    });
  });
});
