import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import RecipeDetails from './RecipeDetails';
import { recipesApiSlice } from '../../store/recipes/recipesApiSlice';
import { useGetRecipeByIdQuery } from '../../store/recipes/recipesApiSlice';

// Mock the useGetRecipeByIdQuery hook
jest.mock('../../store/recipes/recipesApiSlice', () => ({
	...jest.requireActual('../../store/recipes/recipesApiSlice'),
	useGetRecipeByIdQuery: jest.fn(),
}));

beforeEach(() => {
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

describe('RecipeDetails Component', () => {
	const store = configureStore({
		reducer: {
			[recipesApiSlice.reducerPath]: recipesApiSlice.reducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(recipesApiSlice.middleware),
	});

	const renderWithRouter = (
		component: React.ReactNode,
		initialRoute: string = '/recipe/1'
	) => {
		const router = createMemoryRouter(
			[
				{
					path: '/recipe/:id',
					element: component,
				},
			],
			{
				initialEntries: [initialRoute],
				initialIndex: 0,
			}
		);
		return render(
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		);
	};

	it('renders loading state', () => {
		(useGetRecipeByIdQuery as jest.Mock).mockReturnValue({
			data: undefined,
			isLoading: true,
			isSuccess: false,
			isError: false,
		});

		renderWithRouter(<RecipeDetails />);

		expect(screen.getByText(/Loading/i)).toBeInTheDocument();
	});

	it('renders error message when there is an error', () => {
		(useGetRecipeByIdQuery as jest.Mock).mockReturnValue({
			data: undefined,
			isLoading: false,
			isSuccess: false,
			isError: true,
		});

		renderWithRouter(<RecipeDetails />);

		expect(
			screen.getByText('An Error Occurred, please refresh')
		).toBeInTheDocument();
	});

	it('renders 404 message when recipe is not found', () => {
		(useGetRecipeByIdQuery as jest.Mock).mockReturnValue({
			data: { meals: [] },
			isLoading: false,
			isSuccess: true,
			isError: false,
		});

		renderWithRouter(<RecipeDetails />);

		expect(screen.getByText('404')).toBeInTheDocument();
		expect(screen.getByText('Recipe not found')).toBeInTheDocument();
	});

	it('renders recipe details when data is available', () => {
		(useGetRecipeByIdQuery as jest.Mock).mockReturnValue({
			data: {
				meals: [
					{
						idMeal: '1',
						strMeal: 'Test Meal',
						strCategory: 'Test Category',
						strArea: 'Test Area',
						strInstructions: 'Test Instructions',
						strMealThumb: 'http://example.com/image.jpg',
						strYoutube: 'http://youtube.com/video',
						strIngredient1: 'Ingredient 1',
						strMeasure1: '1 cup',
						strIngredient2: 'Ingredient 2',
						strMeasure2: '2 tbsp',
					},
				],
			},
			isLoading: false,
			isSuccess: true,
			isError: false,
		});

		renderWithRouter(<RecipeDetails />);

		expect(screen.getByText('Test Meal')).toBeInTheDocument();
		expect(screen.getByText('Test Category • Test Area')).toBeInTheDocument();
		expect(screen.getByText('Test Instructions')).toBeInTheDocument();
		expect(screen.getByAltText('Test Meal')).toBeInTheDocument();
		expect(screen.getByText('Ingredient 1 (1 cup),')).toBeInTheDocument();
		expect(screen.getByText('Ingredient 2 (2 tbsp),')).toBeInTheDocument();
		expect(screen.getByText('Youtube')).toBeInTheDocument();
		expect(screen.getByText('Similar Recipes')).toBeInTheDocument();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});
});
