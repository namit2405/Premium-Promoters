import express from 'express';
import Portfolio from '../models/Portfolio.js';
import Testimonial from '../models/Testimonial.js';

const router = express.Router();

// GET /api/stats - Get statistics for the stats section
router.get('/', async (req, res) => {
  try {
    // Get total portfolio count
    const projectsCount = await Portfolio.countDocuments();
    
    // Get average rating from testimonials
    const testimonials = await Testimonial.find();
    const avgRating = testimonials.length > 0
      ? testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
      : 4.9;
    
    // Hardcoded values
    const happyClients = 40;
    const yearsExperience = 5;
    
    res.json({
      projectsCount,
      happyClients,
      yearsExperience,
      avgRating: Math.round(avgRating * 10) / 10 // Round to 1 decimal
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
