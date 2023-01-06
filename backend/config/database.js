const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
exports.connectDB = () =>{
    mongoose.connect(process.env.MONGO_URI , {
        // useNewUrlParser : true,
        // useCreateIndex : true,
        // useFindAndModify : false,
        // useUnifiedTopology : true
    }).then((con) => console.log(`dataBase Connected : ${con.connection.host} `)).catch((err)=>console.log(err));
}