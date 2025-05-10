import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { Pane, Header, Body, Footer } from './pane';
import { Button } from '../button';

describe('Pane Component', () => {
  it('renders Pane with trigger button', () => {
    render(
      <Pane trigger={<Button label="Open Pane" />}>
        <Header title="Test Title" description="Test Description" />
        <Body>Test Content</Body>
        <Footer>Test Footer</Footer>
      </Pane>
    );

    expect(screen.getByText('Open Pane')).toBeInTheDocument();
  });

  it('renders Pane with all sub components', () => {
    render(
      <Pane defaultOpen>
        <Header title="Test Title" description="Test Description" />
        <Body>Test Content</Body>
        <Footer>Test Footer</Footer>
      </Pane>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('Test Footer')).toBeInTheDocument();
  });

  it('applies correct size class based on size prop', () => {
    render(
      <Pane defaultOpen size="lg">
        <Header title="Test Title" />
        <Body>Test Content</Body>
      </Pane>
    );

    expect(screen.getByTestId('shadcn-pane-content')).toHaveClass(
      'sm:max-w-5xl'
    );
  });

  it('handles open state correctly', () => {
    const onOpenChange = vi.fn();
    render(
      <Pane open={true} onOpenChange={onOpenChange}>
        <Header title="Test Title" />
        <Body>Test Content</Body>
      </Pane>
    );

    // The Sheet component from Radix UI handles the open state internally
    // We can verify that the content is rendered when open
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders Header with custom className', () => {
    render(
      <Pane open defaultOpen>
        <Header className="custom-class" title="Test Title" />
      </Pane>
    );

    const header = document.querySelector('.shadcn-pane-header--wrapper');
    expect(header).toHaveClass('custom-class');
  });

  it('renders Body with custom className', () => {
    const { container } = render(
      <Body className="custom-class">Test Content</Body>
    );

    const body = container.querySelector('.shadcn-pane-body--wrapper');
    expect(body).toHaveClass('custom-class');
  });

  it('renders Footer with custom className', () => {
    const { container } = render(
      <Footer className="custom-class">Test Footer</Footer>
    );

    const footer = container.querySelector('.shadcn-pane-footer--wrapper');
    expect(footer).toHaveClass('custom-class');
  });

  it('renders Header without title and description', () => {
    render(<Header>Custom Content</Header>);
    expect(screen.getByText('Custom Content')).toBeInTheDocument();
  });

  it('renders Body with children', () => {
    render(
      <Body>
        <div>Nested Content</div>
      </Body>
    );
    expect(screen.getByText('Nested Content')).toBeInTheDocument();
  });

  it('renders Footer with children', () => {
    render(
      <Footer>
        <Button label="Save" />
        <Button label="Cancel" />
      </Footer>
    );
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });
});
