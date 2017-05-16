'use strict';

const Code            = require('code');
const Lab             = require('lab');
const LabbableServer  = require('../localServer.js');

const expect     = Code.expect;
const lab        = exports.lab = Lab.script();
const test       = lab.test;
const before     = lab.before;
const experiment = lab.experiment;

const Product_abcd  = require('../samples/product_abcd.json');
const Product_abce  = require('../samples/product_abce.json');
const Product_abcf  = require('../samples/product_abcf.json');

let server;

before((done) => {

    LabbableServer.ready( (err, srv) => {

        if (err) {
            return done(err);
        }

        server = srv;

        const db = server.connections[0].server.mongo.db;
        db.collection('products').deleteMany({}, (err, r) => {

            if (err) {
                console.log('error in clearing products collection');
            }

            return done();
        });
    });
});

experiment('Test if Initialized', () => {

    test('Test if server is Initialized', (done) => {

        expect(server).to.exist();
        expect(LabbableServer.isInitialized()).to.equal(true);
        done();
    });
});

experiment('insert base records', () => {

    test('insert rec abcd', (done) => {

        const options = {
            method: 'POST',
            url: '/products',
            payload: Product_abcd
        };

        server.inject(options, (res) => {

            expect(res.statusCode).to.equal(200);
            done();
        });

    });

    test('insert rec abce', (done) => {

        const options = {
            method: 'POST',
            url: '/products',
            payload: Product_abce
        };

        server.inject(options, (res) => {

            expect(res.statusCode).to.equal(200);
            done();
        });

    });

    test('insert rec abcf', (done) => {

        const options = {
            method: 'POST',
            url: '/products',
            payload: Product_abcf
        };

        server.inject(options, (res) => {

            expect(res.statusCode).to.equal(200);
            done();
        });

    });
});
experiment('Positive Tests', () => {

    test('get a single product', (done) => {

        const options = {
            method: 'GET',
            url: '/products/abcd'
        };

        server.inject(options, (res) => {

            expect(res.statusCode).to.equal(200);
            done();
        });
    });

    test('get a no hit product', (done) => {

        const options = {
            method: 'GET',
            url: '/products/999'
        };

        server.inject(options, (res) => {

            expect(res.statusCode).to.equal(404);
            done();
        });
    });

    test('get products', (done) => {

        const options = {
            method: 'GET',
            url: '/products'
        };

        server.inject(options, (res) => {

            expect(res.statusCode).to.equal(200);
            done();
        });
    });
});
