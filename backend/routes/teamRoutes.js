const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require('../controllers/teamController');

// All routes require authentication
router.use(verifyToken);

router.route('/')
  .get(getAllTeamMembers)
  .post(createTeamMember);

router.route('/:id')
  .get(getTeamMemberById)
  .put(updateTeamMember)
  .delete(deleteTeamMember);

module.exports = router;
