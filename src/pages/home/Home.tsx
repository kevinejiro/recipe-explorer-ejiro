import styles from './home.module.css';
import SearchBar from '../../components/searchBar/SearchBar';
import RecipeList from '../../components/recipeList/RecipeList';
import food from '../../assets/png/food.png'

export default function Home() {
	return (
		<main>
			<section className={styles.section}>
				<h2>Recipe Explorer: A recipe search tool just for you</h2>
				<p>
					We connect you to over 250 recipes, enabling swift searches for top
					meals
				</p>
			</section>

			<div className={styles.recipeList}>
				<SearchBar />
				<>
					<img src={food} alt="recipe sample"/>
					<RecipeList />
				</>
			</div>
		</main>
	);
}
