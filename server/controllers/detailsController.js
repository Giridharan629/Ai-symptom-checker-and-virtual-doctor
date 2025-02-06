import userModel from "../models/userModel.js"


export const data = async (req,res)=>{
    try {

        const {userId, result} = req.body

        const user = await userModel.findById(userId)

        if(!user){
            return res.json({success:false, message:"User Not Found"})
        }

        if (!Array.isArray(user.results)) {
            user.results = [];
        }

        if(!result){
            return res.json({success:false, message:"No results Found"})
        }

        user.results.push(result)
        await user.save()

        return res.json({success:true, message:"Result added successfully"})
        
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}