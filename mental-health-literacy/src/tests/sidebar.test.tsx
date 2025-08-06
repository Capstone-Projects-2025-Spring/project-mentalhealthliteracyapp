import { render, screen } from "@testing-library/react";
import Sidebar from "src/layouts/Sidebar";
import { store } from "src/context/global_store";
import { Provider } from "react-redux";
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import useClient from "utils/useClient";
import useUser from "utils/useUser";
const router = createMemoryRouter(
  createRoutesFromElements(<Route path="/" element={<Sidebar />} />),
  {
    initialEntries: ["/"],
  }
);

test("Loads sidebar and displays auth. buttons", async () => {
  vi.mocked(useClient).mockReturnValue(false);
  vi.mocked(useUser).mockReturnValue(null);
  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
  const signin = await screen.getByText("Sign-in");
  const register = await screen.getByText("Register");
  expect(signin).toBeDefined();
  expect(register).toBeDefined();
});

test("Loads sidebar and displays email and logout buttons", async () => {
  vi.mocked(useClient).mockReturnValue(true);
  vi.mocked(useUser).mockReturnValue("testemail@gmail.com");
  vi.mock("utils/useClient", () => {
    return {
      default: vi.fn(() => true),
    };
  });
  vi.mock("utils/useUser", () => {
    return {
      default: vi.fn(() => "testemail@gmail.com"),
    };
  });
  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
  const display = screen.getByText("Signed in as:", { exact: false });
  expect(display).toBeDefined();
});
