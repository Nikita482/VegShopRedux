import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import configureStore from "redux-mock-store";
import Header from "./Header";
import { describe, it, beforeEach, expect, vi, beforeAll } from "vitest";
import userEvent from "@testing-library/user-event";

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

describe("Header component tests", () => {
  let store: ReturnType<typeof mockStore>;
  let dispatchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    store = mockStore({
      cards: {
        cart: [
          {
            id: 1,
            name: "Test Product",
            price: 50,
            count: 2,
            image: "test.jpg",
          },
        ],
        total: 100,
      },
    });

    dispatchMock = vi.fn();
    store.dispatch = dispatchMock;

    render(
      <Provider store={store}>
        <MantineProvider>
          <Header />
        </MantineProvider>
      </Provider>
    );
  });

  it("renders cart button with correct count", () => {
    const cartCount = screen.getByText("1");
    expect(cartCount).toBeInTheDocument();

    const cartButton = screen.getByRole("button", { name: /cart/i });
    expect(cartButton).toBeInTheDocument();
  });

  it("renders logo text", () => {
    expect(screen.getByText(/vegetable/i)).toBeInTheDocument();
    expect(screen.getByText(/shop/i)).toBeInTheDocument();
  });

  it("renders Total and total price when cart is not empty", async () => {
    const button = screen.getByRole("button", { name: /cart/i });
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/total/i)).toBeInTheDocument();
    });

    expect(screen.getByText("Total")).toBeInTheDocument();
  });
});
