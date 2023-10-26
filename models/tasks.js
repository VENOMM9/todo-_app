const mongoose = require("mongoose");
const shortid = require("shortid");
const bcrypt = require("bcrypt");


const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

const taskSchema = new schema({
 _id: {
        type: String,
     default: shortid.generate
    },
    name: { type: String, required: true },
    state:{ type: String,  default: 'pending'
    },
    user_id:{type:mongoose.Schema.Types.String,
        ref:"users"
        }
    

})



const taskModel = mongoose.model("tasks", taskSchema);
module.exports = taskModel;