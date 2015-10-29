module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		replace: {
			dist: {
				options: {
					patterns: [
						{
							match: 'version',
							replacement: '<%= pkg.version %>'
						},
						{
							match: 'timestamp',
							replacement: '<%= grunt.template.today() %>'
						}
					]
				},
				files: {
					'dist/<%= pkg.name %>.js': 'src/jquery.autogrow.js'
				}
			}
		},

		uglify: {
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-replace');
	grunt.registerTask('default', ['replace', 'uglify']);
};