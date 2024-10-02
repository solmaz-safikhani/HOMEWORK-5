const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const facultyRoutes = require('./routes/facultyMembers');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/faculty_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

app.use('/api/members', facultyRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});