
const Initiative = require('../models/initiative.model');

var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

module.exports = function(socket) {
    console.log("\x1b[34m"+'ws-loaded:'+"\x1b[0m"+'initiative_hooks');
    socket.on('Add_init', (person) => {
        // person is an init

        let newinit = new Initiative({
            _id: mongoose.Types.ObjectId(),
            // date: Date,
            name: person.name,
            initiative: person.initiative,
            tags: person.tags,
            concentrating: person.concentrating,
            prone: person.concentrating,
            dying: person.dying,
            abs_pos: person.abs_pos,
            roundtime: person.roundtime,
            expand: false,
            hasGone: false
        });
        Initiative.SaveInit(newinit);

        // socket.emit('Created_one_statement', newstatement);
        socket.emit('Created_one_init', newinit);
        socket.broadcast.emit('Created_one_init', newinit);
    });

    socket.on('Remove_init', (people) => {
        // people is ids
        Initiative.DeleteCascading(people);
        // socket.emit('Delete_one_init', people);
        socket.broadcast.emit('Delete_one_init', people);
    });

    socket.on('Remove_all_init', (people) => {
        // people is null
        Initiative.deleteMany({}, function(err) {});
        socket.broadcast.emit('Delete_all_init', null);
    });

    socket.on('Update_init', (data) => {
        // data is init obj
        Initiative.findByIdAndUpdate(data._id, data, {new: true}, function(err, updatedInit) {
            socket.broadcast.emit('Updated_init', updatedInit);
        });
    });

    socket.on('Get_all_inits', (data) => {
        // data is null
        Initiative.find({}).sort('abs_pos').then(function(inits) {
            socket.emit('Read_all_inits', inits);        
        });
    });

    socket.on('Sort_inits', (data) => {
        // data is null
        socket.broadcast.emit('Sort_inits', null);    
    });

    //==============================================================================================
    //==============================================================================================

    socket.on('Move_init_up', (data) => {
        // data is id
        socket.broadcast.emit('Move_init_up', data);    
    });
    socket.on('Move_init_down', (data) => {
        // data is id
        socket.broadcast.emit('Move_init_down', data);    
    });

    socket.on('Next_init', (data) => {
        // data is null
        socket.broadcast.emit('Next_init', null);    
    });

    socket.on('Badguys_first', (data) => {
        // data is null
        socket.broadcast.emit('Badguys_first', null);    
    });

    socket.on('Badguys_last', (data) => {
        // data is null
        socket.broadcast.emit('Badguys_last', null);    
    });
}


/*
var InitiativeSchema = mongoose.Schema({

    name: String,
    initiative: Number,
    tags: String,
    concentrating: Boolean,
    prone: Boolean,
    dying: Boolean,

});
*/