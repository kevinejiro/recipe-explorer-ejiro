import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';
import PageNotFound from './pages/404/PageNotFound';
import RecipeDetails from './pages/recipeDetails/RecipeDetails';

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
	const routes = [
		{
			path: '/',
			element: <Layout />,
			errorElement: (
				<Layout>
					<PageNotFound />
				</Layout>
			),
			children: [
				{
					index: true,
					element: <Home />,
				},
				{
					path: 'recipe/:id',
					element: <RecipeDetails />,
				},
				{
					path: '*',
					element: <PageNotFound />,
				},
			],
		},
	];
	// ... existing code ...

	test('renders App component', () => {
		const router = createMemoryRouter(routes, {
			initialEntries: ['/'],
		});
		render(<RouterProvider router={router} />);
		expect(
			screen.getByText(/recipe explorer: a recipe search tool just for you/i)
		).toBeInTheDocument();
	});

	test('renders PageNotFound component on unknown path', () => {
		const router = createMemoryRouter(routes, {
			initialEntries: ['/unknown'],
		});
		render(<RouterProvider router={router} />);
		const notFoundElement = screen.getByText(/page not found/i);
		expect(notFoundElement).toBeInTheDocument();
	});

	// ... existing code ...
});
