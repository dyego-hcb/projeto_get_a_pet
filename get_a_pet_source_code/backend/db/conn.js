const mongoose = require('mongoose');

async function main(){
    await mongoose.connect('mongodb://localhost:27017/getapetdb');
    console.log('Connection with MongoDB using Mongoose has ben sucess');   
}

main().catch((err) => console.log(err));

module.exports = mongoose;