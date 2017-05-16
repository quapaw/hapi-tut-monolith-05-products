'use strict';

exports.register = function (server, options, next) {

    const Joi = require('joi');
    const Routes = require('./lib/ProductRoutes');
    const routes = new Routes();

    const PayloadSchema =
        Joi.object({
            id:           Joi.string().required(),
            name:         Joi.string().required(),
            description:  Joi.string().required(),
            minBalance:   Joi.number().required(),
            interestRate: Joi.number().required()
        });

    server.route({
        method:  'GET',
        path:    '/products',
        handler: routes.getAll,
        config: {
            tags: ['api]']
        }
    });

    server.route({
        method: 'GET',
        path:   '/products/{id}',
        handler: routes.getByID,
        config: {
            tags: ['api'],
            validate: {
                params: { id: Joi.string() },
                query:  false,
                payload: false,
                options: { allowUnknown: false }
            }
        }
    });

    server.route({
        method: 'POST',
        path:   '/products',
        handler: routes.addProduct,
        config: {
            tags: ['api'],
            validate: {
                params: false,
                query:  false,
                payload: PayloadSchema,
                options: { allowUnknown: false }
            }
        }
    });

    next();

};

exports.register.attributes = {
    pkg: require('./package.json')
};
