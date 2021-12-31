const Course = require('../models/Course') 
const { mongooseToObject } = require('../../util/mongoose')
class CourseController {
    // [GET] /course/:slug
    show(req, res, next) {
        Course.findOne({ "slug": req.params.slug })
            .then((course) =>{
                console.log(course); 
                res.render('courses/show', {
                    course: mongooseToObject(course),
                })}
            )
            .catch(next);
    }
    // [GET] /course/create
    create(req, res, next) {
        res.render("courses/create")
    }

    // [GET] /course/store
    store(req, res, next) {
        // res.json(req.body)
        const formData =req.body
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
        const course = new Course(formData)
        course.save()
            .then(()=>{
                res.redirect('/')
            })
            .catch(error =>{

            })
    }
    // [GET] /course/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render("courses/edit",{
                course: mongooseToObject(course)
            }))
            .catch(next)
        
    }
    // [PUT] /course/:id
    update(req, res, next) {
        Course.updateOne({_id: req.params.id},req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }
    // [DELETE] /course/:id
    destroy(req, res, next) {
        Course.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }
    // [PUT] /course/:id/restore
    restore(req, res, next) {
        Course.restore({_id: req.params.id})
            .then(() => res.redirect('/me/trash/courses'))
            .catch(next)
    }
    // [DELETE] /course/:id/destroydata
    destroydata(req, res, next) {
        Course.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }
    // [POST] /course/handle-form-action
    handleFormAction(req, res,next){
        switch(req.body.action){
            case 'delete':
                Course.delete({_id: {$in: req.body.courseIDs} })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            default:
                res.json({message: 'Invalid action'})
        }
    }

}
module.exports = new CourseController();
