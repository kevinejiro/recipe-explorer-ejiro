import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../common/modal/Modal';
import { Input } from '../common/input/Input';
import Button from '../common/button/Button';
import styles from './recipeForm.module.css';
import { uiActions } from '../../store/ui/uiSlice';
import { store } from '../../store';
import { recipesApiSlice } from '../../store/recipes/recipesApiSlice';

const RecipeForm = () => {
	const { isAddRecipeModalOpen } = useSelector(
		(state: { ui: { isAddRecipeModalOpen: boolean } }) => state.ui
	);
	const dispatch = useDispatch();
	const { toggleAddRecipeModal } = uiActions;

	function handleCloseRecipeModal() {
		dispatch(toggleAddRecipeModal());
	}

	const handleLocalUpdate = (formData: {
		strMeal: FormDataEntryValue;
		strCategory: FormDataEntryValue;
		strArea: FormDataEntryValue;
		strInstructions: FormDataEntryValue;
	}) => {
		store.dispatch(
			recipesApiSlice.util.updateQueryData('getRecipes', '', (draft) => {
				if (draft?.meals) {
					draft.meals = [
						{
							idMeal: String(Date.now()),
							strMeal: formData.strMeal
								? String(formData.strMeal)
								: 'Unknown Meal',
							strCategory: formData.strCategory
								? String(formData.strCategory)
								: 'Unknown Category',
							strArea: formData.strArea
								? String(formData.strArea)
								: 'Unknown Area',
							strInstructions: formData.strInstructions
								? String(formData.strInstructions)
								: 'No Instructions',
							strMealThumb: '',
						},
						...draft.meals,
					];
				}
			})
		);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const fd = new FormData(event.target as HTMLFormElement);
		const formData = Object.fromEntries(fd.entries());
		const { strMeal, strCategory, strArea, strInstructions } = formData;
		if (!strMeal || !strCategory || !strArea || !strInstructions) {
			alert('Please fill in all required fields.');
			return;
		}
		handleLocalUpdate({ strMeal, strCategory, strArea, strInstructions });
		(event.target as HTMLFormElement).reset();
		handleCloseRecipeModal();
	};

	return (
		<Modal open={isAddRecipeModalOpen}>
			<form onSubmit={handleSubmit} className={styles.formWrapper}>
				<div className={styles.column}>
					<label htmlFor='name'>Name:</label>
					<Input
						type='text'
						id='strMeal'
						name='strMeal'
						required
						placeholder='Enter recipe name'
						aria-label='Enter recipe name'
					/>
				</div>
				<div className={styles.column}>
					<label htmlFor='category'>Category:</label>
					<Input
						type='text'
						id='strCategory'
						name='strCategory'
						required
						placeholder='Enter category'
						aria-label='Enter category'
					/>
				</div>
				<div className={styles.column}>
					<label htmlFor='area'>Area:</label>
					<Input
						type='text'
						id='strArea'
						name='strArea'
						required
						placeholder='Enter area'
						aria-label='Enter area'
					/>
				</div>
				<div className={styles.column}>
					<label htmlFor='instructions'>Instructions:</label>
					<Input
						type='text'
						id='strInstructions'
						name='strInstructions'
						required
						placeholder='instructions'
						aria-label='instructions'
					/>
				</div>
				<div className={styles.modalActions}>
					<Button type='button' variant='gray' onClick={handleCloseRecipeModal}>
						Close
					</Button>
					<Button type='submit' variant='primary'>
						Add Recipe
					</Button>
				</div>
			</form>
		</Modal>
	);
};

export default RecipeForm;
