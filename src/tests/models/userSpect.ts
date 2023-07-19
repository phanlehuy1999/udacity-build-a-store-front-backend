import { UserMapping } from '../../models/user';

const userMapping = new UserMapping();

describe("User Model", () => {
    it('should have an index method', () => {
        expect(userMapping.index).toBeDefined();
    });

    it('should have a show by userId method', () => {
        expect(userMapping.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(userMapping.create).toBeDefined();
    });

    it('should have a edit method', () => {
        expect(userMapping.edit).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(userMapping.delete).toBeDefined();
    });

    it('should have a authenticate method', () => {
        expect(userMapping.authenticate).toBeDefined();
    });

    it('create method should add a user', async () => {
        const result = await userMapping.create({
            username: 'username',
            password: 'password',
            firstname: 'firstname',
            lastname: 'lastname'
        });
        expect(result).toEqual({
            id: 1,
            username: 'username',
            password: 'password',
            firstname: 'firstname',
            lastname: 'lastname'
        });
    });

    it('index method should return a list of user', async () => {
        const result = await userMapping.index();
        expect(result).toEqual([{
            id: 1,
            username: 'username',
            password: 'password',
            firstname: 'firstname',
            lastname: 'lastname'
        }]);
    });

    it('show method should return the correct user', async () => {
        const result = await userMapping.show(1);
        expect(result).toEqual({
            id: 1,
            username: 'username',
            password: 'password',
            firstname: 'firstname',
            lastname: 'lastname'
        });
    });

    // it('delete method should remove the user', async () => {
    //     await userMapping.delete(1);
    //     const result = await userMapping.index()
    //
    //     expect(result).toEqual([]);
    // });
});