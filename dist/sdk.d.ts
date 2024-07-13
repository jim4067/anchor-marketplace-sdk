import { BN, Provider } from "@coral-xyz/anchor";
import { Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";
/**
 * Base class for interacting with the token staking contract.
 * @class
 */
export declare class MarketplaceSDK {
    /** anchor provider*/
    private provider;
    /** anchor program  */
    private program;
    /** RPC Connection Object */
    readonly connection: Connection;
    constructor(provider: Provider, connection: Connection);
    /**
     * Initialize marketplace
     *
     * @param {number} fee - marketplace fee.
     * @param {string} name - name of the marketplace. defaults to `MARKETPLACE_NAME = "NOT TENSOR!!!"`.
     * @returns {Promise<TransactionInstruction>} a promise that resolves to a web3.js Instruction.
     * @throws {Error} throw an error if we encounter a failure
     */
    initialize(fee: number, name?: string): Promise<TransactionInstruction>;
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
    list(makerMint: PublicKey, collectionMint: PublicKey, price: BN, name?: string): Promise<TransactionInstruction>;
    /**
     * delist asset from marketplace
     *
     * @param {PublicKey} makerMint - Token mint address.
     * @param {string} name - name of the marketplace.
     * @returns {Promise<TransactionInstruction>} a promise that resolves to a web3.js Instruction.
     * @throws {Error} throw an error if we encounter a failure
     */
    delist(makerMint: PublicKey, name?: string): Promise<TransactionInstruction>;
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
    purchase(makerMint: PublicKey, maker: PublicKey, name?: string): Promise<TransactionInstruction>;
}
