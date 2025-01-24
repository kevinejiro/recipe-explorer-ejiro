import uiReducer, { uiActions } from './uiSlice';

describe('uiSlice', () => {
	it('should return the initial state', () => {
		expect(uiReducer(undefined, { type: 'INIT' })).toEqual({
			isAddRecipeModalOpen: false,
		});
	});

	it('should handle toggleAddRecipeModal', () => {
		const previousState = { isAddRecipeModalOpen: false };
		expect(uiReducer(previousState, uiActions.toggleAddRecipeModal())).toEqual({
			isAddRecipeModalOpen: true,
		});

		const newState = { isAddRecipeModalOpen: true };
		expect(uiReducer(newState, uiActions.toggleAddRecipeModal())).toEqual({
			isAddRecipeModalOpen: false,
		});
	});
});
