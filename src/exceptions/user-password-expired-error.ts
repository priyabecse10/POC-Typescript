class UserPasswordExpiredError extends Error {
    constructor(message?: any) {
      super(message);
      this.name = 'UserPasswordExpiredError';
      this.message = message;
    }
  }
  
  export default UserPasswordExpiredError;