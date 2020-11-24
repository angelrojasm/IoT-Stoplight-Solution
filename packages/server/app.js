const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const user = require('./mongoose/user');
const data = require('./mongoose/data')

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('../client/build'));
}
app.listen(process.env.PORT || port, () => {
	console.log('app is running on port ' + port);
});

app.post('/register', async function (req, res) {
	res.send(await data.create({semaphoreName: req.body.name, userId: req.body.id}));
});

app.post('/login', async function (req, res) {
	let loggedUser = await user.findOne({email: req.body.email, password: req.body.password})
	res.send({_id: loggedUser._id, name: loggedUser.name, email: loggedUser.email})
});

app.post('/get-data', async function (req, res) {
	res.send(await (await data.find({userId: req.body.id})).length);
});

module.exports = app;
