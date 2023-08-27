import joi from "joi";

const userValidator = {
    create : (req, res, next)=>{
    
        const schema = joi.object({
        name: joi.string().min(3).max(25).required(),
        email: joi.string().email({minDomainSegments: 2, tlds:{allow:['com', 'pk']}}),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        role: joi.string()
    })
   
    const{error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({error: error.details[0].message});
    }
    next();
}
}
export default userValidator