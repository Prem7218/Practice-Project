
const sendErrorResp = (res, error, check) => {
    const { statusCode, message } = error;

    if(check) {
        return res.status(statusCode).send(message);
    }

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