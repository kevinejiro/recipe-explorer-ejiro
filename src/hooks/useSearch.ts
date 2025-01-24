import { useSearchParams } from 'react-router-dom';

const useSearch = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const name = searchParams.get('name') ?? '';

	const handleSearch = (name: string) => {
		setSearchParams({
			...Object.fromEntries(searchParams),
			name,
		});
	};

	return {
		name,
		handleSearch,
	};
};

export default useSearch;
