// model in question
const FinalFantasy = require('../models/fantasyflight.model');

// import mongoose just to generate a _id: right here, right now
var mongoose = require('mongoose');

module.exports = function(socket) {
    console.log("\x1b[34m"+'ws-loaded:'+"\x1b[0m"+'fantasy_hooks');

    // CREATE_ONE
    socket.on('Create_one_fantasy', function() {
        // data is .statement.ts object
        let fantasy = new FinalFantasy({
            _id: mongoose.Types.ObjectId(),
            // date: Date,

            // -------------------------------------
            r_advantage: 0,
            r_threat: 0,
            
            r_success: 0,
            r_failiure: 0,
            
            r_triumph: 0,
            r_despair: 0,
            // -------------------------------------
            d_difficulty: 2,
            d_challenge: 0,
            
            d_ability: 2,
            d_prof: 0,
            
            d_boost: 0,
            d_setback: 0,
            // -------------------------------------
        });
        FinalFantasy.SaveState(fantasy);

        // socket.emit('Created_one_statement', newstatement);
        socket.emit('Created_fantasy', fantasy);
        socket.broadcast.emit('Created_fantasy', fantasy);
    });


    // READ_ONE
    socket.on('Get_fantasy', function() {
        // a_promise.then -> do stuff with the data
        FinalFantasy.GetState().then(function(fantasy) {
            socket.emit('Read_fantasy', fantasy);
        });
    });

    // UPDATE_ONE
    socket.on('Update_fantasy', function(data) {
        FinalFantasy.findByIdAndUpdate(data._id, data, {new: true}, function(err, fantasy) {
            // socket.emit('Updated_fantasy', fantasy);
            socket.broadcast.emit('Updated_fantasy', fantasy);
        });
    });

    // socket.on('Expand_one_statement', function(data) {
    //     // data is ._id, .expansion
    //     socket.broadcast.emit('Expanded_one_statement', data);
    // });

    // UPDATE_ONE
    // socket.on('Update_selected_item', function(sent_in_data) {
    //     Item.findByIdAndUpdate(sent_in_data.item._id, sent_in_data.item, {new: true}, function(err, updatedItem) {
    //         console.log('updated item');
    //         socket.emit('Updated_one_item', updatedItem);
    //         socket.broadcast.in(sent_in_data.charaid).emit('Updated_one_item', updatedItem);
    //     });
    // });

    // DELETE_ALL
    // socket.on('Delete_one_statement', function(sent_in_data) {
    //     // data consists of .statementid
    //     Statement.DeleteCascading(sent_in_data._id);
    //     // tell userid and charaid rooms that it was deleted here
    //     // socket.emit('Deleted_one_statement', sent_in_data.statementid); // tell the deletor its gone
    //     socket.broadcast.emit('Deleted_one_statement', sent_in_data._id); // tell all whos viewing this item its gone
    // });


}
