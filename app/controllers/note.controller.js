import ISP from '../models/note.model.js'

// Create and Save a new Note
exports.create = (req, res) => {
	if( !req.body.name )
	{
		return res.status(400).send({
			message: "ISP name can not be empty"
		});
	}

	const isp = new ISP({
		name: req.body.name, // ISP name
		lowest_price: req.body.lowest_price||-1, // lowest tariff price
		rating: req.body.rating||0.0, // customer rating of ISP
		max_speed: req.body.max_speed||"NULL", //maximum bandwidth provided by ISP
		description: req.body.description||"No detail found", // ISP detail
		contact_no: req.body.contact_no||"NULL", // ISP contact
		email: req.body.email||"NULL",
		image: req.body.image||"https://isp-now.com/wp-content/uploads/2017/12/7.png", // Image URL of ISP
		url: req.body.url||"http://www.tikona.in/"
	});
	// save isp data to databases
	isp.save()
	.then(data=>{
		res.send(data);
	}).catch(err=> {
		res.status(500).send({
			message:err.message || "Some error occured while creating the ISP schema"
		});
	});
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
	ISP.find()
	.then(isps=>{
		res.send(isps);
	}).catch(err=>{
		res.status(500).send({
			message: err.message || "Some error occurred while retriving isps data"
		});
	});
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
	ISP.findById(req.params.ispID)
	.then(isp => {
		if(!isp){
			return res.status(404).send({
				message: "ISP not found with id "+req.params.ispID
			});
		}
		res.send(isp);
	}).catch(err=>{
		if( err.kind === 'ObjectId' ){
			return res.status(404).send({
				message: "ISP not found with id "+req.params.ispID
			});
		}
		return res.status(500).send({
			message: "Error retriving note with id "+req.params.ispID
		});
	});
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
	//validata request
	if(!req.body.name){
		return res.status(400).send({
			message:"ISP name cannot be empty"
		});
	}

	ISP.findByIdAndUpdate(req.params.ispID,{
		name: req.body.name, // ISP name
		lowest_price: req.body.lowest_price||-1, // lowest tariff price
		rating: req.body.rating||0.0, // customer rating of ISP
		max_speed: req.body.max_speed||"NULL", //maximum bandwidth provided by ISP
		description: req.body.description||"No detail found", // ISP detail
		contact_no: req.body.contact_no||"NULL", // ISP contact
		email: req.body.email||"NULL",
		image: req.body.image||"https://isp-now.com/wp-content/uploads/2017/12/7.png", // Image URL of ISP
		url: req.body.url||"http://www.tikona.in/"
	},{new:true})
	.then(isp=>{
		if(!isp) {
			return res.status(404).send({
				message: "ISP not found with id "+req.params.ispID
			});
		}
		res.send(isp);
	}).catch(err=>{
		if( err.kind === 'ObjectId' ){
			return res.status(404).send({
				message: "ISP not found with id "+req.params.ispID
			});
		}
		return res.status(500).send({
			message: "Error retriving note with id "+req.params.ispID
		});
	});
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
	ISP.findByIdAndRemove(req.params.ispID)
	.then(isp=>{
		if(!isp) {
			return res.status(404).send({
				message: "ISP not found with id "+req.params.ispID
			});
		}
		res.send({message: "ISP successfully deleted", isp});
	}).catch(err=>{
		if(err.kind === 'ObjectId' || err.name === 'NotFound') {
			return res.status(404).send({
				message: "ISP not found with id "+req.params.ispID
			});	
		}
		return res.status(500).send({
			message: "Could not delete isp with Object ID "+req.params.ispID
		});
	});
};