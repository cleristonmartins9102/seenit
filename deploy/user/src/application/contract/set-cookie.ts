export interface SetCookie {
  set (options: SetCookie.Options): void
}

export namespace SetCookie {
  export type Options = { sessionName: string, value: unknown }
}

export interface DestroySession {
  destroy (sessionName: string): void
}
