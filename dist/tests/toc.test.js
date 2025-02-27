"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const internals_1 = require("@prisma/internals");
const toc_1 = __importDefault(require("../generator/toc"));
const transformDMMF_1 = __importDefault(require("../generator/transformDMMF"));
const datamodel = /* Prisma */ `
  model Post {
    id String @id @default(cuid())
    name String
    @@index([name])
  }

  model User {
    userId String @id @default(cuid())
    something String
  }
`;
describe('TOC', () => {
    it('renders TOC Subheader correctly', async () => {
        const dmmf = await (0, internals_1.getDMMF)({ datamodel });
        const toc = new toc_1.default((0, transformDMMF_1.default)(dmmf, {
            includeRelationFields: true,
        }));
        const spy = jest.spyOn(toc, 'getTOCSubHeaderHTML');
        // trigger the function
        toc.toHTML();
        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenCalledWith('Post');
        expect(spy).toHaveBeenCalledWith('User');
        expect(toc.getTOCSubHeaderHTML('Post')).toMatchSnapshot();
    });
    it('renders TOC subfield correctly', async () => {
        const dmmf = await (0, internals_1.getDMMF)({ datamodel });
        const toc = new toc_1.default((0, transformDMMF_1.default)(dmmf, {
            includeRelationFields: true,
        }));
        const spy = jest.spyOn(toc, 'getSubFieldHTML');
        toc.toHTML();
        expect(spy).toHaveBeenCalled();
        // every case of model name and one case of others
        expect(spy).toHaveBeenCalledWith('model', 'Post', 'id');
        expect(spy).toHaveBeenCalledWith('model', 'Post', 'name');
        expect(spy).toHaveBeenCalledWith('model', 'User', 'userId');
        expect(spy).toHaveBeenCalledWith('model', 'User', 'something');
        expect(spy).toHaveBeenCalledWith('model', 'User', 'findUnique');
        expect(spy).toHaveBeenCalledWith('type', 'inputType', 'UserWhereInput');
        expect(spy).toHaveBeenCalledWith('type', 'outputType', 'User');
        expect(toc.getSubFieldHTML('model', 'Post', 'userId')).toMatchSnapshot();
    });
    it('renders on toHTML', async () => {
        const dmmf = await (0, internals_1.getDMMF)({ datamodel });
        const toc = new toc_1.default((0, transformDMMF_1.default)(dmmf, {
            includeRelationFields: true,
        }));
        const subheaderSpy = jest.spyOn(toc, 'getTOCSubHeaderHTML');
        const subfieldSpy = jest.spyOn(toc, 'getSubFieldHTML');
        const result = toc.toHTML();
        // one case of each just to make sure code calls them
        expect(subheaderSpy).toHaveBeenCalledWith('Post');
        expect(subfieldSpy).toHaveBeenCalledWith('model', 'Post', 'id');
        expect(result).toMatchSnapshot();
    });
});
//# sourceMappingURL=toc.test.js.map