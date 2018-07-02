"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var NPXObject_1 = require("./NPXObject");
var Section = (function (_super) {
    __extends(Section, _super);
    function Section(title, sections, notes, internalRef) {
        if (sections === void 0) { sections = []; }
        if (notes === void 0) { notes = []; }
        var _this = _super.call(this, title, internalRef) || this;
        _this.title = title;
        _this.sections = sections;
        _this.notes = notes;
        return _this;
    }
    Section.prototype.addSection = function (section) {
        var parent = this.clone({
            sections: __spread(this.sections, [
                section
            ])
        });
        section.parent = parent;
        return parent;
    };
    Section.prototype.addNote = function (note) {
        var parent = this.clone({
            notes: __spread(this.notes, [
                note
            ])
        });
        note.parent = parent;
        return parent;
    };
    Section.prototype.search = function (query) {
        var subSectionNotes = this.sections
            .map(function (s) { return s.search(query); })
            .reduce(function (acc, val) { return acc.concat(val); }, []);
        return __spread(this.notes.filter(function (n) { return n.search(query).length > 0; }), subSectionNotes);
    };
    Section.prototype.toXmlObject = function () {
        return {
            section: {
                $: {
                    title: this.title
                },
                section: this.sections.map(function (s) { return s.toXmlObject().section; }),
                note: this.notes.map(function (n) { return n.toXmlObject().note; })
            }
        };
    };
    Section.prototype.toMarkdown = function (assets) {
        return __awaiter(this, void 0, void 0, function () {
            var subSectionNotes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Promise.all(this.sections.map(function (s) { return s.toMarkdown(assets); }))];
                    case 1:
                        subSectionNotes = (_a.sent()).reduce(function (acc, val) { return acc.concat(val); }, []);
                        return [4, Promise.all(__spread(this.notes.map(function (n) { return n.toMarkdown(assets); })))];
                    case 2: return [2, __spread.apply(void 0, [_a.sent(),
                            subSectionNotes])];
                }
            });
        });
    };
    Section.prototype.clone = function (opts) {
        if (opts === void 0) { opts = {}; }
        return new Section(opts.title || this.title, opts.sections || this.sections, opts.notes || this.notes, opts.internalRef || this.internalRef);
    };
    return Section;
}(NPXObject_1.NPXObject));
exports.default = Section;
