// Testing Cart Endpoints

const app = require("../index").app,
        request = require("supertest"),
        expect = require("expect"),
        items = require("./test1")

// Data
const cart1 = {
    items: [{ item: items.id2 }] // Creating new cart
}
const cart2 = {
    items: [{ item: items.id2 }, { item: items.id3 }] // Adding item to existing cart
}
const cart3 = {
    items: [{ item: items.id3 }] // Removing items.id2 from existing cart
}

let id

// Tests
describe("Add-To-Cart Tests", function() {
    it("should create new cart if cartId query parameter isn't supplied", function(done) {
        request(app)
            .post("/carts/add-to-cart")
            .send({ data: cart1 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                expect(res.body.result.items[0].item).toBe(items.id2)
                id = res.body.result._id
                done()
            })
    })
    it("should update existing cart if cartId query parameter is supplied", function(done) {
        request(app)
            .post("/carts/add-to-cart")
            .query({ cartId: id })
            .send({ data: cart2 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                expect(res.body.result._id).toBe(id)
                expect(res.body.result.items[0].item).toBe(items.id2)
                expect(res.body.result.items[1].item).toBe(items.id3)
                done()
            })
    })
})

describe("Cart Details Test", function() {
    it("should show detals of items in cart", function(done) {
        request(app)
        .get("/carts/cart-details/" + id)
        .expect(200)
        .end((err, res) => {
            expect(res.body.result._id).toBe(id)
            const itemsArray = req.body.result.items
            for( let item of itemsArray) {
                expect(item).toHaveProperty("_id")
                expect(item).toHaveProperty("name")
                expect(item).toHaveProperty("price")
                expect(item).toHaveProperty("detailed_description")
            }
            done()
        })
    })
})

describe("Remove-From-Cart Test", function() {
    it("should remove one item from the items in cart", function(done) {
        request(app)
            .post("/carts/add-to-cart")
            .send({ data: cart3 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                expect(res.body.result._id).toBe(id)
                expect(res.body.result.items[0].item).toBe(items.id3)
                done()
            })
    })
})

setTimeout(() => process.exit(0), 5000)
