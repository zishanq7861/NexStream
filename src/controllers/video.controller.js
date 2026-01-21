import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"

// 1. GET ALL VIDEOS (For your Home Page)
const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy = "createdAt", sortType = "desc", userId } = req.query
    
    const filter = { isPublished: true };
    if (query) {
        filter.title = { $regex: query, $options: "i" };
    }
    if (userId) {
        filter.owner = userId;
    }

    const videos = await Video.find(filter)
        .sort({ [sortBy]: sortType === "desc" ? -1 : 1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .populate("owner", "fullName username avatar");

    return res
        .status(200)
        .json(new ApiResponse(200, videos, "Videos fetched successfully"));
})

// 2. PUBLISH A VIDEO (For your Upload Modal)
const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body

    if (!title || !description) {
        throw new ApiError(400, "Title and description are required")
    }

    const videoFileLocalPath = req.files?.videoFile?.[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

    if (!videoFileLocalPath) {
        throw new ApiError(400, "Video file is missing")
    }

    const videoFile = await uploadOnCloudinary(videoFileLocalPath)
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

    if (!videoFile) {
        throw new ApiError(400, "Video upload failed")
    }

    const video = await Video.create({
        videoFile: videoFile.url,
        thumbnail: thumbnail?.url || "",
        title,
        description,
        duration: videoFile.duration, 
        owner: req.user?._id,
        isPublished: true
    })

    return res
        .status(201)
        .json(new ApiResponse(200, video, "Video published successfully!"))
})

// 3. GET VIDEO BY ID (For when you click to watch)
const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid Video ID")
    }

    const video = await Video.findById(videoId).populate("owner", "fullName username avatar");

    if (!video) {
        throw new ApiError(404, "Video not found")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, video, "Video found"));
})

// 4. Leave these empty for now - one step at a time!
const updateVideo = asyncHandler(async (req, res) => {})
const deleteVideo = asyncHandler(async (req, res) => {})
const togglePublishStatus = asyncHandler(async (req, res) => {})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}