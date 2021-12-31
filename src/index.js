const path = require('path');
const morgan = require('morgan');
const express = require('express');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override')
const app = express();
const port = 3000;
const route = require('./routes');
// Connect to DB
const db = require('./config/db')
db.connect()
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));
// Apply middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))
app.engine(
    'hbs',
    engine({
        extname: 'hbs',
        helpers: {
            sum: (a,b) => a + b,
            formatdate: (date) => date.toLocaleString(),
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', './resources/views');
app.set('views', path.join(__dirname, 'resources','views'));

// Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
