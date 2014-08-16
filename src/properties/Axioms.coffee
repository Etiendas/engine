# Known formulas

class Axioms

  right: (scope, path) ->
    return @['+'](@get(scope, "x", path), @get(scope, "width", path))
  
  bottom: (scope, path) ->
    return @['+'](@get(scope, "y", path), @get(scope, "height", path))
  
  center:
    x: (scope, path) ->
      return @['+'](@get(scope, "x", path), @['/'](@get(scope, "width", path), 2))

    y: (scope, path) ->
      return @['+'](@get(scope, "y", path), @['/'](@get(scope, "height", path), 2))
      
module.exports = Axioms