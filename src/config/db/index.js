const mongoose = require('mongoose');
const username = "Setsuna0611";
const password = "Setsuna0611";
const cluster = "cluster0.wclyc";
const dbname = "myFirstDatabase";


async function connect(){
    try {
        await mongoose.connect(
            `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
                {
                // useNewUrlParser: true,
                // useFindAndModify: false,
                // useUnifiedTopology: true
                }
            );
        console.log('Connect OK');
    }catch(error){
        console.log('Connect Fail');
    }

}
module.exports = {connect}