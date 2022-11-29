const express = require("express")
const router = express.Router()
const Log = require("../models/logs")


// I.N.D.U.C.E.S
// Index, New, Delete, Update, Create, Edit, Show

// Seed Route
// router.get("/seed", (req, res) => {
//   Fruit.create([
//     {
//       name:'grapefruit',
//       color:'pink',
//       readyToEat:true
//     },
//     {
//         name:'grape',
//         color:'purple',
//         readyToEat:false
//     },
//     {
//         name:'avocado',
//         color:'green',
//         readyToEat:true
//     }
//   ], (err, data) => {
//     res.redirect("/fruits")
//   })
// })

//INDEX
router.get("/", (req, res) => {
  // Query model to return all fruits
  Log.find({}, (error, allLogs) => {
    if (!error) {
      res.status(200).render("logs/Index", {
        logs: allLogs
      })
    } else {
      res.status(400).send(error)
    }
  })
})

//NEW
router.get("/new", (req, res) => {
  res.render("logs/New")
})

//DELETE
router.delete("/:id", (req, res) => {
  Log.findByIdAndDelete(req.params.id, (err, data) => {
    res.redirect("/logs")
  })
})

//UPDATE
router.put("/:id", (req, res) => {
  req.body.isShipBroken = req.body.isShipBroken === "on" ? true : false
  Log.findByIdAndUpdate(req.params.id, req.body, (err, updatedLog) => {
    if(!err){
      res.status(200).redirect(`/logs/${req.params.id}`)
    } else {
      res.status(400).send(err)
    }
  })
})

// CREATE
router.post("/", (req, res) => {
  if (req.body.isShipBroken === "on"){
    req.body.isShipBroken = true
  } else {
    req.body.isShipBroken = false
  }
  // This does the same thing as the if statement above but with a one line ternary
  //req.body.readyToEat = req.body.readyToEat === 'on' ? true : false;

    // Create 1st arg: the actual object we want to insert inside our database
    // Callback 1st arg: error
    // Callback 2nd arg: the newly created object
Log.create(req.body, (error, createdLog) => {
    if (!error) {
      // redirects after creating fruit, to the Index page
      res.status(200).redirect("/logs")
    } else {
      res.status(400).send(error)
    }
  })
})

// EDIT
router.get("/:id/edit", (req, res) => {
  Log.findById(req.params.id, (err, foundLog) => {
    if (!err) {
      res.status(200).render("logs/Edit", {log: foundLog})
    } else {
      res.status(400).send({ msg: err.message })
    }
  })
})



//SHOW
router.get("/:id", (req, res) => {
    // findById 1st arg: the id of the fruit we want to find 
    // Callback 1st arg: error
    // Callback 2nd arg: the found fruit object
  Log.findById(req.params.id, (error, foundLog) => {
    if (!error) {
      res
        .status(200)
        .render("logs/Show", {
          log: foundLog
        })
    } else {
      res
        .status(400)
        .send(error)
    }
  })
})

module.exports = router