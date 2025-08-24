# 💻 Jessim — Terminal Portfolio

An interactive personal portfolio with a **terminal-style interface** designed as a single page application. Built with **Vite**, **React**, **TypeScript** and **Tailwind CSS**.

## ✨ Features

- 🖥️ Interactive and responsive terminal interface
- ⌨️ Custom commands (`help`, `projects`, `skills`, `contact`, etc.)
- 📱 Mobile and desktop compatible
- 🚀 Optimized performance with Vite
- 🎨 Modern styling with Tailwind CSS
- 📄 CV integration (view and download)
- 🔍 Intuitive command-based navigation

## 🎯 Available commands

| Command | Description |
|---------|-------------|
| `help` | Display list of commands |
| `about` | Personal introduction |
| `projects` | List of projects |
| `project <id>` | Details of a specific project |
| `skills` | Technical skills |
| `contact` | Contact information |
| `cv [open\|download]` | Open or download CV |
| `clear` | Clear the terminal |

## ⚙️ Prerequisites

- **Node.js** ≥ 20.19 (recommended **22 LTS**)
- **npm** or **yarn**

> 💡 **Tip with nvm**:
> ```bash
> nvm install 22 && nvm use 22
> echo "22" > .nvmrc  # (optional)
> ```

## 🚀 Installation and setup

```bash
# Clone the repository
git clone https://github.com/username/terminal-portfolio.git
cd terminal-portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build

# Preview the build
npm run preview
```

## 🛠️ Technologies used

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Font**: Fira Code (monospace)
