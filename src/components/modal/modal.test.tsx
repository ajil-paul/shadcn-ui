import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

import { Button } from '../button';

import { Modal, Header, Body, Footer } from './modal';

describe('Modal Component', () => {
  it('renders Modal with trigger button', () => {
    render(
      <Modal trigger={<Button label="Open Modal" />}>
        <Header title="Test Title" description="Test Description" />
        <Body>Test Content</Body>
        <Footer>Test Footer</Footer>
      </Modal>
    );

    expect(screen.getByText('Open Modal')).toBeInTheDocument();
  });

  it('renders Modal with all sub components', () => {
    render(
      <Modal defaultOpen>
        <Header title="Test Title" description="Test Description" />
        <Body>Test Content</Body>
        <Footer>Test Footer</Footer>
      </Modal>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('Test Footer')).toBeInTheDocument();
  });

  it('applies correct size class based on size prop', () => {
    render(
      <Modal defaultOpen size="lg">
        <Header title="Test Title" description="Test Description" />
        <Body>Test Content</Body>
      </Modal>
    );

    expect(screen.getByTestId('shadcn-modal-content')).toHaveClass(
      'sm:max-w-7xl'
    );
  });

  it('handles open state correctly', () => {
    const onOpenChange = vi.fn();
    render(
      <Modal open onOpenChange={onOpenChange}>
        <Header title="Test Title" />
        <Body>Test Content</Body>
      </Modal>
    );

    // The Sheet component from Radix UI handles the open state internally
    // We can verify that the content is rendered when open
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders Header with custom className', () => {
    render(
      <Modal open defaultOpen>
        <Header className="custom-class" title="Test Title" />
      </Modal>
    );

    const header = document.querySelector('.shadcn-modal-header--wrapper');
    expect(header).toHaveClass('custom-class');
  });

  it('renders Body with custom className', () => {
    render(
      <Modal open defaultOpen>
        <Header />
        <Body className="custom-class">Test Content</Body>
      </Modal>
    );

    const body = document.querySelector('.shadcn-modal-body--wrapper');
    expect(body).toHaveClass('custom-class');
  });

  it('renders Footer with custom className', () => {
    render(
      <Modal defaultOpen>
        <Header />
        <Footer className="custom-class">Test Footer</Footer>
      </Modal>
    );

    const footer = document.querySelector('.shadcn-modal-footer--wrapper');
    expect(footer).toHaveClass('custom-class');
  });

  it('renders Header without title and description', () => {
    render(
      <Modal defaultOpen>
        <Header>Custom Content</Header>
      </Modal>
    );
    expect(screen.getByText('Custom Content')).toBeInTheDocument();
  });

  it('renders Body with children', () => {
    render(
      <Modal defaultOpen>
        <Header>Custom Content</Header>
        <Body>
          <div>Nested Content</div>
        </Body>
      </Modal>
    );
    expect(screen.getByText('Nested Content')).toBeInTheDocument();
  });

  it('renders Footer with children', () => {
    render(
      <Modal defaultOpen>
        <Header>Custom Content</Header>
        <Footer>
          <Button label="Save" />
          <Button label="Cancel" />
        </Footer>
      </Modal>
    );
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });
});
