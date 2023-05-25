import { SearchBar } from "./SearchBar";
import { render, fireEvent } from '@testing-library/react';
import { store } from '../../app/store';
import ContextProvider from './app/appContext';

test('renders search bar', () => {
  const { getByText, getByTestId } = render(
    <ContextProvider>
      <SearchBar />
    </ContextProvider>
  );
  expect(getByTestId("fileSearch")).toBeTruthy();
  expect(getByTestId("configSearch")).toBeTruthy();
});

it('Text input should be interactive', () => {
  const { getByText, getByTestId } = render(
    <ContextProvider>
      <SearchBar />
    </ContextProvider>
  );
  const input = document.querySelector("#combo-box");
  fireEvent.click(input);
  fireEvent.change(input, { target: { value: "test" } })
  expect(input.value).toBe("test");
});
it('Button is clickable', () => {
  const { } = render(
    <ContextProvider>
      <SearchBar />
    </ContextProvider>
  );
  const button = document.querySelector(".MuiButton-containedPrimary");
  expect(button.disabled).toBeTruthy();
  fireEvent.click(button);
})

