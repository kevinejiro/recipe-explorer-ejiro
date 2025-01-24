import { transformRecipeObject } from './recipeService';
import { Recipe } from '../types/recipe';

describe('transformRecipeObject', () => {
	it('returns null for undefined input', () => {
		const result = transformRecipeObject(undefined);
		expect(result).toBeNull();
	});

	it('returns null for non-object input', () => {
		const result = transformRecipeObject('not an object' as any);
		expect(result).toBeNull();
	});

	it('returns null for null input', () => {
		const result = transformRecipeObject(null as any);
		expect(result).toBeNull();
	});

	it('transforms a valid recipe object correctly', () => {
		const input = {
			idMeal: '1',
			strMeal: 'Test Meal',
			strCategory: 'Test Category',
			strArea: 'Test Area',
			strInstructions: 'Test Instructions',
			strMealThumb: 'http://example.com/image.jpg',
			strTags: 'tag1,tag2',
			strYoutube: 'http://youtube.com/video',
			strIngredient1: 'Ingredient 1',
			strMeasure1: '1 cup',
			strIngredient2: 'Ingredient 2',
			strMeasure2: '2 tbsp',
			strIngredient3: '',
			strMeasure3: '',
		};

		const expected: Recipe = {
			idMeal: '1',
			strMeal: 'Test Meal',
			strCategory: 'Test Category',
			strArea: 'Test Area',
			strInstructions: 'Test Instructions',
			strMealThumb: 'http://example.com/image.jpg',
			strTags: ['tag1', 'tag2'],
			strYoutube: 'http://youtube.com/video',
			ingredients: ['Ingredient 1', 'Ingredient 2'],
			measures: ['1 cup', '2 tbsp'],
		};

		const result = transformRecipeObject(input);
		expect(result).toEqual(expected);
	});

	it('handles missing ingredients and measures gracefully', () => {
		const input = {
			idMeal: '1',
			strMeal: 'Test Meal',
			strCategory: 'Test Category',
			strArea: 'Test Area',
			strInstructions: 'Test Instructions',
			strMealThumb: 'http://example.com/image.jpg',
			strTags: 'tag1,tag2',
			strYoutube: 'http://youtube.com/video',
		};

		const expected: Recipe = {
			idMeal: '1',
			strMeal: 'Test Meal',
			strCategory: 'Test Category',
			strArea: 'Test Area',
			strInstructions: 'Test Instructions',
			strMealThumb: 'http://example.com/image.jpg',
			strTags: ['tag1', 'tag2'],
			strYoutube: 'http://youtube.com/video',
			ingredients: [],
			measures: [],
		};

		const result = transformRecipeObject(input);
		expect(result).toEqual(expected);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});
});
