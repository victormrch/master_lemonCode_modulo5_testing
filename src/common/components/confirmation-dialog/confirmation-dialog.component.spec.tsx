import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('confirmation dialog component specs', () => {
  it('should be displayed when it feeds "isOpen" property with "true" value', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'test title',
      labels: {
        closeButton: 'test close btn',
        acceptButton: 'test accept btn',
      },
    };

    // Act
    render(
      <ConfirmationDialogComponent {...props}>
        <span>test children</span>
      </ConfirmationDialogComponent>
    );

    const dialogElement = screen.getByRole('dialog');
    const dialogTitleElement = screen.getByText(props.title);
    const dialogContentElement = screen.getByText('test children');
    const closeButtonElement = screen.getByRole('button', {
      name: props.labels.closeButton,
    });
    const acceptButtonElement = screen.getByRole('button', {
      name: props.labels.acceptButton,
    });

    // Assert
    expect(dialogElement).toBeInTheDocument();
    expect(dialogTitleElement).toBeInTheDocument();
    expect(dialogContentElement).toBeInTheDocument();
    expect(closeButtonElement).toBeInTheDocument();
    expect(acceptButtonElement).toBeInTheDocument();
  });

  it('should not be displayed when it feeds "isOpen" property with "false" value', () => {
    // Arrange
    const props = {
      isOpen: false,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'test title',
      labels: {
        closeButton: 'test close btn',
        acceptButton: 'test accept btn',
      },
    };

    // Act
    render(
      <ConfirmationDialogComponent {...props}>
        <span>test children</span>
      </ConfirmationDialogComponent>
    );

    const dialogElement = screen.queryByRole('dialog');
    const dialogTitleElement = screen.queryByText(props.title);
    const dialogContentElement = screen.queryByText('test children');
    const closeButtonElement = screen.queryByRole('button', {
      name: props.labels.closeButton,
    });
    const acceptButtonElement = screen.queryByRole('button', {
      name: props.labels.acceptButton,
    });

    // Assert
    expect(dialogElement).toEqual(null);
    expect(dialogTitleElement).toEqual(null);
    expect(dialogContentElement).toEqual(null);
    expect(closeButtonElement).toEqual(null);
    expect(acceptButtonElement).toEqual(null);
  });

  it('when "closeButton" is clicked, "onClose" function should be called one time per click', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'test title',
      labels: {
        closeButton: 'test close btn',
        acceptButton: 'test accept btn',
      },
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    const closeButtonElement = screen.getByRole('button', {
      name: props.labels.closeButton,
    });

    expect(props.onClose).toHaveBeenCalledTimes(0);

    userEvent.click(closeButtonElement);

    // Assert
    expect(props.onClose).toHaveBeenCalled();
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it('when "acceptButton" is clicked, "onAccept" and "onClose" funtions should be called one time per click', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'test title',
      labels: {
        closeButton: 'test close btn',
        acceptButton: 'test accept btn',
      },
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    const acceptButtonElement = screen.getByRole('button', {
      name: props.labels.acceptButton,
    });

    expect(props.onClose).toHaveBeenCalledTimes(0);
    expect(props.onAccept).toHaveBeenCalledTimes(0);

    userEvent.click(acceptButtonElement);

    // Assert
    expect(props.onAccept).toHaveBeenCalled();
    expect(props.onAccept).toHaveBeenCalledTimes(1);
    expect(props.onClose).toHaveBeenCalled();
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });
});
