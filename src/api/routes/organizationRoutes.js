const express = require('express');
const { createOrganization, getOrganization, getOrganizations, updateOrganization, deleteOrganization } = require('../controllers/organizationControllers');

const router = express.Router();

router.post('/', createOrganization);

router.get('/:orgId', getOrganization);

router.get('/', getOrganizations);

router.put('/:orgId', updateOrganization);

router.delete('/:orgId', deleteOrganization);

module.exports = router;