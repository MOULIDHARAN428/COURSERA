const mongoose = require('mongoose');
const Dishes = require('./modal/dishes');
const url = 'mongodb://localhost:27017/cousera';
const connect = mongoose.connect(url);

connect.then((db)=>{
    console.log("Connected correctly to server");
    Dishes.create({
        name: 'rava dosa',
        description:'good'
    })
    .then((dish)=>{
        console.log(dish);
        return Dishes.findByIdAndUpdate(dish._id,{
            $set:{description: 'superb'}
        },{new:true})
        .exec();
    })
    .then((dish)=>{
        console.log(dish);
        dish.comments.push({
            rating:5,
            comment:'test comment',
            author:'tester'
        });
        return dish.save();
    })
    .then((dish)=>{
        console.log(dish);
        return Dishes.remove();
    })
    .then(()=>{
        return mongoose.connections.close();
    })
    .catch((err)=>{
        console.log(err);
    });
});