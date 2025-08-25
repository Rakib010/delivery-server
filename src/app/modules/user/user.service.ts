/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from "mongoose"
import { envVars } from "../../config/env"
import AppError from "../../errorHelpers/AppError"
import { allowedNextStatus } from "../../utils/parcel"
import { ParcelStatus } from "../parcel/parcel.interface"
import { Parcel } from "../parcel/parcel.model"
import { IUser } from "./user.interface"
import { User } from "./user.model"
import bcrypt from "bcryptjs"

// create user
const createUser = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload;

    const isUserExits = await User.findOne({ email })
    if (isUserExits) {
        throw new AppError(401, "user already exits")
    }

    const hashedPassword = await bcrypt.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND))

    const user = await User.create({
        email,
        password: hashedPassword,
        ...rest
    })

    return user
}

// get user 
const getUser = async (userId: string) => {
    const user = await User.findById(userId).select("-password")
    return user
}

// get only receiver 
const getReceiver = async () => {
    const receivers = await User.find({ role: "RECEIVER" }).select("-password")

    return receivers;
}

// trackingById 
const trackingById = async (trackingId: string) => {

    const parcel = await Parcel.findOne({ trackingId })
    if (!parcel) throw new AppError(404, "Parcel not found with this tracking ID");


    return parcel
    //status: parcel.status,trackingEvents: parcel.trackingEvents, 
}

// Admin services
const getAllParcels = async (status: string, senderId: string, receiverId: string) => {

    const query: any = {};

    if (status) {
        query.status = status;
    }
    if (senderId) {
        query.sender = senderId
    }
    if (receiverId) {
        query.receiver = receiverId;
    }

    const allParcels = await Parcel.find(query)

    return allParcels
}

const getAllUsers = async () => {
    const allParcels = await User.find().select('-password')

    return allParcels
}

const updateParcelStatus = async (parcelId: string, newStatus: ParcelStatus, location: string, note: string, adminId: Types.ObjectId) => {

    const parcel = await Parcel.findById(parcelId)
    if (!parcel) {
        throw new AppError(401, "parcel does not exits")
    }

    const currentStatus = parcel.status;
    //console.log("currentStatus", parcel.status) 

    const nextStatuses = allowedNextStatus[currentStatus];

    if (!nextStatuses.includes(newStatus)) {
        throw new AppError(400, `Invalid status transition from ${currentStatus} to ${newStatus}`);
    }
    parcel.status = newStatus;

    parcel.trackingEvents.push({
        status: newStatus,
        location,
        timestamp: new Date(),
        note,
        updatedBy: adminId,
    });

    await parcel.save();
    return parcel;
}

const toggleUserBlock = async (id: string) => {
    const user = await User.findById(id);
    if (!user) {
        throw new AppError(404, "User not found");
    }

    user.isBlock = !user.isBlock;
    await user.save();

    return {
        message: `User has been ${user.isBlock ? "blocked" : "unblocked"} successfully.`,
        isBlock: user.isBlock,
    };
};


const toggleParcelBlock = async (id: string) => {
    const parcel = await Parcel.findById(id);
    if (!parcel) {
        throw new AppError(404, "Parcel not found");
    }

    parcel.isBlocked = !parcel.isBlocked;
    await parcel.save();

    return {
        message: `Parcel has been ${parcel.isBlocked ? "blocked" : "unblocked"} successfully.`,
        isBlocked: parcel.isBlocked,
    };
}




export const userServices = {
    createUser,
    getUser,
    getReceiver,
    trackingById,
    getAllParcels,
    getAllUsers,
    updateParcelStatus,
    toggleParcelBlock,
    toggleUserBlock
}


/* const blockUser = async (id: string, block: boolean) => {

    const user = await User.findByIdAndUpdate(
        id,
        { isBlock: block },
        { new: true }
    )
    return user
}
const unblockUser = async (id: string, block: boolean) => {

    const user = await User.findByIdAndUpdate(
        id,
        { isBlock: block },
        { new: true }
    )
    return user
} */