var express = require('express')
var mongoose = require('mongoose')
var secrets = require('./secrets.js')

mongoose.Promise = require('bluebird')

var twilio = require('twilio')
var client = new twilio(secrets.accountId, secrets.authToken)

var opt = {
	useNewUrlParser: true,
	useFindAndModify: false
}

mongoose.connect('mongodb://localhost/nowo', opt)
mongoose.set('useCreateIndex', true)

var subscriptionSchema = mongoose.Schema({
	number: String,
	location: {
		longitude: Number,
		latitude: Number,
		address: String
	}
}, {
	timestamps: true
})

var deviceSchema = mongoose.Schema({
	location: {
		longitude: Number,
		latitude: Number
	}
}, {
	timestamps: true
})

var dataSchema = mongoose.Schema({
	location: {
		longitude: Number,
		latitude: Number
	},
	device: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Device'
	}
}, {
	timestamps: true
})

var Subscription = mongoose.model('Subscription', subscriptionSchema)
var Device = mongoose.model('Device', deviceSchema)
var Data = mongoose.model('Data', dataSchema)

var app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/register', function(req, res){
	// register device?
})

app.post('/subscribe', function(req, res){
	Subscription.findOne({ number: req.body.From }, function(err, subscription){
		if(err) res.json({
			status: 'fail',
			data: err
		})

		// twilio automatically manages the stop/start functionality for us
		if(subscription) {
			client.messages.create({
				body: 'You have already subscribed to the flood detection system. Send STOP if you would like to stop receiving flood alerts.',
				to: req.body.From,
				from: secrets.number
			})
			.then(function(){
				res.json({
					status: 'fail',
					data: 'subscriber already exists!'
				})
			})
		} else { // necessary else statements bc of node's async nature
			new Subscription({
				number: req.body.From
			}).save(function(err){
				client.messages.create({
					body: 'You have subscribed to the flood detection system! Send STOP if you would like to stop receiving flood alerts.',
					to: req.body.From,
					from: secrets.number
				})
				.then(function(){
					res.json({
						status: 'success',
						data: 'subscribed'
					})
				})
			})
		}
	})
})

app.post('/data', function(req, res){
	Subscription.find({}, function(err, subscriptions){
		if(err) res.json({
			status: 'fail',
			data: err
		})

		for(var subscription of subscriptions){
			console.log(subscription)
			client.messages.create({
				body: 'A flood has been detected! Please evacuate quickly! Send STOP if you would like to stop receiving flood alerts.',
				to: subscription.number,
				from: secrets.number
			})
		}

		res.json({
			status: 'success',
			data: 'subscribers notified'
		})
	})
})

app.get('/', function(req, res){
	// dump data for a webpage to analyze
})

app.listen(3000, function(){
	console.log('listening on port 3000')
})