import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
	name: 'ui',
	initialState: { isAddRecipeModalOpen: false },
	reducers: {
		toggleAddRecipeModal(state) {
			state.isAddRecipeModalOpen = !state.isAddRecipeModalOpen;
		},
	},
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
