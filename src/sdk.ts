import { BN, Program, Provider } from "@coral-xyz/anchor";
import {
	ASSOCIATED_TOKEN_PROGRAM_ID,
	getAssociatedTokenAddressSync,
	TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
	Connection,
	PublicKey,
	SystemProgram,
	TransactionInstruction,
} from "@solana/web3.js";

import { ANCHOR_MARKETPLACE_ID, MARKETPLACE_NAME, METADATA_PROGRAM_ID } from "./constants";
import {
	AnchorMarketplace,
	IDL as anchorMarketplaceIDL,
} from "./idl/anchor_marketplace";
import {
	findListingAddress,
	findMarketplaceAddress,
	findMasterEditionAddress,
	findMetadataAddress,
	findRewardsMintAddress,
	findTreasuryAddress,
} from "./pda";

/**
 * Base class for interacting with the token staking contract.
 * @class
 */
export class MarketplaceSDK {
	/** anchor provider*/
	private provider!: Provider;
	/** anchor program  */
	private program: Program<AnchorMarketplace>;
	/** RPC Connection Object */
	public readonly connection: Connection;

	constructor(provider: Provider, connection: Connection) {
		this.provider = provider;
		this.connection = connection;

		this.program = new Program<AnchorMarketplace>(
			anchorMarketplaceIDL,
			ANCHOR_MARKETPLACE_ID,
			provider
		);
	}

	/**
	 * Initialize marketplace
	 *
	 * @param {number} fee - marketplace fee.
	 * @param {string} name - name of the marketplace. defaults to `MARKETPLACE_NAME = "NOT TENSOR!!!"`.
	 * @returns {Promise<TransactionInstruction>} a promise that resolves to a web3.js Instruction.
	 * @throws {Error} throw an error if we encounter a failure
	 */
	public async initialize(
		fee: number,
		name: string = MARKETPLACE_NAME
	): Promise<TransactionInstruction> {
		if (!this.provider.publicKey) {
			throw Error("Expected public key not found");
		}

		let ix = await this.program.methods
			.initialize(name, fee)
			.accounts({
				admin: this.provider.publicKey,
				marketplace: findMarketplaceAddress(name),
				rewardsMint: findRewardsMintAddress(name),
				treasury: findTreasuryAddress(name),
				systemProgram: SystemProgram.programId,
				tokenProgram: TOKEN_PROGRAM_ID,
			})
			.instruction();

		return ix;
	}

	/**
	 * list on marketplace
	 *
	 * @param {PublicKey} makerMint - Token mint address.
	 * @param {PublicKey} collectionMint - collection mint address.
	 * @param {BN} price - amount asset is being listed for.
	 * @param {string} name - name of the marketplace.
	 * @returns {Promise<TransactionInstruction>} a promise that resolves to a web3.js Instruction.
	 * @throws {Error} throw an error if we encounter a failure
	 */
	public async list(
		makerMint: PublicKey,
		collectionMint: PublicKey,
		price: BN,
		name: string = MARKETPLACE_NAME
	): Promise<TransactionInstruction> {
		if (!this.provider.publicKey) {
			throw Error("Expected public key not found");
		}

		const listing = findListingAddress(makerMint, name);

		let ix = await this.program.methods
			.list(price)
			.accounts({
				maker: this.provider.publicKey,
				marketplace: findMarketplaceAddress(name),
				makerMint,
				collectionMint,
				makerAta: getAssociatedTokenAddressSync(
					makerMint,
					this.provider.publicKey
				),
				vault: getAssociatedTokenAddressSync(makerMint, listing, true),
				listing,
				metadata: findMetadataAddress(makerMint),
				masterEdition: findMasterEditionAddress(makerMint),
				metadataProgram: METADATA_PROGRAM_ID,
				associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
				systemProgram: SystemProgram.programId,
				tokenProgram: TOKEN_PROGRAM_ID,
			})
			.instruction();

		return ix;
	}

	/**
	 * delist asset from marketplace
	 *
	 * @param {PublicKey} makerMint - Token mint address.
	 * @param {string} name - name of the marketplace.
	 * @returns {Promise<TransactionInstruction>} a promise that resolves to a web3.js Instruction.
	 * @throws {Error} throw an error if we encounter a failure
	 */
	public async delist(
		makerMint: PublicKey,
		name: string = MARKETPLACE_NAME
	): Promise<TransactionInstruction> {
		if (!this.provider.publicKey) {
			throw Error("Expected public key not found");
		}

		const listing = findListingAddress(makerMint, name);

		let ix = await this.program.methods
			.delist()
			.accounts({
				maker: this.provider.publicKey,
				marketplace: findMarketplaceAddress(name),
				makerMint,
				makerAta: getAssociatedTokenAddressSync(
					makerMint,
					this.provider.publicKey
				),
				listing,
				vault: getAssociatedTokenAddressSync(makerMint, listing, true),
				systemProgram: SystemProgram.programId,
				tokenProgram: TOKEN_PROGRAM_ID,
			})
			.instruction();

		return ix;
	}

	/**
	 * purchase a listed asset on the marketplace
	 *
	 * @param {PublicKey} makerMint - Token mint address.
	 * @param {PublicKey} collectionMint - collection mint address.
	 * @param {PublicKey} maker - creator of the listing.
	 * @param {string} name - name of the marketplace.
	 * @returns {Promise<TransactionInstruction>} a promise that resolves to a web3.js Instruction.
	 * @throws {Error} throw an error if we encounter a failure
	 */
	public async purchase(
		makerMint: PublicKey,
		maker: PublicKey,
		name: string = MARKETPLACE_NAME
	): Promise<TransactionInstruction> {
		if (!this.provider.publicKey) {
			throw Error("Expected public key not found");
		}

		const listing = findListingAddress(makerMint, name);

		let ix = await this.program.methods
			.purchase()
			.accounts({
				taker: this.provider.publicKey,
				maker,
				makerMint,
				marketplace: findMarketplaceAddress(name),
				takerAta: getAssociatedTokenAddressSync(
					makerMint,
					this.provider.publicKey
				),
				vault: getAssociatedTokenAddressSync(makerMint, listing, true),
				rewards: findRewardsMintAddress(name),
				listing,
				treasury: findTreasuryAddress(name),
				associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
				systemProgram: SystemProgram.programId,
				tokenProgram: TOKEN_PROGRAM_ID,
			})
			.instruction();

		return ix;
	}
}
