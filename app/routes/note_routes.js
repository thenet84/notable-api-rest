var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db){
    //CREATE
    app.post('/notes', (req, res) => {
        console.log(req.body);
        const note = {'title': req.body.title, 'text': req.body.body};
        db.collection('notes').insert(note, (err, result)=>{
            if(err) {
                res.send({'error' : 'An error has ocurred'});
            }
            else{
                res.send(result.ops[0]);
            }
        })
    })
    //READ
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id' : new ObjectID(id)}
        db.collection('notes').findOne(details, (err, item)=>{
            if(err) {
                res.send({'error' : 'An error has ocurred'});
            }
            else{
                res.send(item);
            }
        })
    });
    //UPDATE
    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id' : new ObjectID(id)}
        const note = {'title': req.body.body, 'text': req.body.title};
        db.collection('notes').update(details, note, (err, item)=>{
            if(err) {
                res.send({'error' : 'An error has ocurred'});
            }
            else{
                res.send(note);
            }
        })
    });
    //DELETE
    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id' : new ObjectID(id)}
        db.collection('notes').remove(details, (err, item)=>{
            if(err) {
                res.send({'error' : 'An error has ocurred'});
            }
            else{
                res.send('Note '+id+' deleted!');
            }
        })
    });
};