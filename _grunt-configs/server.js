module.exports.tasks = {

	/**
	 * ftp deploy 
	 * https://www.npmjs.com/package/grunt-ftp-deploy
	 */
	bake: {
	  build: {
	    files: {
			'index.html' : 'index_base.html',
			'checkout/index.html' : 'checkout/index_section.html',
			'contacto/index.html' : 'contacto/index_section.html',
			'inspiracion/index.html' : 'inspiracion/index_section.html',
			'micuenta/index.html' : 'micuenta/index_section.html',
			'nosotros/index.html' : 'nosotros/index_section.html',
			'plazosdeentrega/index.html' : 'plazosdeentrega/index_section.html',
			'politicasdecambio/index.html' : 'politicasdecambio/index_section.html',
			'preguntasfrecuentes/index.html' : 'preguntasfrecuentes/index_section.html',
			'productos/index.html' : 'productos/index_section.html',
			'favoritos/index.html' : 'favoritos/index_section.html',
			'ofrecetusproductos/index.html' : 'ofrecetusproductos/index_section.html',
			'registro/index.html' : 'registro/index_section.html',
			'carritodecompras/index.html' : 'carritodecompras/index_section.html',
			'terminosycondiciones/index.html' : 'terminosycondiciones/index_section.html'
			}
		}
	},

	'ftp-deploy': {
			  build: {
			    auth: {
			      host: 'server.com',
			      port: 21,
			      authKey: 'key1'
			    },
			    src: '<%=config.distDir%>',
			    dest: '/html/uploadTest/',
			    exclusions: ['<%=config.distDir%>/**/.DS_Store', '<%=config.distDir%>/**/Thumbs.db', 'path/to/dist/tmp']
			  }
		},

	/**
	 * browserSync
	 * http://www.browsersync.io/docs/options/
	 * http://www.browsersync.io/docs/grunt/
	 */


	browserSync: {
		serve: {
			bsFiles: {
				src: [
					'<%=config.distDir%>/**/*.*',
					'**/*.html'
				]
			},
			options: {
				watchTask: true,
				server: './'
			}
		},

		styleguide: {
			bsFiles: {
				src: [
					'<%=config.distDir%>/**/*.*',
					'*.html'
				]
			},
			options: {
				watchTask: true,
				server: {
					baseDir: './',
					index: 'styleguide/index.html'
				}
			}
		}
	}
};
