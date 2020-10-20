// Testing item endpoints

const app = require("../index").app,
        request = require("supertest"),
        expect = require("expect")

// Data
const data1 = {
    name: "Item A",
    photo: [
        "pixA.jpg"
    ],
    price: 500,
    quantity: 2,
    detailed_description: "This is Item A",
    vendor_name: "Vendor A"
}
const data2 = {
    name: "Item B",
    photo: [
        "pixB.jpg"
    ],
    price: 850,
    quantity: 1,
    detailed_description: "This is Item B",
    vendor_name: "Vendor B"
}
const data3 = {
    name: "Item C",
    photo: [
        "pixC.jpg"
    ],
    price: 50,
    quantity: 5,
    detailed_description: "This is Item C",
    vendor_name: "Vendor C"
}
const data4 = {
    name: "Item A",
    photo: [
        "pixA.jpg"
    ],
    price: 1500,
    quantity: 2,
    detailed_description: "This is Item A",
    vendor_name: "Vendor A"
}
let id;


// Tests
describe("POST Tests", function() {
    it("should POST 1 item successfully", function(done) {
        request(app)
            .post("/items/create")
            .send({ data: data1 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body.result.price).toBe(data1.price)
                id = res.body.result._id
                done()
            })
    })
    it("should POST 2 items successfully", function(done) {
        request(app)
            .post("/items/create")
            .send({ data: [data2, data3] })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body.result[0].price).toBe(data2.price)
                expect(res.body.result[1].price).toBe(data3.price)
                done()
            })
    })
})

describe("GET Tests", function() {
    it("should order available items with highest price first", function(done) {
        request(app)
            .get("/items/get-available")
            .expect(200)
            .end((err, res) => {
                expect(res.body.result[0].price).toBe(data2.price)
                done()
            })
    })
    it("should GET one data by ID", function(done) {
        request(app)
            .get("/items/get-one-by-id/" + id)
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
            .expect(200)
            .end((err, res) => {
                expect(res.body.result.price).toBe(data4.price)
                done()
            })
    })
})

setTimeout(() => process.exit(0), 5000)