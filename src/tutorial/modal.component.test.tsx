import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import TutorialModal from './modal.component';
import RootComponent from '../root.component';
import {useAppContext, useConfig, navigate} from "@openmrs/esm-framework";
import userEvent from '@testing-library/user-event'

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
    title: 'Tutorial 1',
    description: 'Description 1',
    steps: [{target: '.my-selector', content: 'Step content'}],
  }
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
    jest.clearAllMocks();
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

    render(<TutorialModal open={true} onClose={jest.fn()}/>);

    const walkthroughButton = screen.getByText('Walkthrough');
    await user.click(walkthroughButton);

    expect(navigate).toHaveBeenCalledWith({ to: '/spa-base/home' });
    Object.defineProperty(window.location, 'pathname', {
      value: '/spa-base/home',
    });

    await waitFor(() => expect(setSteps).toHaveBeenCalledWith(mockTutorialData[0].steps));
    await waitFor(() => expect(setShowTutorial).toHaveBeenCalledWith(true));
  });

  test.todo('renders tutorials properly');

});

