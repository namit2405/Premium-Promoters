import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from './models/Service.js';
import Portfolio from './models/Portfolio.js';
import Testimonial from './models/Testimonial.js';

dotenv.config();

const services = [
  {
    title: "Website Development",
    description: "Cutting-edge websites built for performance, scalability, and conversion. From landing pages to full-stack web apps.",
    icon: "Code2",
    image: "/assets/images/Website-Design-Development-Indore.webp",
    category: "featured",
    order: 1
  },
  {
    title: "Logo & Branding",
    description: "Distinctive logos and brand identities that capture your essence and leave lasting impressions.",
    icon: "PenTool",
    image: "/assets/images/logo and branding.jpg",
    category: "featured",
    order: 2
  },
  {
    title: "Social Media Marketing",
    description: "Strategic campaigns that grow your audience and boost engagement across all major platforms.",
    icon: "Megaphone",
    image: "/assets/images/social-media-marketing-strategy-engagement-600nw-2723971325.webp",
    category: "featured",
    order: 3
  },
  {
    title: "SEO Optimization",
    description: "Data-driven SEO strategies that rank you higher and drive qualified, high-intent traffic.",
    icon: "Search",
    image: "/assets/images/SEO optimization.webp",
    category: "featured",
    order: 4
  },
  {
    title: "Mobile App Development",
    description: "Native and cross-platform apps that deliver seamless user experiences.",
    icon: "Smartphone",
    image: "/assets/images/mobile.webp",
    category: "additional",
    order: 5
  },
  {
    title: "Graphic Design",
    description: "Visually stunning designs that communicate your message with clarity and style.",
    icon: "Palette",
    image: "/assets/images/graphic.jpg",
    category: "additional",
    order: 6
  },
  {
    title: "Corporate Branding",
    description: "Cohesive brand systems that establish authority and build trust in your market.",
    icon: "Briefcase",
    image: "/assets/images/corporate branding.webp",
    category: "additional",
    order: 7
  },
  {
    title: "Video & Animation",
    description: "Compelling visual storytelling through motion graphics and cinematic production.",
    icon: "Film",
    image: "/assets/images/video animations.jpg",
    category: "additional",
    order: 8
  }
];

const portfolio = [
  {
    title: "LuxeCommerce Platform",
    description: "A high-end e-commerce experience with seamless checkout flow",
    category: "Web Design",
    tag: "Web Design",
    image: "/assets/images/Website-Design-Development-Indore.webp",
    projectUrl: "#",
    order: 1
  },
  {
    title: "Zenith Brand Identity",
    description: "Complete visual identity system for a fintech startup",
    category: "Logo Design",
    tag: "Logo Design",
    image: "/assets/images/logo and branding.jpg",
    projectUrl: "#",
    order: 2
  },
  {
    title: "FitLife Campaign",
    description: "Viral social campaigns generating 2M+ impressions monthly",
    category: "Social Media",
    tag: "Social Media",
    image: "/assets/images/social-media-marketing-strategy-engagement-600nw-2723971325.webp",
    projectUrl: "#",
    order: 3
  },
  {
    title: "Nova Corp Rebrand",
    description: "Full corporate rebranding from strategy to implementation",
    category: "Branding",
    tag: "Branding",
    image: "/assets/images/corporate branding.webp",
    projectUrl: "#",
    order: 4
  },
  {
    title: "SwiftPay Mobile",
    description: "Intuitive fintech app with 50k+ active daily users",
    category: "Mobile App",
    tag: "Mobile App",
    image: "/assets/images/mobile.webp",
    projectUrl: "#",
    order: 5
  },
  {
    title: "Orbital Launch Campaign",
    description: "360° product launch reaching 500k potential customers",
    category: "Marketing Campaign",
    tag: "Marketing",
    image: "/assets/images/SEO optimization.webp",
    projectUrl: "#",
    order: 6
  }
];

const testimonials = [
  {
    text: "Premium Promoters transformed our brand completely. Our sales went up 200% within just three months of working with them. Absolutely outstanding results and a truly professional team!",
    name: "Sarah K.",
    role: "CEO, Nexus Retail",
    avatar: "SK",
    image: "/assets/images/client2.jpg",
    rating: 5,
    order: 1
  },
  {
    text: "The website they built for us gets compliments every single day. The attention to detail, the speed, the design — everything exceeded our expectations. Outstanding work.",
    name: "James R.",
    role: "Founder, Horizon Tech",
    avatar: "JR",
    image: "/assets/images/client3.jpg",
    rating: 5,
    order: 2
  },
  {
    text: "Their social media campaigns brought us hundreds of new followers every single week. Our engagement rate tripled. Premium Promoters delivers on every promise they make.",
    name: "Priya M.",
    role: "Marketing Director, FlowBrand",
    avatar: "PM",
    image: "/assets/images/client4.jpg",
    rating: 5,
    order: 3
  },
  {
    text: "Logo design was perfect on the absolute first try. They understood our vision instantly and delivered something truly iconic. Truly premium service — worth every penny.",
    name: "Alex T.",
    role: "Business Owner, Atlas Co.",
    avatar: "AT",
    image: "/assets/images/client5.jpg",
    rating: 5,
    order: 4
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Service.deleteMany({});
    await Portfolio.deleteMany({});
    // Keep user's testimonials but add more if less than 4
    
    // Insert new data
    await Service.insertMany(services);
    console.log('✅ Services seeded');

    await Portfolio.insertMany(portfolio);
    console.log('✅ Portfolio seeded');

    // Add default testimonials if less than 4 exist
    const existingTestimonials = await Testimonial.countDocuments();
    if (existingTestimonials < 4) {
      await Testimonial.insertMany(testimonials);
      console.log('✅ Testimonials seeded');
    } else {
      // Update existing testimonials with images
      await Testimonial.deleteMany({});
      await Testimonial.insertMany(testimonials);
      console.log(`✅ Testimonials updated with images`);
    }

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
