const Resource = require('../models/Resource');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all resources
// @route   GET /api/resources
// @access  Private
exports.getResources = asyncHandler(async (req, res, next) => {
  let query;

  if (req.user.role === 'admin') {
    query = Resource.find().populate('createdBy', 'name email');
  } else if (req.user.role === 'moderator') {
    query = Resource.find().populate('createdBy', 'name email');
  } else {
    query = Resource.find({ createdBy: req.user.id }).populate(
      'createdBy',
      'name email'
    );
  }

  const resources = await query;

  res.status(200).json({
    success: true,
    count: resources.length,
    data: resources,
  });
});

// @desc    Get single resource
// @route   GET /api/resources/:id
// @access  Private
exports.getResource = asyncHandler(async (req, res, next) => {
  const resource = await Resource.findById(req.params.id).populate(
    'createdBy',
    'name email'
  );

  if (!resource) {
    return next(
      new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is resource owner or admin/moderator
  if (
    resource.createdBy._id.toString() !== req.user.id &&
    req.user.role !== 'admin' &&
    req.user.role !== 'moderator'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to access this resource`,
        401
      )
    );
  }

  res.status(200).json({
    success: true,
    data: resource,
  });
});

// @desc    Create resource
// @route   POST /api/resources
// @access  Private (moderator/admin)
exports.createResource = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.createdBy = req.user.id;

  const resource = await Resource.create(req.body);

  res.status(201).json({
    success: true,
    data: resource,
  });
});

// @desc    Update resource
// @route   PUT /api/resources/:id
// @access  Private (moderator/admin)
exports.updateResource = asyncHandler(async (req, res, next) => {
  let resource = await Resource.findById(req.params.id);

  if (!resource) {
    return next(
      new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is resource owner or admin
  if (
    resource.createdBy.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this resource`,
        401
      )
    );
  }

  resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: resource,
  });
});

// @desc    Delete resource
// @route   DELETE /api/resources/:id
// @access  Private (admin)
exports.deleteResource = asyncHandler(async (req, res, next) => {
  const resource = await Resource.findById(req.params.id);

  if (!resource) {
    return next(
      new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is admin
  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this resource`,
        401
      )
    );
  }

  await Resource.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});