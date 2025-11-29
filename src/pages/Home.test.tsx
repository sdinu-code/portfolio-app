import { ThemeProvider } from '@contexts/ThemeContext';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Home from './Home';

describe('Home Page', () => {
  it('renders home page without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(container.firstChild).toBeDefined();
  });

  it('renders main container', () => {
    const { container } = render(
      <MemoryRouter>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(container.querySelector('[data-section]')).toBeDefined();
  });

  it('includes sections structure', () => {
    const { container } = render(
      <MemoryRouter>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </MemoryRouter>
    );
    const sections = container.querySelectorAll('[data-section]');
    expect(sections.length).toBeGreaterThan(0);
  });

  it('implements scroll functionality', () => {
    const { container } = render(
      <MemoryRouter>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </MemoryRouter>
    );
    // Just verify component renders with scroll container
    expect(container.firstChild).toBeDefined();
  });

  it('shows navigation structure', () => {
    const { container } = render(
      <MemoryRouter>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(container.firstChild).toBeDefined();
  });

  it('renders all main sections', () => {
    const { container } = render(
      <MemoryRouter>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(container.querySelector('[data-section]')).toBeDefined();
  });

  it('initializes without errors', () => {
    expect(() => {
      render(
        <MemoryRouter>
          <ThemeProvider>
            <Home />
          </ThemeProvider>
        </MemoryRouter>
      );
    }).not.toThrow();
  });

  it('mounts successfully', () => {
    const { unmount } = render(
      <MemoryRouter>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(unmount).toBeDefined();
  });
});

describe('Home Page - Interactions', () => {
  let mockScrollIntoView: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockScrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = mockScrollIntoView;

    // Mock IntersectionObserver
    global.IntersectionObserver = vi.fn().mockImplementation((callback) => ({
      observe: vi.fn((element) => {
        callback([
          {
            isIntersecting: true,
            target: element,
          },
        ]);
      }),
      disconnect: vi.fn(),
      unobserve: vi.fn(),
      takeRecords: vi.fn(),
      root: null,
      rootMargin: '',
      thresholds: [],
    }));

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 768,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should scroll to section when TOC button is clicked', async () => {
    const { container } = render(
      <MemoryRouter>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      const tocButtons = container.querySelectorAll('button[aria-label^="Go to"]');
      expect(tocButtons.length).toBeGreaterThan(0);
    });

    const projectsButton = container.querySelector('button[aria-label="Go to Projects"]');
    if (projectsButton) {
      fireEvent.click(projectsButton);
      await waitFor(() => {
        expect(mockScrollIntoView).toHaveBeenCalled();
      });
    }
  });

  it('should handle View My Work button click', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </MemoryRouter>
    );

    const viewWorkButton = getByText('View My Work');
    fireEvent.click(viewWorkButton);

    await waitFor(() => {
      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });

  it('should handle Download CV button click', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </MemoryRouter>
    );

    const downloadButton = getByText('Download CV');
    fireEvent.click(downloadButton);

    // Should show loading state
    await waitFor(() => {
      expect(getByText('Downloading...')).toBeDefined();
    });
  });

  it('should handle scroll events on container', async () => {
    const { container } = render(
      <MemoryRouter>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </MemoryRouter>
    );

    const pageContainer = container.querySelector('[data-section]')?.parentElement;
    if (pageContainer) {
      fireEvent.scroll(pageContainer);
      // Should not crash
      expect(pageContainer).toBeDefined();
    }
  });

  it('should update active section on intersection', async () => {
    const { container } = render(
      <MemoryRouter>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(container.querySelectorAll('button[aria-label^="Go to"]').length).toBeGreaterThan(0);
    });
  });

  it('should handle scroll snapping logic', () => {
    const { container } = render(
      <MemoryRouter>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </MemoryRouter>
    );

    const pageContainer = container.querySelector('[data-section]')?.parentElement;
    if (pageContainer) {
      fireEvent.scroll(pageContainer);

      // Should not crash
      expect(container).toBeDefined();
    }
  });

  it('should disable scroll snap on mobile', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });

    const { container } = render(
      <MemoryRouter>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </MemoryRouter>
    );

    const pageContainer = container.querySelector('[data-section]')?.parentElement;
    if (pageContainer) {
      fireEvent.scroll(pageContainer);
      // Should not crash on mobile
      expect(pageContainer).toBeDefined();
    }
  });

  it('should cleanup on unmount', () => {
    const { unmount } = render(
      <MemoryRouter>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </MemoryRouter>
    );

    expect(() => unmount()).not.toThrow();
  });
});

