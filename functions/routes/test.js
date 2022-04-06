import express from 'express';
const route = express.Router();

route.get("/:user", function(req, res){
    res.json(req.params.user);
})

export default route;