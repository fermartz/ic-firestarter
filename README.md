<img src="https://github.com/ferMartz/ic-firestarter/blob/main/frontend/assets/ic-firestarter.png" />

# IC Firestarter

Modern starter and mini playground for the Internet Computer powered by [Create IC APP](https://github.com/MioQuispe/create-ic-app), [ViteJS](https://vitejs.dev/), [ReactJS](https://reactjs.org/), & [Material UI](https://tailwindcss.com/)

## Requirements

- Install the following version of the DFINITY Canister SDK

```
DFX_VERSION=0.8.1 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
```

- NodeJS >=16.0.0

## Get Started

With Git:

```
git clone https://github.com/ferMartz/ic-firestarter.git
```

With NPM:

```
cd ic-firestarter
npm install
```

Start the backend

```
dfx start --background
dfx deploy
```

Start the frontend

```
npm run dev
```

Thats it! Play around on your local Internet Computer.
