import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import configureStore from "redux-mock-store";
import Catalog from "./Catalog";
import { describe, it, beforeEach, expect, vi, beforeAll } from "vitest";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

const mockStore = configureStore([]);

describe("Catalog increment/decrement buttons", () => {
  let store;
  let dispatchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    store = mockStore({
      cards: {
        items: [
          {
            id: 1,
            name: "Test Product",
            price: 100,
            count: 1,
            image: "test.jpg",
          },
        ],
      },
    });

    dispatchMock = vi.fn();
    store.dispatch = dispatchMock;

    render(
      <Provider store={store}>
        <MantineProvider>
          <Catalog />
        </MantineProvider>
      </Provider>
    );
  });

  it("calls incrementCount with correct id on + button click", () => {
    fireEvent.click(screen.getByRole("button", { name: /increment/i }));
    expect(dispatchMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "cards/incrementCount",
        payload: 1,
      })
    );
  });

  it("calls decrementCount with correct id on - button click", () => {
    fireEvent.click(screen.getByRole("button", { name: /decrement/i }));
    expect(dispatchMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "cards/decrementCount",
        payload: 1,
      })
    );
  });
});

describe("Catalog component additional tests", () => {
  let store;
  let dispatchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    store = mockStore({
      cards: {
        items: [
          {
            id: 1,
            name: "Test Product",
            price: 100,
            count: 2,
            image: "test.jpg",
          },
        ],
      },
    });
    dispatchMock = vi.fn();
    store.dispatch = dispatchMock;

    render(
      <Provider store={store}>
        <MantineProvider>
          <Catalog />
        </MantineProvider>
      </Provider>
    );
  });

  it("renders product image with correct alt text", () => {
    const img = screen.getByAltText("product");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "test.jpg");
  });

  it("dispatches addToCart action when 'Add to cart' button is clicked", () => {
    fireEvent.click(screen.getByRole("button", { name: /add to cart/i }));
    expect(dispatchMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "cards/addToCart",
        payload: {
          id: 1,
          name: "Test Product",
          price: 100,
          count: 2,
          image: "test.jpg",
        },
      })
    );
  });

  it("displays correct count between increment and decrement buttons", () => {
    const countText = screen.getByText("2");
    expect(countText).toBeInTheDocument();
  });
});
