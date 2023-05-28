const userController = require('./userController');
const userService = require('../../services/userService');
const formatValidator = require('../../validators/formatValidator');
const generateToken = require('../../helpers/generateToken');
const isMatch = require('../../helpers/isMatch');
const responseHelper = require('../../response-helpers/error-helper');

// Mock dependencies
jest.mock('../../services/userService');
jest.mock('../../validators/formatValidator');
jest.mock('../../helpers/generateToken');
jest.mock('../../helpers/isMatch');
jest.mock('../../response-helpers/error-helper');

describe('userController', () => {
  let controller;
  let req;
  let res;

  beforeEach(() => {
    const userServiceInstance = new userService();
    const formatValidatorInstance = new formatValidator();
    const generateTokenInstance = new generateToken();
    const isMatchInstance = new isMatch();
    const responseHelperInstance = new responseHelper();

    controller = new userController(
      userServiceInstance,
      formatValidatorInstance,
      generateTokenInstance,
      isMatchInstance
    );

    req = { body: {} };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
  });

  describe('registerUser', () => {
    it('should return duplicate response if email already exists', async () => {
      const findUser = { email: 'test@example.com' };

      userService.prototype.GetByEmail = jest.fn(() => findUser);
      const response = await controller.registerUser(req, res);

      expect(responseHelper.prototype.duplicate).toHaveBeenCalledWith(
        res,
        expect.anything()
      );
    });

    it('should return bad request response if email/phone format is invalid', async () => {
      const formatIsValid = false;

      userService.prototype.GetByEmail = jest.fn(() => null);
      formatValidator.prototype = jest.fn(() => formatIsValid);

      const response = await controller.registerUser(req, res);

      expect(responseHelper.prototype.badRequest).toHaveBeenCalledWith(
        res,
        expect.anything()
      );
    });

    it('should return internal server error response if user creation fails', async () => {
      const newUser = null;

      userService.prototype.GetByEmail = jest.fn(() => null);
      formatValidator.prototype = jest.fn(() => true);
      userService.prototype.Create = jest.fn(() => newUser);

      const response = await controller.registerUser(req, res);

      expect(responseHelper.prototype.internalError).toHaveBeenCalledWith(
        res,
        expect.anything()
      );
    });

    it('should return success response if user is registered successfully', async () => {
      const newUser = { id: 1 };

      userService.prototype.GetByEmail = jest.fn(() => null);
      formatValidator.prototype = jest.fn(() => true);
      userService.prototype.Create = jest.fn(() => newUser);

      const response = await controller.registerUser(req, res);

      expect(responseHelper.prototype.ok).toHaveBeenCalledWith(
        res,
        expect.anything()
      );
    });

    it('should return internal server error response if an exception is thrown', async () => {
      const errorMessage = 'Internal server error';

      userService.prototype.GetByEmail = jest.fn(() => {
        throw new Error(errorMessage);
      });

      const response = await controller.registerUser(req, res);

      expect(responseHelper.prototype.internalError).toHaveBeenCalledWith(
        res,
        expect.anything()
      );
    });
  });

  describe('registerSeller', () => {
    // Add unit tests for registerSeller method
  });

  describe('loginUser', () => {
    // Add unit tests for loginUser method
  });

  describe('profileUser', () => {
    // Add unit tests for profileUser method
  });
});
