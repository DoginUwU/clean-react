class UnexpectedError extends Error {
  constructor () {
    super('Erro interno')
    this.name = 'UnexpectedError'
  }
}

export { UnexpectedError }
