import { render, screen } from '@testing-library/react';
import Search from './components/Search';

test('renders learn react link', () => {
  render(<Search />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
