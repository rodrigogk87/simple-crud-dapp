const Crud = artifacts.require('Crud');


contract('Crud', () => {
    let crud = null;
    before( async () => {
        crud = await Crud.deployed();
    });

    it('should create new user', async () => {
        await crud.create('rodrigo');
        const user = await crud.read(0);
        const users = await crud.getUsers();
        assert(users.length === 1,'la cantidad de usuarios debe ser 1');
        assert(user.name === 'rodrigo','el nombre debe ser rodrigo');
    });

    it('should update existing user', async () => {
        await crud.create('rodrigo');
        const user = await crud.read(0);
        await crud.update(0,"rodrago");
        assert(user.name,"rodrago")
    });

    it('should delete existing user', async () => {
        await crud.create('rodrigo');
        await crud.destroy(0);
        try{
            const user = await crud.read(0);
        }
        catch(e){
            assert(e.message.includes('User does not exist'));
            return;
        }
        //should not reach here
        assert(false);

    });

});