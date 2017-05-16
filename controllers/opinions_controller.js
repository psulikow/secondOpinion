//Dependencies
var express = require("express");
var router = express.Router();

var db = require("../models");

router.get("/", function(req, res) {
    res.render("index");
});

router.post("/", function(req, res) {
	// console.log(req.body);

    //THIS NEEDS TO BE REWRITTEN
	db.Patients.create({
		name: req.body.patient_name,
		email: req.body.email,
		current_doctor: req.body.current_doctor,
		diagnosis: req.body.diagnosis

	}).then(function(dbPatients) {
		//send the results of the doctor match as a response object

		res.json(dbPatients);

	});
});


router.get("/admin", function(req, res) {
    //Updated Admin block, you can only use one res.render per block
    //Have to do the second query in a callback from the initial callback
    db.Doctors.findAll({

    }).then(function(dbDoctors) {
        db.Patients.findAll({

        }).then(function(dbPatients){
            res.render("admin");
        });
    });
});


router.get("/api/docs", function(req, res) {
    db.Doctors.findAll({}).then(function(results) {
        res.render("docs", { doctors: results });
    });
})


	//pull all the doctor data from MySQL
    	//Feed the relevant information into the doctor section of the  handlebars template
    	//for now, displaying a dummy page.
    	// res.render('admin', {doctors: results});
    //Pull all the patient data from MySQL
    	//Feed the relevant information into the patient section of the handlebars template
    	// res.json(dbDoctors);
    //keeping below for reference
    // res.render("admin");
   



module.exports = router;