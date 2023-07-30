import { OrderMapping } from '../../models/order';
import {UserMapping} from "../../models/user";
import {ProductMapping} from "../../models/product";

const orderMapping = new OrderMapping();
const userMapping = new UserMapping();
const productMapping = new ProductMapping();

describe("Order Model", () => {
    it('should have an index method', () => {
        expect(orderMapping.index).toBeDefined();
    });

    it('should have a show by userId method', () => {
        expect(orderMapping.showByUserId).toBeDefined();
    });

    it('should have a create method', () => {
        expect(orderMapping.create).toBeDefined();
    });

    it('should have a edit method', () => {
        expect(orderMapping.edit).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(orderMapping.delete).toBeDefined();
    });

    beforeAll(() => {
        productMapping.create({
            name: 'Product',
            price: 20
        });
        userMapping.create({
            username: 'username',
            password: 'password',
            firstname: 'firstname',
            lastname: 'lastname'
        })
    });

    afterAll(() => {
        productMapping.delete(1);
        userMapping.delete(1);
    })

    it('create method should add a order', async () => {
        const result = await orderMapping.create({
            order_products: [{ product_id: 1, quantity: 1 }],
            status: false,
            user_id: 1
        });
        expect(result).toEqual({
            id: 1,
            order_products: [{ product_id: 1, quantity: 1 }],
            status: false,
            user_id: 1
        });
    });

    it('index method should return a list of order', async () => {
        const result = await orderMapping.index();
        expect(result).toEqual([{
            id: 1,
            order_products: [{ product_id: 1, quantity: 1 }],
            status: false,
            user_id: 1
        }]);
    });

    it('show method should return the correct order by userId', async () => {
        const result = await orderMapping.showByUserId(1);
        expect(result).toEqual([{
            id: 1,
            order_products: [{ product_id: 1, quantity: 1 }],
            status: false,
            user_id: 1
        }]);
    });

    it('edit method should update the correct order', async () => {
        const result = await orderMapping.edit({
            id: 1,
            user_id: 1,
            status: true
        });
        expect(result).toEqual({
            id: 1,
            order_products: [{ product_id: 1, quantity: 1 }],
            status: true,
            user_id: 1
        });
    });

    it('delete method should remove the order', async () => {
        await orderMapping.delete(1);
        const result = await orderMapping.index()

        expect(result).toEqual([]);
    });
});