import { render, screen } from '@testing-library/react';
import App from './App';

test('renders bmi calculator heading', () => {
  render(<App />);
  const heading = screen.getByText(/bmi calculator/i);
  expect(heading).toBeInTheDocument();
});
