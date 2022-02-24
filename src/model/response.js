class ActionResponse {
  constructor(message, isError, data) {
    this.message = message;
    this.isError = isError;
    this.data = data;
  }
}
export default ActionResponse