import Order from "../../model/Order.js";
import { orderValidation } from "../../validations/joiSchema.js";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types; 

//add order
export const postOrder = async(request, response) => {

 const { error, value } = orderValidation.validate(request.body);

    if(error) {
        return response.status(400).json({message: error});
    }

    let orderList = new Order(value);

    try {
        await orderList.save();
    }
    catch (err) {
        return  response.status(500).json({message: err.message});
    }

    return response.status(200).json({data: orderList, message:  "Order created successfully"});

}

//get booking order based on user ID
export const getOrder = async(request, response) => {

    const { userId } = request.params;

    let existingOrder = "";

       try {
          existingOrder = await Order.aggregate([
            {
                $match: {
                    userId: new ObjectId(userId),
                    status: "pending"
                }
            }
        ])

        }
       catch (err) {
           return  response.status(500).json({message: err.message});
       }
   
       return response.status(200).json({data: existingOrder, message:  "Order fetched successfully"});
   
}

//for to change delivery status  booked to ready for delivery
export const updateOrder = async(request, response) => {

    const { id } = request.params;

    let existingOrder = "";

       try {
          existingOrder = await Order.findOneAndUpdate({_id: id}, {status: "readyForDelivery"}, {new: true});
        }
       catch (err) {
           return  response.status(500).json({message: err.message});
       }
   
       return response.status(200).json({data: existingOrder, message:  "successfully status updated"});
   
}