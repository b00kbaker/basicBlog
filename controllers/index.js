const router = require('express').Router();

const apiRoutes = require("./api");
const homeRoute = require("./homeRoutes");
const dashRoute = require("./dashRoutes");

router.use('/', homeRoute);
router.use('/dashboard', dashRoute);
router.use('/api', apiRoutes);

module.exports = router;