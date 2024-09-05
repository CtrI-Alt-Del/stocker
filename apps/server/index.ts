import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

const PORT = process.env.PORT || 3001;

fastify.get('/', async (request: any, reply: any) => {
    return { hello: 'Hello banana' };
});

const start = async () => {
    try {
        await fastify.listen({
            port: parseInt(PORT as string),
            host: '0.0.0.0'
        });
        fastify.log.info(`Server: http://localhost:${PORT}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();