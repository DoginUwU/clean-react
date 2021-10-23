import { render } from '@testing-library/react';
import FormStatus from './form-status';

describe('FormStatus component', () => {
  test('should start with initial state', () => {
    const { getByTestId } = render(<FormStatus />);

    const errorWrap = getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);
  });
    
    test('should render spinner on isLoading true', () => {
      const { getByTestId } = render(<FormStatus isLoading />);

      const errorWrap = getByTestId('error-wrap');
      expect(errorWrap.childElementCount).toBe(1);
    });
});
