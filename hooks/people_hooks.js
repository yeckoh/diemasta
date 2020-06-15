module.exports = function(pplarray, socket) {
    console.log("\x1b[34m"+'ws-loaded:'+"\x1b[0m"+'people_hooks');
    socket.on('Add_person', (person) => {
        // person is a .name and .color
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
        let ind = pplarray.findIndex(s => s.name === data.old);
        if(ind != -1)
            pplarray[ind].name = data.new;
        socket.emit('Read_people', pplarray);
        socket.broadcast.emit('Read_people', pplarray);
    });

    socket.on('Update_personcolor', (data) => {
        // data is .name .color
        let ind = pplarray.findIndex(s => s.name === data.name);
        if(ind != -1)
            pplarray[ind].color = data.color;
        socket.emit('Read_people', pplarray);
        socket.broadcast.emit('Read_people', pplarray);
    });
}
