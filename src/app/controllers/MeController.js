const Course = require('../models/Course') 
const { mutipleMongooseToObject } = require('../../util/mongoose')
class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res,next) {
        Promise.all([Course.countDeleted({}),Course.find({})])
            .then(([deletedCourse,courses]) => res.render('me/stored-coursed', {
                courses: mutipleMongooseToObject(courses),
                deletedCourse
            }))
            .catch (next)
        
    }
    // [GET] /me/trash/courses
    trashedCourses(req, res,next) {
        Course.findDeleted({})
            .then(courses=> res.render('me/trashed-coursed', {
                courses: mutipleMongooseToObject(courses),
            }),)
            .catch (next);
    }
}
module.exports = new MeController();
