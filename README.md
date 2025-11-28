# LoveBul - Portfolio Website

A modern, responsive portfolio website for Naveen Vasamsetti (Frontend & MERN Developer) built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## Features

- 🎨 Modern, clean UI with electric blue (#2962FF) accent color
- 🌓 Dark mode support with smooth transitions
- ✨ Smooth animations powered by Framer Motion
- 📱 Fully responsive design (mobile, tablet, desktop)
- ♿ Accessible with semantic HTML and ARIA labels
- 🚀 Optimized performance with lazy loading
- 🎯 SEO optimized with meta tags and Open Graph
- 📧 Contact form with validation

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Routing**: React Router
- **Form Handling**: React Hook Form + Zod

## Project Structure

```
src/
├── components/
│   ├── portfolio/         # Main portfolio components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectModal.tsx
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   ├── Certifications.tsx
│   │   ├── ContactForm.tsx
│   │   └── Footer.tsx
│   └── ui/                # Reusable UI components
├── data/
│   └── profile.ts         # Portfolio content data
├── hooks/
│   └── useDarkMode.ts     # Dark mode hook
├── utils/
│   └── animations.ts      # Framer Motion variants
├── assets/                # Images and static files
└── pages/
    └── Index.tsx          # Main page
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd lovebul-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:8080](http://localhost:8080) in your browser

### Build for Production

```bash
npm run build
```

This generates optimized files in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment on Vercel

### Quick Deploy

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will auto-detect Vite and configure build settings
4. Click "Deploy"

### Manual Deploy with Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

Follow the prompts to deploy your site.

### Environment Variables

For the contact form to work with a serverless function, add these to Vercel:

- `SENDGRID_API_KEY`: Your SendGrid API key
- `CONTACT_EMAIL`: Email to receive contact form submissions

## Contact Form Backend (Optional)

The contact form is set up to work with Vercel serverless functions. Create `api/contact.js`:

```javascript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // Validate inputs
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await sgMail.send({
      to: process.env.CONTACT_EMAIL,
      from: process.env.CONTACT_EMAIL,
      subject: `Portfolio Contact: ${name}`,
      text: `From: ${name} (${email})\n\n${message}`,
      html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('SendGrid Error:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
}
```

Install SendGrid:
```bash
npm install @sendgrid/mail
```

## Customization

### Update Content

Edit `src/data/profile.ts` to update:
- Personal information
- Projects
- Experience
- Skills
- Certifications

### Modify Design

- **Colors**: Edit CSS variables in `src/index.css`
- **Animations**: Modify variants in `src/utils/animations.ts`
- **Components**: Customize individual components in `src/components/portfolio/`

### Add New Sections

1. Create a new component in `src/components/portfolio/`
2. Import and add it to `src/pages/Index.tsx`
3. Add navigation link in `src/components/portfolio/Header.tsx`

## Performance Optimization

- ✅ Images optimized with WebP format
- ✅ Code splitting with React.lazy
- ✅ Tree shaking with Vite
- ✅ CSS purging with Tailwind
- ✅ Static site generation

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## License

MIT License - feel free to use this template for your own portfolio!

## Contact

Naveen Vasamsetti
- Email: naveen.vasamsetti@example.com
- GitHub: [@naveenvasamsetti](https://github.com/naveenvasamsetti)
- LinkedIn: [naveenvasamsetti](https://linkedin.com/in/naveenvasamsetti)
