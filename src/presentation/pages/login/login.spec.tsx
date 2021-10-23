import { render } from '@testing-library/react'
import Login from './login'

describe('Login View', () => {
    test('should not render spinner on start', () => {
        const { getByTestId } = render(<Login />)
        const errorWrap = getByTestId('error-wrap');
        expect(errorWrap.childElementCount).toBe(0);
    });
});