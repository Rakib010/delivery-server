import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userServices } from "./user.service";
import { JwtPayload } from "jsonwebtoken";


const createUser = catchAsync(async (req: Request, res: Response) => {

    const user = await userServices.createUser(req.body)


    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "User Created Successfully",
        data: user
    })
})

const getUser = catchAsync(async (req: Request, res: Response) => {
    const decodedToken = req.user as JwtPayload
    //console.log("DToken", decodedToken)

    const user = await userServices.getUser(decodedToken.userId)

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "User get Successfully",
        data: user
    })
})

const getReceiver = catchAsync(async (req: Request, res: Response) => {
    const user = await userServices.getReceiver()
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "User get Successfully",
        data: user
    })
})


const trackingById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params

    const user = await userServices.trackingById(id)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Tracking parcel successfully",
        data: user
    })
})


// Admin Controller
const getAllParcels = catchAsync(async (req: Request, res: Response) => {
    const status = req.query.status as string;
    const senderId = req.query.senderId as string;
    const receiverId = req.query.receiverId as string;
    const user = await userServices.getAllParcels(status, senderId, receiverId)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "All parcels retrieved Successfully",
        data: user
    })
})

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const users = await userServices.getAllUsers();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'All users retrieved Successfully',
        data: users,
    });
})

const updateParcelStatus = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
    const decodedToken = req.user?.userId
    const { status, location, note } = req.body

    const users = await userServices.updateParcelStatus(id, status, location, note, decodedToken);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'parcel update Status Successfully',
        data: users,
    });
})

const toggleUserBlock = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
    const users = await userServices.toggleUserBlock(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "",
        data: users,
    });
})

const toggleParcelBlock = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
    const users = await userServices.toggleParcelBlock(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Parcel block or unblock",
        data: users,
    });
})





export const userController = {
    createUser,
    getUser,
    getReceiver,
    trackingById,
    getAllParcels,
    getAllUsers,
    updateParcelStatus,
    toggleUserBlock,
    toggleParcelBlock
}

/* const blockUser = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
    const users = await userServices.blockUser(id, true);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'user blocked Successfully',
        data: users,
    });
})

const unblockUser = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
    const users = await userServices.blockUser(id, false);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'user unblocked Successfully',
        data: users,
    });
}) */