import { useMemo } from 'react';
import {
	getPaginationRowModel,
	ColumnDef,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
	getFilteredRowModel,
} from '@tanstack/react-table';
import NoMatch from '../noMatch/NoMatch';
import { useGetRecipeByCatQuery } from '../../store/recipes/recipesApiSlice';
import { Table } from '../table/Table';
import Pagination from '../pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import styles from './similarRecipesList.module.css';

interface RecipeT {
	[key: string]: string;
}

export default function SimilarRecipesList({ cat }: { cat: string }) {
	const navigate = useNavigate();
	const {
		data: recipeData,
		isLoading,
		isSuccess,
	} = useGetRecipeByCatQuery(cat);

	const recipeList = recipeData?.meals ?? [];

	const columns = useMemo<ColumnDef<RecipeT, unknown>[]>(
		() => [
			{
				accessorKey: 'strMeal',
				header: 'Name',
			},
		],
		[]
	);

	const table = useReactTable<RecipeT>({
		columns,
		data: recipeList,
		debugTable: true,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(), //client-side filtering
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: {
			pagination: {
				pageSize: 7,
			},
		},
	});

	if (isLoading) {
		return (
			<NoMatch>
				<h3>Loading</h3>
			</NoMatch>
		);
	}

	if (recipeList.length === 0 && isSuccess) {
		return (
			<NoMatch>
				<h3>No similar from recipes in this category</h3>
			</NoMatch>
		);
	}

	function handleRowClick(id: string) {
		navigate(`/recipe/${id}`);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	return (
		<>
			<div className={styles.listWrapper}>
				<Table table={table} handleRowClick={handleRowClick} />
			</div>
			<Pagination
				canPreviousPage={table.getCanPreviousPage()}
				previousPage={() => table.previousPage()}
				canNextPage={table.getCanNextPage()}
				nextPage={() => table.nextPage()}
				totalPages={table.getPageCount()}
				currentPage={Number(table.getState().pagination.pageIndex + 1)}
				onPageChange={(page) => table.setPageIndex(page)}
			/>
		</>
	);
}
