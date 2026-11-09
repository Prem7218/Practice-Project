
const { Students, Courses } = require('../relation_model/relation');
const { sendErrorResp, sendSuccessResp } = require('../utils/response');

const getAllStudents = async (res) => {

    try {
        const students = await Students.findAll({
            include: [{
                model: Courses,
                as: 'courses',
                through: {
                    attributes: []
                }
            }]
        });

        if(students.length === 0) {
            return sendErrorResp(res, 404, 'Student not found!');
        }

        return sendSuccessResp(res, 200, 'Here all students', students);

    } catch(error) {
        return sendErrorResp(res, 500, 'Internal Server Error!');
    }
}

const postStudents = async ({ name, email }, res) => {
    
    try {
        const student = await Students.create({
            name, email
        });

        return sendSuccessResp(res, 201, 'new student created', student);
    
    } catch(error) {
        return sendErrorResp(res, 500, 'Internal Server Error!');
    }
}

const deleteStudent = async ({ studentId }, res) => {

    try {
        const student = await Students.destroy({
            where: {
                studentId: studentId
            }
        });
        
        if(!student) {
            return sendErrorResp(res, 404, 'student not found!');
        }

        return sendSuccessResp(res, 200, 'Student deleted! successfully', student);
   
    } catch(error) {
        return sendErrorResp(res, 500, 'Internal Server Error!');
    }
}

const updateStudent = async ({ name, email, studentId }, res) => {

    try {
        const [student] = await Students.update({
            name, email
        }, {
            where: {
                studentId
            }
        });

        if(student === 0) {
            return sendErrorResp(res, 404, 'Student not found!');
        }
        
        return sendSuccessResp(res, 200, 'Student updated successfully!', student);
        
    } catch(error) {
        return sendErrorResp(res, 500, 'Internal Server Error!');
    }
}


module.exports = {
    getAllStudents,
    postStudents,
    updateStudent,
    deleteStudent
}