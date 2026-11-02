
const { sendErrorResp, sendSuccessResp } = require('../utils/response');
const db = require('../utils/DBConnection');

const postStudent = ({ name, email }, res) => {
    const querie = `
        INSERT INTO Students (email, name)
        VALUES (?, ?)
    `;

    function insertSudent() {
        db.execute(querie, [email, name], (error) => {
            if(error) {
                console.log(error.message);
                const resp = sendErrorResp(res, { statusCode: error.statusCode, message: error.message });
                db.end();
                return resp;
            }

            console.log("Values has been inserted");
            return sendSuccessResp(res, 201, `new student created with name ${name}`);
        });
    }

    return insertSudent();
}

const updateStudentName = ({ name, studentId }, res) => {
    const update = `
        UPDATE Students 
        set name = ? 
        WHERE id = ?
    `;

    db.execute(update, [name, studentId], (error, result) => {
        if(error) {
            console.log(error.message);
            
            return sendErrorResp(res, { 
                statusCode: 500, 
                message: 'Unable to update student'
            });
        }

        if(result.affectedRows === 0) {
            return sendErrorResp(res, { 
                statusCode: 404, 
                message: 'Student not found' 
            });
        }

        return sendSuccessResp(
            res, 200, 'Student has been updated'
        );
    });
};

module.exports = {
    postStudent, 
    updateStudentName
}