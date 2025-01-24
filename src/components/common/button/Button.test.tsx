import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
	it('renders with default props', () => {
		render(<Button>Default Button</Button>);

		const buttonElement = screen.getByText('Default Button');
		expect(buttonElement).toBeInTheDocument();
		expect(buttonElement).toHaveClass('button text');
	});

	it('applies the correct variant class', () => {
		render(<Button variant='primary'>Primary Button</Button>);

		const buttonElement = screen.getByText('Primary Button');
		expect(buttonElement).toBeInTheDocument();
		expect(buttonElement).toHaveClass('button primary');
	});

	it('applies additional class names', () => {
		render(<Button className='extra-class'>Button with Extra Class</Button>);

		const buttonElement = screen.getByText('Button with Extra Class');
		expect(buttonElement).toBeInTheDocument();
		expect(buttonElement).toHaveClass('button text extra-class');
	});

	it('passes additional props to the button element', () => {
		const onClickMock = jest.fn();
		render(<Button onClick={onClickMock}>Clickable Button</Button>);

		const buttonElement = screen.getByText('Clickable Button');
		buttonElement.click();
		expect(onClickMock).toHaveBeenCalledTimes(1);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});
});
