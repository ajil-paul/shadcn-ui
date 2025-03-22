import React from 'react';
import { render, screen } from '@testing-library/react';
import { Label } from './label';
import { describe, it, expect } from 'vitest';

describe('Label', () => {
  it('renders correctly', () => {
    render(<Label htmlFor="test-input">Test Label</Label>);
    const labelElement = screen.getByText(/Test Label/i);

    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute('for', 'test-input');
  });

  it('applies custom className', () => {
    render(<Label className="custom-class">Styled Label</Label>);
    const labelElement = screen.getByText(/Styled Label/i);

    expect(labelElement).toHaveClass('custom-class');
  });

  it('handles disabled state via peer styles', () => {
    render(<Label className="peer-disabled">Disabled Label</Label>);
    const labelElement = screen.getByText(/Disabled Label/i);

    expect(labelElement).toHaveClass('peer-disabled');
  });
});
