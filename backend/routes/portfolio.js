import express from 'express';
import Portfolio from '../models/Portfolio.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all portfolio items (public)
router.get('/', async (req, res) => {
  try {
    const portfolio = await Portfolio.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all portfolio items (admin - includes inactive)
router.get('/admin', authenticateToken, async (req, res) => {
  try {
    const portfolio = await Portfolio.find().sort({ order: 1, createdAt: -1 });
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single portfolio item
router.get('/:id', async (req, res) => {
  try {
    const item = await Portfolio.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create portfolio item (admin only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const item = new Portfolio(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update portfolio item (admin only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const item = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!item) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete portfolio item (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const item = await Portfolio.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }
    res.json({ message: 'Portfolio item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
