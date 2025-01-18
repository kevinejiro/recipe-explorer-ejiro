export interface Recipe {
	idMeal: string;
	strMeal: string;
	strCategory: string;
	strArea: string;
	strInstructions: string;
	strMealThumb: string;
	strTags: string[];
	strYoutube: string;
	ingredients: string[];
	measures: string[];
}

export interface Category {
	strCategory: string;
}

export interface Area {
	strArea: string;
}

export interface RecipeResponse {
	meals: { [key: string]: string }[]  | [];
}

export interface CategoryResponse {
	meals: Category[] | [];
}

export interface AreaResponse {
	meals: Area[] | [];
}
