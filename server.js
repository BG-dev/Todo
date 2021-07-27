const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./src/assets/db.json');
const middleweres = jsonServer.defaults({
    static: './build'
});
const PORT = process.env.PORT || 8000;
server.use(middleweres);
server.use(jsonServer.rewriter({
    '/': '/list',
}))
server.use(router);
server.listen(PORT, () => {
    console.log('Server is running');
})