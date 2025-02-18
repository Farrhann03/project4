const express = require("express");
const router = express.Router();
const LocationController = require("../controllers/LocationController");
const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

const { Cuisine, Price } = require("../models");

const locationController = new LocationController();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get("/api/test/all", controller.allAccess);

router.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

router.get(
  "/api/test/mod",
  [authJwt.verifyToken, authJwt.isModerator],
  controller.moderatorBoard
);

router.get(
  "/api/test/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.adminBoard
);

router.get("/user", (req, res) => {
  return res.send("You have called a user route");
});

router.get("/user/cuisine", async (req, res) => {
  const results = await Cuisine.findAll();

  return res.send(JSON.stringify(results));
});

router.get("/user/price", async (req, res) => {
  const results = await Price.findAll();
  return res.send(JSON.stringify(results));
});

// Invoke onboard() in LocationController based on the route
router.post("/user/onboard", locationController.onboard);
//router.post("/user/offboard", locationController.offboard);

router.post("/user/location", locationController.create);

router.put("/user/location", locationController.update);

router.delete("/user/cuisine/:cuisineId", locationController.delete);
router.delete("/user/price/:priceId", locationController.delete);

module.exports = router;
