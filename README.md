# Multichain wallet
> Wallet solution powered by LI.FI and Reown
> Live demo link [_here_](https://multichain-wallet-cyan.vercel.app/).

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Frontend Architecture](#frontend-architecture)
* [Areas for Improvement](#areas-for-improvement)


## General Information
- This project showcasing key features of LI.FI SDK


## Technologies Used
- React.js
- LI.FI SDK
- Reown AppKit
- TanStackQuery
- Wagmi
- tests written with jest using vitest


## Features
List the ready features here:
- Shows list of existing tokens in Ethereum, Solana and Bitcoin exosystem
- Read token balances
- Mobile friendly!
- Set of unit-tests to cover connection and render functionality


## Screenshots
![Example screenshot](./preview.png)


## Setup
Make sure that you've Node > 20

`pnpm install`

Create `.env` with `VITE_APPKIT_PROJECT_ID=xxxxxxxxxxxxxxxxxxx` setting your `projectId`. You can get it on the official Reown [_dashboard_](https://cloud.reown.com/app/).

## Frontend Architecture

1. Frameworks and Libraries
The application build with vite React - a flexible foundation allows maintain modular system and expand further functionality for next updates.

2. Component-Based Architecture
The system uses [_MUI_](https://mui.com/material-ui/getting-started/) as main design solution. MUI supports great accessibility and allows developers to build own UI library based on existing components.

3. State Management
Effective state management is crucial for smooth user interactions. Existing requirements enables to approach with Context API and [_TanStack Query_](https://tanstack.com/query/v4/docs/framework/react/overview) across different components, ensuring everything is synchronized.

4. API Integration:
Wallet integration is powered by [_LI.FI SDK_](https://docs.li.fi/integrate-li.fi-sdk/li.fi-sdk-overview) and [_LI.FI Wallet Management_](https://docs.li.fi/integrate-li.fi-widget/wallet-management). Wallet connection feature implemented by [_Reown AppKit_](https://docs.reown.com/appkit/overview). Further enhancement steps described in [Areas for Improvement](#areas-for-improvement)


## Areas for Improvement

Future Development Focus:
- The primary emphasis should be on enhancing the wallet connection experience. Appkit might be changed to a custom implemntation, resulting in reduction of bandle size and providing better accounts control.
- UI toolkit implemenation. MUI is good enough for PoC, but should be changed for a custom solution with a11y support. Meantime MUI components might be refactored incapsulating styles to `*.style.ts` files
- Implement wallet interaction within send/swap/bridge features.
- The TokenList component is bottleneck of application performance. Might be enhanced with lazy loading for inifinity scroll.
- Unit tests might cover change wallet edge cases

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
