import faker from 'faker'
import {
  ValidationStub,
  AuthenticationSpy
} from '@/presentation/test';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor
} from '@testing-library/react'
import Login from './login'
import { InvalidCredentialsError } from '@/domain/errors';

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

  test('should enable submit button if form is valid', async () => {
    const {
      sut,
      validationStub
    } = makeSut();
    validationStub.errorMessage = null;

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    await waitFor(() => {
      expect(submitButton.disabled).toBe(false);
    })
  });
  test('should disable submit button on submit', async () => {
    const {
      sut,
      validationStub
    } = makeSut();
    validationStub.errorMessage = null;

    simulateValidSubmit(sut);
    
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    await waitFor(() => {
      expect(submitButton.disabled).toBe(true);
    })
  });
  test('should call Authentication with correct values', async () => {
    const {
      sut,
      authenticationSpy
    } = makeSut();

    const email = faker.internet.email();
    const password = faker.internet.password();

    simulateValidSubmit(sut, email, password);

    await waitFor(() => {
      expect(authenticationSpy.params).toEqual({
        email,
        password
      });
    })
  });
  test('should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut();

    simulateValidSubmit(sut);
    simulateValidSubmit(sut);

    await waitFor(() => {
      expect(authenticationSpy.callsCount).toEqual(1);
    })
  });

  test('should not call Authentication if form is invalid', async () => {
    const { sut, authenticationSpy, validationStub } = makeSut();
    validationStub.errorMessage = faker.random.words();

    simulateValidSubmit(sut, '');

    await waitFor(() => {
      expect(authenticationSpy.callsCount).toEqual(0);
    })
  });

  test('should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut();
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(new InvalidCredentialsError()))

    await waitFor(() => {
      simulateValidSubmit(sut);
    })

    await waitFor(() => {
      expect(authenticationSpy.callsCount).toEqual(0);
    })
  });
});