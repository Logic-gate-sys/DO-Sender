# TS-Sender Web3 Application
A decentralized application (dApp) built with Next.js and TypeScript for performing ERC20 token airdrops efficiently.

## Features
Connect Web3 wallet via RainbowKit
Perform batch ERC20 token transfers (airdrops)
Support for multiple EVM chains (Sepolia, zkSync, Anvil)
Responsive UI with Tailwind CSS
Comprehensive test coverage with Playwright and Synpress
🛠 Tech Stack
Frontend: Next.js, TypeScript, React
Web3: Wagmi, RainbowKit, Viem
Styling: Tailwind CSS
Testing: Vitest, Playwright, Synpress
Development: Node.js, pnpm

## Clone the repository
git clone <repository-url>

## Install dependencies
pnpm install

## Create .env.local file
cp .env.example .env.local

NEXT_PUBLIC_PROJECT_ID=your_wallet_connect_project_id🔧 Configuration
Set up your environment variables in .env.local:

Configure supported chains in RainbowKitConfig.ts# Run development server
pnpm dev

Usage
## Build for production
pnpm build

## Run production server
pnpm start

Testing
## Run unit tests
pnpm test

## Run E2E tests
pnpm test:e2e

## Run E2E tests with UI
pnpm test:e2e:ui

Project Structure
ts-sender-webapp/
├── app/                  # Next.js app directory
│   ├── components/      # React components
│   ├── util/           # Utility functions
│   └── layout.tsx      # Root layout
├── test/               # Test files
│   ├── playWright/     # E2E tests
│   └── unit-test/      # Unit tests
├── providers.tsx       # Web3 providers setup
└── RainbowKitConfig.ts # RainbowKit configuration


## Smart Contract Integration
The application integrates with ERC20 tokens using standard interfaces and a custom airdrop contract. Key functionality includes:

Token balance checking
Batch transfer execution
Transaction status monitoring
## Security
Client-side validation
Network security checks
Gas estimation before transactions
## Contributing
Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
RainbowKit team for wallet integration
Wagmi for React hooks
Next.js team for the framework
Cyfrin Updraft: for the development knowlege
Similar code found with 2 license types - View matches

