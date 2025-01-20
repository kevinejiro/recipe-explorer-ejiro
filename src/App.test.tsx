import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { ROUTES } from './utils/routes'

beforeAll(() => {
	// Mock IntersectionObserver
	global.IntersectionObserver = class {
		observe() {}
		unobserve() {}
		disconnect() {}
		root: Element | null = null;
		rootMargin: string = '';
		thresholds: number[] = [];
		takeRecords(): IntersectionObserverEntry[] {
			return [];
		}
	};
  HTMLDialogElement.prototype.showModal = jest.fn();
	HTMLDialogElement.prototype.close = jest.fn();
});

describe('App', () => {

	test('renders App component', () => {
		const router = createMemoryRouter(ROUTES, {
			initialEntries: ['/'],
		});
		render(<RouterProvider router={router} />);
		expect(
			screen.getByText(/recipe explorer: a recipe search tool just for you/i)
		).toBeInTheDocument();
	});

	test('renders PageNotFound component on unknown path', () => {
		const router = createMemoryRouter(ROUTES, {
			initialEntries: ['/unknown'],
		});
		render(<RouterProvider router={router} />);
		const notFoundElement = screen.getByText(/page not found/i);
		expect(notFoundElement).toBeInTheDocument();
	});
});
