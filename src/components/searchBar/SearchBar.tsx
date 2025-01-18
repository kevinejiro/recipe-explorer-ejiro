import Button from '../common/button/Button';
import { Input } from '../common/input/Input';

import styles from './searchBar.module.css';
import useSearch from '../../hooks/useSearch';

export default function SearchBar() {
	const { name, handleSearch } = useSearch();

	function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const formdata = Object.fromEntries(fd.entries()) as {
			name?: string;
		};
		const { name = '' } = formdata;
		handleSearch(name);
	}

	return (
		<section className={styles.search}>
			<div className={styles.searchFilters}>
				<Button className='bottomFlat' variant={'primary'}>
					Filter by Name
				</Button>
			</div>
			<form onSubmit={handleSubmit}>
				<div className={styles.searchBar}>
					<Input
						type='text'
						id='name'
						placeholder='Enter recipe name'
						aria-label='Enter recipe name'
						defaultValue={name}
					/>
					<Button variant='outline' type='submit'>
						Search
					</Button>
				</div>
			</form>
		</section>
	);
}
