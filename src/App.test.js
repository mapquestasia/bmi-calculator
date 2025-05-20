import { render, screen } from '@testing-library/react';
import App from './App';

test('allows changing weight unit', () => {
  render(<App />);
  const heading = screen.getByText(/bmi calculator/i);
  expect(heading).toBeInTheDocument();

  const unitSelect = screen.getByRole('combobox');
  expect(unitSelect).toBeInTheDocument();
  expect(screen.getByRole('option', { name: /kg/i })).toBeInTheDocument();
  expect(screen.getByRole('option', { name: /lbs/i })).toBeInTheDocument();
});
