import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from './Modal';

// Mock the HTMLDialogElement methods
beforeAll(() => {
	HTMLDialogElement.prototype.showModal = jest.fn();
	HTMLDialogElement.prototype.close = jest.fn();
});

describe('Modal Component', () => {
	it('should render children when open is true', () => {
		const handleClose = jest.fn();
		render(
			<Modal open={true} handleClose={handleClose}>
				<div>Modal Content</div>
			</Modal>
		);

		const modalContent = screen.getByText('Modal Content');
		expect(modalContent).toBeInTheDocument();
	});

	it('should not render children when open is false', () => {
		const handleClose = jest.fn();
		render(
			<Modal open={false} handleClose={handleClose}>
				<div>Modal Content</div>
			</Modal>
		);
		expect(screen.queryByText('Modal Content')).not.toBeVisible();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});
});
