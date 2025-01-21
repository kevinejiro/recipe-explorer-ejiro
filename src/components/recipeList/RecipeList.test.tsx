import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import {
	useGetCategoryListQuery,
	useGetAreaListQuery,
} from '../../store/recipes/recipesApiSlice';
import useRecipeList from '../../hooks/useRecipeList';
import RecipeList from './RecipeList';
import { PaginationProps } from '../pagination/Pagination';
import { TableProps } from '../table/Table';

// Mock hooks and components
jest.mock('../../store/recipes/recipesApiSlice');
jest.mock('../../hooks/useRecipeList');
jest.mock('../table/Table', () => ({
	Table: ({ table, handleRowClick }: TableProps) => (
		<div>
			<div>Mocked Table</div>
			<button onClick={() => handleRowClick?.('1')}>Row 1</button>
		</div>
	),
}));
jest.mock(
	'../pagination/Pagination',
	() =>
		({
			canPreviousPage,
			previousPage,
			canNextPage,
			nextPage,
			totalPages,
			currentPage,
			onPageChange,
		}: PaginationProps) =>
			(
				<div>
					<button onClick={previousPage} disabled={!canPreviousPage}>
						Previous
					</button>
					<button onClick={nextPage} disabled={!canNextPage}>
						Next
					</button>
					<div>
						Page {currentPage} of {totalPages}
					</div>
				</div>
			)
);

describe('RecipeList Component', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		(useGetCategoryListQuery as jest.Mock).mockReturnValue({
			data: { meals: [] },
		});
		(useGetAreaListQuery as jest.Mock).mockReturnValue({ data: { meals: [] } });
		(useRecipeList as jest.Mock).mockReturnValue({
			isLoading: false,
			isSuccess: true,
			isError: false,
			recipeList: [
				{
					strMeal: 'Meal 1',
					strCategory: 'Category 1',
					strArea: 'Area 1',
					strTags: 'Tag 1',
				},
			],
		});
	});

	it('renders loading state', () => {
		(useRecipeList as jest.Mock).mockReturnValue({
			isLoading: true,
			isSuccess: false,
			isError: false,
			recipeList: [],
		});
		render(<RecipeList />, { wrapper: BrowserRouter });

		expect(screen.getByText('Loading')).toBeInTheDocument();
	});

	it('renders error message when there is an error', () => {
		(useRecipeList as jest.Mock).mockReturnValue({
			isLoading: false,
			isSuccess: false,
			isError: true,
			recipeList: [],
		});
		render(<RecipeList />, { wrapper: BrowserRouter });

		expect(screen.getByText('An Error Occurred')).toBeInTheDocument();
	});

	it('renders no results message', () => {
		(useRecipeList as jest.Mock).mockReturnValue({
			isLoading: false,
			isSuccess: true,
			isError: false,
			recipeList: [],
		});
		render(<RecipeList />, { wrapper: BrowserRouter });

		expect(screen.getByText('No results from query')).toBeInTheDocument();
	});

	it('renders the recipe list when data is available', () => {
		(useRecipeList as jest.Mock).mockReturnValue({
			isLoading: false,
			isSuccess: true,
			isError: false,
			recipeList: [
				{
					strMeal: 'Meal 1',
					strCategory: 'Category 1',
					strArea: 'Area 1',
					strTags: 'Tag 1',
				},
			],
		});
		render(<RecipeList />, { wrapper: BrowserRouter });

		expect(screen.getByText('Mocked Table')).toBeInTheDocument();
		expect(screen.getByText('Row 1')).toBeInTheDocument();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});
});
