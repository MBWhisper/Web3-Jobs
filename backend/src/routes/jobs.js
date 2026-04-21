const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

/**
 * @route   GET /api/jobs
 * @desc    Get all jobs ordered by newest first
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch jobs',
      message: error.message 
    });
  }
});

/**
 * @route   GET /api/jobs/:id
 * @desc    Get single job by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    
    if (isNaN(jobId)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid job ID' 
      });
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId }
    });
    
    if (!job) {
      return res.status(404).json({ 
        success: false,
        error: 'Job not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      data: job
    });
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch job',
      message: error.message 
    });
  }
});

/**
 * @route   POST /api/jobs
 * @desc    Create new job
 * @access  Public
 */
router.post('/', async (req, res) => {
  try {
    const { title, company, description, ...rest } = req.body;
    
    // Validation
    if (!title || !company || !description) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields',
        required: ['title', 'company', 'description']
      });
    }

    const job = await prisma.job.create({
      data: {
        title,
        company,
        description,
        ...rest
      }
    });
    
    res.status(201).json({
      success: true,
      data: job,
      message: 'Job created successfully'
    });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to create job',
      message: error.message 
    });
  }
});

/**
 * @route   PUT /api/jobs/:id
 * @desc    Update existing job
 * @access  Public
 */
router.put('/:id', async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    
    if (isNaN(jobId)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid job ID' 
      });
    }

    const job = await prisma.job.update({
      where: { id: jobId },
      data: req.body
    });
    
    res.status(200).json({
      success: true,
      data: job,
      message: 'Job updated successfully'
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ 
        success: false,
        error: 'Job not found' 
      });
    }
    console.error('Error updating job:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to update job',
      message: error.message 
    });
  }
});

/**
 * @route   DELETE /api/jobs/:id
 * @desc    Delete job
 * @access  Public
 */
router.delete('/:id', async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    
    if (isNaN(jobId)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid job ID' 
      });
    }

    await prisma.job.delete({
      where: { id: jobId }
    });
    
    res.status(200).json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ 
        success: false,
        error: 'Job not found' 
      });
    }
    console.error('Error deleting job:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to delete job',
      message: error.message 
    });
  }
});

module.exports = router;