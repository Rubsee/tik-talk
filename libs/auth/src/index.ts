import {canActivateAuth} from "./lib/auth/access.guard";
import {authTokenInterceptor} from "./lib/auth/auth.interceptor";
import {TokenResponse} from "./lib/auth/auth.interface";
import {AuthService} from "./lib/auth/auth.service";

export * from './lib/feature-login'

export {
  canActivateAuth,
  authTokenInterceptor,
  AuthService,
}
export type {
  TokenResponse,
}
