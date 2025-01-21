import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Nav from './Nav';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui/uiSlice';
import uiSlice from '../../store/ui/uiSlice';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: jest.fn(),
}));

const store = configureStore({
  reducer: {
    ui: uiSlice,
  },
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
      initialEntries: [''],
      initialIndex: 0,
    }
  );
  return render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

describe('Nav Component', () => {
	test('renders the logo and buttons', () => {
		renderWithRouter(<Nav />);

		expect(screen.getByLabelText('Return to homepage')).toBeInTheDocument();

		expect(screen.getByText('Add a recipe')).toBeInTheDocument();
	});

	test('calls handleAddRecipe when the button is clicked', () => {
		const dispatch = jest.fn();
		(useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);

		renderWithRouter(<Nav />);

		fireEvent.click(screen.getByText('Add a recipe'));

		expect(dispatch).toHaveBeenCalledWith(uiActions.toggleAddRecipeModal());
	});

	test('renders mobile button correctly', () => {
		renderWithRouter(<Nav />);

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
