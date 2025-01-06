import { Checkbox } from '$lib/components/ui/checkbox/index.js';
import { renderComponent } from '$lib/components/ui/data-table';
import DataTableActions from '$lib/components/ui/data-table/data-table-actions.svelte';
import type { ColumnDef } from '@tanstack/table-core';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Order = {
	id: string;
	title: string;
	status: 'pending' | 'processing' | 'success' | 'failed';
	date: string;
};

export const columns: ColumnDef<Order>[] = [
	{
		id: 'select',
		header: ({ table }) =>
			renderComponent(Checkbox, {
				checked: table.getIsAllPageRowsSelected(),
				indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
				onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
				controlledChecked: true,
				'aria-label': 'Select all'
			}),
		cell: ({ row }) =>
			renderComponent(Checkbox, {
				checked: row.getIsSelected(),
				onCheckedChange: (value) => row.toggleSelected(!!value),
				controlledChecked: true,
				'aria-label': 'Select row'
			}),
		enableSorting: false,
		enableHiding: false
	},
	{
		accessorKey: 'summary',
		header: 'Title'
	},
	{
		accessorKey: 'status',
		header: 'Status'
	},
	{
		accessorKey: 'timestamp',
		header: 'Created'
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return renderComponent(DataTableActions, { id: row.original.id });
		}
	}
];
