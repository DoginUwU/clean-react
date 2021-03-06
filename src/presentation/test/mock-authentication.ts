import { mockAccountModel } from "@/domain/test";
import { Authentication, AuthenticationParams } from "@/domain/usecases";

class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  callsCount = 0
  params: AuthenticationParams;

  async auth(params: AuthenticationParams) {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.account);
  }
}

export { AuthenticationSpy };