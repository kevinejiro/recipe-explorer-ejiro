// src/components/searchBar/SearchBar.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';
import useSearch from '../../hooks/useSearch';

// Mock the useSearch hook
jest.mock('../../hooks/useSearch');

describe('SearchBar Component', () => {
	beforeEach(() => {
		(useSearch as jest.Mock).mockReturnValue({
			name: '',
			handleSearch: jest.fn(),
		});
	});

	it('renders the search bar with input and buttons', () => {
		render(<SearchBar />);
		expect(
			screen.getByPlaceholderText('Enter recipe name')
		).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: /filter by name/i })
		).toBeInTheDocument();
	});

	it('calls handleSearch with the correct name on form submit', () => {
		const mockHandleSearch = jest.fn();
		(useSearch as jest.Mock).mockReturnValue({
			name: '',
			handleSearch: mockHandleSearch,
		});

		render(<SearchBar />);
		const input = screen.getByPlaceholderText('Enter recipe name');
		const button = screen.getByRole('button', { name: /search/i });

		fireEvent.change(input, { target: { value: 'Chocolate Cake' } });
		fireEvent.click(button);

		expect(mockHandleSearch).toHaveBeenCalledWith('Chocolate Cake');
	});

	it('displays the default name in the input field', () => {
		(useSearch as jest.Mock).mockReturnValue({
			name: 'Vanilla Cake',
			handleSearch: jest.fn(),
		});

		render(<SearchBar />);
		const input = screen.getByPlaceholderText('Enter recipe name');

		expect(input).toHaveValue('Vanilla Cake');
	});
});
