
const { Socail, Comments } = require('../models/relation_model/socail_comment');
const { sendErrorResp, sendSuccessResp } = require('../utils/response');

const getAllPosts = async (res) => {

    try {
        const posts = await Socail.findAll({
            include: [{
                model: Comments,
                as: 'comments'
            }]
        });

        return sendSuccessResp(res, 200, 'Here all posts!', posts);
    } catch(error) {
        return sendErrorResp(res, 500, 'Internal server error!');
    }
}

const addPosts =async ({ imgUrl, imgDisc }, res) => {

    try {
        const post = await Socail.create({
            imgUrl, 
            imgDisc
        });

        return sendSuccessResp(res, 201, 'New post created!', post);

    } catch(error) {
        return sendErrorResp(res, 500, 'Internal server error!');
    }
}

const addConmmentToPost =async ({ socailId, comment }, res) => {
    try {
        const post = await Socail.findByPk(socailId);

        if (!post) {
            return sendErrorResp(
                res,
                404,
                'Post not found!'
            );
        }

        const newComment = await Comments.create({
            socailId,
            comment
        });

        return sendSuccessResp(res, 201, 'Comment added successfully!', newComment);

    } catch(error) {
       return sendErrorResp(res, 500, 'Internal server error!');
    }
}

module.exports = {
    getAllPosts,
    addPosts,
    addConmmentToPost
}