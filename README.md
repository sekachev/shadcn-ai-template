# shadcn-ai-template

A modern React + TypeScript + Vite template built with shadcn/ui components and AI-powered features. This template provides a solid foundation for building AI-enhanced web applications with a beautiful, accessible UI.

## ✨ Features

- **Modern React 19** with TypeScript
- **Vite** for fast development and building
- **shadcn/ui** - Beautiful, accessible UI components built on Radix UI
- **Tailwind CSS** - Utility-first CSS framework
- **AI Integration** - Built-in AI components and utilities
- **Flow-based UI** - React Flow for creating interactive diagrams and workflows
- **Syntax Highlighting** - Shiki for beautiful code blocks
- **Animations** - Motion for smooth, delightful animations
- **Theme Support** - Dark/light mode toggle
- **Responsive Design** - Mobile-first responsive layout

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sekachev/shadcn-ai-template.git
   cd shadcn-ai-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173` to see your application running.

## 📦 Project Structure

```
shadcn-ai-template/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, icons, etc.
│   ├── components/
│   │   ├── ui/           # shadcn/ui components
│   │   ├── ai-elements/  # AI-specific components
│   │   ├── mode-toggle.tsx
│   │   └── theme-provider.tsx
│   ├── lib/              # Utility functions
│   ├── App.tsx           # Main application component
│   ├── index.css         # Global styles
│   └── main.tsx          # Application entry point
├── components.json       # shadcn/ui configuration
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 shadcn/ui Components

This template includes a comprehensive set of shadcn/ui components:

- **Accordion** - Collapsible content sections
- **Alert** - Alert messages and notifications
- **Badge** - Small UI elements for labeling
- **Button** - Various button styles and variants
- **Card** - Container components for content
- **Carousel** - Image/content carousels
- **Dialog** - Modal dialogs and overlays
- **Dropdown Menu** - Dropdown navigation menus
- **Input** - Form input fields
- **Progress** - Progress bars and indicators
- **Scroll Area** - Custom scrollable areas
- **Select** - Dropdown selection components
- **Tabs** - Tabbed content navigation
- **Textarea** - Multi-line text inputs
- **Tooltip** - Contextual tooltips

## 🤖 AI Components

The template includes specialized AI-focused components:

- **Artifact** - Display AI-generated content
- **Canvas** - Interactive drawing/creation surface
- **Chain of Thought** - Step-by-step reasoning display
- **Checkpoint** - Progress markers in AI workflows
- **Code Block** - Syntax-highlighted code display
- **Confirmation** - AI action confirmations
- **Connection** - Visual connections between AI elements
- **Context** - Contextual information display
- **Controls** - AI workflow controls
- **Conversation** - Chat interface components
- **Edge** - Flow diagram edges
- **Image** - AI-generated image display
- **Inline Citation** - Source citations
- **Loader** - Loading states for AI operations
- **Message** - Chat messages
- **Model Selector** - AI model selection
- **Node** - Flow diagram nodes
- **Open in Chat** - Chat integration
- **Panel** - Sidebar panels
- **Plan** - AI planning components
- **Prompt Input** - AI prompt entry
- **Queue** - Task queues
- **Reasoning** - AI reasoning display
- **Shimmer** - Loading animations
- **Sources** - Reference sources
- **Suggestion** - AI suggestions
- **Task** - Task management
- **Tool** - AI tool interface
- **Toolbar** - Action toolbars
- **Web Preview** - Web content previews

## 🎭 Theme Customization

The template supports both light and dark themes. Theme providers and toggle components are already set up.

**Available themes:**
- Light theme (default)
- Dark theme
- System theme (automatically adapts to user preference)

## 🏗️ Development

### Adding New Components

1. **Add a new shadcn/ui component:**
   ```bash
   npx shadcn@latest add button
   ```

2. **Custom components:**
   - Create new components in `src/components/`
   - Use the existing component structure as a reference
   - Follow the established naming conventions

### Styling

- **Global styles:** Edit `src/index.css`
- **Component styles:** Use Tailwind CSS classes
- **Custom colors:** Modify `tailwind.config.js`

### AI Integration

The template includes the `ai` package for AI functionality. Key integration points:

- **useChat** - Chat interface hooks
- **useCompletion** - Text completion hooks
- **useStream** - Streaming responses
- **React Flow** - For creating AI workflow diagrams

## 📱 Responsive Design

The template is built mobile-first and is fully responsive:

- **Mobile:** Optimized for mobile devices
- **Tablet:** Responsive breakpoints for tablets
- **Desktop:** Full desktop experience
- **Large screens:** Optimized for large displays

## 🔧 Configuration

### TypeScript

TypeScript configuration is optimized for modern React development:

- Strict mode enabled
- Path mapping configured
- React 19 support

### ESLint

ESLint is configured with:
- React hooks rules
- TypeScript support
- Accessibility checks
- Modern React patterns

### Tailwind CSS

Tailwind is configured with:
- shadcn/ui color palette
- Custom animations
- Responsive breakpoints
- Dark mode support

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy!

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/sekachev/shadcn-ai-template/issues) page
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about your problem

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the amazing UI components
- [Radix UI](https://www.radix-ui.com/) for the accessible component primitives
- [Vite](https://vitejs.dev/) for the fast build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://reactjs.org/) for the incredible library
- [TypeScript](https://www.typescriptlang.org/) for type safety

---

Built with ❤️ using modern web technologies.
