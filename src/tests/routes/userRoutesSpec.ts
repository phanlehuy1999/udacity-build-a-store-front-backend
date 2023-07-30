import supertest from 'supertest';
import app from '../../server';
import { createUserAuthenToken } from '../../utils';

const request = supertest(app)
const token: string = createUserAuthenToken({username: 'username', password: 'password'})

describe('User routes: ', () => {
    it('should return a new user after it is created', () => {
        const data = {
            username: 'username',
            password: 'password',
            firstname: 'firstname',
            lastname: 'lastname'
        }
        request
            .post('/api/users/create')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should show all users', () => {
        request
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should show an user with given id', () => {
        request
            .get('/api/users/4')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should update an user with given id', () => {
        const data = {
            firstname: 'firstnameUpdated',
            lastname: 'lastnameUpdated',
        }
        request
            .put('/api/users/4')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should authenticate an user successfully', () => {
        const data = {
            username: 'username',
            password: 'password',
        }
        request
            .put('/api/users/authenticate')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should delete an user with given id', () => {
        request
            .delete('/api/users/4')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    });
})