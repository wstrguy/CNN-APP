// importing express
const express = require('express');
const { isAuthenticated } = require('../utils/middleware/isAuthenticated');
const { editorSignup, editorLogin, createNews, editNews, deleteNews, getAllNews } = require('../controllers/editor.controller');

// creating express router
const router = express.Router();

// importing controller
// const { editorSignup } = require('../controllers/editor.controller');

// importing validation
const { validateRequest, schemas } = require('../utils/validation/validation');


router.post('/signup', validateRequest(schemas.editorSchema), editorSignup);
router.post('/login', validateRequest(schemas.loginSchema), editorLogin);
router.post('/news', isAuthenticated, validateRequest(schemas.newsSchema), createNews);
router.put('/edit-news/:id', isAuthenticated, editNews);
router.delete('/delete-news/:id', isAuthenticated, deleteNews);
router.get('/all-news', isAuthenticated, getAllNews)



// exporting router
module.exports = router;