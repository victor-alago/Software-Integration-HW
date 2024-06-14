const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const mongoose = require('mongoose');
const sandbox = sinon.createSandbox();  

const itemController = require('../controllers/item.controller');
const Item = require('../models/Item.model');

describe('Item Controller Tests', () => {
    let sampleItem;

    beforeEach(() => {
        sampleItem = {
            _id: mongoose.Types.ObjectId(),
            name: 'Test Item',
            description: 'Test Description'
        };
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('updateItem', () => {
        let updateStub;
        beforeEach(() => {
            // Simulate finding an item first, then updating it
            updateStub = sandbox.stub(Item, 'findByIdAndUpdate').resolves({
                _id: sampleItem._id,
                name: 'Updated Item',
                description: 'Updated Description'
            });
        });
    
        it('should update an item', async () => {
            let result = await itemController.updateItem(sampleItem._id, {
                name: 'Updated Item',
                description: 'Updated Description'
            });
            expect(updateStub).to.have.been.calledWith(sampleItem._id, {
                name: 'Updated Item',
                description: 'Updated Description'
            }, { new: true }); 
            expect(result).to.deep.equal({
                _id: sampleItem._id,
                name: 'Updated Item',
                description: 'Updated Description'
            });
        });
    
        it('should handle errors during item update', async () => {
            updateStub.rejects(new Error('Error occurred'));
            try {
                await itemController.updateItem(sampleItem._id, {
                    name: 'Updated Item',
                    description: 'Updated Description'
                });
            } catch (err) {
                expect(err.message).to.equal('Error occurred');
            }
        });
    });

    describe('deleteItem', () => {
        let deleteStub;
        beforeEach(() => {
            deleteStub = sandbox.stub(Item, 'findByIdAndDelete').resolves();
        });

        it('should delete an item', async () => {
            await itemController.deleteItem(sampleItem._id);
            expect(deleteStub).to.have.been.calledWith(sampleItem._id);
        });

        it('should handle errors during item deletion', async () => {
            deleteStub.rejects(new Error('Error occurred'));
            try {
                await itemController.deleteItem(sampleItem._id);
            } catch (err) {
                expect(err.message).to.equal('Error occurred');
            }
        });
    });
});