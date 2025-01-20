import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Table, TableProps } from './Table';
import { Table as ReactTable } from '@tanstack/react-table';
import { RecipeT } from '../recipeList/RecipeList';

// Mock data
const mockData: RecipeT[] = [
	{ idMeal: '1', name: 'Recipe 1' },
	{ idMeal: '2', name: 'Recipe 2' },
];

// Mock table instance
const mockTable = {
	getRowModel: () => ({
		rows: mockData.map((data) => ({
			id: data.idMeal,
			original: data,
			getVisibleCells: () => [
				{
					id: 'name',
					column: { columnDef: { cell: () => data.name } },
					getContext: () => ({}),
				},
			],
		})),
	}),
	getHeaderGroups: () => [
		{
			id: 'headerGroup1',
			headers: [
				{
					id: 'name',
					isPlaceholder: false,
					colSpan: 1,
					column: {
						getToggleSortingHandler: () => jest.fn(),
						getCanSort: () => true,
						getNextSortingOrder: () => 'asc',
						getIsSorted: () => 'asc',
						getCanFilter: () => false,
						columnDef: { header: 'Name' },
					},
					getContext: () => ({}),
				},
			],
		},
	],
} as unknown as ReactTable<RecipeT>;

describe('Table Component', () => {
	const defaultProps: TableProps = {
		table: mockTable,
		handleRowClick: jest.fn(),
	};

	it('renders table headers', () => {
		render(<Table {...defaultProps} />);
		expect(screen.getByText(/Name/)).toBeInTheDocument();
	});

	it('renders table rows', () => {
		render(<Table {...defaultProps} />);
		mockData.forEach((data) => {
			expect(screen.getByText(data.name)).toBeInTheDocument();
		});
	});

	it('calls handleRowClick when a row is clicked', async () => {
		render(<Table {...defaultProps} />);
		const firstRow = screen.getByRole('row', { name: /Recipe 1/i });
		fireEvent.click(firstRow);
		expect(defaultProps.handleRowClick).toHaveBeenCalledWith('1');
	});

	it('sorts table rows when header is clicked', () => {
		render(<Table {...defaultProps} />);
		const header = screen.getByText(/Name/);
		fireEvent.click(header);

		const sortedData = [...mockData].sort((a, b) =>
			a.name.localeCompare(b.name)
		);
		sortedData.forEach((data, index) => {
			const row = screen.getAllByRole('row')[index + 1];
			expect(row).toHaveTextContent(data.name);
		});
	});

	it('renders filter component when column can be filtered', () => {
		const FilterMock = jest.fn().mockReturnValue(<div>Filter</div>);
		const filterableTable = {
			...mockTable,
			getHeaderGroups: () => [
				{
					id: 'headerGroup1',
					headers: [
						{
							id: 'name',
							isPlaceholder: false,
							colSpan: 1,
							column: {
								...mockTable.getHeaderGroups()[0].headers[0].column,
								getCanFilter: () => true,
							},
							getContext: () => ({}),
						},
					],
				},
			],
		} as unknown as ReactTable<RecipeT>;

		render(
			<Table {...defaultProps} table={filterableTable} Filter={FilterMock} />
		);
		expect(FilterMock).toHaveBeenCalled();
		expect(screen.getByText('Filter')).toBeInTheDocument();
	});

	it('displays correct sorting indicator', async () => {
		render(<Table {...defaultProps} />);
		const header = screen.getByText(/Name/);
		expect(header).toHaveTextContent('Name');
		fireEvent.click(header);
		expect(header).toHaveTextContent('Name 🔼');
	});

	it('limits the number of rendered rows', () => {
		const largeData = Array.from({ length: 20 }, (_, i) => ({
			idMeal: `${i + 1}`,
			name: `Recipe ${i + 1}`,
		}));
		const largeTable = {
			...mockTable,
			getRowModel: () => ({
				rows: largeData.map((data) => ({
					id: data.idMeal,
					original: data,
					getVisibleCells: () => [
						{
							id: 'name',
							column: { columnDef: { cell: () => data.name } },
							getContext: () => ({}),
						},
					],
				})),
			}),
		} as unknown as ReactTable<RecipeT>;

		render(<Table {...defaultProps} table={largeTable} />);
		expect(screen.getAllByRole('row')).toHaveLength(11);
	});

	it('does not sort when clicking on non-sortable column', () => {
		const nonSortableTable = {
			...mockTable,
			getHeaderGroups: () => [
				{
					id: 'headerGroup1',
					headers: [
						{
							id: 'name',
							isPlaceholder: false,
							colSpan: 1,
							column: {
								...mockTable.getHeaderGroups()[0].headers[0].column,
								getCanSort: () => false,
								getIsSorted: () => false,
								getToggleSortingHandler: () => null,
							},
							getContext: () => ({}),
						},
					],
				},
			],
		} as unknown as ReactTable<RecipeT>;

		render(<Table {...defaultProps} table={nonSortableTable} />);
		const header = screen.getByText(/Name/);
		fireEvent.click(header);
		expect(header).not.toHaveTextContent('🔼');
		expect(header).not.toHaveTextContent('🔽');
	});
});
