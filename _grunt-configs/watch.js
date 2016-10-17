module.exports.tasks = {

	/**
	* Watch
	* https://github.com/gruntjs/grunt-contrib-watch
	* Watches your scss, js etc for changes and compiles them
	*/
	watch: {
		options: {
			interrupt: true,
			spawn: false
		},

		scss: {
			files: ['<%=config.css.scssDir%>/**/*.scss'],
			tasks: [
				'compileCSS',
				'clean:tempCSS'
			]
		},
		sections: {
			files: ['index_base.html','section/index_section.html'],
			tasks: [
				'compileCSS',
				'clean:tempCSS',
				'bake'
			]
		},

		checkout: {
			files: ['index_base.html','checkout/index_section.html'],
			tasks: [
				'compileCSS',
				'clean:tempCSS',
				'bake'
			]
		},
		contacto: {
			files: ['index_base.html','contacto/index_section.html'],
			tasks: [
				'compileCSS',
				'clean:tempCSS',
				'bake'
			]
		},

		includes: {
			files: ['index_base.html','includes/index_section.html'],
			tasks: [
				'compileCSS',
				'clean:tempCSS',
				'bake'
			]
		},
		inspiracion: {
			files: ['index_base.html','inspiracion/index_section.html'],
			tasks: [
				'compileCSS',
				'clean:tempCSS',
				'bake'
			]
		},

		micuenta: {
			files: ['index_base.html','micuenta/index_section.html'],
			tasks: [
				'compileCSS',
				'clean:tempCSS',
				'bake'
			]
		},
		nosotros: {
			files: ['index_base.html','nosotros/index_section.html'],
			tasks: [
				'compileCSS',
				'clean:tempCSS',
				'bake'
			]
		},
		plazosdeentrega: {
			files: ['index_base.html','plazosdeentrega/index_section.html'],
			tasks: [
				'compileCSS',
				'clean:tempCSS',
				'bake'
			]
		},
		politicasdecambio: {
			files: ['index_base.html','politicasdecambio/index_section.html'],
			tasks: [
				'compileCSS',
				'clean:tempCSS',
				'bake'
			]
		},

		preguntasfrecuentes: {
			files: ['index_base.html','preguntasfrecuentes/index_section.html'],
			tasks: [
				'compileCSS',
				'clean:tempCSS',
				'bake'
			]
		},

		productos: {
			files: ['index_base.html','productos/index_section.html'],
			tasks: [
				'compileCSS',
				'clean:tempCSS',
				'bake'
			]
		},

		registro: {
			files: ['index_base.html','registro/index_section.html'],
			tasks: [
				'compileCSS',
				'clean:tempCSS',
				'bake'
			]
		},


		js: {
			files: ['<%=config.js.fileList%>'],
			tasks: [
				'uglify',
				'newer:copy:modernizr'
			]
		},

		images : {
			files: ['<%=config.img.srcDir%>/**/*.{svg,png,jpg,gif}'],
			tasks: ['newer:imagemin:images']
		},

		grunticon : {
			files: ['<%=config.img.grunticonDir%>/**/*.{svg,png,jpg,gif}'],
			tasks: ['icons']
		},

		grunt: {
			files: ['_grunt-configs/*.js', 'Gruntfile.js'],
			options: {
				reload: true
			}
		}
	}
};
