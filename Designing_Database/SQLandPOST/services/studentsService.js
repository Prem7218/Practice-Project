
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
                console.log(email);
                console.log(error.message);
                const resp = sendErrorResp(res, { statusCode: 400, message: 'Somthing Went Wrong!' });
                db.end();
                return resp;
            }

            console.log("Values has been inserted");
            return sendSuccessResp(res, 201, `new student created with name ${name}`);
        });
    }

    return insertSudent();
}

const updateStudentName = ({ name, email, studentId }, res) => {
    const update = `
        UPDATE Students 
        set name = ?, email = ?
        WHERE id = ?
    `;

    db.execute(update, [name, email, studentId], (error, result) => {
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

const deleteStudentById = ({ studentId }, res) => {
    const deleteQuery = `DELETE FROM Students WHERE id = ?`;

    db.execute(deleteQuery, [studentId], (error, result) => {
        if(error) {
            console.log(error.message);

            return sendErrorResp(res, {
                statusCode: 500,
                message: 'Unable to delete student'
            });
        }

        if(result.affectedRows === 0) {
            return sendErrorResp(res, {
                statusCode: 404,
                message: 'Student not found'
            });
        }

        return sendSuccessResp(
            res, 200, 'Student has been deleted'
        );
    });
};

module.exports = {
    postStudent, 
    updateStudentName,
    deleteStudentById
}