const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const app = require("../app");  
const itemController = require("../controllers/item.controller");

describe("Item Routes Tests", () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("Testing item routes", () => {
        const sampleItem = {
            _id: "5fddf9e6bc1412165c56be93",
            name: "Sample Item",
            description: "This is a sample item"
        };

        beforeEach(() => {
            sandbox.stub(itemController, 'createItem').resolves(sampleItem);
            sandbox.stub(itemController, 'readItems').resolves([sampleItem]);
            sandbox.stub(itemController, 'updateItem').resolves(sampleItem);
            sandbox.stub(itemController, 'deleteItem').resolves();
        });

        it("POST /api/items/create should create a new item", (done) => {
            request(app)
                .post("/api/items/create")
                .send({ name: "Sample Item", description: "This is a sample item" })
                .expect(200)
                .end((err, response) => {
                    expect(response.body).to.have.property("name").to.equal("Sample Item");
                    expect(response.body).to.have.property("description").to.equal("This is a sample item");
                    done(err);
                });
        });

        it("GET /api/items should return all items", (done) => {
            request(app)
                .get("/api/items")
                .expect(200)
                .end((err, response) => {
                    expect(response.body).to.be.an("array");
                    expect(response.body[0]).to.have.property("name").to.equal("Sample Item");
                    done(err);
                });
        });

        it("PUT /api/items/update/:id should update an item", (done) => {
            request(app)
                .put(`/api/items/update/${sampleItem._id}`)
                .send({ name: "Updated Item", description: "Updated description" })
                .expect(200)
                .end((err, response) => {
                    expect(response.body).to.have.property("name").to.equal("Updated Item");
                    done(err);
                });
        });

        it("DELETE /api/items/delete/:id should delete an item", (done) => {
            request(app)
                .delete(`/api/items/delete/${sampleItem._id}`)
                .expect(200)
                .end((err, response) => {
                    expect(response.body).to.have.property("msg").to.equal("Item deleted successfully");
                    done(err);
                });
        });
    });
});