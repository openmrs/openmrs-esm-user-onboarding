import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import TutorialModal from './modal.component';
import RootComponent from '../root.component';
import {useAppContext, useConfig} from "@openmrs/esm-framework";
import userEvent from '@testing-library/user-event'

jest.mock('@openmrs/esm-framework', () => ({
  useConfig: jest.fn(),
  useAppContext: jest.fn(),
}));

const setShowTutorial = jest.fn();
const setSteps = jest.fn();

const mockUseAppContext = jest.mocked(useAppContext);
const mockUseConfig = jest.mocked(useConfig)

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
  });

  test('sends correct data to the root component when walkthrough button is clicked', async () => {
    const user = userEvent.setup();

    render(<TutorialModal open={true} onClose={jest.fn()}/>);

    const walkthroughButton = screen.getByText('Walkthrough');
    await user.click(walkthroughButton);

    expect(setSteps).toHaveBeenCalledWith(mockTutorialData[0].steps);
    expect(setShowTutorial).toHaveBeenCalledWith(true);
  });

  test.todo('renders tutorials properly');

});

