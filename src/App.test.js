import { render, screen } from '@testing-library/react';
import App from './App';

test('allows changing weight and height units', () => {
  render(<App />);
  const heading = screen.getByText(/bmi calculator/i);
  expect(heading).toBeInTheDocument();

  const selects = screen.getAllByRole('combobox');
  expect(selects).toHaveLength(2);

  expect(screen.getByRole('option', { name: /kg/i })).toBeInTheDocument();
  expect(screen.getByRole('option', { name: /lbs/i })).toBeInTheDocument();
  expect(screen.getByRole('option', { name: /cm/i })).toBeInTheDocument();
  expect(screen.getByRole('option', { name: /^m$/i })).toBeInTheDocument();
});
