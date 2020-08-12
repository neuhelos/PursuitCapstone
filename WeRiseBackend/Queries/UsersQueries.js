const database = require("../Database/database");

const createUser = async (req, res, next) => {
  try {

    console.log(req.body)
    let newUser = await database.one(
     "INSERT INTO users (id, firstn, lastn, email, bio, user_pic) " +
     "VALUES (${id}, ${firstn}, ${lastn}, ${email}, ${bio}, ${user_pic}) " +
     "RETURNING *", req.body 
    );
    res.json({
      status: "Success",
      message: "New User",
      payload: newUser

    })
  } catch (error) {
    console.log(error, "Hey now")
    res.status(404).json({
      status: "Error",
      message: "user cannot be created, try again",
      payload: error
    });
    
    next();
  }
  
};
const deleteUser = async (req, res) => {
  try {
    await database.none('DELETE FROM users WHERE id = $1 RETURNING *', req.params.id);
    res.status(200).json({
      status: "success",
      message: "user deleted"
    });
  } catch (error) {
    res.status(404).json({
      status: error,
      message: "user cannot be deleted, try again",
    });
  }
};
const getUser = async (req, res) => {
  try {
    console.log(req.params.id)
    let user = await database.any(
      "SELECT * FROM users WHERE id =$1", [
        req.params.id,
      ]
    );
    res.status(200).json({
      status: "success",
      message: "found user",
      payload: user
    });
  } catch (error) {
    res.status(404).json({
      status: error,
      message: "user not found",
      payload: null
    });
  }
};
const getAllUsers = async (req, res) => {
  try {
    let search = await database.any("SELECT * from users");
    res.status(200).json({
      status: "Success",
      message: "Found all users",
      payload: search
    });
  } catch (err) {
    res.status(404).json({
      status: err,
      message: "Could not find all users",
      payload: null
    });
  }
};
module.exports = {
  createUser,
  deleteUser,
  getUser,
  getAllUsers
};
