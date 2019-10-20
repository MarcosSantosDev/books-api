const defaultBooks = {
    id: 1,
    name: 'Default Book'
};

describe('Routes books', () => {

    describe('route GET /books', () => {
        it('should return list of books', done => {
            request
            .get('/books')
            .end((error, response) => {
                expect(response.body[0].id).to.be.eql(defaultBooks.id);
                expect(response.body[0].name).to.be.eql(defaultBooks.name);

                done(error);
            });
        });
    });
});