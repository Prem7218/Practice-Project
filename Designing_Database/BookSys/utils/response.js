
const sendErrorResp = (res, error) => {
    const { statusCode, message } = error;
    return res.status(statusCode).json({
        status: false,
        message,
    });
}

const sendSuccessResp = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        status: true,
        message,
        data
    });
}

module.exports = {
    sendErrorResp,
    sendSuccessResp
}