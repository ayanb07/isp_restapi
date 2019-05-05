import ispController from '../controllers/note.controller.js'

module.exports = (app)=>{
	app.post('/isp', ispController.create);// create new isp list
	app.get('/isp/all', ispController.findAll);// Retrieve all Notes
	app.get('/isp/:ispID', ispController.findOne); // Retrive single ispID
	app.put('/isp/:ispID', ispController.update); // Update 	
	app.delete('/isp/:ispID', ispController.delete);// Delete a note with noteID
}