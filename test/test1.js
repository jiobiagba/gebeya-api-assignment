// Testing item endpoints

const app = require("../index").app,
        request = require("supertest"),
        expect = require("expect"),
        UserModel = require("../models/user.model").UserModel

// Data
const data1 = {
    name: "Item A",
    photo: [
        "pixA.jpg"
    ],
    price: 500,
    detailed_description: "This is Item A",
    vendor_name: "Vendor A"
}
const data2 = {
    name: "Item B",
    photo: [
        "pixB.jpg"
    ],
    price: 850,
    detailed_description: "This is Item B",
    vendor_name: "Vendor B"
}
const data3 = {
    name: "Item C",
    photo: [
        "pixC.jpg"
    ],
    price: 50,
    detailed_description: "This is Item C",
    vendor_name: "Vendor C"
}
const data4 = {
    name: "Item A",
    photo: [
        "pixA.jpg"
    ],
    price: 1500,
    detailed_description: "This is Item A",
    vendor_name: "Vendor A"
}
const user = {
    username: "JayAsUser2",
    password: "JayAsUser2",
    name: "Jay2"
}
var id
var id2
var id3
var userId
var token


// Users
describe("USERS Test", function() {
    it("should register one user", function(done) {
        request(app)
            .post("/users/register")
            .send({ data: user })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                expect(res.body.result.name).toBe(user.name)
                userId = res.body.result.id
                done()
            })
    })
    it("should login one user", function(done) {
        request(app)
            .post("/users/login")
            .send({ data: { username: user.username, password: user.password } })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                expect(res.body).toHaveProperty("result")
                token = res.body.result
                done()
            })
    })
})

// Tests
describe("POST Tests", function() {
    it("should POST 1 item successfully", function(done) {
        request(app)
            .post("/items/create")
            .set("Authorization", token)
            .send({ data: data1 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                expect(res.body.result.price).toBe(data1.price)
                id = res.body.result._id
                done()
            })
    })
    it("should POST 2 items successfully", function(done) {
        request(app)
            .post("/items/create")
            .set("Authorization", token)
            .send({ data: [data2, data3] })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                expect(res.body.result[0].price).toBe(data2.price)
                expect(res.body.result[1].price).toBe(data3.price)
                id2 = res.body.result[0]._id
                id3 = res.body.result[1]._id
                done()
            })
    })
})

describe("GET Tests", function() {
    it("should order available items with highest price first", function(done) {
        request(app)
            .get("/items/get-available")
            .set("Authorization", token)
            .expect(200)
            .end((err, res) => {
                expect(res.body.result[0].price).toBeGreaterThanOrEqual(res.body.result[1].price)
                done()
            })
    })
    it("should GET one data by ID", function(done) {
        request(app)
            .get("/items/get-one-by-id/" + id)
            .set("Authorization", token)
            .expect(200)
            .end((err, res) => {
                expect(res.body.result.detailed_description).toBe(data1.detailed_description)
                done()
            })
    })
})

describe("UPDATE and DELETE Tests", function() {
    it("should UPDATE one item by ID", function(done) {
        request(app)
            .put("/items/update-one-by-id/" + id)
            .set("Authorization", token)
            .send({ data: data4 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body.result.price).toBe(data4.price)
                expect(res.body.result.name).toBe(data1.name)
                done()
            })
    })
    it("should DELETE one item by ID", function(done) {
        request(app)
            .delete("/items/delete-one-by-id/" + id)
            .set("Authorization", token)
            .expect(200)
            .end((err, res) => {
                expect(res.body.result.price).toBe(data4.price)
                done()
            })
    })
})




// CART Endpoints Tests

var idCart

// Tests
describe("Add-To-Cart Tests", function() {
    it("should create new cart if cartId query parameter isn't supplied", function(done) {
        request(app)
            .post("/carts/add-to-cart")
            .set("Authorization", token)
            .send({ data: {
                items: [{ item_id: id2, quantity: 4 }] // Creating new cart
            } })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                expect(res.body.result.items[0].item_id).toBe(id2)
                idCart = res.body.result._id
                done()
            })
    })
    it("should update existing cart if cartId query parameter is supplied", function(done) {
        request(app)
            .post("/carts/add-to-cart")
            .set("Authorization", token)
            .query({ cartId: idCart })
            .send({ data: {
                items: [{ item_id: id2, quantity: 5 }, { item_id: id3, quantity: 10 }] // Adding item to existing cart
            } })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                expect(res.body.result._id).toBe(idCart)
                expect(res.body.result.items[0].item_id).toBe(id2)
                expect(res.body.result.items[1].item_id).toBe(id3)
                done()
            })
    })
})

describe("Cart Details Test", function() {
    it("should show detals of items in cart", function(done) {
        request(app)
        .get("/carts/cart-details/" + idCart)
        .set("Authorization", token)
        .expect(200)
        .end((err, res) => {
            expect(res.body.result._id).toBe(idCart)
            const itemsArray = res.body.result.items
            for( let item of itemsArray) {
                expect(item).toHaveProperty("item_id._id")
                expect(item).toHaveProperty("item_id.name")
                expect(item).toHaveProperty("item_id.price")
                expect(item).toHaveProperty("item_id.detailed_description")
            }
            done()
        })
    })
})

describe("Remove-From-Cart Test", function() {
    it("should remove one item from the items in cart", function(done) {
        request(app)
            .post("/carts/add-to-cart")
            .set("Authorization", token)
            .query({ cartId: idCart })
            .send({ data: {
                items: [{ item_id: id3, quantity: 10 }] // Removing items.id2 from existing cart
            } })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                expect(res.body.result._id).toBe(idCart)
                expect(res.body.result.items[0].item_id).toBe(id3)
                done()
            })
    })
})

after("Remove User", function(done) {
    UserModel.deleteOne({ _id: userId }).exec()
    done()
})

setTimeout(() => process.exit(0), 15000)