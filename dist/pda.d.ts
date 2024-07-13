import { PublicKey } from "@solana/web3.js";
/**
 * Derive the marketplace account address.
 *
 * @param {string} name - name of the marketplace.
 * @returns {PublicKey} The address of the derived account.
 */
export declare function findMarketplaceAddress(name: string): PublicKey;
/**
 * Derive the rewards mint account address.
 *
 * @param {string} name - name of the marketplace.
 * @returns {PublicKey} The address of the derived account.
 */
export declare function findRewardsMintAddress(name: string): PublicKey;
/**
 * Derive the listing account address.
 *
 * @param {PublicKey} mint - mint address.
 * @param {string} name - name of the marketplace.
 * @returns {PublicKey} The address of the derived account.
 */
export declare function findListingAddress(mint: PublicKey, name: string): PublicKey;
/**
 * Derive the vanity treasury account address.
 *
 * @param {string} name - name of the marketplace.
 * @returns {PublicKey} The address of the derived account.
 */
export declare function findTreasuryAddress(name: string): PublicKey;
export declare const findMetadataAddress: (mint: PublicKey) => PublicKey;
export declare const findMasterEditionAddress: (mint: PublicKey) => PublicKey;
