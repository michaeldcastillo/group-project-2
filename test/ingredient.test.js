var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("GET /api/ingredients", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find all ingredients", function(done) {
    // Add some examples to the db to test with
    db.Ingredient.bulkCreate([
      { ingredient: "First ingredient"},
      { ingredient: "Second ingredient"}
    ]).then(function() {
      // Request the route that returns all ingredients
      request.get("/api/ingredients").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("array")
          .that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an("object")
          .that.includes({ ingredient: "First ingredient"});

        expect(responseBody[1])
          .to.be.an("object")
          .that.includes({ ingredient: "Second ingredient"});

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});
