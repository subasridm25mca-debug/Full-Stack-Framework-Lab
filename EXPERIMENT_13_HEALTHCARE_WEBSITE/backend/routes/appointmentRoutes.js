const express = require("express");
const Appointment = require("../models/Appointment");

const router = express.Router();

// Book Appointment
router.post("/book", async (req, res) => {

    try {

        const appointment = new Appointment({
            name: req.body.name,
            age: req.body.age,
            doctorType: req.body.doctorType,
            date: req.body.date
        });

        await appointment.save();

        res.status(201).json({
            message: "Appointment booked successfully!",
            appointment: appointment
        });

    } catch (error) {

        res.status(500).json({
            message: "Error booking appointment",
            error: error.message
        });

    }

});


// Get all appointments
router.get("/", async (req, res) => {

    try {

        const appointments = await Appointment.find();

        res.json(appointments);

    } catch (error) {

        res.status(500).json({
            message: "Error fetching appointments",
            error: error.message
        });

    }

});

module.exports = router;