"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const enumSchema = new mongoose_1.default.Schema({
    clothes: [String],
    toys: [String],
    main: [String],
});
const Enum = mongoose_1.default.model("Enum", enumSchema);
exports.default = Enum;
// enums: 6452654bfc9f011ef64dd9e1
