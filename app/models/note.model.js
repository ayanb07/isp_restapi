import mongoose from 'mongoose'

const ISPSchema = mongoose.Schema({
	name: String, // ISP name
	lowest_price: Number, // lowest tariff price
	rating: Number, // customer rating of ISP
	max_speed: String, //maximum bandwidth provided by ISP
	description: String, // ISP detail
	contact_no: String, // ISP contact
	email: String,
	image: String, // Image URL of ISP
	url: String
}, {
	timestamps: true
});

module.exports = mongoose.model('ISP', ISPSchema);
