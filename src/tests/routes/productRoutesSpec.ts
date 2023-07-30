import supertest from 'supertest';
import app from '../../server';
import { createUserAuthenToken } from '../../utils';

const request = supertest(app)
const token: string = createUserAuthenToken({username: 'username', password: 'password'})

describe('Product routes: ', () => {
    it('should return a new product after it is created', () => {
        const data = {
            name: 'Product',
            price: 15,
        }
        request
            .post('/api/products/create')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should show all products', () => {
        request
            .get('/api/products')
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should show a product with given id', () => {
        request
            .get('/api/products/4')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should update a product with given id', () => {
        const data = {
            name: 'ProductUpdated',
            price: 20,
        }
        request
            .put('/api/products/4')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should delete a product with given id', () => {
        request
            .delete('/api/products/4')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    });
})