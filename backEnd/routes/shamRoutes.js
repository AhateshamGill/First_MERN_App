const express = require("express");
const { 
    addSham,
    getSham,
    getUser,
    updateSham,
    deleteSham, 
} = require("../controllers/shamController");
const AuthMiddleware = require("../middlewares/authMidlleware");
const router = express.Router();
router.route('/').get(AuthMiddleware,getSham).post(AuthMiddleware,addSham);
router.route('/:id').put(updateSham).delete(deleteSham);
router.get('/get-user', getUser);


module.exports = router;