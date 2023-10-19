const joi = require("joi")

const validateCreateUser = async (req, res, next) => {
    try {
        const schema = joi.object({
            name: joi.string().empty().required().messages({
                "string.base": `"name" must be of type "text"`,
                "string.empty": `"name" cannot be empty`,
                "string.required": `"name" is required`,
            }),
            email: joi.string().empty().email().required().messages({
                "string.base": `"email" must be of type "email"`,
                "string.empty": `"email" cannot be empty`,
                "string.required": `"email" is required`,
            }),
            password: joi.string().empty().min(8).required().messages({
                "string.base": `"password" must be of type "password"`,
                "string.empty": `"password" cannot be empty`,
                "string.required": `"password" is required`,
            }),
            sex: joi.string().empty().required().messages({
                "string.base": `"sex" must be of type "text"`,
                "string.empty": `"sex" cannot be empty`,
                "string.required": `"sex" is required`,
            }),
            country: joi.string().empty().required().messages({
                "string.base": `"country" must be of type "text"`,
                "string.empty": `"country" cannot be empty`,
                "string.required": `"country" is required`
            })
        })
        await schema.validateAsync(req.body, { abortEarly: true })
        next()
    } catch (error) {
        return res.status(422).json({
            message: error.message,
            success: false
        })
        
    }
}
    
const validateLogin = async (req, res, next) => {
    try {
        const loginSchema = joi.object({
           
            email: joi.string().email().empty().required().messages({
                "string.base": `"email" must be of type "text"`,
                "string.empty": `"email" cannot be empty`,
                "string.required": `"email" is required`,
                      
            }),
            password: joi.string().empty().required().messages({
                "string.base": `"password" must be of type "text"`,
                "string.empty": `"password" cannot be empty`,
                "string.required": `"password" is required`,
                  
            }),
        })

            await loginSchema.validateAsync(req.body, { abortEarly: true })
            next()
  
    }
    catch (error) {
        return res.status(422).json({
            message: error.message,
            success: false
        })
    
    }
}


const validateTask = async (req, res, next) => {
    try {
        const taskschema = joi.object({
            name: joi.string().empty().messages({
                "string.base": `"name" must be of type "text"`,
                "string.empty": `"name" cannot be empty`,
                
            }),
            state: joi.string().empty().messages({
                "string.base": `"state" must be of type "text"`,
                "string.empty": `"state" cannot be empty`,
            }),
            user_id: joi.string().empty().min(1).messages({
                "string.base": `"user_id" must be of type "text"`,
                "string.empty": `"user_id" cannot be empty`,
                "string.required": `"user_id" is required`,
            }),
          
        })
        await taskschema.validateAsync(req.params._id, { abortEarly: true })
        next()
    } catch (error) {
        return res.status(422).json({
            message: error.message,
            success: false
        })
    
    }
}



module.exports = {
    validateCreateUser,
    validateLogin,
    validateTask

}