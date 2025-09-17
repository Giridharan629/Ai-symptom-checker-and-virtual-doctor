import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name :{ type:String, required:true },
        email :{ type:String, required:true, unique: true },
        password :{ type:String, required:true },
        age :{ type:Number, required:true },
        gender :{ type:String, required:true },
        height:{type:String, default:""},
        weight:{type:String, default:""},
        verifyOtp :{ type:String, default:"" },
        verifyOtpExpireAt :{ type:Number, default:0 },
        isAccVerified :{ type:Boolean, default:false },
        resetOtp :{ type:String, default:"" },
        resetOtpExpireAt :{ type:Number, default:0 },
        results : {type:[String],default:[]}
        
    },
    {timestamps:true}
)


const userModel = mongoose.models.user || mongoose.model("user", userSchema)

export default userModel;