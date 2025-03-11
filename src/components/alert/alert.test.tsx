import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Alert } from './alert';

describe('Alert', () => {
  const defaultProps = {
    isOpen: true,
    title: 'Delete Item',
    description: 'Are you sure you want to delete this item?',
    actionLabel: 'Delete',
    cancelLabel: 'Cancel',
    onAction: vi.fn(),
    onClose: vi.fn(),
  };

  it('should render title and description', () => {
    render(<Alert {...defaultProps} />);
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
  });

  it('should trigger onAction when action button is clicked', () => {
    render(<Alert {...defaultProps} />);
    const actionButton = screen.getByText(defaultProps.actionLabel);
    fireEvent.click(actionButton);
    expect(defaultProps.onAction).toHaveBeenCalled();
  });

  it('should trigger onClose when dialog is closed', () => {
    render(<Alert {...defaultProps} />);
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('should render trigger button if triggerButtonProps is provided', () => {
    const triggerButtonProps = {
      label: 'Open Dialog',
      onClick: vi.fn(),
    };
    render(<Alert {...defaultProps} triggerButtonProps={triggerButtonProps} />);
    const triggerButton = screen.getByText(triggerButtonProps.label);
    expect(triggerButton).toBeInTheDocument();
  });

  it('should not render trigger button if triggerButtonProps is not provided', () => {
    render(<Alert {...defaultProps} />);
    expect(screen.queryByText('Open Dialog')).not.toBeInTheDocument();
  });

  it('should call onClose when clicking the cancel button', () => {
    render(<Alert {...defaultProps} />);
    const cancelButton = screen.getByText(defaultProps.cancelLabel);
    fireEvent.click(cancelButton);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('should close dialog when cancel button is clicked', () => {
    render(<Alert {...defaultProps} />);
    const cancelButton = screen.getByText(defaultProps.cancelLabel);
    fireEvent.click(cancelButton);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('should handle custom trigger button click', () => {
    const triggerButtonProps = {
      label: 'Open Dialog',
      onClick: vi.fn(),
    };
    render(<Alert {...defaultProps} triggerButtonProps={triggerButtonProps} />);
    const triggerButton = screen.getByText(triggerButtonProps.label);
    fireEvent.click(triggerButton);
    expect(triggerButtonProps.onClick).toHaveBeenCalled();
  });
});
