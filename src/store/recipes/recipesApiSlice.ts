import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	AreaResponse,
	CategoryResponse,
	RecipeResponse,
} from '../../types/recipe';
import { BASE_URL } from '../../utils/contants';

export const recipesApiSlice = createApi({
	reducerPath: 'recipesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
	}),
	endpoints: (builder) => {
		return {
			getRecipes: builder.query<RecipeResponse | undefined, string | undefined>(
				{
					query: (name) => `/search.php?s=${name}`,
				}
			),
			getRecipeById: builder.query<RecipeResponse, string>({
				query: (id) => `/lookup.php?i=${id}`,
			}),
			getRecipeByCat: builder.query<RecipeResponse, string>({
				query: (cat) => `/filter.php?c=${cat}`,
			}),
			getCategoryList: builder.query<CategoryResponse, void>({
				query: () => `/list.php?c=list`,
			}),
			getAreaList: builder.query<AreaResponse, void>({
				query: () => `/list.php?a=list`,
			}),
		};
	},
});

export const {
	useGetRecipesQuery,
	useGetRecipeByIdQuery,
	useGetRecipeByCatQuery,
	useGetCategoryListQuery,
	useGetAreaListQuery,
} = recipesApiSlice;
