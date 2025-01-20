import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { recipesApiSlice } from '../../store/recipes/recipesApiSlice';
import Home from './Home';

describe('Home Component', () => {
	const store = configureStore({
		reducer: {
			[recipesApiSlice.reducerPath]: recipesApiSlice.reducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(recipesApiSlice.middleware),
	});

	const renderWithRouter = (component: React.ReactNode) => {
		const router = createMemoryRouter(
			[
				{
					path: '/',
					element: component,
				},
			],
			{
				initialEntries: ['/'],
				initialIndex: 0,
			}
		);
		return render(
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		);
	};

	test('renders without crashing', () => {
		renderWithRouter(<Home />);
	});

	test('displays the correct heading', () => {
		renderWithRouter(<Home />);
		const headingElement = screen.getByText(
			/Recipe Explorer: A recipe search tool just for you/i
		);
		expect(headingElement).toBeInTheDocument();
	});

	test('displays the correct paragraph', () => {
		renderWithRouter(<Home />);
		const paragraphElement = screen.getByText(
			/We connect you to over 250 recipes, enabling swift searches for top meals/i
		);
		expect(paragraphElement).toBeInTheDocument();
	});

	test('renders the image with correct alt text', () => {
		renderWithRouter(<Home />);
		const imageElement = screen.getByAltText(/recipe sample/i);
		expect(imageElement).toBeInTheDocument();
	});

	test('renders the SearchBar component', () => {
		renderWithRouter(<Home />);
		const searchBarElement = screen.getByPlaceholderText('Enter recipe name');
		expect(searchBarElement).toBeInTheDocument();
	});

	test('renders the RecipeList component', () => {
		renderWithRouter(<Home />);
		const recipeListElement = screen.getByText(/Loading/i);
		expect(recipeListElement).toBeInTheDocument();
	});
});
