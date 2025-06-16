import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';

import { Calendar } from './calendar';

describe('Calendar', () => {
  it('renders calendar with default props', () => {
    render(<Calendar />);
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('handles single date selection', () => {
    const onSelect = vi.fn();
    const selectedDate = new Date(2024, 0, 15);
    render(
      <Calendar mode="single" selected={selectedDate} onSelect={onSelect} />
    );

    const dateButton = screen.getByText(15);
    fireEvent.click(dateButton);
    expect(onSelect).toHaveBeenCalled();
  });

  it('handles range selection', () => {
    const onSelect = vi.fn();
    const selectedRange = {
      from: new Date(2024, 0, 15),
      to: new Date(2024, 0, 20),
    };
    render(
      <Calendar
        mode="range"
        defaultMonth={new Date(2024, 0, 1)}
        selected={selectedRange}
        onSelect={onSelect}
      />
    );

    const startDate = screen.getByText(15);
    const endDate = screen.getByText(20);

    expect(startDate.closest('td')).toHaveClass('day-range-start');
    expect(endDate.closest('td')).toHaveClass('day-range-end');
  });

  it('handles month navigation', () => {
    const onNextClick = vi.fn();
    const onPrevClick = vi.fn();
    render(<Calendar onNextClick={onNextClick} onPrevClick={onPrevClick} />);

    const nextButton = screen.getByRole('button', { name: /next/i });
    const prevButton = screen.getByRole('button', { name: /previous/i });

    fireEvent.click(nextButton);
    expect(onNextClick).toHaveBeenCalled();

    fireEvent.click(prevButton);
    expect(onPrevClick).toHaveBeenCalled();
  });

  it('switches between days and years view', () => {
    render(<Calendar showYearSwitcher defaultMonth={new Date(2024, 4, 2)} />);

    // Initially in days view
    expect(screen.getByRole('grid')).toBeInTheDocument();

    // Click caption to switch to years view
    const captionButton = screen.getByText('May 2024');
    fireEvent.click(captionButton);

    // Should show year grid
    [2022, 2023, 2025, 2026].forEach((year) =>
      expect(screen.getByText(year)).toBeInTheDocument()
    );

    // Click a year to switch back to days view
    fireEvent.click(screen.getByText(2022));
    expect(screen.getByText('January 2022')).toBeInTheDocument();
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('disables navigation buttons when outside allowed range', () => {
    const startMonth = new Date(2024, 0, 1);
    const endMonth = new Date(2024, 11, 31);

    render(
      <Calendar
        startMonth={startMonth}
        defaultMonth={startMonth}
        endMonth={endMonth}
      />
    );

    // Navigate to start month
    const prevButton = screen.getByRole('button', { name: /previous/i });
    expect(prevButton).toBeDisabled();

    // Navigate to end month
    const nextButton = screen.getByRole('button', { name: /next/i });
    for (let i = 0; i < 11; i++) {
      fireEvent.click(nextButton);
    }
    expect(nextButton).toBeDisabled();
  });

  it('renders multiple months when numberOfMonths is specified', () => {
    render(<Calendar numberOfMonths={2} />);
    const grids = screen.getAllByRole('grid');
    expect(grids).toHaveLength(2);
  });

  it('handles disabled dates', () => {
    const disabledDate = new Date(2024, 8, 18);
    render(
      <Calendar
        defaultMonth={new Date(2024, 8, 24)}
        disabled={[disabledDate]}
      />
    );
    const disabledButton = screen.getByText('18');
    expect(disabledButton.dataset.disabled).toBeTruthy();
  });

  it('shows outside days when showOutsideDays is true', () => {
    const { container } = render(
      <Calendar selected={new Date(2025, 4, 12)} showOutsideDays />
    );
    const outsideDays = container.querySelectorAll('.day-outside');

    expect(outsideDays.length).toBe(4);
  });

  it('hides outside days when showOutsideDays is false', () => {
    render(<Calendar showOutsideDays={false} />);
    const outsideDays = screen.queryAllByRole('button', {
      name: /day-outside/i,
    });
    expect(outsideDays).toHaveLength(0);
  });
});
