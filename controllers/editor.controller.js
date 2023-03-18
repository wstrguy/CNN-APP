// importing section
const Editor = require('../models/editor.model');
const News = require('../models/news.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const createJWT = require('../utils/jwt');
const sendEmail = require('../utils/middleware/sendEmail');



// creating controller
exports.editorSignup = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    try {
        // check if the editor already exists
        const editorAlreadyExists = await Editor.findOne({ email });
        if (editorAlreadyExists) {
            return res.status(409).json({
                message: 'Editor already exists',
            });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const editor = await Editor.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
        });

        // send Email
        const emailDelivery = await sendEmail({
            email: email,
            subject: 'Welcome to News App',
            message: 'You have successfully signed up',
        });

        return res.status(201).json({
            message: 'Editor created successfully',
            editor: editor._id,
        });
        

    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
};

exports.editorLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const editorExistinDb = await Editor.findOne({ email });
        if (!editorExistinDb) {
            return res.status(404).json({
                message: 'Editor does not exist',
            });
        }

        // compare password
        const passMatch = await bcrypt.compare(password, editorExistinDb.password);
        if (!passMatch) {
            return res.status(401).json({
                message: 'Invalid credentials',
            });
        }

        // create JWT Token
        const accessToken = await createJWT({
            id: editorExistinDb._id,
            email: editorExistinDb.email,
            first_name: editorExistinDb.first_name,
        });

        // set cookie
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
        });

        return res.status(200).json({
            message: 'Editor logged in successfully',
            accessToken,
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
}


// creating News controller

exports.createNews = async (req, res) => {
    const { editorId, title, body } = req.body;
    const { id } = req.user;
    try {
        // check if the editor exists
        const editor = await Editor.findById(id);
        if (!editor) {
            return res.status(404).json({
                message: 'Editor does not exist',
            });
        }
        const news = await News.create({
            editorId: editor._id,
            title,
            body,
        });

        return res.status(201).json({
            message: 'News created successfully',
            news: news._id,
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
};


// editing existing news
exports.editNews = async (req, res) => {
    const { id } = req.params;
    const { title, body } = req.body;
    try {
        // check if the news exists
        const news = await News.findById(id);
        if (!news) {
            return res.status(404).json({
                message: 'News does not exist',
            });
        }
        const editData = await News.findByIdAndUpdate(id, {
            title,
            body,
        }, 
        { new: true }
        );
        return res.status(200).json({
            message: 'News updated successfully',
            news: editData,
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
};


// deleting news
exports.deleteNews = async (req, res) => {
    const { id } = req.params;

    try {
        // check if the news exists
        const news = await News.findById(id);
        if (!news) {
            return res.status(404).json({
                message: 'News does not exist',
            });
        }
        const del = await News.deleteOne({ _id: id });
        return res.status(200).json({
            message: 'News deleted successfully',
            news: del,
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
};


// Getting all news
exports.getAllNews = async (req, res) => {
    try {
        // get all news
        const getNews = await News.find();

        return res.status(200).json({
            message: 'News fetched successfully',
            news: getNews
            
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
};