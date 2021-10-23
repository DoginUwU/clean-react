import { Validation } from '@/presentation/protocols/validation';
import { fireEvent, render, RenderResult } from '@testing-library/react'
import Login from './login'

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

class ValidationSpy implements Validation {
    errorMessage: string
    input: object

    validate(input: object): string {
        this.input = input
        return this.errorMessage
    }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = render(<Login validation={validationSpy} />);

  return {
    sut,
    validationSpy
  };
};

describe('Login View', () => {
    test('should start with initial state', () => {
        const { sut } = makeSut();

        const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
        expect(submitButton.disabled).toBe(true);
    });

    test('should call Validation with correct email', () => {
      const { sut, validationSpy } = makeSut();

        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, { target: { value: 'any_email' } })
        
        expect(validationSpy.input).toEqual({
            email: 'any_email'
        })
    });

    test('should call Validation with correct password', () => {
      const { sut, validationSpy } = makeSut();

      const passwordInput = sut.getByTestId('password');
      fireEvent.input(passwordInput, { target: { value: 'any_password' } });

      expect(validationSpy.input).toEqual({
        password: 'any_password'
      });
    });
});