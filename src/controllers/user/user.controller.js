import bcrypt from "bcryptjs";
import User from "../../model/User.js";
import Jwt  from "jsonwebtoken";

export const signUp = async (request, response, next) => {

    const { name, email, password, isAdmin } = request.body;
    let existingUser;

    if(!name || !email || !password) {
         return response.status(404).json({
            message: "Enter Proper Credentials",
            status: false
         })
    }
    
    try {
        existingUser = await User.findOne({email: email});
    }
    catch (err) {
        return response.status(500).json({
            message: err,
            status: false
         })
    }

    if(existingUser) {
        return response.status(400).json({
            message: "User Already Exists",
            status: false
         })  
    }

    const hashedPassword =  await bcrypt.hash(password, 10)
    const user = new User({name, email, password: hashedPassword, isAdmin})

    try {
        await user.save();
    }
    catch (err) {
        return response.status(500).json({
            message: err,
            status: false
         })
    }

    return response.status(200).json({
        message: "Successfully User Created",
        status: true
     }) 

}

export const login = async (request, response, next) => {
    const { email, password } = request.body;
    let loginUser;
    let hashedPassword; 

    if(!email || !password) {
        return response.status(404).json({
           message: "Enter Valid Credentials",
           status: false
        });
    }

    try {
        loginUser = await User.findOne({email})
    }
    catch (err) {
        return response.status(400).json({
            message: "User Not found",
            status: false
        });
    }


    if(!loginUser) {
        return response.status(400).json({
            message: "User Not found",
            status: false
        });
    }

    hashedPassword = await bcrypt.compare(password, loginUser?.password);

    if(!hashedPassword) {
        return response.status(400).json({
            message: "Invalid Password",
            status: false
        });
    }

    const accessToken = Jwt.sign({
        id: loginUser?._id,
        isAdmin: loginUser?.isAdmin
    }, process.env.JWT_SECRET,
        {expiresIn: "3d"}
    );

    return response.status(200).json({
        message: "Successfully Logged In",
        status: true,
        data: {
            user: {name: loginUser?.name, email: loginUser?.email, isAdmin: loginUser?.isAdmin},
            token: accessToken
        }
    });
}

export const updateUser = async(request, response, next) => {

    const { id } = request.params;
    const { email }  = request.body;

    let existingUser;
    let updatedUser;

    if(!request.user?.isAdmin) {
        return response.status(400).json({message: "Dont have Accesss"});
    }

    if(!email){
        return response.status(400).json({message: "User Name should not be empty"});
    }

    try {
        existingUser = await User.findById(id);
    }
    catch (err) {
        return response.status(500).json({message: err});
    }

    if(!existingUser) {
        return response.status(404).json({message: "User not Found"});
    }

    try {
        updatedUser = await User.findByIdAndUpdate(id, {email: email}, {new: true})
    }

    catch (err) {
        return response.status(500).json({message: err});
    }

    if(!updatedUser) {
        return response.status(404).json({message: "Unable to Update"});
    }

    return response.json({data: { name: updatedUser?.name, email: updatedUser?.email}, message: "Successfully Updated"}).status(200);

}

export const getUser  = async (request, response, next) => {

    try {
        const data = await User.find();
        return response.status(200).json({message: "Succesfully User Data fetched", data: data});
    }
    catch (err) {
        return response.status(500).json({message: "something went wrong"});
    }
}

export const getStats = async(request, response, next) => {

    const date= new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear()));

    try {
        const data = await User.aggregate([
            {
                $group: {
                    _id: "$isAdmin",
                    count: {
                        $sum: 1
                    }
                },
                $group: {
                    _id: "$email",
                }
            }
            // {$match: {  createdAt: { $gte: lastYear }}},
            // {$project: {
            //     month: {$month: "$createdAt"}
            //  },
            // },
            // {
            //     $group: {
            //         _id: "$month",
            //         total: { $num: 1 }
            //     }
            // }
    ])
    response.status(200).json({message: data})
}
    catch (err) {
        response.status(500).json({message: err})
    }
}

