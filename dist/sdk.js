"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketplaceSDK = void 0;
var anchor_1 = require("@coral-xyz/anchor");
var spl_token_1 = require("@solana/spl-token");
var web3_js_1 = require("@solana/web3.js");
var constants_1 = require("./constants");
var anchor_marketplace_1 = require("./idl/anchor_marketplace");
var pda_1 = require("./pda");
/**
 * Base class for interacting with the token staking contract.
 * @class
 */
var MarketplaceSDK = /** @class */ (function () {
    function MarketplaceSDK(provider, connection) {
        this.provider = provider;
        this.connection = connection;
        this.program = new anchor_1.Program(anchor_marketplace_1.IDL, constants_1.ANCHOR_MARKETPLACE_ID, provider);
    }
    /**
     * Initialize marketplace
     *
     * @param {number} fee - marketplace fee.
     * @param {string} name - name of the marketplace. defaults to `MARKETPLACE_NAME = "NOT TENSOR!!!"`.
     * @returns {Promise<TransactionInstruction>} a promise that resolves to a web3.js Instruction.
     * @throws {Error} throw an error if we encounter a failure
     */
    MarketplaceSDK.prototype.initialize = function (fee_1) {
        return __awaiter(this, arguments, void 0, function (fee, name) {
            var ix;
            if (name === void 0) { name = constants_1.MARKETPLACE_NAME; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.provider.publicKey) {
                            throw Error("Expected public key not found");
                        }
                        return [4 /*yield*/, this.program.methods
                                .initialize(name, fee)
                                .accounts({
                                admin: this.provider.publicKey,
                                marketplace: (0, pda_1.findMarketplaceAddress)(name),
                                rewardsMint: (0, pda_1.findRewardsMintAddress)(name),
                                treasury: (0, pda_1.findTreasuryAddress)(name),
                                systemProgram: web3_js_1.SystemProgram.programId,
                                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                            })
                                .instruction()];
                    case 1:
                        ix = _a.sent();
                        return [2 /*return*/, ix];
                }
            });
        });
    };
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
    MarketplaceSDK.prototype.list = function (makerMint_1, collectionMint_1, price_1) {
        return __awaiter(this, arguments, void 0, function (makerMint, collectionMint, price, name) {
            var listing, ix;
            if (name === void 0) { name = constants_1.MARKETPLACE_NAME; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.provider.publicKey) {
                            throw Error("Expected public key not found");
                        }
                        listing = (0, pda_1.findListingAddress)(makerMint, name);
                        return [4 /*yield*/, this.program.methods
                                .list(price)
                                .accounts({
                                maker: this.provider.publicKey,
                                marketplace: (0, pda_1.findMarketplaceAddress)(name),
                                makerMint: makerMint,
                                collectionMint: collectionMint,
                                makerAta: (0, spl_token_1.getAssociatedTokenAddressSync)(makerMint, this.provider.publicKey),
                                vault: (0, spl_token_1.getAssociatedTokenAddressSync)(makerMint, listing, true),
                                listing: listing,
                                metadata: (0, pda_1.findMetadataAddress)(makerMint),
                                masterEdition: (0, pda_1.findMasterEditionAddress)(makerMint),
                                metadataProgram: constants_1.METADATA_PROGRAM_ID,
                                associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
                                systemProgram: web3_js_1.SystemProgram.programId,
                                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                            })
                                .instruction()];
                    case 1:
                        ix = _a.sent();
                        return [2 /*return*/, ix];
                }
            });
        });
    };
    /**
     * delist asset from marketplace
     *
     * @param {PublicKey} makerMint - Token mint address.
     * @param {string} name - name of the marketplace.
     * @returns {Promise<TransactionInstruction>} a promise that resolves to a web3.js Instruction.
     * @throws {Error} throw an error if we encounter a failure
     */
    MarketplaceSDK.prototype.delist = function (makerMint_1) {
        return __awaiter(this, arguments, void 0, function (makerMint, name) {
            var listing, ix;
            if (name === void 0) { name = constants_1.MARKETPLACE_NAME; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.provider.publicKey) {
                            throw Error("Expected public key not found");
                        }
                        listing = (0, pda_1.findListingAddress)(makerMint, name);
                        return [4 /*yield*/, this.program.methods
                                .delist()
                                .accounts({
                                maker: this.provider.publicKey,
                                marketplace: (0, pda_1.findMarketplaceAddress)(name),
                                makerMint: makerMint,
                                makerAta: (0, spl_token_1.getAssociatedTokenAddressSync)(makerMint, this.provider.publicKey),
                                listing: listing,
                                vault: (0, spl_token_1.getAssociatedTokenAddressSync)(makerMint, listing, true),
                                systemProgram: web3_js_1.SystemProgram.programId,
                                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                            })
                                .instruction()];
                    case 1:
                        ix = _a.sent();
                        return [2 /*return*/, ix];
                }
            });
        });
    };
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
    MarketplaceSDK.prototype.purchase = function (makerMint_1, maker_1) {
        return __awaiter(this, arguments, void 0, function (makerMint, maker, name) {
            var listing, ix;
            if (name === void 0) { name = constants_1.MARKETPLACE_NAME; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.provider.publicKey) {
                            throw Error("Expected public key not found");
                        }
                        listing = (0, pda_1.findListingAddress)(makerMint, name);
                        return [4 /*yield*/, this.program.methods
                                .purchase()
                                .accounts({
                                taker: this.provider.publicKey,
                                maker: maker,
                                makerMint: makerMint,
                                marketplace: (0, pda_1.findMarketplaceAddress)(name),
                                takerAta: (0, spl_token_1.getAssociatedTokenAddressSync)(makerMint, this.provider.publicKey),
                                vault: (0, spl_token_1.getAssociatedTokenAddressSync)(makerMint, listing, true),
                                rewards: (0, pda_1.findRewardsMintAddress)(name),
                                listing: listing,
                                treasury: (0, pda_1.findTreasuryAddress)(name),
                                associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
                                systemProgram: web3_js_1.SystemProgram.programId,
                                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                            })
                                .instruction()];
                    case 1:
                        ix = _a.sent();
                        return [2 /*return*/, ix];
                }
            });
        });
    };
    return MarketplaceSDK;
}());
exports.MarketplaceSDK = MarketplaceSDK;
