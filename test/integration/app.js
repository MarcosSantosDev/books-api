const app = require('../../app');

describe('Routes books', () => {
    const Books = app.datasource.models.Books;
    const defaultBooks = {
        id: 1,
        name: 'Default Book'
    };

    beforeEach(done => {
        Books
            .destroy({ where: {} })
            .then(() => Books.create(defaultBooks))
            .then(() => done());
    });

    describe('route GET /books', () => {
        it('should return list of books', done => {
            request
                .get('/books')
                .end((error, res) => {
                    expect(res.body[0].id).to.be.eql(defaultBooks.id);
                    expect(res.body[0].name).to.be.eql(defaultBooks.name);

                    done(error);
                });
        });
    });

    describe('route GET /books/{id}', () => {
        it('should return a book', done => {
            request
                .get('/books/1')
                .end((error, res) => {
                    expect(res.body.id).to.be.eql(defaultBooks.id);
                    expect(res.body.name).to.be.eql(defaultBooks.name);

                    done(error);
                });
        });
    });

    describe('route POST /books', () => {
        it('should create a book', done => {
            const newBook = {
                id: 2,
                name: 'New Book'
            };

            request
                .post('/books')
                .send(newBook)
                .end((error, res) => {
                    expect(res.body.id).to.be.eql(newBook.id);
                    expect(res.body.name).to.be.eql(newBook.name);

                    done(error);
                });
        });
    });

    describe('route PUT /books/{id}', () => {
        it('should update a book', done => {
            const updateBook = {
                id: 1,
                name: 'updated book'
            };

            request
                .put('/books/1')
                .send(updateBook)
                .end((error, res) => {
                    expect(res.body).deep.eql([1]);

                    done(error);
                });
        });
    });

    describe("route DELETE a book /books/{id}", () => {
        it("should delete a book", done => {

            request
            .delete('/books/1')
            .end((error, res) => {
                expect(res.statusCode).to.be.eql(204);
                done(error);
            })
        });
    })
});