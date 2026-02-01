# Ryan McCann — Portfolio

> A hyper-modern portfolio with 3D WebGL graphics, terminal boot sequence, and Apple-style scroll animations.

[![Live Site](https://img.shields.io/badge/Live-ryanmccann1024.github.io-blue?style=for-the-badge)](https://ryanmccann1024.github.io/portfolio_website/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r170-black?style=for-the-badge&logo=three.js)](https://threejs.org/)

---

## The Experience

### Terminal Boot Sequence
The site opens with a hyper-realistic terminal experience featuring:
- **Linux kernel boot messages** with authentic timestamps
- **3D WebGL particle field** rotating in the background
- **Neofetch-style system info** display
- **Live typing animations** with realistic cursor
- **Progress bars** that feel genuinely system-like

### 3D Animated Background
Powered by Three.js and React Three Fiber:
- **2000+ floating particles** in a rotating cloud
- **Geometric wireframe shapes** (icosahedrons, octahedrons, tetrahedrons)
- **Glowing distortion orbs** with shader effects
- **Dynamic connection lines** between points
- **Mouse-reactive camera** that follows cursor movement
- **Infinite grid plane** with depth perception

### Apple-Style Scroll Animations
Inspired by Apple product pages:
- **Sticky scale effects** - content shrinks as you scroll past
- **Parallax layers** - elements move at different speeds
- **Character reveal** - text animates letter by letter
- **Blur on scroll** - content blurs as it exits viewport
- **Staggered animations** - children animate in sequence
- **Magnetic hover effects** - buttons attract to cursor

---

## Tech Stack

```
Frontend        React 19 + Vite
Styling         Tailwind CSS + Custom CSS
Animation       Framer Motion
3D Graphics     Three.js + React Three Fiber + Drei
Icons           Lucide React
Blog CMS        Notion API + react-notion-x
Fonts           Inter + Outfit + JetBrains Mono
```

---

## Features

| Feature | Description |
|---------|-------------|
| Terminal Intro | Full boot sequence with 3D background |
| 3D Background | WebGL particles, shapes, and orbs |
| Scroll Animations | Apple-style parallax and reveal effects |
| Dark Mode | Full dark/light theme support |
| Command Palette | `Cmd+K` to navigate anywhere |
| Blog | Notion-powered with live sync |
| Responsive | Mobile-first, works everywhere |

---

## Quick Start

```bash
# Clone
git clone https://github.com/ryanmccann1024/portfolio_website.git
cd portfolio_website

# Install
npm install

# Dev
npm run dev

# Build
npm run build
```

---

## Project Structure

```
src/
├── components/
│   ├── TerminalIntro.jsx      # Boot sequence + 3D scene
│   ├── AnimatedBackground.jsx  # WebGL particle system
│   ├── ScrollAnimations.jsx    # Apple-style animations
│   ├── HeroSection.jsx         # Landing with scroll effects
│   ├── ProjectShowcase.jsx     # Project cards with tilt
│   └── ...
├── pages/
│   ├── Home.jsx
│   ├── Blog.jsx
│   └── Post.jsx
└── ...
```

---

## Performance

- **Lighthouse Score**: 95+
- **First Contentful Paint**: < 1s
- **3D renders at 60fps** on modern hardware
- **Lazy-loaded** 3D components
- **Optimized** particle count for mobile

---

## Customization

### Change Terminal Commands
Edit `src/components/TerminalIntro.jsx`:
```javascript
const terminalCommands = [
    { type: "command", text: "your-command-here" },
    // ...
];
```

### Adjust 3D Scene
Edit `src/components/AnimatedBackground.jsx`:
```javascript
<ParticleCloud count={2000} />  // Particle count
<FloatingShapes />              // Geometric shapes
<GlowingOrb position={[x,y,z]} color="#color" />
```

### Add Scroll Animations
Import from `src/components/ScrollAnimations.jsx`:
```jsx
import { FadeIn, Parallax, CharReveal } from "./ScrollAnimations";

<FadeIn delay={0.2}>
    <CharReveal text="Animate this text" />
</FadeIn>
```

---

## Credits

Built by [Ryan McCann](https://github.com/ryanmccann1024)

Inspired by: [bruno-simon.com](https://bruno-simon.com), [lusion.co](https://lusion.co), [linear.app](https://linear.app), [apple.com](https://apple.com)

---

## License

MIT
