import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { Textarea } from './textarea';

describe('Textarea', () => {
  beforeAll(() => {
    global.scrollTo = vi.fn() as unknown as (
      options?: ScrollToOptions | number,
      y?: number
    ) => void;
  });

  it('renders correctly', () => {
    render(<Textarea data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');

    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('rows', '3'); // Default size is 'md'
  });

  it('supports different sizes', () => {
    render(<Textarea size="lg" data-testid="textarea-lg" />);
    const textareaLg = screen.getByTestId('textarea-lg');

    expect(textareaLg).toHaveAttribute('rows', '4');
  });

  it('supports a label', () => {
    render(<Textarea label="Description" />);
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');

    fireEvent.change(textarea, { target: { value: 'Hello' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('trims value on blur', () => {
    const handleChange = vi.fn();
    render(
      <Textarea
        onChange={handleChange}
        data-testid="textarea"
        defaultValue="  Hello  "
      />
    );
    const textarea = screen.getByTestId('textarea');

    fireEvent.blur(textarea);
    expect(handleChange).toHaveBeenCalled();
    expect(handleChange.mock.calls[0][0].target.value).toBe('Hello');
  });

  it('supports maxLength', () => {
    render(<Textarea maxLength={10} data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');

    expect(textarea).toHaveAttribute('maxLength', '10');
  });

  it('disables the textarea when disabled prop is set', () => {
    render(<Textarea disabled data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');

    expect(textarea).toBeDisabled();
  });

  it('displays an error message', () => {
    render(<Textarea error="This is an error" />);
    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });
});
