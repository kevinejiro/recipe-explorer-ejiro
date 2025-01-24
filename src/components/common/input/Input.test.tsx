import React from 'react';
import { render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input Component', () => {
	// Test for rendering without error
	it('renders without crashing', () => {
		render(<Input id='test-input' />);
		expect(screen.getByRole('textbox')).toBeInTheDocument();
	});

	// Test for rendering with error message
	it('displays error message when error prop is provided', () => {
		render(<Input id='test-input' error='This field is required' />);
		expect(screen.getByText('This field is required')).toBeInTheDocument();
	});

	// Test for passing props correctly
	it('passes props to the input element', () => {
		render(<Input id='test-input' placeholder='Enter text' />);
		expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});
});
