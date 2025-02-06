import jwt from "jsonwebtoken"


const userAuth = async (req, res, next)=>{
    const {token} = req.cookies;

    if(!token){
        return res.json({succes:false, message: "Not Authorized Login Again"})
    }

    try {
        
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET)

        if(tokenDecoded.id){
            req.body.userId = tokenDecoded.id
        }else{
            return res.json({succes:false, message: "Not Authorized Login Again"})
        }

        next();

    } catch (error) {
        return res.json({succes:false, userId: token, message:error.message })
    }

}

export default userAuth;