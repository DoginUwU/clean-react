import { ValidationStub } from '@/presentation/test';
import { fireEvent, render, RenderResult } from '@testing-library/react'
import Login from './login'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult;
  validationStub: ValidationStub;
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const sut = render(<Login validation={validationStub} />);

  return {
    sut,
    validationStub
  };
};

describe('Login View', () => {
  test('should enable submit button if form is valid', () => {
    const { sut, validationStub } = makeSut();
    validationStub.errorMessage = null;

    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
     
    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    });

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });
  test('should disable submit button on submit', () => {
    const { sut, validationStub } = makeSut();
    validationStub.errorMessage = null;

    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    });

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;

    fireEvent.click(submitButton);
    expect(submitButton.disabled).toBe(true);
  });
});