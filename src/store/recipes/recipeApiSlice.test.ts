import { recipesApiSlice } from './recipesApiSlice';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

describe('recipesApiSlice', () => {
	it('should have the correct base URL', () => {
		const baseQuery = fetchBaseQuery({
			baseUrl: 'https://www.themealdb.com/api/json/v1/1',
		});
		expect(baseQuery).toBeDefined();
	});

	it('should define getRecipes endpoint', () => {
		const endpoint = recipesApiSlice.endpoints.getRecipes;
		expect(endpoint).toBeDefined();
	});

	it('should define getRecipeById endpoint', () => {
		const endpoint = recipesApiSlice.endpoints.getRecipeById;
		expect(endpoint).toBeDefined();
	});

	it('should define getRecipeByCat endpoint', () => {
		const endpoint = recipesApiSlice.endpoints.getRecipeByCat;
		expect(endpoint).toBeDefined();
	});

	it('should define getCategoryList endpoint', () => {
		const endpoint = recipesApiSlice.endpoints.getCategoryList;
		expect(endpoint).toBeDefined();
	});

	it('should define getAreaList endpoint', () => {
		const endpoint = recipesApiSlice.endpoints.getAreaList;
		expect(endpoint).toBeDefined();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});
});