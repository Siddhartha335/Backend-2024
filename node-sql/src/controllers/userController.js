import userModel from "../models/userModel.js";

const addUser = async(req,res)=> {
    const {username,location} = req.body;
    // connection.query(`Insert into users(username,location) values(?,?)`,[username,location], (err,results,fields) => { //prepared statement
    //     if(err) {
    //         throw err
    //     }
    //     if(results.affectedRows == 1 ) {
    //         res.status(201).json({success:true,message:"User succesfully added!"})
    //     } else {
    //         res.status(400).json({success:false,message:"Unable to insert user"})
    //     }
    // })
    try{
        const data = await userModel.create({username:username,location:location});
        res.status(201).json(data);
    }
    catch(err) {
        console.log(err)
    }
}

const getAllUser = async(req,res)=> {
    // connection.query(`select * from users`,(err,results,fields)=> {
    //     if(err) throw err;
    //     if(results) {
    //         res.status(200).json({result:results})
    //     }
    // })
    const allUsers = await userModel.findAll();
    res.status(200).json([...allUsers])
}

const getSpecificUser = async(req,res)=> {
    const id = req.params.id;
    // if(id) {
    //     connection.query(`select * from users where id=${id}`,(err,results,fields)=> {
    //         if(err) throw err;
    //         if(results) {
    //             res.status(200).json(...results)
    //         }
    //     })
    // } else {
    //     res.status(400).json({success:false,message:'User id is not valid!'})
    // }
    const specificUser = await userModel.findByPk(id);
    res.status(200).json(specificUser)
}


const updateUser = async(req,res)=> {
    const id = req.params.id;
    const {location} = req.body;
    // connection.query(`update users set location="${location}" where id=${id}`,(err,results,fields) => {
    //     if(err) throw err
    //     if(results) {
    //         res.status(201).json({success:true,message:`Succesfully changed to ${location}`})
    //     }
    // })
    const updatedData = await userModel.update({location:location},{where:{id:id}})
    // console.log(updatedData)
    if(updatedData[0] == 1) {
     res.status(201).json({success:true,message:`Succesfully changed to ${location}`})
    } else {
    res.status(201).json({success:false,message:`Can't changed`})
    }
}

const deleteUser = async(req,res)=> {
    const id = req.params.id;
    // connection.query(`delete from users where id=${id}`,(err,results,fields) => {
    //     if(err) throw err
    //     if(results) {
    //         res.status(201).json({success:true,message:`Succesfully deleted!`})
    //     }
    // })
    const deletedUser = await userModel.destroy({where:{id}})
    // console.log(deletedUser);
    if(deletedUser == 1) {
        res.status(201).json({success:true,message:`Succesfully deleted!`})
    } else {
        res.status(201).json({success:false,message:`Can't delete!`})
    }

}

export {addUser,getAllUser,getSpecificUser,updateUser,deleteUser}