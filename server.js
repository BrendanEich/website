var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3000 });

server.register(require('inert'), err => {
	if (err) {
		throw err;
	}

	// A server redirect to our favorite band, Brave Combo.
	server.route({
		method: 'GET',
		path: '/bo/{path*}',
		handler: function (request, reply) {
			reply.redirect('http://bravecombo.com/' + (request.params.path ? request.params.path : ''));
		}
	});

	// Serves static files out of public/
	server.route({
		method: 'GET',
		path: '/{param*}',
		handler: {
			directory: {
				path: 'public',
				listing: false,
				index: true
			}
		}
	});

	server.start(() => {
		console.log('Server running at:', server.info.uri);
	});
});
