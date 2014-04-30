'use strict'
module.exports = (grunt) ->
  require('load-grunt-tasks') grunt
  require('time-grunt') grunt

  grunt.initConfig
    app:
      app: 'app'
      dist: 'www'

    cfg: {}

    hoodie: start: options: callback: (cfg) ->
      grunt.config.set 'cfg', cfg

    watch:
      options:
        livereload: '<%= connect.options.livereload %>'

      js:
        files: ['<%= app.app %>/scripts/**/*.js']
        tasks: ['jshint:all']

      styles:
        files: ['.tmp/styles/main.css']

      view:
        files: ['<%= app.app %>/views/**/*.html']

      less:
        files: ['<%= app.app %>/styles/**/*.less']
        tasks: ['less:styles']

      gruntfile:
        files: ['Gruntfile.js']

    connect:
      options:
        port: 9000
        hostname: '0.0.0.0'
        livereload: 35729
        middleware: (connect, options) ->
          unless Array.isArray options.base
            options.base = [options.base]

          middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest]
          options.base.forEach (base) -> middlewares.push connect.static base
          directory = options.directory or options.base[options.base.length - 1]
          middlewares.push connect.directory directory

          middlewares

      livereload:
        options:
          open: true
          base: [
            '.tmp'
            '<%= app.app %>'
          ]
        proxies: [
          context: '/_api'
          host: '<%= cfg.stack.www.host %>'
          port: '<%= cfg.stack.www.port %>'
        ]

      dist:
        options:
          base: '<%= app.dist %>'

    jshint:
      options:
        jshintrc: '.jshintrc'

      all: [
        'Gruntfile.js'
        '<%= app.app %>/scripts/**/*.js'
      ]

    clean:
      dist:
        files: [
          dot: true
          src: [
            '.tmp'
            '<%= app.dist %>/*'
            '!<%= app.dist %>/.git*'
          ]
        ]

      server: '.tmp'

    useminPrepare:
      html: '<%= app.app %>/index.html'
      options:
        dest: '<%= app.dist %>'

    usemin:
      html: ['<%= app.dist %>/**/*.html']
      css: ['<%= app.dist %>/styles/**/*.css']
      options:
        assetsDirs: ['<%= app.dist %>']

    ngmin:
      dist:
        files: [
          expand: true
          cwd: '.tmp/concat/scripts'
          src: '*.js'
          dest: '.tmp/concat/scripts'
        ]

    less:
      styles:
        src: ['<%=app.app%>/styles/main.less']
        dest: '.tmp/styles/main.css'

    copy:
      dist:
        files: [
          {
            expand: true
            dot: true
            cwd: '<%= app.app %>'
            dest: '<%= app.dist %>'
            src: [
              '*.{ico,png,txt}'
              '.htaccess'
              '*.html'
              'views/**/*.html'
              'bower_components/**/*'
              'images/**/*.{webp}'
              'fonts/*'
            ]
          }
          {
            expand: true
            cwd: '.tmp/images'
            dest: '<%= app.dist %>/images'
            src: ['generated/*']
          }
        ]

    concurrent:
      server: ['less:styles']
      dist: ['less:styles']

  grunt.registerTask 'serve', (target) ->
    if target is 'dist'
      return grunt.task.run([
        'build'
        'connect:dist:keepalive'
      ])
    grunt.task.run [
      'clean:server'
      'hoodie'
      'concurrent:server'
      'connect:livereload'
      'configureProxies:livereload'
      'watch'
    ]

  grunt.registerTask 'build', [
    'clean:dist'
    'useminPrepare'
    'concurrent:dist'
    'concat'
    'ngmin'
    'copy:dist'
    'usemin'
  ]
  grunt.registerTask 'default', ['build']
