## Marketplace SDK

Typescript SDK to interact with the anchor marketplace program

### List

```typescript
// import the SDK
import { MarketplaceSDK } from "@jimii/anchor-marketplace"; // todo: publish

// Instantiate  SDK
let sdk = new MarketplaceSDK(provider, connection);

const amount = 2;
const mint = new PublicKey("");
const collectionMint = new PublicKey("");

// list asset
let amount = new BN(1 * decimals);
let ix = await sdk.list(mint, collectionMint, amount);
let tx = new Transaction().add(ix);

// send the transaction
await sendAndConfirmTransaction(provider.connection, tx, [signer]);
```

### Unlist

```typescript
// import the SDK
import { MarketplaceSDK } from "@jimii/anchor-marketplace"; // todo: publish

// Instantiate  SDK
let sdk = new MarketplaceSDK(provider, connection);

// unlist
const mint = new PublicKey("");
let ix = await sdk.unlist(mint);
let tx = new Transaction().add(ix);

// send the transaction
await sendAndConfirmTransaction(provider.connection, tx, [userKeypair]);
```
