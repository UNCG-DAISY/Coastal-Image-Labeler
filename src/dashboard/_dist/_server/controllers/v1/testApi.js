"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testPost = exports.testGet = void 0;
const async_1 = require("../../middleware/v1/async");
let cards = [
    { _id: 123, message: "I love pepperoni pizza!", author: "unknown1" },
    { _id: 123, message: "I love pizza!", author: "unknown2" },
    { _id: 123, message: "I pepperoni pizza!", author: "unknown3" },
    { _id: 123, message: "I love pepperoni ", author: "unknown4" },
    { _id: 123, message: "I pepperoni pizza!", author: "unknown5" },
    { _id: 123, message: "I", author: "unknown6" },
    { _id: 456, message: "I'm watching Netflix.", author: "unknownX2" }
];
/**
 * @desc        Gets all roles of a user
 * @route       GET /api/v1/user/isUser
 * @access      Public
 * @returns     yes
 */
const testGet = async_1.asyncHandler(async (req, res, next) => {
    console.log('TEST GET');
    res.status(200).json({
        success: true,
        data: {
            message: `Test get done at ${Date.now()} with user ${req.user.id}`,
            cards
        }
    });
});
exports.testGet = testGet;
const testPost = async_1.asyncHandler(async (req, res, next) => {
    const keys = Object.keys(req.body);
    console.log('POST', req.isAuthenticated());
    console.log('USER', req.user.displayName);
    const { message } = req.body;
    const newCard = {
        _id: new Date().getTime(),
        message,
        author: "unknown"
    };
    cards.push(newCard);
    res.status(200).json({
        success: true,
        data: {
            message: `Test POST, keys are ${keys} at time ${Date.now()}`
        }
    });
});
exports.testPost = testPost;
