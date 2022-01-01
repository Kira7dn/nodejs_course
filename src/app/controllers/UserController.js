const User = require('../models/Users') 
const { mutipleMongooseToObject } = require('../../util/mongoose')
class UserController {
    
    // [GET] /user/create
    create(req, res, next) {
        res.render("user/create")
    }
    // [GET] /user/store
    store(req, res, next) {
        // res.json(req.body)
        const formData =req.body
        const user = new User(formData)
        user.save()
            .then(()=>{
                res.redirect('/user')
            })
            .catch(error =>{

            })
    }
    // [GET] /user
    show(req, res,next) {
        Promise.all([User.countDeleted({}),User.find({})])
            .then(([deletedUser,users]) => res.render('user/list', {
                users: mutipleMongooseToObject(users),
                deletedUser
            }))
            .catch (next)
        
    }

}
module.exports = new UserController();
