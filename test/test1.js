// Testing item endpoints

const app = require("../index").app,
        request = require("supertest"),
        expect = require("expect")

const data1 = {
    name: "Item A",
    photo: [
        "pixA.jpg"
    ],
    price: 500,
    quantity: 2,
    vendor_name: "Vendor A"
}
const data2 = {
    name: "Item B",
    photo: [
        "pixB.jpg"
    ],
    price: 850,
    quantity: 1,
    vendor_name: "Vendor B"
}
const data3 = {
    name: "Item C",
    photo: [
        "pixC.jpg"
    ],
    price: 50,
    quantity: 5,
    vendor_name: "Vendor C"
}

describe("POST Tests", function() {
    it("should POST 1 item successfully", function(done) {
        request(app)
            .post("/items/create")
            .send(data1)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body.result.price).toBe(data1.price)
                done()
            })
    })
    it("should POST 2 items successfully", function(done) {
        request(app)
            .post("/items/create")
            .send([data2, data3])
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
})

setTimeout(() => process.exit(0), 5000)