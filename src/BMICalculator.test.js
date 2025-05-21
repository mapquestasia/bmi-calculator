import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BMICalculator } from './components/BMICalculator';

describe('BMICalculator result categories', () => {
  const cases = [
    {weight: 50, height: 170, bmi: '17.30', text: 'Underweight'},
    {weight: 60, height: 170, bmi: '20.76', text: 'Normal Weight'},
    {weight: 80, height: 170, bmi: '27.68', text: 'Overweight'},
    {weight: 95, height: 170, bmi: '32.87', text: 'Obesity'},
  ];

  test.each(cases)('shows %s when weight=%i height=%i', async ({weight, height, bmi, text}) => {
    render(<BMICalculator />);
    const [weightInput, heightInput] = screen.getAllByRole('textbox');

    await userEvent.type(weightInput, String(weight));
    await userEvent.type(heightInput, String(height));
    await userEvent.click(screen.getByRole('button', {name: /calculate/i}));

    expect(await screen.findByText(text)).toBeInTheDocument();
    expect(screen.getByText(bmi)).toBeInTheDocument();
  });

  test('reset button clears inputs', async () => {
    render(<BMICalculator />);
    const [weightInput, heightInput] = screen.getAllByRole('textbox');

    await userEvent.type(weightInput, '80');
    await userEvent.type(heightInput, '170');
    await userEvent.click(screen.getByRole('button', { name: /reset/i }));

    expect(weightInput.value).toBe('');
    expect(heightInput.value).toBe('');
  });
});
