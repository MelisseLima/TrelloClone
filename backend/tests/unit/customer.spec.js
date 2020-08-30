/* eslint-disable no-return-await */
/* eslint-disable no-undef */
const mongoose = require('mongoose');
const dbHandler = require('../dbhandler');
const customer = require('../../src/models/customer');
const [customerComplete, customerComplete_2] = require('./../customers');

/**
 * Connect to a new in-memory database before running any tests.
 */

beforeAll(async () => {
  try {
    await dbHandler.connect();
  } catch (error) {
    throw error.message;
  }
});

/**
 * Clear all test data after every test.
 */
afterEach(async () => {
  try {
    await dbHandler.clearDatabase();
  } catch (error) {
    throw error.message;
  }
});

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
  try {
    await dbHandler.closeDatabase();
  } catch (error) {
    throw error.message;
  }
});

/**
 * Product test suite.
 */
describe('customer ', () => {
  /**
   * Tests that a valid product can be created through the productService without
   * throwing any errors.
   */
  it('can be created correctly', async () => {
    const saveCustomer = await customer.create(customerComplete);

    // eslint-disable-next-line no-underscore-dangle
    expect(saveCustomer._id).toBeDefined();
    expect(saveCustomer.first_name).toBe(customerComplete.first_name);
    expect(saveCustomer.last_name).toBe(customerComplete.last_name);
    expect(saveCustomer.email).toBe(customerComplete.email);
    expect(saveCustomer.gender).toBe(customerComplete.gender);
    expect(saveCustomer.company).toBe(customerComplete.company);
    expect(saveCustomer.city).toBe(customerComplete.city);
    expect(saveCustomer.title).toBe(customerComplete.title);
  });

  it('create user without required field should failed', async () => {
    try {
      const saveWithoutRequiredField = await customer.create({ first_name: 'TekLoon' });
      error = saveWithoutRequiredField;
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    }
  });

  it('find customer', async () => {
    const saveCustomer = await customer.create(customerComplete);
    const saved = await saveCustomer.save();
    expect(async () => await customer.find({ saved })).not.toThrow();
  });
});
