module.exports = function(pplarray, socket) {
    console.log("\x1b[34m"+'ws-loaded:'+"\x1b[0m"+'people_hooks');
    socket.on('Add_person', (person) => {
        // person is a string
        pplarray.push(person);
        socket.emit('Read_people', pplarray);
        socket.broadcast.emit('Read_people', pplarray);
    });

    socket.on('Remove_person', (person) => {
        // people is a string
        pplarray.splice(pplarray.findIndex(p => p === person), 1);
        socket.emit('Read_people', pplarray);
        socket.broadcast.emit('Read_people', pplarray);
    });

    socket.on('Update_person', (data) => {
        // data is .old .new
        pplarray[pplarray.findIndex(s => s === data.old)] = data.new;
        socket.emit('Read_people', pplarray);
        socket.broadcast.emit('Read_people', pplarray);
    });
}
