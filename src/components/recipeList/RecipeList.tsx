import { useMemo } from 'react';
import {
	getPaginationRowModel,
	ColumnDef,
	Column,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
	getFilteredRowModel,
} from '@tanstack/react-table';
import NoMatch from '../noMatch/NoMatch';
import { useNavigate } from 'react-router-dom';
import {
	useGetCategoryListQuery,
	useGetAreaListQuery,
} from '../../store/recipes/recipesApiSlice';
import { transformListToOptions } from '../../utils/recipeService';
import { Table } from '../table/Table';
import useRecipeList from '../../hooks/useRecipeList';
import Pagination from '../pagination/Pagination';
import styles from './recipeList.module.css';

export interface RecipeT {
	[key: string]: string;
}

interface Option {
	value: string;
	label: string;
}

export default function RecipeList() {
	const navigate = useNavigate();
	const { data: categoryData } = useGetCategoryListQuery();
	const { data: areaData } = useGetAreaListQuery();
	const { isLoading, isSuccess, isError, recipeList } = useRecipeList();

	const categoryList = categoryData?.meals ?? [];
	const areaList = areaData?.meals ?? [];

	const catOptions: Option[] = transformListToOptions(categoryList, 'category');
	const areaOptions: Option[] = transformListToOptions(areaList, 'area');

	const columns = useMemo<ColumnDef<RecipeT, unknown>[]>(
		() => [
			{
				accessorKey: 'strMeal',
				header: 'Name',
				enableColumnFilter: false,
			},
			{
				accessorKey: 'strCategory',
				header: 'Category',
			},
			{
				accessorKey: 'strArea',
				header: 'Area',
			},
			{
				accessorKey: 'strTags',
				header: 'Tags',
				enableColumnFilter: false,
			},
		],
		[]
	);

	const table = useReactTable<RecipeT>({
		columns,
		data: recipeList,
		debugTable: true,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	if (isLoading) {
		return (
			<NoMatch>
				<h3>Loading</h3>
			</NoMatch>
		);
	}

	if (isError) {
		return (
			<NoMatch>
				<h3>An Error Occurred</h3>
			</NoMatch>
		);
	}

	if (recipeList.length === 0 && isSuccess) {
		return (
			<NoMatch>
				<h3>No results from query</h3>
			</NoMatch>
		);
	}

	function handleRowClick(id: string) {
		navigate(`/recipe/${id}`);
	}

	function Filter({ column }: { column: Column<RecipeT, unknown> }) {
		const columnFilterValue = column.getFilterValue();

		return (
			<div className='control'>
				<select
					onChange={(e) => column.setFilterValue(e.target.value)}
					value={columnFilterValue?.toString()}
				>
					{column.id === 'strCategory' &&
						catOptions?.map((option) => (
							<option value={option.value} key={option.value}>
								{option.label}
							</option>
						))}
					{column.id === 'strArea' &&
						areaOptions?.map((option) => (
							<option value={option.value} key={option.value}>
								{option.label}
							</option>
						))}
				</select>
			</div>
		);
	}

	return (
		<>
			<div className={styles.listWrapper}>
				<Table table={table} handleRowClick={handleRowClick} Filter={Filter} />
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
