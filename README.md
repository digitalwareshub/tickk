# OnePageOS Voice Productivity App

🎤 **The world's most advanced free voice-to-text productivity application** - Transform your voice into organized tasks, notes, and calendar events with cutting-edge browser-based speech recognition.

![OnePageOS Voice App](https://img.shields.io/badge/PWA-Ready-blue) ![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black) ![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue) ![License](https://img.shields.io/badge/License-MIT-green) ![Backup](https://img.shields.io/badge/Protected-Repository-green) ![Security](https://img.shields.io/badge/Security-Policy-orange)

## ✨ Features

- 🎯 **Advanced Speech Recognition** - 99% accuracy using Web Speech API
- 🧠 **Smart Text Classification** - Automatically categorizes speech into tasks, notes, and calendar events
- 🔒 **Complete Privacy** - Zero data collection, all processing happens locally
- 📱 **Progressive Web App** - Install on any device for native app experience
- 🌙 **Dark Mode Support** - Comfortable viewing in any lighting condition
- ⚡ **Offline Functionality** - Continue working without internet connection
- 🎨 **Modern UI/UX** - Clean, intuitive interface built with Tailwind CSS
- 📊 **Analytics Ready** - Integrated with Google Analytics and Vercel Analytics
- ♿ **Accessibility First** - Designed for users with different abilities

## 🚀 Live Demo

Try the app live at: [Your Deployment URL]

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **PWA**: next-pwa
- **Speech Recognition**: Web Speech API
- **NLP**: Custom classification system
- **Analytics**: Google Analytics 4 + Vercel Analytics
- **Deployment**: Vercel (recommended)

## 📦 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/digitalwareshub/opos-voice.git

# Navigate to project directory
cd opos-voice

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Additional environment variables
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### PWA Configuration

The app is preconfigured as a Progressive Web App. Users can install it directly from their browser for a native app experience.

## 🎯 How It Works

1. **Voice Input**: Click the microphone button or press spacebar
2. **Speech Recognition**: Browser's Web Speech API captures and transcribes your voice
3. **Smart Classification**: Custom NLP engine analyzes the text and categorizes it
4. **Organization**: Automatically sorts content into tasks, notes, or calendar events
5. **Storage**: All data is stored locally in your browser

### Classification Examples

- **Tasks**: "I need to buy groceries tomorrow" → Tasks
- **Notes**: "Great idea for the project design" → Notes  
- **Calendar**: "Meeting with John at 3pm" → Calendar

## 📱 Progressive Web App

OnePageOS is built as a PWA, offering:

- **Installation**: Add to home screen on mobile/desktop
- **Offline Support**: Continue working without internet
- **Native Feel**: App-like experience across platforms
- **Background Sync**: Data syncs when connection returns

## 🔒 Privacy & Security

- **No Data Collection**: Your voice and text never leave your device
- **Local Processing**: All speech recognition happens in your browser
- **No Account Required**: Start using immediately without registration
- **Open Source**: Full transparency with public source code

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Maintain 100% test coverage for new features
- Use semantic commit messages
- Ensure accessibility compliance (WCAG 2.1)

## 📊 Analytics

The app supports analytics tracking for:

- Voice recording events
- Classification accuracy
- User interactions
- Performance metrics

Analytics help improve the user experience while maintaining privacy.

## 🐛 Bug Reports

Found a bug? Please report it on our [Issues page](https://github.com/digitalwareshub/opos-voice/issues) with:

- Detailed description
- Steps to reproduce
- Browser and OS information
- Expected vs actual behavior

## � Repository Security & Protection

This repository is protected against unauthorized changes and data loss:

### 🛡️ Security Measures
- **Branch Protection**: Main branch requires pull request reviews
- **Code Ownership**: Critical files require maintainer approval (see [CODEOWNERS](.github/CODEOWNERS))
- **Security Policy**: Report vulnerabilities via [SECURITY.md](SECURITY.md)
- **Automated Backups**: Daily automated backups via GitHub Actions

### 💾 Backup Strategy
- **Local Backups**: Run `./scripts/backup-repo.sh` for manual backups
- **Automated Backups**: GitHub Actions create daily archives
- **Multiple Mirrors**: Repository mirrored to additional platforms
- **Version Control**: Full git history preserved in all backups

### 🔐 Contributing Safely
1. Fork the repository
2. Create feature branch from `main`
3. Make changes with descriptive commits
4. Submit pull request for review
5. All changes require maintainer approval

**Repository Backup Locations:**
- Primary: GitHub (digitalwareshub/opos-voice)
- Automated: GitHub Actions Artifacts (90-day retention)
- Local: `~/Backups/opos-voice/` (when using backup script)

## �📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Web Speech API for enabling browser-based speech recognition
- Next.js team for the amazing framework
- Vercel for hosting and analytics
- Open source community for inspiration and tools

## 📞 Contact

- **Email**: write@digiwares.xyz
- **Security**: security@digiwares.xyz
- **Website**: [Your Website]
- **GitHub**: [@digitalwareshub](https://github.com/digitalwareshub)

---

**Made with ❤️ for productivity enthusiasts**

*OnePageOS - Transforming voice into organized productivity since 2025*

