import { PublicKey, SystemProgram } from "@solana/web3.js";
import { ANCHOR_MARKETPLACE_ID, METADATA_PROGRAM_ID } from "./constants";

/**
 * Derive the marketplace account address.
 *
 * @param {string} name - name of the marketplace.
 * @returns {PublicKey} The address of the derived account.
 */
export function findMarketplaceAddress(name: string): PublicKey {
	const [marketplace] = PublicKey.findProgramAddressSync(
		[Buffer.from("marketplace"), Buffer.from(name)],
		ANCHOR_MARKETPLACE_ID
	);

	return marketplace;
}

/**
 * Derive the rewards mint account address.
 *
 * @param {string} name - name of the marketplace.
 * @returns {PublicKey} The address of the derived account.
 */
export function findRewardsMintAddress(name: string): PublicKey {
	const [rewards] = PublicKey.findProgramAddressSync(
		[Buffer.from("rewards"), findMarketplaceAddress(name).toBuffer()],
		ANCHOR_MARKETPLACE_ID
	);

	return rewards;
}

/**
 * Derive the listing account address.
 *
 * @param {PublicKey} mint - mint address.
 * @param {string} name - name of the marketplace.
 * @returns {PublicKey} The address of the derived account.
 */
export function findListingAddress(mint: PublicKey, name: string): PublicKey {
	const [listing] = PublicKey.findProgramAddressSync(
		[findMarketplaceAddress(name).toBuffer(), mint.toBuffer()],
		ANCHOR_MARKETPLACE_ID
	);

	return listing;
}

/**
 * Derive the vanity treasury account address.
 *
 * @param {string} name - name of the marketplace.
 * @returns {PublicKey} The address of the derived account.
 */
export function findTreasuryAddress(name: string): PublicKey {
	const [treasury] = PublicKey.findProgramAddressSync(
		[Buffer.from("treasury"), findMarketplaceAddress(name).toBuffer()],
		ANCHOR_MARKETPLACE_ID
	);

	return treasury;
}

// token metadata
export const findMetadataAddress = (mint: PublicKey): PublicKey => {
	return PublicKey.findProgramAddressSync(
		[
			Buffer.from("metadata", "utf8"),
			METADATA_PROGRAM_ID.toBuffer(),
			mint.toBuffer(),
		],
		METADATA_PROGRAM_ID
	)[0];
};

export const findMasterEditionAddress = (mint: PublicKey): PublicKey => {
	return PublicKey.findProgramAddressSync(
		[
			Buffer.from("metadata", "utf8"),
			METADATA_PROGRAM_ID.toBuffer(),
			mint.toBuffer(),
			Buffer.from("edition", "utf8"),
		],
		METADATA_PROGRAM_ID
	)[0];
};
