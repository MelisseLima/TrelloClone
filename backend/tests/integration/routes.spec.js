/* eslint-disable no-return-await */
/* eslint-disable no-undef */
const dbHandler = require('../dbhandler');
const customer = require('../../src/models/customer');
const request = require('supertest');
const [customerComplete, customerComplete_2] = require('./../customers');
let server;
/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
  try {

    server = require('../../index');
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
 * Routes test suite.
 */
describe('routes', () => {
  /**
   * Tests that a valid routes can be access without
   * throwing any errors.
   */

  it('should be able to get list of all citys and their counts', async () => {
    const saveCustomer = await customer.create(customerComplete);
    await saveCustomer.save();

    const response = await request(server).get('/').send({});
      expect(response.body).toBeDefined();
      expect(response.body[0].city).toBe(customerComplete.city);
      expect(response.body[0].customers_total).toBe(1);

    const saveCustomer_2 = await customer.create(customerComplete_2);
    await saveCustomer_2.save();

    const response_2 = await request(server).get('/').send({});
      expect(response_2.body).toBeDefined();
      expect(response_2.body[0].city).toBe(customerComplete.city);
      expect(response_2.body[0].customers_total).toBe(2);


  });

  it('should be able to get all customers by city', async () => {
    const saveCustomer = await customer.create(customerComplete);
    await saveCustomer.save();

    const saveCustomer_2 = await customer.create(customerComplete_2);
    await saveCustomer_2.save();

    const response = await request(server).get(`/customers/${customerComplete.city}`)
    .send();
    const response_2 = await request(server).get(`/customers/${customerComplete.city}`)
    .send();

    expect(response.body).toBeDefined();
    expect(response.body[0].city).toBe(customerComplete.city);

    expect(response_2.body).toBeDefined();
    expect(response_2.body[1].city).toBe(customerComplete_2.city);

  });

  it('should be able to get a customer by his id', async () => {
    const saveCustomer = await customer.create(customerComplete);
    const saveCustomer_2 = await customer.create(customerComplete_2);

    await saveCustomer.save();
    await saveCustomer_2.save();

    const response = await request(server).get(`/customer?id=${saveCustomer._id}`)
    .send();
    const response_2 = await request(server).get(`/customer?id=${saveCustomer_2._id}`)
    .send();

    expect(response.body).toBeDefined();
    expect(response.body.first_name).toBe(customerComplete.first_name);
    expect(response.body.last_name).toBe(customerComplete.last_name);

    expect(response_2.body).toBeDefined();
    expect(response_2.body.first_name).toBe(customerComplete_2.first_name);
    expect(response_2.body.last_name).toBe(customerComplete_2.last_name);

  });
});
