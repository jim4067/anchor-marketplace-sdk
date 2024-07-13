"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMasterEditionAddress = exports.findMetadataAddress = void 0;
exports.findMarketplaceAddress = findMarketplaceAddress;
exports.findRewardsMintAddress = findRewardsMintAddress;
exports.findListingAddress = findListingAddress;
exports.findTreasuryAddress = findTreasuryAddress;
var web3_js_1 = require("@solana/web3.js");
var constants_1 = require("./constants");
/**
 * Derive the marketplace account address.
 *
 * @param {string} name - name of the marketplace.
 * @returns {PublicKey} The address of the derived account.
 */
function findMarketplaceAddress(name) {
    var marketplace = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("marketplace"), Buffer.from(name)], constants_1.ANCHOR_MARKETPLACE_ID)[0];
    return marketplace;
}
/**
 * Derive the rewards mint account address.
 *
 * @param {string} name - name of the marketplace.
 * @returns {PublicKey} The address of the derived account.
 */
function findRewardsMintAddress(name) {
    var rewards = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("rewards"), findMarketplaceAddress(name).toBuffer()], constants_1.ANCHOR_MARKETPLACE_ID)[0];
    return rewards;
}
/**
 * Derive the listing account address.
 *
 * @param {PublicKey} mint - mint address.
 * @param {string} name - name of the marketplace.
 * @returns {PublicKey} The address of the derived account.
 */
function findListingAddress(mint, name) {
    var listing = web3_js_1.PublicKey.findProgramAddressSync([findMarketplaceAddress(name).toBuffer(), mint.toBuffer()], constants_1.ANCHOR_MARKETPLACE_ID)[0];
    return listing;
}
/**
 * Derive the vanity treasury account address.
 *
 * @param {string} name - name of the marketplace.
 * @returns {PublicKey} The address of the derived account.
 */
function findTreasuryAddress(name) {
    var treasury = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("treasury"), findMarketplaceAddress(name).toBuffer()], constants_1.ANCHOR_MARKETPLACE_ID)[0];
    return treasury;
}
// token metadata
var findMetadataAddress = function (mint) {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from("metadata", "utf8"),
        constants_1.METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
    ], constants_1.METADATA_PROGRAM_ID)[0];
};
exports.findMetadataAddress = findMetadataAddress;
var findMasterEditionAddress = function (mint) {
    return web3_js_1.PublicKey.findProgramAddressSync([
        Buffer.from("metadata", "utf8"),
        constants_1.METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
        Buffer.from("edition", "utf8"),
    ], constants_1.METADATA_PROGRAM_ID)[0];
};
exports.findMasterEditionAddress = findMasterEditionAddress;
