
const socailService = require('../services/socailService');
const { sendErrorResp } = require('../utils/response');
const path = require('path');

const loadSocailMedia = (req, res) => {
    return res.sendFile(path.join(__dirname, '..', 'views', 'social.html'));
}

const allPosts = (req, res) => {
    return socailService.getAllPosts(res);
};

const addPosts = (req, res) => {
    const { imgUrl, imgDisc } = req.body || {};

    if (!imgUrl || !imgDisc) {
        return res.status(400).json({
            message: 'imgUrl and imgDisc are required.'
        });
    }

    if (typeof imgUrl !== 'string' || typeof imgDisc !== 'string') {
        return res.status(400).json({
            message: 'imgUrl and imgDisc must be strings.'
        });
    }

    const trimmedImgUrl = imgUrl.trim();
    const trimmedImgDisc = imgDisc.trim();

    if (!trimmedImgUrl || !trimmedImgDisc) {
        return res.status(400).json({
            message: 'imgUrl and imgDisc cannot be empty.'
        });
    }

    try {
        new URL(trimmedImgUrl);
    } catch {
        return res.status(400).json({
            message: 'Please provide a valid image URL.'
        });
    }

    return socailService.addPosts({
        imgUrl: trimmedImgUrl,
        imgDisc: trimmedImgDisc
    }, res);
};

const addComments = (req, res) => {
    const { comment } = req.body || {};
    const socailId = Number(req.params.id);

    if(
        typeof comment !== 'string' || !comment.trim() ||
        !Number.isInteger(socailId) || socailId <= 0
    ) {
        return sendErrorResp(res, 400, 'Invalid details');
    }

    return socailService.addConmmentToPost({ socailId, comment: comment.trim() }, res);
}

module.exports = {
    allPosts,
    addPosts,
    addComments,
    loadSocailMedia
};