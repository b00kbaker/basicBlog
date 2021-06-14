const router = require('express').Router();

const apiRoutes = require("./api");
const homeRoute = require("./homeRoutes");
const dashboardRoute = require("./dashRoutes");

router.use('/', homeRoute);
router.use('/dashboard', dashboardRoute);
router.use('/api', apiRoutes);

module.exports = router;