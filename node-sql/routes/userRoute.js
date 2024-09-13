import express from "express"
import {connection} from "../config/connection.js";

const router = express.Router();

router.post("/add",(req,res)=> {
    const {username,location} = req.body;
    connection.query(`Insert into users(username,location) values(?,?)`,[username,location], (err,results,fields) => { //prepared statement
        if(err) {
            throw err
        }
        if(results.affectedRows == 1 ) {
            res.status(201).json({success:true,message:"User succesfully added!"})
        } else {
            res.status(400).json({success:false,message:"Unable to insert user"})
        }
    })
})


router.get('/',(req,res)=> {
    connection.query(`select * from users`,(err,results,fields)=> {
        if(err) throw err;
        if(results) {
            res.status(200).json({result:results})
        }
    })
})

router.get('/:id',(req,res)=> {
    const id = req.params.id;
    if(id) {
        connection.query(`select * from users where id=${id}`,(err,results,fields)=> {
            if(err) throw err;
            if(results) {
                res.status(200).json(...results)
            }
        })
    } else {
        res.status(400).json({success:false,message:'User id is not valid!'})
    }
})

router.put('/update/:id',(req,res)=> {
    const id = req.params.id;
    const {location} = req.body;
    connection.query(`update users set location="${location}" where id=${id}`,(err,results,fields) => {
        if(err) throw err
        if(results) {
            res.status(201).json({success:true,message:`Succesfully changed to ${location}`})
        }
    })
})

router.delete('/delete/:id',(req,res)=> {
    const id = req.params.id;
    connection.query(`delete from users where id=${id}`,(err,results,fields) => {
        if(err) throw err
        if(results) {
            res.status(201).json({success:true,message:`Succesfully deleted!`})
        }
    })
})

export default router;