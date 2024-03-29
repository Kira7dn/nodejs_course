const newsRouter = require('./news');
const meRouter = require('./me');
const coursesRouter = require('./courses');
const siteRouter = require('./site');
const userRouter = require('./users');
function route(app) {
    app.use('/news', newsRouter);
    app.use('/courses', coursesRouter);
    app.use('/', siteRouter);
    app.use('/me', meRouter);
    app.use('/user', userRouter);
}
module.exports = route;
