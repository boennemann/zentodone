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
        tasks: ['jshint:watch']

      styles:
        files: ['.tmp/styles/main.css']

      view:
        files: ['<%= app.app %>/index.html', '<%= app.app %>/views/**/*.html']

      less:
        options:
          livereload: off
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
        force: yes
      watch: [ '<%= app.app %>/scripts/**/*.js' ]

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
      css: ['.tmp/styles/**/*.css']
      options:
        assetsDirs: ['<%= app.dist %>']

    ngmin:
      dist:
        files: [
          expand: true
          cwd: '<%=app.app%>/scripts'
          src: '**/*.js'
          dest: '.tmp/scripts'
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
              'bower_components/fontawesome/fonts/*'
              'index.html'
              'views/*.html'
            ]
          }
        ]

    concurrent:
      dist: ['less:styles', 'ngmin']

    bump: options:
      commitMessage: 'chore(release): v%VERSION%'
      files: ['package.json', 'bower.json']
      commitFiles: ['package.json', 'bower.json', 'CHANGELOG.md']
      pushTo: 'origin master'

  grunt.registerTask 'release', ->
    @args.unshift 'bump-only'
    grunt.task.run [
      @args.join ':'
      'changelog'
      'bump-commit'
    ]

  grunt.registerTask 'serve', [
    'clean:server'
    'hoodie'
    'less:styles'
    'connect:livereload'
    'configureProxies:livereload'
    'watch'
  ]

  # TODO: remove "continueOn" hack to work around https://github.com/yeoman/grunt-usemin/issues/291
  grunt.registerTask 'build', [
    'clean'
    'concurrent'
    'continueOn'
    'useminPrepare'
    'continueOff'
    'copy'
    'usemin'
    'concat'
    'uglify'
    'cssmin'
  ]

  grunt.registerTask 'test', ['jshint', 'build']
  grunt.registerTask 'default', ['build']
