const mongoose = require('mongoose');


var FantasyFlightSchema = mongoose.Schema({

    // date: { type: Date, default: Date.now },

    // owner: String,
    // color: String,

    // -------------------------------------
    r_advantage: Number,
    r_threat: Number,
    
    r_success: Number,
    r_failiure: Number,
    
    r_triumph: Number,
    r_despair: Number,
    // -------------------------------------
    d_difficulty: Number,
    d_challenge: Number,
    
    d_ability: Number,
    d_prof: Number,
    
    d_boost: Number,
    d_setback: Number,
    // -------------------------------------
    // rollhistory: [],

    // listof_atks: [{type: mongoose.Schema.Types.ObjectId, ref:'Attacks'}],
});


const FinalFantasy = module.exports = mongoose.model('FinalFantasy', FantasyFlightSchema);

// const StatementCount = 70;
// schema model functions -> {mongoose functions}



//=========================================================================
// stuff for socket hooks
//=========================================================================

module.exports.SaveState = function(statobj) {
    statobj.save();
}

module.exports.GetState = function() {
    var query = FinalFantasy.findOne().exec();
    return query;
}

// module.exports.GetLastStatements = function() {
//     var query = Statement.find().sort('-date').limit(StatementCount).exec();
//     return query;
// }

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
    FinalFantasy.deleteMany({}).exec();
}
