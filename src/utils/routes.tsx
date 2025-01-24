import { createBrowserRouter } from 'react-router-dom';
// import RecipeDetails from '../pages/recipeDetails/RecipeDetails';
import Home from '../pages/home/Home';
import PageNotFound from '../pages/404/PageNotFound';
import Layout from '../components/layout/Layout';
import { lazy, Suspense } from 'react';
import NoMatch from '../components/noMatch/NoMatch';

const RecipeDetails = lazy(
	() => import('../pages/recipeDetails/RecipeDetails')
);

export const ROUTES = [
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
				element: (
					<Suspense
						fallback={
								<NoMatch>
									<h3>Loading</h3>
								</NoMatch>
						}
					>
						<RecipeDetails />
					</Suspense>
				),
			},
			{
				path: '*',
				element: <PageNotFound />,
			},
		],
	},
];

export const router = createBrowserRouter(ROUTES);
