import { render } from '@testing-library/react';
import Input from './Input';

describe('Input component', () => {
    test('should start with initial state', () => {
        const errorMessage = 'Required field';
        const { getByTestId } = render(<Input errorMessage={errorMessage} />);

        const emailStatus = getByTestId('status');
        expect(emailStatus.title).toBe(errorMessage);
        expect(emailStatus.textContent).toBe('🔴');
  });
});
