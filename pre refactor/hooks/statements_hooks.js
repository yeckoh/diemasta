// model in question
const Statement = require('../models/statements.model');

// import mongoose just to generate a _id: right here, right now
var mongoose = require('mongoose');

module.exports = function(socket) {
    console.log("\x1b[34m"+'ws-loaded:'+"\x1b[0m"+'statement_hooks');

    // when 'make_new_item' gets fired... CREATE_ONE
    socket.on('Create_one_statement', function(sent_in_data) {
        // data is .statement.ts object
        let newstatement = new Statement({
            _id: mongoose.Types.ObjectId(),
            // date: Date,

            owner: sent_in_data.owner,
            color: sent_in_data.color,
        
            str: sent_in_data.str,
            result: sent_in_data.result,
            mod: sent_in_data.mod,
        
            rollhistory: sent_in_data.rollhistory,
        
            crit: sent_in_data.crit,
            explosions: sent_in_data.explosions,
            doubles: sent_in_data.doubles,
            expand: sent_in_data.expand
        });
        Statement.SaveStatement(newstatement);

        // socket.emit('Created_one_statement', newstatement);
        socket.emit('Created_my_statement', newstatement._id);
        socket.broadcast.emit('Created_one_statement', newstatement);
    });


    // READ_LAST100
    socket.on('Get_last', function() {
        // a_promise.then -> do stuff with the data
        Statement.GetLastStatements().then(function(statements) {
            socket.emit('Read_last', statements);
        });
    });

    socket.on('Expand_one_statement', function(data) {
        // data is ._id, .expansion
        socket.broadcast.emit('Expanded_one_statement', data);
    });

    // UPDATE_ONE
    // socket.on('Update_selected_item', function(sent_in_data) {
    //     Item.findByIdAndUpdate(sent_in_data.item._id, sent_in_data.item, {new: true}, function(err, updatedItem) {
    //         console.log('updated item');
    //         socket.emit('Updated_one_item', updatedItem);
    //         socket.broadcast.in(sent_in_data.charaid).emit('Updated_one_item', updatedItem);
    //     });
    // });

    socket.on('Delete_one_statement', function(sent_in_data) {
        // data consists of .statementid
        Statement.DeleteCascading(sent_in_data._id);
        // tell userid and charaid rooms that it was deleted here
        // socket.emit('Deleted_one_statement', sent_in_data.statementid); // tell the deletor its gone
        socket.broadcast.emit('Deleted_one_statement', sent_in_data._id); // tell all whos viewing this item its gone
    });


}
