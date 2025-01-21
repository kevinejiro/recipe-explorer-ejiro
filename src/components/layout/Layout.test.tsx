import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/index';
import Layout from './Layout';

// Mock the Nav, Footer, and RecipeForm components
jest.mock('../nav/Nav', () => () => <div>Mocked Nav</div>);
jest.mock('../footer/Footer', () => () => <div>Mocked Footer</div>);
jest.mock('../recipeForm/RecipeForm', () => () => <div>Mocked RecipeForm</div>);

// Mock the Outlet component from react-router-dom
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	Outlet: () => <div>Mocked Outlet</div>,
}));

describe('Layout Component', () => {
	it('renders children and static components', () => {
		render(
			<Provider store={store}>
				<Layout>
					<div>Test Child</div>
				</Layout>
			</Provider>
		);

		// Check if the mocked Nav component is rendered
		expect(screen.getByText('Mocked Nav')).toBeInTheDocument();

		// Check if the mocked RecipeForm component is rendered
		expect(screen.getByText('Mocked RecipeForm')).toBeInTheDocument();

		// Check if the mocked Outlet component is rendered
		expect(screen.getByText('Mocked Outlet')).toBeInTheDocument();

		// Check if the children are rendered
		expect(screen.getByText('Test Child')).toBeInTheDocument();

		// Check if the mocked Footer component is rendered
		expect(screen.getByText('Mocked Footer')).toBeInTheDocument();
	});
});
