import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Nav from './Nav';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui/uiSlice';
import uiSlice from '../../store/ui/uiSlice';

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: jest.fn(),
}));

const store = configureStore({
  reducer: {
    ui: uiSlice,
  },
});

const renderWithStore = (component: React.ReactNode) => {
	return render(<Provider store={store}>{component}</Provider>);
};

describe('Nav Component', () => {
	test('renders the logo and buttons', () => {
		renderWithStore(<Nav />);

		expect(screen.getByLabelText('Return to homepage')).toBeInTheDocument();

		expect(screen.getByText('Add a recipe')).toBeInTheDocument();
	});

	test('calls handleAddRecipe when the button is clicked', () => {
		const dispatch = jest.fn();
		(useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);

		renderWithStore(<Nav />);

		fireEvent.click(screen.getByText('Add a recipe'));

		expect(dispatch).toHaveBeenCalledWith(uiActions.toggleAddRecipeModal());
	});

	test('renders mobile button correctly', () => {
		renderWithStore(<Nav />);

		expect(
			screen.getByRole('button', { name: /Add a recipe/i })
		).toBeInTheDocument();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});
});
