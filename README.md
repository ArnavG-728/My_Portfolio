# Arnav Gupta - Portfolio Website

A cutting-edge, immersive portfolio website showcasing AI/ML expertise, cloud computing, and generative AI projects. Built with modern web technologies and designed with premium aesthetics.

## 🚀 Features

- **Home Section** - Animated background with gradient text and smooth entrance animations
- **Glassmorphic Navigation Dock (desktop)** - Active section tracking via IntersectionObserver, smooth scrolling, URL hash sync
- **Mobile Top-Left Menu** - Lightweight glassmorphic panel with the same scroll logic as the dock
- **About Section** - Professional bio with animated statistics counters
- **Featured Projects** - Showcase of production-grade AI/ML projects with metrics and tech stacks
- **Experience Timeline** - Interactive timeline with expandable achievements
- **Achievements & Certifications** - Awards and credentials by category
- **Interactive Skills** - Expandable categories with proficiency levels
- **Contact Form** - Validation, feedback states, and direct email link
- **Responsive Design** - Mobile-first with adaptive animations and micro-interactions
- **Dark Mode** - `class` strategy with early paint prevention and neon accents
- **Accessibility** - WCAG AA, keyboard nav, ARIA labels, reduced motion support

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Charts**: Recharts

## 📋 Prerequisites

- Node.js 16 or higher
- npm or yarn package manager

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the portfolio.

### 3. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
portfolio/
├── app/                          # Next.js app directory
│   ├── layout.js                # Root layout with metadata
│   ├── page.js                  # Main portfolio page
│   └── globals.css              # Global styles and utilities
├── components/
│   ├── sections/                # Page sections
│   │   ├── Home.jsx             # Home section with animations
│   │   ├── About.jsx            # About section with stats
│   │   ├── Projects.jsx         # Featured projects showcase
│   │   ├── Experience.jsx       # Experience timeline
│   │   ├── Achievements.jsx     # Awards and certifications
│   │   ├── Skills.jsx           # Technical skills showcase
│   │   ├── Contact.jsx          # Contact form section
│   │   └── Footer.jsx           # Footer with links
│   └── common/                  # Reusable components
│       ├── NavigationDock.jsx   # Desktop glassmorphic dock with scroll-spy
│       ├── MobileTopMenu.jsx    # Mobile top-left menu with scroll-spy
│       ├── Button.jsx           # Button component
│       ├── Card.jsx             # Card wrapper
│       └── Badge.jsx            # Badge component
├── data/                        # Content and configuration
│   ├── portfolio.js             # Main portfolio data
│   ├── projects.js              # Projects data
│   ├── skills.js                # Skills data
│   ├── experience.js            # Experience data
│   └── achievements.js          # Awards and certifications
├── utils/                       # Utility functions
│   ├── animations.js            # Framer Motion animation presets
│   └── hooks.js                 # Custom React hooks
├── config/                      # Configuration files
├── public/                      # Static assets
│   ├── images/                  # Image directory
│   └── resume.pdf               # Resume file
└── styles/                      # Additional styles
```

## 🎨 Customization

### Update Content

All content is centralized in the `data/` directory for easy updates:

- **`data/portfolio.js`** - Personal info, headline, subheading, contact details
- **`data/projects.js`** - Featured projects with descriptions, metrics, and tech stacks
- **`data/skills.js`** - Technical skills organized by category
- **`data/experience.js`** - Professional experience and achievements
- **`data/achievements.js`** - Awards and certifications

### Customize Theme

Edit `tailwind.config.js` to modify:

- **Colors**: Update `neon` and `dark` color palette
- **Typography**: Adjust font families and sizes
- **Animations**: Modify animation durations and keyframes
- **Spacing**: Customize padding and margins

### Update Resume

Replace `public/resume.pdf` with your actual resume file.

### Add Images

Place project images and profile photos in `public/images/` and reference them in the data files.

## 🎯 Key Components

### Hero Section
- Animated gradient background with floating orbs
- Gradient text headline
- Dual CTA buttons (primary and secondary)
- Scroll indicator animation

### About Section
- Professional bio with multiple paragraphs
- Animated statistics counters
- Responsive grid layout

### Projects Section
- 4 featured projects displayed as cards
- Problem statement, description, and metrics
- Technology badges
- External links to GitHub repositories

### Experience Section
- Expandable timeline cards
- Company, role, and duration information
- Key achievements and technologies
- Smooth expand/collapse animations

### Achievements Section
- Award cards with trophy icons
- Certifications organized by category
- Skill tags for each certification
- Hover animations

### Skills Section
- Expandable skill categories
- Proficiency levels (Expert, Advanced, Intermediate, Beginner)
- Emoji icons for visual interest
- Responsive grid layout

### Contact Section
- Functional contact form with validation
- Success and error feedback messages
- Direct email link
- Loading state during submission

## 🎬 Animation Features

- **Scroll Triggers**: Sections animate in as they come into view
- **Entrance Animations**: Staggered animations for elements
- **Hover Effects**: Interactive hover states on buttons and cards
- **Parallax**: Subtle parallax scrolling effects
- **Glassmorphism**: Frosted glass effects on cards, dock, and menus
- **Micro-interactions**: Smooth transitions and state changes

### Navigation Behavior
- Active section tracking powered by `IntersectionObserver` with a centered viewport band
- Smooth scrolling to anchors with proper `scroll-mt` offsets under fixed UI
- URL hash synchronization without full page jumps

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast compliance (WCAG AA)
- Reduced motion support for users with motion sensitivity
- Alt text for images and icons

## 📱 Responsive Design

- Mobile-first approach
- Adaptive typography sizes
- Responsive grid layouts
- Touch-friendly interactive elements
- Optimized animations for mobile devices

## 🚀 Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Deploy the .next folder to Netlify
```

### Deploy to GitHub Pages

```bash
npm run build
# Deploy the out folder to GitHub Pages
```

## 📊 Performance

- Optimized for Core Web Vitals
- Lazy loading for images and components
- Efficient animations (60 FPS)
- Minimal bundle size
- Production-ready build configuration

## 🔧 Development

### Linting

```bash
npm run lint
```

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## 📝 License

MIT License - Feel free to use this portfolio template for your own projects.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📧 Contact

Update your contact details in `data/portfolio.js` (email, socials). The site reads from this file.

---

**Built with ❤️ using Next.js, React, Tailwind CSS, and Framer Motion**
