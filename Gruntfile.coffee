module.exports = ->
  # Project configuration
  @initConfig
    pkg: @file.readJSON 'package.json'

    clean:
      nuke_components:
        src: ['components/*/']
      nuke_bower:
        src: ['bower_components']
      nuke_built:
        src: ['dist']

    browserify:
      dist:
        files:
          'dist/gss.js': ['src/gss.coffee']
        options:
          transform: ['coffeeify']
          browserifyOptions:
            extensions: ['.coffee']
      spec:
        files:
          'spec/js/specs.js': ['spec/all.coffee']
        options:
          transform: ['coffeeify']
          browserifyOptions:
            debug: true
            extensions: ['.coffee']
        debug:
          options:
            debug: true

    # Automated recompilation and testing when developing
    watch:
      specs:
        files: ['spec/**/*.coffee']
        tasks: ['browserify:spec']
      src:
        files: ['src/**/*.coffee']
        tasks: ['browserify:dist']


    # JavaScript minification for the browser
    uglify:
      options:
        report: 'min'
      engine:
        files:
          './dist/gss.min.js': ['./dist/gss.js']

    # Adding version information to the generated files
    banner: '/* <%= pkg.name %> - version <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>) - http://gridstylesheets.org */'
    usebanner:
      dist:
        options:
          position: 'top'
          banner: '<%= banner %>'
        files:
          src: [
            'dist/gss.js'
            'dist/gss.min.js'
          ]

    # Syntax checking
    coffeelint:
      src:
        files:
          src: ['src/*.coffee', 'src/**/*.coffee']
        options:
          'max_line_length':
            level: 'ignore'
          'no_trailing_whitespace':
            level: 'ignore'
          'no_backticks':
            level: 'ignore'
      spec:
        files:
          src: ['spec/*.coffee']
        options:
          'max_line_length':
            level: 'ignore'
          'no_trailing_whitespace':
            level: 'ignore'
          'no_backticks':
            level: 'ignore'

    docco:
      src:
        src: ['src/**/*.coffee']
        options:
          output: 'docs/'
          css: 'vendor/docs.css'

    # Cross-browser testing
    connect:
      server:
        options:
          base: ''
          port: 9999

    # BDD tests on browser
    mocha_phantomjs:
      all:
        options:
          reporter: 'node_modules/mocha/lib/reporters/spec.js'
          urls: ['http://127.0.0.1:9999/spec/runner.html']

    'saucelabs-mocha':
      all:
        options:
          urls: ['http://127.0.0.1:9999/spec/runner.html']
          browsers: [
            browserName: 'googlechrome'
            version: '34'
          ,
            browserName: 'firefox'
            version: '28'
          ,
            browserName: 'safari'
            version: '6'
          ,
            browserName: 'internet explorer'
            version: '11'
          ,
            browserName: 'internet explorer'
            version: '10'
          ]
          build: process.env.TRAVIS_JOB_ID
          testname: 'GSS browser tests'
          tunnelTimeout: 5
          concurrency: 6

  # Grunt plugins used for building
  @loadNpmTasks 'grunt-browserify'
  @loadNpmTasks 'grunt-contrib-uglify'
  @loadNpmTasks 'grunt-contrib-clean'
  @loadNpmTasks 'grunt-docco'
  @loadNpmTasks 'grunt-banner'

  # Grunt plugins used for testing
  @loadNpmTasks 'grunt-coffeelint'
  @loadNpmTasks 'grunt-mocha-phantomjs'
  @loadNpmTasks 'grunt-contrib-watch'

  # Cross-browser testing in the cloud
  @loadNpmTasks 'grunt-contrib-connect'
  @loadNpmTasks 'grunt-saucelabs'

  @registerTask 'build', ['browserify', 'uglify:engine', 'usebanner']
  @registerTask 'test', ['coffeelint', 'build:js', 'phantom']
  @registerTask 'phantom', ['connect', 'mocha_phantomjs']
  @registerTask 'crossbrowser', ['build', 'coffeelint', 'connect', 'mocha_phantomjs', 'saucelabs-mocha']
  @registerTask 'default', ['build']
  @registerTask 'nuke', ['clean']
