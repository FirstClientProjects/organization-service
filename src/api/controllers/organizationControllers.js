const logger = require('../../utils/logger');
const OrganizationSchema = require('../models/Organization');
const SuccessResponse = require('../../utils/SuccessResponse');
const ErrorResponse = require('../../utils/ErrorResponse');

const createOrganization = async (req, res) => {
    try {
        const { name, image, businessEmail } = req.body;
        const organization = new OrganizationSchema({
            name,
            image,
            businessEmail
        });
        const savedOrganization = await organization.save();
        logger.info('Create organization query was successful');
        res.status(201).json(
            new SuccessResponse(
                201,
                "Create organization query was successful",
                savedOrganization
            )
        );
    } catch (error) {
        logger.error('Create organization internal server error');
        logger.error(error);
        res.status(500).json(
            new ErrorResponse(
                500,
                "Create organization internal server error",
                error.message
            )
        );
    }
}

const getOrganization = async (req, res) => {
    try {
        if(!req.params.orgId) {
            return res.status(422).json(
                new ErrorResponse(
                    422,
                    "Get organization query was failed",
                    "Organization Id not found. Missing from the request."
                )
            );
        }
        const organization = await OrganizationSchema.findById(req.params.orgId);
        if(!organization) {
            return res.status(404).json(
                new ErrorResponse(
                    404,
                    "Get organization query was failed",
                    "Organization not found. Doesn't have this Id."
                )
            );
        }
        logger.info('Get organization query was successful');
        res.status(200).json(
            new SuccessResponse(
                200,
                "Get organization query was successful",
                organization
            )
        );
    } catch (error) {
        logger.error('Get organization internal server error');
        logger.error(error);
        res.status(500).json(
            new ErrorResponse(
                500,
                "Get organization internal server error",
                error.message
            )
        );
    }
}

const getOrganizations = async (req, res) => {
    try {
        const organizations = await OrganizationSchema.find();
        logger.info('Get organizations query was successful');
        res.status(200).json(
            new SuccessResponse(
                200,
                "Get organizations query was successful",
                organizations
            )
        );
    } catch (error) {
        logger.error('Get organizations internal server error');
        logger.error(error);
        res.status(500).json(
            new ErrorResponse(
                500,
                "Get organizations internal server error",
                error.message
            )
        );
    }
}

const deleteOrganization = async (req, res) => {
    try {
        if(!req.params.orgId) {
            return res.status(422).json(
                new ErrorResponse(
                    422,
                    "Get organization query was failed",
                    "Organization Id not found. Missing from the request."
                )
            );
        }
        const organization = await OrganizationSchema.findById(req.params.orgId);
        if(!organization) {
            return res.status(404).json(
                new ErrorResponse(
                    404,
                    "Delete organization query was failed",
                    "Organization not found. Doesn't have this Id."
                )
            );
        }
        await OrganizationSchema.findByIdAndDelete(req.params.orgId);
        logger.info('Delete organization query was successful');
        res.status(204).json(
            new SuccessResponse(
                204,
                "Delete organization query was successful",
                "Organization deleted successfully"
            )
        );
    } catch (error) {
        logger.error('Delete organization internal server error');
        logger.error(error);
        res.status(500).json(
            new ErrorResponse(
                500,
                "Delete organization internal server error",
                error.message
            )
        );
    }
}

const updateOrganization = async (req, res) => {
    try {
        if(!req.params.orgId) {
            return res.status(422).json(
                new ErrorResponse(
                    422,
                    "Get organization query was failed",
                    "Organization Id not found. Missing from the request."
                )
            );
        }
        const updatedOrganization = await OrganizationSchema.findByIdAndUpdate(
            req.params.orgId,
            { $set: {
                name: req.body.name,
                image: req.body.image,
                businessEmail: req.body.businessEmail
            }},
            { new: true }
        );
        if(!updatedOrganization) {
            return res.status(404).json(
                new ErrorResponse(
                    404,
                    "Update organization query was failed",
                    "Organization not found. Doesn't have this Id."
                )
            );
        }
        logger.info('Update organization query was successful');
        res.status(201).json(
            new SuccessResponse(
                201,
                "Update organization query was successful",
                updatedOrganization
            )
        );
    } catch (error) {
        logger.error('Update organization internal server error');
        logger.error(error);
        res.status(500).json(
            new ErrorResponse(
                500,
                "Update organization internal server error",
                error.message
            )
        );
    }
}

module.exports = {
    createOrganization,
    getOrganization,
    getOrganizations,
    deleteOrganization,
    updateOrganization
};