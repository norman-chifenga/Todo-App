const express = require("express")
const router = express.Router()
const path = require("path")
const tasks = require(path.resolve(__dirname,"../database/modelTasks"));


router.get('/:id', (req, res, next) => {
    tasks.find({"listId":req.params.id})
    .then(data => res.json(data))
    .catch(next)
  });
    
  router.post('/', (req, res, next) => {
    if(req.query.title){
      tasks.create({title: req.query.title, checked:"false",  listId:req.query.listId})
        .then(data => res.json(data))
        .catch(next)
    }else {
      res.json({
        error: "The input field is empty"
      })
  }
  });

  router.put('/:id', (req, res, next) => {
    tasks.updateOne({"_id": req.params.id},{"checked":req.query.checked})
    .then(data => res.json(data))
    .catch(next)
  })

  router.delete('/:id', (req, res, next) => {
    tasks.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next)
  })

  router.delete('/delete/all', (req, res, next) => {
    tasks.deleteMany({})
    .then(data => res.json(data))
    .catch(next)
  })

  module.exports = router;
