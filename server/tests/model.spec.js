const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const sinon = require('sinon');

const Item = require('../models/Item.model');  

describe('Item Model Tests', () => {
  let sandbox;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should be invalid if required fields are missing', (done) => {
    const item = new Item();  // Create a new item without any fields
    item.validate((err) => {
      expect(err.errors.name).to.exist;  // `name` is a required field
      expect(err).to.have.property('errors');
      done();
    });
  });

  it('should create an item correctly with required fields', (done) => {
    const itemData = {
      name: 'Sample Item',
      description: 'This is a sample item description',
      date: new Date()  // Optionally set date
    };

    const item = new Item(itemData);

    item.validate((err) => {
      expect(err).to.be.null;
      expect(item).to.have.property('name').to.equal(itemData.name);
      expect(item).to.have.property('description').to.equal(itemData.description);
      done();
    });
  });

  it('should throw an error if the name is missing', (done) => {
    const itemData = { description: 'Missing name field' };

    const item = new Item(itemData);

    item.validate((err) => {
      expect(err.errors.name).to.exist;  // Expect the validation to fail for missing `name`
      done();
    });
  });

  it('should default date if not provided', (done) => {
    const itemData = { name: 'Item with Default Date', description: 'No date provided' };

    const item = new Item(itemData);

    item.validate((err) => {
      expect(err).to.be.null;
      expect(item).to.have.property('date').to.be.a('date');  // Expect date to be set automatically
      done();
    });
  });
});