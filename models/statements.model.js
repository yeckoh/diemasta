const mongoose = require('mongoose');


var StatementSchema = mongoose.Schema({

    date: { type: Date, default: Date.now },

    owner: String,
    color: String,

    str: String,
    result: String,
    mod: Number,

    rollhistory: [],

    crit: Boolean,
    explosions: Boolean,
    doubles: Boolean,
    expand: Boolean,

    // is_enabled: Boolean,
    // listof_atks: [{type: mongoose.Schema.Types.ObjectId, ref:'Attacks'}],
    // listof_saves: [{type: mongoose.Schema.Types.ObjectId, ref:'Saving_Throws'}],
});


const Statement = module.exports = mongoose.model('Statements', StatementSchema);

const StatementCount = 70;
// schema model functions -> {mongoose functions}



//=========================================================================
// stuff for socket hooks
//=========================================================================

module.exports.SaveStatement = function(statobj) {
    statobj.save();
}

module.exports.GetAllStatements = function(allids) {
    var query = Statement.find().where('_id').in(allids).exec();
    return query;
}

module.exports.GetLastStatements = function() {
    var query = Statement.find().sort('-date').limit(StatementCount).exec();
    return query;
}

module.exports.DeleteCascading = function(ids) {
    // Statement.find().where('_id').in(ids).exec().then((statements) => {
            // let atkids = [];
        // let saveids = [];
        // features.forEach(element => {
        //     atkids.push(...element.listof_atks);
        //     saveids.push(...element.listof_saves);
        // });
        // Attack.DeleteCascading(atkids);
        // Saves.DeleteCascading(saveids);
    // Statement.find().where('_id').in(ids).exec();
    Statement.deleteMany({_id: ids}).exec();
}
