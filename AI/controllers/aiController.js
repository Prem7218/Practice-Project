
const path = require('path');
const aiService = require('../services/aiService');
const { sendErrorResp, sendSuccessResp } = require('../../utils/response');

const loadAIPage = (req, res) => {
    return res.sendFile(path.join(__dirname, '..', 'views', 'ai.html'));
}

const getResponse = async (req, res) => {
    const { ask } = req.body;

    if(typeof ask !== 'string' || !ask.trim()) {
        return sendErrorResp(res, 400, 'Invalid ask');
    }

    try {
        const answer = await aiService.getGeminiResponse(ask);

        return sendSuccessResp(
            res,
            200,
            'AI response generated successfully!',
            { answer }
        );

    } catch (error) {
        return sendErrorResp(res, 500, error.message);
    }
}

module.exports = {
    loadAIPage,
    getResponse
};