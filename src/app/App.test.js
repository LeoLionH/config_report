import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('renders app units', () => {
  const { getByText, getByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText("Multi-site config report")).toBeInTheDocument();
  expect(getByTestId("searchBar")).toBeTruthy();
});
