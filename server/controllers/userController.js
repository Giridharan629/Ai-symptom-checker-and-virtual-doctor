import userModel from "../models/userModel.js";


export const getUserData = async (req, res)=>{
    try {
        const {userId} = req.body;

        const user = await userModel.findById(userId)

        if(!user){
            return res.json({success:false, message:"User Not Found"})
        }

        res.json({
            success:true,
            userDetails:{
                name: user.name,
                age:user.age,
                isAccVerified:user.isAccVerified,
                gender:user.gender,
                height:user.height,
                weight:user.weight,
                prevResult : user.results,
            }
        })
        
    } catch (error) {
        res.json({success: true, message:error.message})
    }

}

export const changeUserDetails = async(req, res)=>{

    const {userId, name, gender, age, height, weight} = req.body

    try {

        const user = await userModel.findById(userId)

        if(!user){
            return res.json({success:false, message:"User Not Found"})
        }

        user.name = name;
        user.age = age;
        user.gender = gender;
        user.height = height || "";
        user.weight = weight || "";

        await user.save()

        return res.json({success:true, message:"User details updated successfully"})

        
    } catch (error) {

        res.json({success:false, message:error.message})
        
    }
}