<div align="center">
  <br />
  <h1>🌟 Dinesh Rajan's Portfolio</h1>
  <p>A modern, responsive portfolio website showcasing my projects and skills</p>
  
  <div>
    <img src="https://img.shields.io/badge/-Next.js-black?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/-TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/-Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" />
    <img src="https://img.shields.io/badge/-Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  </div>

  <p>
    <a href="https://dinesh-portfolio.vercel.app">View Demo</a>
    ·
    <a href="https://github.com/Dinesh2112/Portfolio/issues">Report Bug</a>
    ·
    <a href="https://github.com/Dinesh2112/Portfolio/issues">Request Feature</a>
  </p>
</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Contact](#-contact)

## 🎯 About the Project

This is my personal portfolio website built with Next.js 14, featuring a modern design with smooth animations, 3D elements, and a fully responsive layout. The portfolio showcases my projects, skills, and professional experience.

### Key Highlights

- ✨ Modern UI/UX with smooth animations
- 🎨 Beautiful gradient effects and 3D elements
- 📱 Fully responsive design
- ⚡ Optimized performance with Next.js
- 🌙 Dark theme support
- 🎯 Interactive project showcase

## 🚀 Features

### Hero Section
- Spotlight effects
- Animated text generation
- Smooth scroll navigation

### About Section
- Interactive Bento Grid layout
- Tech stack visualization
- Personal information display

### Projects Section
- 3D card effects with hover animations
- Project thumbnails and descriptions
- Direct links to live demos and GitHub repos
- Tech stack icons for each project

### Experience Section
- Work experience timeline (currently empty)

### Approach Section
- 3-step workflow visualization
- Canvas reveal effects

### Contact Section
- Email copy functionality
- Social media links
- Professional contact form

## 💻 Tech Stack

### Frontend
- **Next.js 14** - React framework for production
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js

### UI Components
- Custom animated components
- Aceternity UI components
- Responsive grid layouts
- Interactive navigation

### Tools & Libraries
- **React Icons** - Icon library
- **Next Themes** - Theme management
- **Lucide React** - Icon components

## 🛠️ Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dinesh2112/Portfolio.git
   cd Portfolio/portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Hero.tsx           # Hero section
│   ├── Grid.tsx           # About/Grid section
│   ├── RecentProjects.tsx # Projects showcase
│   ├── Experience.tsx     # Work experience
│   ├── Approach.tsx       # Work approach
│   ├── Footer.tsx         # Footer section
│   └── ui/                # UI components
├── data/                  # Data files
│   └── index.ts           # Projects, skills, etc.
├── lib/                   # Utility functions
├── public/                # Static assets
│   ├── *.png             # Project images
│   └── *.svg             # Icons and graphics
└── package.json           # Dependencies
```

## 🚢 Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure build settings:
   - Framework Preset: Next.js
   - Root Directory: `portfolio`
4. Deploy!

### Deploy on Other Platforms

The portfolio can be deployed on any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean

## 📝 Customization

### Update Personal Information

Edit `data/index.ts` to update:
- Projects
- Social media links
- Personal bio
- Tech stack

### Update Projects

Add or modify projects in `data/index.ts`:

```typescript
export const projects = [
  {
    id: 1,
    title: "Your Project Title",
    des: "Project description",
    img: "/project-image.png",
    iconLists: ["/tech-icon.svg"],
    link: "https://your-project-link.com",
  },
];
```

### Update Social Links

Modify social media links in `data/index.ts`:

```typescript
export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    link: "https://github.com/yourusername",
  },
];
```

## 🎨 Projects Showcased

1. **Web Editor** - Drag & Drop Website Builder
   - Live: [web-editor-opal.vercel.app](https://web-editor-opal.vercel.app/)
   - Tech: React, Tailwind CSS

2. **PrepWise** - AI Interview Platform
   - Live: [prepwise-lemon-two.vercel.app](https://prepwise-lemon-two.vercel.app/)
   - Tech: Next.js, TypeScript, Tailwind CSS

3. **Gaming Ecommerce** - AI-Powered Store
   - Live: [gamming-ecommerce.vercel.app](https://gamming-ecommerce.vercel.app/)
   - Tech: React, Tailwind CSS

## 📧 Contact

**Dinesh Rajan**

- 📧 Email: [dineshrajan2112@gmail.com](mailto:dineshrajan2112@gmail.com)
- 💼 LinkedIn: [in/dinesh-rajan-734343248](https://linkedin.com/in/dinesh-rajan-734343248)
- 🐙 GitHub: [@Dinesh2112](https://github.com/Dinesh2112)
- 🐦 Twitter: [@Dineshrajan2112](https://x.com/Dineshrajan2112)
- 📷 Instagram: [@dineshh__r](https://www.instagram.com/dineshh__r/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Design inspiration from [Aceternity UI](https://ui.aceternity.com/)
- Original template by [JavaScript Mastery](https://github.com/adrianhajdin)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)

---

<div align="center">
  <p>Made with ❤️ by Dinesh Rajan</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
