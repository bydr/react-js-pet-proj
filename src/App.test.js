import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import AppProd from './App';

test('renders learn react link', () => {
  render(<AppProd />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
}); //not working

test("render component without crashing",() => {
  let div = document.createElement('div');
  ReactDOM.render(<AppProd />, div);
  ReactDOM.unmountComponentAtNode(div);
});
