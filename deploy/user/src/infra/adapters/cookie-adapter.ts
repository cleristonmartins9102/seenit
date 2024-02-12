import { type DestroySession, type SetCookie } from '../../application/contract'

type SessionType = CookieSessionInterfaces.CookieSessionObject | null | undefined
type SessionOptType = CookieSessionInterfaces.CookieSessionOptions | null

export class CookieAdapter implements SetCookie, DestroySession {
  private session: SessionType = null
  sessionOptions: SessionOptType = null
  private constructor (session: SessionType, sessionOptions: SessionOptType) {
    this.session = session
    this.sessionOptions = sessionOptions
  }

  static build (session: SessionType, sessionOptions: SessionOptType): CookieAdapter {
    return new CookieAdapter(session, sessionOptions)
  }

  set (options: SetCookie.Options): void {
    if (this.session !== undefined && this.session !== null) {
      this.session[options.sessionName] = options.value
      this.sessionOptions = { ...this.sessionOptions, maxAge: 24 * 60 * 1000 * 24 }
    }
  }

  destroy (sessionName: string): SessionType {
    if (this.session !== undefined && this.session !== null) {
      this.session = {}
    }
    return this.session
  }
}

export namespace CookieAdapter {
  export interface Build extends SetCookie {
    build: (session: CookieSessionInterfaces.CookieSessionObject | null | undefined, options: CookieSessionInterfaces.CookieSessionOptions) => CookieAdapter.Build
  }
}
