import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';

import { Typography } from './typography';

describe('Typography Component', () => {
  it('renders the correct default tag and type', () => {
    render(<Typography>Test Text</Typography>);
    const element = screen.getByText('Test Text');

    expect(element).toBeInTheDocument();
    expect(element.tagName.toLowerCase()).toBe('p'); // Default to <p> for body2
  });

  it('renders different heading types correctly', () => {
    const { rerender } = render(<Typography type="h1">Heading 1</Typography>);
    expect(screen.getByText('Heading 1').tagName.toLowerCase()).toBe('h1');

    rerender(<Typography type="h2">Heading 2</Typography>);
    expect(screen.getByText('Heading 2').tagName.toLowerCase()).toBe('h2');

    rerender(<Typography type="h3">Heading 3</Typography>);
    expect(screen.getByText('Heading 3').tagName.toLowerCase()).toBe('h3');
  });

  it('applies custom `as` prop correctly', () => {
    render(
      <Typography type="h1" as="span">
        Custom Span
      </Typography>
    );
    const element = screen.getByText('Custom Span');
    expect(element.tagName.toLowerCase()).toBe('span'); // Overrides h1 with span
  });

  it('applies additional classNames', () => {
    render(
      <Typography type="body1" className="custom-class">
        Custom Class Test
      </Typography>
    );
    const element = screen.getByText('Custom Class Test');
    expect(element).toHaveClass('custom-class');
  });
});
