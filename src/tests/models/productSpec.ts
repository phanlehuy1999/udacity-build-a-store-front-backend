import { ProductMapping } from '../../models/product';

const productMapping = new ProductMapping();

describe("Product Model", () => {
    it('should have an index method', () => {
        expect(productMapping.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(productMapping.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(productMapping.create).toBeDefined();
    });

    it('should have a update method', () => {
        expect(productMapping.edit).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(productMapping.delete).toBeDefined();
    });

    it('create method should add a product', async () => {
        const result = await productMapping.create({
            name: 'Product',
            price: 15
        });
        expect(result).toEqual({
            id: 2,
            name: "Product",
            price: 15
        });
    });

    it('index method should return a list of product', async () => {
        const result = await productMapping.index();
        expect(result).toEqual([{
            id: 2,
            name: "Product",
            price: 15
        }]);
    });

    it('show method should return the correct product', async () => {
        const result = await productMapping.show(2);
        expect(result).toEqual({
            id: 2,
            name: "Product",
            price: 15
        });
    });

    it('edit method should update the correct product', async () => {
        const result = await productMapping.edit({
            id: 2,
            name: 'ProductUpdated',
            price: 16
        });
        expect(result).toEqual({
            id: 2,
            name: "ProductUpdated",
            price: 16
        });
    });

    it('delete method should remove the product', async () => {
        await productMapping.delete(2);
        const result = await productMapping.index()
        expect(result).toEqual([]);
    });
});