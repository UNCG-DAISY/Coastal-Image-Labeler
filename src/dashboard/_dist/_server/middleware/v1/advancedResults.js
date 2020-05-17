"use strict";
/*
    This function provides for pagination and filtering based of query
    parameters and also does reverse virtuals population. For example for
    getting all storms this function limits the number of returned entires by
    15, or by some value passed in the api url or if reverse ordering is needed.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.advancedResults = void 0;
const advancedResults = (model, populate) => async (req, res, next) => {
    var _a, _b, _c, _d;
    let query;
    //Copy req.query
    const reqQuery = { ...req === null || req === void 0 ? void 0 : req.query };
    //Fields to exclude for filtering
    const removeFields = [
        'select',
        'sort',
        'page',
        'limit'
    ];
    //Loop over removeFields and delete them from request querry
    removeFields.forEach(param => delete reqQuery[param]);
    // Create operators like %gt,$gte, etc
    let queryString = JSON.stringify(reqQuery);
    queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    //Finding resource 
    query = model.find(JSON.parse(queryString));
    // Select fields
    if ((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }
    //Sort
    if ((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    }
    else {
        //Default sort by date
        query = query.sort('-dateAdded');
    }
    //Pagination 
    const page = parseInt((_c = req.query.page) !== null && _c !== void 0 ? _c : '1', 10);
    const limit = parseInt((_d = req.query.limit) !== null && _d !== void 0 ? _d : '15', 10);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalDocs = await model.countDocuments();
    query = query.skip(startIndex).limit(limit);
    //If there is a populate field
    if (populate) {
        query = query.populate(populate);
    }
    //Executing query
    const query_result = await query;
    //Pagination result
    const pagination = {};
    //Show next page
    if (endIndex < totalDocs) {
        pagination.next = {
            page: page + 1,
            limit
        };
    }
    //Show prev page
    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        };
    }
    //Create the advResults property
    res.advancedResults = {
        success: true,
        count: query_result.length,
        pagination,
        data: query_result
    };
    next();
};
exports.advancedResults = advancedResults;
