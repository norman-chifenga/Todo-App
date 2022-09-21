const express = require("express")
const router = express.Router()
const path = require("path")
const list = require(path.resolve(__dirname,"../database/modelList"));

//list api
router.get('/', (req, res, next) => {
    list.find({},"title")
    .then(data => res.json(data))
    .catch(next)
});

router.post('/', (req, res, next) => {
  if(req.query.title){
    list.create({title: req.query.title})
      .then(data => res.json(data))
      .catch(next)
  }else {
    res.json({
      error: "The input field is empty"
    })
  }
});

router.delete('/:id', (req, res, next) => {
  list.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next)
})

module.exports = router;