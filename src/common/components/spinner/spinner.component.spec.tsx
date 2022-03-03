import React from 'react';
import { render, screen } from '@testing-library/react';
import { SpinnerComponent } from './spinner.component';
import * as promiseTracker from 'react-promise-tracker/lib/trackerHook';

describe('spinner component spec', () => {
  it('should not be displayed by default', () => {
    // Arrange

    // Act
    render(<SpinnerComponent />);
    const spinnerElement = screen.queryByRole('status');

    // Assert
    expect(spinnerElement).toEqual(null);
  });

  it('should be displayed when "promiseInProgress" is "true"', () => {
    // Arrange
    jest
      .spyOn(promiseTracker, 'usePromiseTracker')
      .mockImplementation(() => ({ promiseInProgress: true }));

    // Act
    render(<SpinnerComponent />);
    const spinnerElement = screen.getByRole('status');

    // Assert
    expect(spinnerElement).toBeInTheDocument();
  });

  it('should not be displayed when "promiseInProgress" become "false" after being "true"', () => {
    // Arrange
    jest
      .spyOn(promiseTracker, 'usePromiseTracker')
      .mockImplementation(() => ({ promiseInProgress: true }));

    jest
      .spyOn(promiseTracker, 'usePromiseTracker')
      .mockImplementation(() => ({ promiseInProgress: false }));

    // Act
    render(<SpinnerComponent />);
    const spinnerElement = screen.queryByRole('status');

    // Assert
    expect(spinnerElement).toEqual(null);
  });
});
