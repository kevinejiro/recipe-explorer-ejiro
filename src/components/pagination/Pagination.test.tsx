import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  const mockOnPageChange = jest.fn();
  const mockPreviousPage = jest.fn();
  const mockNextPage = jest.fn();

  const defaultProps = {
    currentPage: 1,
    onPageChange: mockOnPageChange,
    canPreviousPage: true,
    previousPage: mockPreviousPage,
    canNextPage: true,
    nextPage: mockNextPage,
    totalPages: 5,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders pagination buttons correctly', () => {
    render(<Pagination {...defaultProps} />);

    // Check if the previous button is rendered and enabled
    const prevButton = screen.getByText('<');
    expect(prevButton).toBeInTheDocument();
    expect(prevButton).not.toBeDisabled();

    // Check if the next button is rendered and enabled
    const nextButton = screen.getByText('>');
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).not.toBeDisabled();

    // Check if the correct number of page buttons are rendered
    for (let i = 1; i <= defaultProps.totalPages; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  it('calls previousPage when the previous button is clicked', () => {
    render(<Pagination {...defaultProps} />);

    const prevButton = screen.getByText('<');
    fireEvent.click(prevButton);

    expect(mockPreviousPage).toHaveBeenCalled();
  });

  it('calls nextPage when the next button is clicked', () => {
    render(<Pagination {...defaultProps} />);

    const nextButton = screen.getByText('>');
    fireEvent.click(nextButton);

    expect(mockNextPage).toHaveBeenCalled();
  });

  it('disables previous button when canPreviousPage is false', () => {
    render(<Pagination {...defaultProps} canPreviousPage={false} />);

    const prevButton = screen.getByText('<');
    expect(prevButton).toBeDisabled();
  });

  it('disables next button when canNextPage is false', () => {
    render(<Pagination {...defaultProps} canNextPage={false} />);

    const nextButton = screen.getByText('>');
    expect(nextButton).toBeDisabled();
  });
});