const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }

        next();
    });
});

// app.use((req, res, next) => {
//     res.render('maintenence.hbs', {
//         title: 'Sorry',
//         welcome: 'Our page is down for the moment. Please try back in a couple of minutes!'
//     });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('getUppercase', (text) => text.toUpperCase());

app.get('/', (req, res) => {
    res.render('home.hbs', {
        title: 'Home Page',
        welcome: 'Welcome to my new Express App!'
    })
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs');
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About Page'
    });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server started, listening on port ${PORT}`);
}); 