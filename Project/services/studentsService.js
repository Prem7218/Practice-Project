
const db = require('../utils/DBConnnection');
const { sendSuccessResp, sendErrorResp } = require('../utils/response');

const getAllStudents = (res) => {
    const getSudents = `
        SELECT * FROM Students
    `;

    db.execute(getSudents, (error, result) => {
        if(error) {
            console.error(error.message);
            return sendErrorResp(res, { statusCode: 500, message: 'Internal server error!' });
        }

        if(result.length === 0) {
            return sendErrorResp(res, { 
                statusCode: 404, 
                message: ' No student found' 
            });
        }

        return sendSuccessResp(res, 200, 'Here are All Students', result);
    });
}

const getStudentById = ({ studentId }, res) => {
    const getStudent = `
        SELECT * FROM Students 
        WHERE id = ?
    `;

    db.execute(getStudent, [studentId], (error, result) => {
        if(error) {
            console.error(error.message);
            return sendErrorResp(res, { statusCode: 500, message: 'Internal server error!' });
        }

        if(result.length === 0) {
            if(result.length === 0) {
                return sendErrorResp(res, { 
                    statusCode: 404, 
                    message: 'Student not found' 
                });
            }

            return sendSuccessResp(res, 200, `Student Is Present`, result);
        }
    });
}

const postStudent = ({ name, email, age }, res) => {
    const postQuery = `
        INSERT INTO STUDENTS (name, email, age)
        VALUES (?, ?, ?)
    `;

    db.execute(postQuery, [name, email, age], (error, result) => {
        if(error) {
            console.error(error.message);
            return sendErrorResp(res, { statusCode: 500, message: 'Internal server error!' });
        }

        return sendSuccessResp(
            res,
            201,
            `new user created: ${name}`, 
            {
                studentId: result.insertId,
                name, 
                email,
                age
            }
        );
    });
}

const updateStudent = ({ name, email, age, studentId }, res) => {
    const postQuery = `
        UPDATE STUDENTS 
        SET name = ?, email= ?, age= ?
        WHERE id = ?
    `;

    db.execute(postQuery, [name, email, age, studentId], (error, result) => {
        if(error) {
            console.error(error.message);
            return sendErrorResp(res, { statusCode: 500, message: 'Internal server error!' });
        }

        if(result.affectedRows === 0) {
            return sendErrorResp(res, { 
                statusCode: 404, 
                message: 'Student not found' 
            });
        }

        return sendSuccessResp(
            res, 
            200, 
            'Student has been updated', 
            {
                studentId,
                name,
                email,
                age
            }
        );
    });
}

const deleteStudent = ({ studentId }, res) => {
    const deleteQuery = `
        DELETE FROM Students 
        WHERE id = ?
    `;

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
            res, 
            200, 
            'Student has been deleted',
            {
                studentId,
                result: result.name,
                email: result.email,
                age: result.age
            }
        );
    });
}

module.exports = {
    getAllStudents,
    getStudentById,
    postStudent,
    updateStudent,
    deleteStudent
};