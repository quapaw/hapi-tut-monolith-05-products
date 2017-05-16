'use strict';


const Boom = require('boom');


class ProductRoutes {
    getAll(request, reply) {

        const db = request.mongo.db;

        db.collection('products').find({}, (err, doc) => {

            if (err) {
                return reply(Boom.wrap(err, 'Internal error'));
            }

            if (!doc) {
                return reply(Boom.notFound());
            }

            reply(doc.toArray());   //a find will return a cursor and we need to convert it to an array
        });

    };

    getByID(request, reply) {

        const db = request.mongo.db;

        db.collection('products').findOne({ id: request.params.id }, (err, doc) => {

            if (err) {
                return reply(Boom.wrap(err, 'Internal error'));
            }

            if (!doc) {
                return reply(Boom.notFound());
            }

            reply(doc);
        });
    };

    addProduct(request, reply) {

        const db      = request.mongo.db;
        const payload = request.payload;

        db.collection('products').insertOne(payload, (err, doc) => {

            if (err) {
                return reply(Boom.wrap(err, 'Internal error'));
            }

            return reply(doc);
        });
    };
}
module.exports = ProductRoutes;
