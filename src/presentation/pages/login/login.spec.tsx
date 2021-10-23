import faker from 'faker'
import {
  ValidationStub,
  AuthenticationSpy
} from '@/presentation/test';
import {
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

describe('Login View', () => {
  test('should enable submit button if form is valid', () => {
    const {
      sut,
      validationStub
    } = makeSut();
    validationStub.errorMessage = null;

    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, {
      target: {
        value: faker.internet.email()
      }
    });

    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, {
      target: {
        value: faker.internet.password()
      }
    });

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });
  test('should disable submit button on submit', () => {
    const {
      sut,
      validationStub
    } = makeSut();
    validationStub.errorMessage = null;

    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, {
      target: {
        value: faker.internet.email()
      }
    });

    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, {
      target: {
        value: faker.internet.password()
      }
    });

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;

    fireEvent.click(submitButton);
    expect(submitButton.disabled).toBe(true);
  });

  test('should call Authentication with correct values', () => {
    const {
      sut,
      authenticationSpy
    } = makeSut();

    const email = faker.internet.email();
    const password = faker.internet.password();

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
    expect(authenticationSpy.params).toEqual({
      email,
      password
    });
  });
});