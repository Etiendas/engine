class Identity
  @uid: 0
  
  # Get or generate uid for a given object.
  provide: (object, generate) ->
    unless id = object._gss_id
      if object == document
        id = "::document"
      else if object == window
        id = "::window"

      unless generate == false
        object._gss_id = id ||= 
          "$" + (object.id || 
                (@uid ||= (@uid || 0) + 1))
      @[id] = object
    return id

  get: (id) ->
    return @[id]

  solve: (id) ->
    return @[id]

  unset: (object) ->
    delete @[id]

  # Get id if given object has one
  find: (object) ->
    return @constructor.identity.provide(object, false)

module.exports = Identity