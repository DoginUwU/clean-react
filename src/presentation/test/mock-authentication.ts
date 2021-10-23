import { mockAccountModel } from "@/domain/test";
import { Authentication, AuthenticationParams } from "@/domain/usecases";

class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params: AuthenticationParams;

  async auth(params: AuthenticationParams) {
    this.params = params;
    return Promise.resolve(this.account);
  }
}

export { AuthenticationSpy };