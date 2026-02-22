
```markdown
# TS-Sender 🚀 | Web3 Token Distribution dApp

A high-performance decentralised application (dApp) built with **Next.js** and **TypeScript**, designed for efficient ERC20 token batch transfers. This project prioritizes security, gas efficiency, and industrial-grade testing.

## 🌟 Key Features
- **Seamless Connectivity:** Integrated **RainbowKit** for a premium wallet connection experience.
- **Batch Transfers:** Optimized logic for performing ERC20 airdrops across multiple addresses.
- **Multi-Chain Ready:** Native support for **Sepolia**, **zkSync**, and local **Anvil** environments.
- **E2E Testing:** Robust test coverage using **Synpress** and **Playwright** to simulate real-world wallet interactions and transaction signing.
- **Modern UI:** Responsive, accessible interface built with **Tailwind CSS**.

## 🛠 Tech Stack
- **Frontend:** Next.js (App Router), TypeScript, React
- **Web3 Layer:** Wagmi, Viem, RainbowKit
- **Testing:** Vitest, Playwright, Synpress (E2E Wallet Testing)
- **Tooling:** pnpm, Node.js

---

## 🚀 Getting Started

### 1. Installation
```bash
git clone [https://github.com/Logic-gate-sys/ts-sender-webapp.git](https://github.com/Logic-gate-sys/ts-sender-webapp.git)
cd ts-sender-webapp
pnpm install

```

### 2. Configuration

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local

```

Update the following:

* `NEXT_PUBLIC_PROJECT_ID`: Your WalletConnect Project ID.

### 3. Development

```bash
pnpm dev

```

---

## 🧪 Testing Strategy

This project implements a comprehensive testing lifecycle to ensure smart contract interaction safety.

* **Unit Testing:** Validates utility functions and component logic.
```bash
pnpm test

```


* **End-to-End (E2E):** Uses **Synpress** to test real Metamask/Wallet flows in a headless browser.
```bash
pnpm test:e2e        # Run standard E2E
pnpm test:e2e:ui     # Run E2E with UI debug mode

```



---

## 📁 Project Structure

```text
ts-sender-webapp/
├── app/                 # Next.js App Router & Views
│   ├── components/      # UI Components (Tailwind)
│   ├── util/            # Web3 & Helper Utilities
├── test/                # QA Suite
│   ├── playWright/      # Synpress Wallet E2E tests
│   └── unit-test/       # Vitest logic tests
├── providers.tsx        # Web3 & Wagmi Context
└── RainbowKitConfig.ts  # Chain & Provider configuration

```

---

## 🛡 Security & Reliability

* **Client-Side Validation:** Rigorous address and balance checks before transaction broadcast.
* **Network Awareness:** Automatic chain switching and gas estimation.
* **Transaction Monitoring:** Real-time feedback for "Pending," "Success," and "Reverted" states.

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

Distributed under the MIT License.

## 🙌 Acknowledgments

* **Cyfrin Updraft:** For foundational Web3 architectural insights.
* **Wagmi/Viem Team:** For best-in-class React hooks and utilities.
```
