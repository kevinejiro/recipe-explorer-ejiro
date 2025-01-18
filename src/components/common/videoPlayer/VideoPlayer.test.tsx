import React from 'react';
import { render, screen } from '@testing-library/react';
import VideoPlayer from './VideoPlayer';

beforeAll(() => {
	// Mock IntersectionObserver
	global.IntersectionObserver = class {
		constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
			// ... constructor logic if needed ...
		}
		observe() {}
		unobserve() {}
		disconnect() {}
		// Add required properties
		root: Element | null = null;
		rootMargin: string = '';
		thresholds: number[] = [];
		takeRecords(): IntersectionObserverEntry[] {
			return [];
		}
	};
});

describe('VideoPlayer Component', () => {
	// Test when videoUrl is not provided
	it('displays message when videoUrl is not available', () => {
			render(<VideoPlayer videoUrl="" posterUrl="http://example.com/poster.jpg" altText='' />);
		
			expect(screen.getByText(/Video URL is not available./i)).toBeInTheDocument();
	});
}); 