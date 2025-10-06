# PatrolProof - Verifiable Guard Tours on Base

A Base MiniApp that enables security guards to prove patrol completion with GPS-verified checkpoints, instant incident reporting, and automated client summaries—turning accountability into a social, on-chain reputation game.

## Features

- **GPS-Verified Checkpoints**: Scan QR/NFC tags with automatic GPS verification (±20m tolerance)
- **Instant Incident Reports**: Capture geo-tagged photos with AI-generated summaries
- **Route Heatmap Dashboard**: Visual analytics showing time spent per checkpoint
- **Automated Client Reports**: Zero-touch branded PDF summaries emailed after every shift
- **Guard Reputation Tokens (GRT)**: Earn on-chain tokens for verified checkpoints
- **Farcaster Social Frames**: Share shift summaries as interactive frames

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base L2 (via OnchainKit)
- **Styling**: Tailwind CSS with custom design system
- **Authentication**: OnchainKit Wallet Integration
- **Social**: Farcaster Frames API

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   Then fill in your API keys.

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## Project Structure

```
app/
├── layout.tsx          # Root layout with providers
├── page.tsx            # Landing page
├── providers.tsx       # OnchainKit provider setup
├── dashboard/          # Main dashboard
│   └── page.tsx
├── demo/               # Demo page
│   └── page.tsx
└── contact/            # Contact page
    └── page.tsx

components/
├── Hero.tsx            # Landing page hero
├── Features.tsx        # Features section
├── HowItWorks.tsx      # How it works section
├── CTASection.tsx      # Call to action
└── dashboard/          # Dashboard components
    ├── DashboardHeader.tsx
    ├── PatrolMap.tsx
    ├── CheckpointList.tsx
    ├── MetricsOverview.tsx
    ├── ScanButton.tsx
    └── BottomNav.tsx
```

## Design System

The app uses a security/tactical theme with:
- **Background**: Dark navy (hsl(220, 40%, 8%))
- **Accent**: Electric blue (hsl(199, 89%, 48%))
- **Success**: Green (hsl(142, 76%, 36%))
- **Danger**: Red (hsl(0, 84%, 60%))
- **Warning**: Orange (hsl(38, 92%, 50%))

All design tokens are defined as CSS variables in `app/globals.css`.

## Key Components

### Checkpoint Scanning
Guards scan QR/NFC tags at patrol locations. The app verifies GPS coordinates and records a cryptographic timestamp on Base L2.

### Incident Reporting
Tap the floating action button to capture geo-tagged, timestamped photos. AI auto-generates incident summaries.

### Reputation System
Guards earn GRT tokens for completing patrols. Tokens build an on-chain reputation that can be showcased to clients.

## API Integration

- **Base MiniKit SDK**: Wallet-native UX for transactions
- **Farcaster Frames API**: Generate interactive shift summaries
- **Pinata IPFS API**: Decentralized photo storage
- **OpenAI GPT-4 Vision**: AI incident summaries
- **Resend Email API**: Automated client reports

## License

MIT

## Support

For questions or support, contact hello@patrolproof.com
