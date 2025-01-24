import { useLocation, useParams } from 'react-router-dom';
import Button from '../../components/common/button/Button';
import styles from './recipeDetails.module.css';
import NoMatch from '../../components/noMatch/NoMatch';
import { useGetRecipeByIdQuery } from '../../store/recipes/recipesApiSlice';
import { transformRecipeObject } from '../../utils/recipeService';
import VideoPlayer from '../../components/common/videoPlayer/VideoPlayer';
import SimilarRecipesList from '../../components/similarRecipesList/similarRecipesList';
export default function RecipeDetails() {
	const { id } = useParams();
	const location = useLocation();

	const { data, isLoading, isSuccess, isError } = useGetRecipeByIdQuery(
		id ?? ''
	);
	const recipeObject = data?.meals?.[0];
	const recipeFromTableData = location.state;

	const recipe = transformRecipeObject(recipeObject ?? recipeFromTableData);

	if (isLoading) {
		return (
			<NoMatch>
				<h3>Loading</h3>
			</NoMatch>
		);
	}

	if (isError) {
		return (
			<NoMatch>
				<h3>An Error Occurred, please refresh</h3>
			</NoMatch>
		);
	}

	if (!recipe && isSuccess) {
		return (
			<NoMatch>
				<h1>404</h1>
				<p>Recipe not found</p>
				<a href='/' aria-label='Return to homepage' title='Return to homepage'>
					<Button variant='primary'>Return To Homepage</Button>
				</a>
			</NoMatch>
		);
	}

	return (
		<main className={styles.main}>
			<div className={styles.titleWrapper}>
				<h2>{recipe?.strMeal}</h2>
				<p>
					{recipe?.strCategory} • {recipe?.strArea}
				</p>
				{recipe?.strMealThumb && (
					<img src={recipe?.strMealThumb} alt={`${recipe?.strMeal}`} />
				)}
			</div>

			<section className={styles.recipeBody}>
				{recipe?.strInstructions && (
					<article className={styles.column}>
						<h3>Instructions</h3>
						<p>{recipe?.strInstructions}</p>
					</article>
				)}
				{recipe?.ingredients &&  recipe?.ingredients?.length > 0 && (
					<article className={styles.column}>
						<h3>Ingredients</h3>
						<p>
							{recipe?.ingredients.map((ingredient, index) => (
								<span key={index}>
									{ingredient} {`(${recipe?.measures[index]})`}, {'  '}
								</span>
							))}
						</p>
					</article>
				)}

				{recipe?.strYoutube && (
					<article className={styles.column}>
						<h3>Youtube</h3>

						<VideoPlayer
							videoUrl={recipe.strYoutube}
							altText={`instructional video for ${recipe.strMeal} recipe`}
						/>
					</article>
				)}
				<article className={styles.column}>
					<h3>Similar Recipes</h3>

					<SimilarRecipesList cat={recipe?.strCategory ?? ''} />
				</article>
			</section>
		</main>
	);
}
