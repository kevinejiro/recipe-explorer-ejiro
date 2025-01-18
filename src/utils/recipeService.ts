import { Area, Category, Recipe } from '../types/recipe';

export const transformListToOptions = (
	list: (Category | Area)[],
	type: 'category' | 'area'
): { value: string; label: string }[] => {
	return [
		{ value: '', label: `All` },
		...list.map((item) => ({
			value:
				type === 'category'
					? (item as Category).strCategory
					: (item as Area).strArea,
			label:
				type === 'category'
					? (item as Category).strCategory
					: (item as Area).strArea,
		})),
	];
};

export function transformRecipeObject(data: { [key: string]: string } | undefined): Recipe | null {
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    return null;
  }
  const ingredients: string[] = [];
  const measures: string[] = [];

  // Loop through ingredient properties and build ingredients and measures arrays
  for (let i = 1; i <= 20; i++) {
    const ingredient = data[`strIngredient${i}`];
    const measure = data[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push(ingredient);
      measures.push(measure || '');
    } else {
      break; 
    }
  }

  return {
    idMeal: data.idMeal,
    strMeal: data.strMeal,
    strCategory: data.strCategory,
    strArea: data.strArea,
    strInstructions: data.strInstructions,
    strMealThumb: data.strMealThumb,
    strTags: data.strTags ? data.strTags.split(',') : [],
    strYoutube: data.strYoutube,
    ingredients,
    measures,
  };
}
