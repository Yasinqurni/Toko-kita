
const MESSAGE = (key) => {
  const success = `${key} success`;
  const created = `${key} created successfuly`;
  const updated = `${key} updated successfuly`;
  const deleted = `${key} deleted successfuly`;
  const incompleteKeyOrValue = `Missing required key or value: ${key}`;
  const invalidEmailOrPassword = 'Invalid email/phone number or password';
  const invalidType = `Value is invalid data type: ${key}`;
  const invalidFormat = `Value is invalid format: ${key}`;
  const invalidID = `Value ID is invalid `;
  const notFoundResource = `${key} not found in our database`;
  const invalidCreateResource = `invalid resource: ${key}`;
  const loginError = 'Failed to login';
  const unathorization = 'failed to authorize';
  const unathentication = 'failed to authenticate';
  const serverError = 'Internal Server Error';
  const duplicateData = `${key} already registered in our database`;
  const userNotVerified = `User is not verified, please verified from ${key}`;
  const userIsVerified = `User is already verified`;
  const errorMessage = key

  return message = {
    success,
    created,
    updated,
    deleted,
    incompleteKeyOrValue,
    unathentication,
    invalidEmailOrPassword,
    invalidType,
    invalidFormat,
    invalidID,
    notFoundResource,
    invalidCreateResource,
    loginError,
    unathorization,
    serverError,
    duplicateData,
    userNotVerified,
    userIsVerified,
    errorMessage,
  }
}

module.exports = {
  MESSAGE,
}