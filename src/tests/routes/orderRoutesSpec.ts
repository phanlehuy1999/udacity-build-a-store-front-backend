import supertest from 'supertest';
import app from '../../server';
import { createUserAuthenToken } from '../../utils';
import {UserMapping} from "../../models/user";
import {ProductMapping} from "../../models/product";

const request = supertest(app)
const token: string = createUserAuthenToken({username: 'username', password: 'password'});

const userMapping = new UserMapping();
const productMapping = new ProductMapping();

describe('Order routes: ', () => {
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
        productMapping.delete(3);
        userMapping.delete(3);
    });

    it('should return a new order after it is created', () => {
        const data = {
            user_id: 3,
            status: false,
            order_products: [{ product_id: 1, quantity: 1 }]
        }
        request
            .post('/api/orders/create')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should show all orders', () => {
        request
            .get('/api/orders')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should show an order with given id', () => {
        request
            .get('/api/orders/2')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should update an order with given id', () => {
        const data = {
            user_id: 3,
            status: true,
        }
        request
            .put('/api/orders/2')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should show all orders with given user_id', () => {
        request
            .get('/api/orders/user/3')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should delete an order with given id', () => {
        request
            .delete('/api/orders/2')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    });
})