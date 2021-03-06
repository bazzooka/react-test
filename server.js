/**
 * Created by joe on 31/03/15.
 */
var fs = require('fs'),
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    publicPath = path.join(__dirname, 'public');

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/comments.json', function(req, res){
    fs.readFile(path.join(publicPath, 'comments.json'), function(err, data){
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

app.post('/comments.json', function(req, res){
    fs.readFile('comments.json', function(err, data){
        var comments = JSON.parse(data);

        comments.push(req.body);
        fs.writeFile(path.join(publicPath, 'comments.json'), JSON.stringify(comments, null, 4), function(err){
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'no-cache');
            res.send(JSON.stringify(comments));
        });
    });
});

app.listen(3000);

console.log('Server started : http://localhost:3000/');