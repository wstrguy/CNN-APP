//  importing express app 
const app = require('./app');

// importing database
const connDb = require('./database/db');

// creating a route
app.get('/', (req, res) => {
    res.send('Welcome to CNN App');
});

const port = process.env.PORT
// listening to the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connDb();
});

