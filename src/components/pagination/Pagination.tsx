import React from 'react';
import Button from '../common/button/Button';

import styles from './pagination.module.css';

export interface PaginationProps {
	currentPage: number;
	onPageChange: (page: number) => void;
	canPreviousPage: boolean;
	previousPage: () => void;
	canNextPage: boolean;
	nextPage: () => void;
	totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({
	canPreviousPage,
	previousPage,
	canNextPage,
	nextPage,
	totalPages,
	currentPage,
	onPageChange,
}) => {
	if (totalPages === 0) {
		return null;
	}

	const handlePageChange = (page: number) => {
		if (page <= totalPages) {
			onPageChange(page);
		}
	};

	return (
		<div className={styles.pagination}>
			<Button variant='page' onClick={previousPage} disabled={!canPreviousPage}>
				{'<'}
			</Button>
			{Array.from({ length: totalPages }, (_, index) => (
				<Button
					key={index + 1}
					onClick={() => handlePageChange(index)}
					className={currentPage === index + 1 ? 'active' : ''}
					variant='page'
				>
					{index + 1}
				</Button>
			))}
			<Button variant='page' onClick={nextPage} disabled={!canNextPage}>
				{'>'}
			</Button>
		</div>
	);
};

export default Pagination;
