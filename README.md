# PatrolProof - Verifiable Guard Tours on Base

A Base MiniApp that enables security guards to prove patrol completion with GPS-verified checkpoints, instant incident reporting, and automated client summaries—turning accountability into a social, on-chain reputation game.

## Features

- **GPS-Verified Checkpoint Scanning**: Scan QR/NFC tags with location verification (±20m tolerance)
- **Instant Incident Photo Reports**: AI-generated summaries from photos in 30 seconds
- **Route Heatmap Dashboard**: Visual analytics showing time spent per checkpoint
- **Automated Client Reports**: Zero-touch PDF summaries emailed after every shift
- **Guard Reputation Tokens (GRT)**: Earn on-chain tokens for verified patrols
- **Farcaster Social Frames**: Share shift summaries and build public reputation

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base L2 (via OnchainKit)
- **Styling**: Tailwind CSS with custom design system
- **Authentication**: Base Wallet via OnchainKit
- **Social**: Farcaster Frames integration

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Fill in your API keys:
   - OnchainKit API key from [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)
   - Pinata API keys from [Pinata](https://pinata.cloud/)
   - OpenAI API key from [OpenAI](https://platform.openai.com/)
   - Resend API key from [Resend](https://resend.com/)
   - Mapbox token from [Mapbox](https://mapbox.com/)

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## Project Structure

```
app/
├── layout.tsx          # Root layout with providers
├── page.tsx            # Landing page
├── providers.tsx       # OnchainKit provider setup
├── dashboard/          # Main dashboard
└── demo/               # Demo page

components/
├── LandingPage.tsx     # Landing page component
├── DashboardView.tsx   # Main dashboard with tabs
├── PatrolMap.tsx       # Interactive patrol map
├── CheckpointList.tsx  # Checkpoint scanning interface
├── IncidentReports.tsx # Incident reporting interface
├── ReputationDashboard.tsx # GRT tokens and leaderboard
└── DemoView.tsx        # Demo showcase
```

## Design System

The app uses a security/tactical theme with:
- **Colors**: Dark navy background, electric blue accents (#0ea5e9)
- **Typography**: Inter font family
- **Components**: Glass-morphism cards, sharp borders
- **Animations**: Pulse effects, smooth transitions

## Key User Flows

1. **Guard Onboarding**: Connect wallet → Enter profile → Start first patrol
2. **Checkpoint Scan**: Tap scan button → Verify GPS → Earn GRT token
3. **Incident Report**: Snap photo → AI generates summary → Submit to blockchain
4. **Shift Completion**: View summary → Share Frame on Farcaster → Build reputation

## Business Model

- **Micro-transactions**: $0.10 per verified checkpoint scan
- **Freemium**: Free for 1 guard, $29/mo for teams of 5+
- **Tokenized Reputation**: Guards earn GRT tokens that unlock bonuses

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/patrolproof)

## License

MIT License - see LICENSE file for details

## Support

For questions or support, reach out on [Farcaster](https://warpcast.com/~/channel/securitypros)
