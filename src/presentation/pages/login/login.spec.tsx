import faker from 'faker'
import {
  ValidationStub,
  AuthenticationSpy
} from '@/presentation/test';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult
} from '@testing-library/react'
import Login from './login'

type SutTypes = {
  sut: RenderResult;
  validationStub: ValidationStub;
  authenticationSpy: AuthenticationSpy;
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  const sut = render( <
    Login validation = {
      validationStub
    }
    authentication = {
      authenticationSpy
    }
    />
  );

  return {
    sut,
    validationStub,
    authenticationSpy
  };
};

const simulateValidSubmit = (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): void => { 
  const emailInput = sut.getByTestId('email');
  fireEvent.input(emailInput, {
    target: {
      value: email
    }
  });

  const passwordInput = sut.getByTestId('password');
  fireEvent.input(passwordInput, {
    target: {
      value: password
    }
  });

  const submitButton = sut.getByTestId('submit') as HTMLButtonElement;

  fireEvent.click(submitButton);
}

describe('Login View', () => {
  afterEach(cleanup)

  test('should enable submit button if form is valid', () => {
    const {
      sut,
      validationStub
    } = makeSut();
    validationStub.errorMessage = null;

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });
  test('should disable submit button on submit', () => {
    const {
      sut,
      validationStub
    } = makeSut();
    validationStub.errorMessage = null;

    simulateValidSubmit(sut);

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
  });
  test('should call Authentication with correct values', () => {
    const {
      sut,
      authenticationSpy
    } = makeSut();

    const email = faker.internet.email();
    const password = faker.internet.password();

    simulateValidSubmit(sut, email, password);

    expect(authenticationSpy.params).toEqual({
      email,
      password
    });
  });
  test('should call Authentication only once', () => {
    const { sut, authenticationSpy } = makeSut();

    simulateValidSubmit(sut);
    simulateValidSubmit(sut);

    expect(authenticationSpy.callsCount).toEqual(1);
  });

  test('should not call Authentication if form is invalid', () => {
    const { sut, authenticationSpy, validationStub } = makeSut();
    validationStub.errorMessage = faker.random.words();

    simulateValidSubmit(sut, '');

    expect(authenticationSpy.callsCount).toEqual(0);
  });
});