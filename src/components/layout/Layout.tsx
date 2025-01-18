import { Outlet } from 'react-router-dom';
import Nav from '../nav/Nav';
import Footer from '../footer/Footer';
import { Provider } from 'react-redux';
import { store } from '../../store/index';
import RecipeForm from '../recipeForm/RecipeForm';

interface LayoutProps {
	children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<Provider store={store}>
			<Nav />
			<RecipeForm/>
			<Outlet />
			{children}
			<Footer />
		</Provider>
	);
}
