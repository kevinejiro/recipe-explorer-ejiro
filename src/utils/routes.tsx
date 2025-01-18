import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/home/Home';
import RecipeDetails from '../pages/recipeDetails/RecipeDetails';
import PageNotFound from '../pages/404/PageNotFound';

// const RecipeDetails = lazy(() => import('./pages/recipeDetails/RecipeDetails'));

export const router = createBrowserRouter([
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
]);
