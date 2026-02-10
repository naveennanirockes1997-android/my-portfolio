const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { protect } = require('../middleware/auth');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a project
// @route   POST /api/projects
// @access  Private
router.post('/', protect, async (req, res) => {
  const { title, description, image, link, github, tags, highlights, skills } = req.body;

  try {
    const project = new Project({
      title,
      description,
      image,
      link,
      github,
      tags,
      highlights,
      skills,
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    Object.assign(project, req.body);
    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    await project.deleteOne();
    res.json({ message: 'Project removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
