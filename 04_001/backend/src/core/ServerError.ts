class ServerError extends Error {
  constructor(public readonly msg: string, public status?: number) {
    super(msg);
  }
}

export default ServerError;
