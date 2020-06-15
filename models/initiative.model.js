const mongoose = require('mongoose');


var InitiativeSchema = mongoose.Schema({

    name: String,
    initiative: Number,
    tags: String,
    concentrating: Boolean,
    prone: Boolean,
    dying: Boolean,
    abs_pos: Number,
    roundtime: Number,
    expand: Boolean,
    hasGone: Boolean
});


const Initiative = module.exports = mongoose.model('Initiatives', InitiativeSchema);

// schema model functions -> {mongoose functions}



//=========================================================================
// stuff for socket hooks
//=========================================================================

module.exports.SaveInit = function(initobj) {
    initobj.save();
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
    Initiative.deleteMany({_id: ids}).exec();
}
