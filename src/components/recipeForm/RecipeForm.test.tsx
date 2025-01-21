import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import RecipeForm from './RecipeForm';
import { uiActions } from '../../store/ui/uiSlice';

beforeAll(() => {
	HTMLDialogElement.prototype.showModal = jest.fn();
	HTMLDialogElement.prototype.close = jest.fn();
});

describe('RecipeForm Component', () => {
	beforeEach(() => {
		// Ensure the modal is open before each test
		store.dispatch(uiActions.toggleAddRecipeModal());
	});

	test('renders the form fields', () => {
		render(
			<Provider store={store}>
				<RecipeForm />
			</Provider>
		);

		expect(screen.getByLabelText(/Enter recipe name/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Enter category/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Enter area/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/instructions/i)).toBeInTheDocument();
	});

	test('closes the modal when the close button is clicked', async () => {
		render(
			<Provider store={store}>
				<RecipeForm />
			</Provider>
		);

		fireEvent.click(screen.getByText(/Close/i));
		await new Promise((resolve) => setTimeout(resolve, 0));
		expect(store.getState().ui.isAddRecipeModalOpen).toBe(false);
	});

	test('shows an alert if required fields are missing', () => {
		window.alert = jest.fn();

		render(
			<Provider store={store}>
				<RecipeForm />
			</Provider>
		);

		fireEvent.click(screen.getByText(/Add Recipe/i));
		expect(window.alert).toHaveBeenCalledWith(
			'Please fill in all required fields.'
		);
	});

	test('submits the form with valid data', () => {
		render(
			<Provider store={store}>
				<RecipeForm />
			</Provider>
		);

		fireEvent.change(screen.getByLabelText(/Enter recipe name/i), {
			target: { value: 'Test Meal' },
		});
		fireEvent.change(screen.getByLabelText(/Enter category/i), {
			target: { value: 'Test Category' },
		});
		fireEvent.change(screen.getByLabelText(/Enter area/i), {
			target: { value: 'Test Area' },
		});
		fireEvent.change(screen.getByLabelText(/instructions/i), {
			target: { value: 'Test Instructions' },
		});

		fireEvent.click(screen.getByText(/Add Recipe/i));

		// Check if the form was reset and modal closed
		expect(screen.getByLabelText(/Enter recipe name/i)).toHaveValue('');
		expect(store.getState().ui.isAddRecipeModalOpen).toBe(false);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});
});
