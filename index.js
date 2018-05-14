const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.on('error', err => {
    log.error('server error', err)
});

app.use(async ctx => {
    ctx.body = 'Hello World';
});

app.listen(3000);