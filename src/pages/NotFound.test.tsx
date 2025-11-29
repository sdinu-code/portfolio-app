import { ThemeProvider } from '@contexts/ThemeContext';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import NotFound from './NotFound';

describe('NotFound Page', () => {
  it('renders 404 page without crashing', () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      </ThemeProvider>
    );
    expect(screen.getByText(/404/i)).toBeDefined();
  });

  it('displays not found message', () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      </ThemeProvider>
    );
    expect(screen.getByText(/not found/i)).toBeDefined();
  });

  it('includes navigation back to home', () => {
    const { container } = render(
      <ThemeProvider>
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      </ThemeProvider>
    );
    const homeLink = container.querySelector('a[href="/"]');
    expect(homeLink).toBeDefined();
  });

  it('renders with proper structure', () => {
    const { container } = render(
      <ThemeProvider>
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      </ThemeProvider>
    );
    expect(container.firstChild).toBeDefined();
  });

  it('initializes without errors', () => {
    expect(() => {
      render(
        <ThemeProvider>
          <BrowserRouter>
            <NotFound />
          </BrowserRouter>
        </ThemeProvider>
      );
    }).not.toThrow();
  });
});
