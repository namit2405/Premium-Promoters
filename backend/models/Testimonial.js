import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: '/assets/images/happy client.jpg'
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    default: 5
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Testimonial', testimonialSchema);
