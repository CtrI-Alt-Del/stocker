const fastify = require('fastify')({ logger: true });

fastify.get('/', async (request: any, reply: any) => {
    return { hello: 'world' };
});

const start = async () => {
    try {
        await fastify.listen(3001);
        fastify.log.info(`Server listening on http://localhost:3001`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();