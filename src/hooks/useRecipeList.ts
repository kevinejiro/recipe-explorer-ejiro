import { useGetRecipesQuery } from '../store/recipes/recipesApiSlice';
import useSearch from './useSearch';

const useRecipeList = () => {
	const { name } = useSearch();

	const { data, isLoading, isSuccess, isError } = useGetRecipesQuery(name);
	const recipeList = data?.meals ?? [];

	return {
		isLoading,
		isSuccess,
		isError,
		recipeList,
		total: recipeList.length,
	};
};

export default useRecipeList;
