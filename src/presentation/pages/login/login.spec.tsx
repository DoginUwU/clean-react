import { render } from '@testing-library/react'
import Login from './login'

describe('Login View', () => {
    test('should start with initial state', () => {
        const { getByTestId } = render(<Login />)

        const errorWrap = getByTestId('error-wrap');
        expect(errorWrap.childElementCount).toBe(0);

        const submitButton = getByTestId('submit') as HTMLButtonElement;
        expect(submitButton.disabled).toBe(true);
    });
});