import { ValidationSpy } from '@/presentation/test';
import { fireEvent, render, RenderResult } from '@testing-library/react'
import Login from './login'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

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
    const email = faker.internet.email();

    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })
        
    expect(validationSpy.fieldName).toBe('email');
    expect(validationSpy.fieldValue).toBe(email);
  })
    test('should call Validation with correct password', () => {
      const { sut, validationSpy } = makeSut();
      const password = faker.internet.password();

      const passwordInput = sut.getByTestId('password');
      fireEvent.input(passwordInput, { target: { value: password } });

      expect(validationSpy.fieldName).toBe('password');
      expect(validationSpy.fieldValue).toBe(password);
  });
});