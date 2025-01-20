import { Column, flexRender } from '@tanstack/react-table';
import { Table as ReactTable } from '@tanstack/react-table';
import { RecipeT } from '../recipeList/RecipeList';

export interface TableProps {
	table: ReactTable<RecipeT>;
	handleRowClick?: (id: string) => void;
	Filter?: ({ column }: { column: Column<RecipeT, unknown> }) => JSX.Element;
}

export function Table({ table, handleRowClick, Filter }: TableProps) {
	return (
		<table>
			<thead>
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map((header) => {
							return (
								<th key={header.id} colSpan={header.colSpan}>
									{header.isPlaceholder ? null : (
										<>
											<div
												onClick={header.column.getToggleSortingHandler()}
												title={
													header.column.getCanSort()
														? header.column.getNextSortingOrder() === 'asc'
															? 'Sort ascending'
															: header.column.getNextSortingOrder() === 'desc'
															? 'Sort descending'
															: 'Clear sort'
														: undefined
												}
											>
												{flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
												{{
													asc: ' 🔼',
													desc: ' 🔽',
												}[header.column.getIsSorted() as string] ?? null}
											</div>
											{header.column.getCanFilter()
												? !!Filter && <Filter column={header.column} />
												: null}
										</>
									)}
								</th>
							);
						})}
					</tr>
				))}
			</thead>

			<tbody>
				{table
					.getRowModel()
					.rows.slice(0, 10)
					.map((row) => {
						return (
							<tr
								key={row.id}
								onClick={() => handleRowClick?.(row.original.idMeal)}
							>
								{row.getVisibleCells().map((cell) => {
									return (
										<td key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</td>
									);
								})}
							</tr>
						);
					})}
			</tbody>
		</table>
	);
}
