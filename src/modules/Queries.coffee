### Input: DOM Queries

 - Listens for changes in DOM,
 - Invalidates cached DOM Queries
   by bruteforcing combinators on reachable elements

 Input:  MutationEvent, processes observed mutations
 Output: Expressions, revaluates expressions

 State:  - `@[path]`: elements and collections by selector path
         - `@watchers[id]`: dom queries by element id 
###

class Queries
  constructor: (@engine) ->
    @watchers = {}
    @qualified = []

  onBeforeSolve: ->
    # Update all DOM queries that matched mutations
    index = 0
    while @qualified[index]
      watcher = @qualified.splice(0, 3)
      @engine.document.solve watcher[0], watcher[1], watcher[2]
      
    # Execute all deferred selectors (e.g. comma)
    index = 0
    if @ascending
      while @ascending[index]
        contd = @ascending[index + 1]
        collection = @[contd]
        if old = @engine.updating?.queries?[contd]?[1]
          collection = collection.slice()
          for item, i in collection by -1
            if old.indexOf(item) > -1
              collection.splice(i, 1)
        if collection?.length
          @engine.document.expressions.ascend @ascending[index], contd, collection, @ascending[index + 2]
        index += 3
      @ascending = undefined
    @


  addMatch: (node, continuation) ->
    return unless node.nodeType
    if (index = continuation.indexOf(@engine.DESCEND)) > -1
      continuation = continuation.substring(index + 1)
    continuation = continuation.replace(/\s+/, @engine.DESCEND)
    node.setAttribute('matches', (node.getAttribute('matches') || '') + ' ' + continuation.replace(/\s+/, @engine.DESCEND))
  
  removeMatch: (node, continuation) ->
    return unless node.nodeType == 1
    if matches = node.getAttribute('matches')
      if (index = continuation.indexOf(@engine.DESCEND)) > -1
        continuation = continuation.substring(index + 1)
      path = ' ' + continuation.replace(/\s+/, @engine.DESCEND)
      if matches.indexOf(path) > -1
        node.setAttribute('matches', matches.replace(path,''))

  # Manually add element to collection, handle dups
  # Also stores path which can be used to remove elements
  add: (node, continuation, operation, scope, key, contd) ->
    collection = @[continuation] ||= []
    if !collection.push
      return
    collection.isCollection = true
    update = (@engine.updating.queries ||= {})[continuation] ||= []
    if update[1] == undefined 
      update[1] = (copy = collection?.slice?()) || null

    keys = collection.keys ||= []
    paths = collection.paths ||= []
    scopes = collection.scopes ||= []

    if (index = collection.indexOf(node)) == -1
      for el, index in collection
        break unless @comparePosition(el, node, keys[index], key)
      collection.splice(index, 0, node)
      keys.splice(index, 0, key)
      paths.splice(index, 0, contd)
      scopes.splice(index, 0, scope)
      @chain collection[index - 1], node, continuation
      @chain node, collection[index + 1], continuation
      if operation.parent.name == 'rule'
        @addMatch(node, continuation)
      return true
    else
      #if scopes[index] != scope# || paths[index] != path
      (collection.duplicates ||= []).push(node)
      keys.push(key)
      paths.push(contd)
      scopes.push(scope)
      return

      
    return collection

  # Return collection by path & scope
  get: (operation, continuation, old) ->
    if typeof operation == 'string'
      result = @[operation]
      return result

  # Remove observers from element
  unobserve: (id, continuation, quick, path) ->
    if continuation != true
      refs = @engine.getPossibleContinuations(continuation)
    index = 0
    return unless (watchers = typeof id == 'object' && id || @watchers[id])
    while watcher = watchers[index]
      contd = watchers[index + 1]
      if refs && refs.indexOf(contd) == -1
        index += 3
        continue
      if path
        parent = watcher
        matched = false
        while parent
          if parent.path == path
            matched = true
          parent = parent.parent
        unless matched
          index += 3
          continue 
      subscope = watchers[index + 2]
      watchers.splice(index, 3)
      if !quick
        @clean(watcher, contd, watcher, subscope, true)
    if !watchers.length && watchers == @watchers[id]
      delete @watchers[id] 

  # Remove element from collection needlely
  removeFromCollection: (node, continuation, operation, scope, needle, contd) ->
    return unless collection = @get(continuation)
    length = collection.length
    keys = collection.keys
    paths = collection.paths
    scopes = collection.scopes
    duplicate = null

    # Dont remove it if element matches more than one selector
    if (duplicates = collection.duplicates)
      for dup, index in duplicates
        if dup == node
          if (keys[length + index] == needle && scopes[length + index] == scope) && contd == paths[length + index]
            duplicates.splice(index, 1)
            keys.splice(length + index, 1)
            paths.splice(length + index, 1)
            scopes.splice(length + index, 1)
            return false
          else
            duplicate ?= index

    if operation && length && needle
      ((@engine.updating.queries ||= {})[continuation] ||= [])[1] ||= collection.slice()

      if (index = collection.indexOf(node)) > -1
        # Fall back to duplicate with a different key
        if keys
          return false unless keys[index] == needle && scopes[index] == scope# && paths[index]
          if duplicate?
            duplicates.splice(duplicate, 1)
            paths[index] = paths[duplicate + length]
            paths.splice(duplicate + length, 1)
            keys[index] = keys[duplicate + length]
            keys.splice(duplicate + length, 1)
            scopes[index] = scopes[duplicate + length]
            scopes.splice(duplicate + length, 1)
            return false

        collection.splice(index, 1)
        @removeMatch(node, continuation)
        if keys
          keys.splice(index, 1)
          paths.splice(index, 1)
          scopes.splice(index, 1)
        @chain collection[index - 1], node, continuation
        @chain node, collection[index], continuation
        return true


  # Remove observers and cached node lists
  remove: (id, continuation, operation, scope, needle = operation, recursion, contd = continuation) ->
    if typeof id == 'object'
      node = id
      id = @engine.identity.provide(id)
    else
      node = @engine.identity[id]

    if continuation

      if parent = operation?.parent
        parent.def.release?.call(@engine, node, operation, continuation, scope)
        
      collection = @get(continuation)
      if collection && @engine.isCollection(collection)
        ((@engine.updating.queries ||= {})[continuation] ||= [])[1] ||= collection.slice()
      removed = @removeFromCollection(node, continuation, operation, scope, needle, contd)

      @engine.pairs.remove(id, continuation)

      collection = @get(continuation)

      # Remove all watchers that match continuation path
      ref = continuation + (collection?.length? && id || '')
      @unobserve(id, ref)

      if recursion != continuation
        @updateCollections operation, continuation, scope, recursion, node, continuation, continuation

        if @engine.isCollection(collection) && removed != false
          @clean(continuation + id)

    else if node
      # Detach queries attached to an element when removing element by id
      @unobserve(id, true)

    return removed


  clean: (path, continuation, operation, scope, bind) ->
    if path.def
      path = (continuation || '') + (path.uid || '') + (path.key || '')
    continuation = path if bind
    result = @get(path)
    
    if (result = @get(path, undefined, true)) != undefined
      @each 'remove', result, path, operation, scope, undefined, undefined, continuation

    if scope && operation.def.cleaning
      @remove @engine.identity.find(scope), path, operation, scope, operation
    
    @engine.solved.remove(path)
    @engine.stylesheets?.remove(path)
    @engine.stylesheets?.remove(path)

    @set path, undefined

    # Remove queries in queue and global watchers that match the path 
    if @qualified
      @unobserve(@qualified, path, true)

    @unobserve(@engine.scope._gss_id, path)

    if !result || !@engine.isCollection(result)
      unless path.charAt(0) == @engine.PAIR
        contd = @engine.getContinuation(path)
        @engine.updating?.remove(contd)
        @engine.provide(['remove', contd])
    return true

  # If a query selects element from some other node than current scope
  # Maybe somebody else calculated it already
  fetch: (node, args, operation, continuation, scope) ->
    node ||= @engine.getContext(args, operation, scope, node)
    if @engine.updating?.queries# && node != scope
      query = @engine.getQueryPath(operation, node)
      return @engine.updating.queries[query]?[0]

  chain: (left, right, continuation) ->
    if left
      @match(left, '$pseudo', 'last', undefined, continuation)
      @match(left, '$pseudo', 'next', undefined, continuation)
    if right
      @match(right, '$pseudo', 'previous', undefined, continuation)
      @match(right, '$pseudo', 'first', undefined, continuation)

  updateCollections: (operation, path, scope, added, removed, recursion, contd) ->
    
    oppath = @engine.getCanonicalPath(path)
    if path == oppath || @engine.PAIR + oppath == path
      
      if operation
        if operation.bound && (operation.path != operation.key)
          if added
            if @engine.isCollection(added)
              for add in added
                @addMatch(add, path) 
            else
              @addMatch(added, path) 
      if removed
        if @engine.isCollection(removed)
          for remove in removed
            @removeMatch(remove, path)
        else
          @removeMatch(removed, path)

    else if recursion != oppath
      @updateCollection operation, oppath, scope, added, removed, oppath, contd

    @updateCollection operation, path, scope, added, removed, recursion, contd
    
  # Combine nodes from multiple selector paths
  updateCollection: (operation, path, scope, added, removed, recursion, contd) ->
    if removed
      @each 'remove', removed, path, operation, scope, operation, recursion, contd
    
    if (collection = @[path])?.keys && added == collection
      return

    if added
      @each 'add', added, path, operation, scope, operation, contd

    if (collection = @[path])?.keys
      sorted = collection.slice().sort (a, b) =>
        i = collection.indexOf(a)
        j = collection.indexOf(b)
        return !@comparePosition(a, b, collection.keys[i], collection.keys[j])
      

      updated = undefined
      for node, index in sorted
        if node != collection[index]
          if !updated
            @[path] = updated = collection.slice()
            updated.keys = collection.keys.slice()
            updated.paths = collection.paths.slice()
            updated.scopes = collection.scopes.slice()
            updated[index] = node
          i = collection.indexOf(node)
          updated[index] = node
          updated.keys[index] = collection.keys[i]
          updated.paths[index] = collection.paths[i]
          updated.scopes[index] = collection.scopes[i]

          @chain sorted[index - 1], node, path
          @chain node, sorted[index + 1], path

      if updated
        collection.splice()
        collection.push.apply(collection, updated)
        collection.keys = updated.keys
        collection.paths = updated.keys
        collection.scopes = updated.keys

  # Perform method over each node in nodelist, or against given node
  each: (method, result = undefined, continuation, operation, scope, needle, recursion) ->
    if @engine.isCollection(result)
      copy = result.slice()
      returned = undefined
      for child in copy
        if @[method] child, continuation, operation, scope, needle, recursion
          returned = true
      return returned
    else if typeof result == 'object'
      return @[method] result, continuation, operation, scope, needle, recursion

  # Filter out known nodes from DOM collections
  update: (node, args, result = undefined, operation, continuation, scope) ->
    
    node ||= @engine.getContext(args, operation, scope, node)
    path = @engine.getQueryPath(operation, continuation)
    old = @get(path)

    @engine.updating.queries ||= {}

    # Normalize query to reuse results

    
    if pathed = @engine.updating.queries[path]
      old = pathed[1]

    if query = !operation.def.relative && @engine.getQueryPath(operation, node, scope)
      if queried = @engine.updating.queries[query]
        old ?= queried[1]
        result ?= queried[0]

    if !old? && (result && result.length == 0) && continuation
      old = @get(@engine.getCanonicalPath(path))

    isCollection = @engine.isCollection(result)


    # Clean refs of nodes that dont match anymore
    if old
      if @engine.isCollection(old)
        removed = undefined
        for child, index in old
          if !old.scopes || old.scopes?[index] == scope
            if !result || Array.prototype.indexOf.call(result, child) == -1
              (removed ||= []).push child
      else if result != old
        if !result
          removed = old
        @clean(path, undefined, operation, scope)
      else if continuation.charAt(0) == @engine.PAIR

        # Subscribe node to the query
        if id = @engine.identity.provide(node)
          watchers = @watchers[id] ||= []
          if (@engine.indexOfTriplet(watchers, operation, continuation, scope) == -1)
            watchers.push(operation, continuation, scope)
        
        return old
      else
        return

    # Register newly found nodes
    if isCollection
      @[path] ||= []
      added = undefined
      for child in result
        if !old || Array.prototype.indexOf.call(old, child) == -1  
          (added ||= []).push child
          added.isCollection = true

      # Snapshot live node list for future reference
      if result && result.item
        result = Array.prototype.slice.call(result, 0)
    else
      added = result 
      removed = old

    if !added?.keys

      @updateCollections(operation, path, scope, added, removed, undefined, continuation)
        
    #unless operation.def.capture
      # Subscribe node to the query
    if id = @engine.identity.provide(node)
      watchers = @watchers[id] ||= []
      if (@engine.indexOfTriplet(watchers, operation, continuation, scope) == -1)
        watchers.push(operation, continuation, scope)
    
    #return if noop
      
    group = @engine.updating.queries[query] ||= [] if query
    group = @engine.updating.queries[path] ||= group || []

    group[0] ||= result
    group[1] ||= old

    return if result == old

    unless result?.push
      @set path, result

    return added

  set: (path, result) ->
    old = @[path]
    if !result?
      ((@engine.updating.queries ||= {})[path] ||= [])[1] ||= old && old.slice && old.slice() || old ? null
    if result
      @[path] = result
    else
      delete @[path]
    @engine.pairs?.set(path, result)

    return

  # Check if a node observes this qualifier or combinator
  match: (node, group, qualifier, changed, continuation) ->
    return unless id = @engine.identity.provide(node)
    return unless watchers = @watchers[id]
    if continuation
      path = @engine.getCanonicalPath(continuation)
    for operation, index in watchers by 3
      if groupped = operation[group]
        contd = watchers[index + 1]
        continue if path && path != @engine.getCanonicalPath(contd)
        scope = watchers[index + 2]
        # Check qualifier value
        if qualifier
          @qualify(operation, contd, scope, groupped, qualifier)
        # Check combinator and tag name of a given element
        else if changed.nodeType
          @qualify(operation, contd, scope, groupped, changed.tagName, '*')
        # Check combinator and given tag name
        else if typeof changed == 'string'
          @qualify(operation, contd, scope, groupped, changed, '*')
        # Ditto in bulk: Qualify combinator with nodelist or array of tag names
        else for change in changed
          if typeof change == 'string'
            @qualify(operation, contd, scope, groupped, change, '*')
          else
            @qualify(operation, contd, scope, groupped, change.tagName, '*')
    @

  # Check if query observes qualifier by combinator 
  qualify: (operation, continuation, scope, groupped, qualifier, fallback) ->
    if (indexed = groupped[qualifier]) || (fallback && groupped[fallback])
      if @engine.indexOfTriplet(@qualified, operation, continuation, scope) == -1
        length = (continuation || '').length
        # Make shorter continuation keys run before longer ones
        for qualified, index in @qualified by 3
          if (@qualified[index + 1] || '').length > length
            break
        @qualified.splice(index, 0, operation, continuation, scope)
    @

  # Compare position of two nodes to sort collection in DOM order
  comparePosition: (a, b, op1, op2) ->
    if op1 != op2
      if op1.index > op2.index
        left = op2
        right = op1
      else
        left = op1
        right = op2

      index = left.index
      while next = op1.parent[++index]
        break if next == right
        if next[0] == '$virtual'
          return op1.index < op2.index

      unless a.nodeType && b.nodeType 
        return op1.index < op2.index
    if a.compareDocumentPosition
      return a.compareDocumentPosition(b) & 4
    return a.sourceIndex < b.sourceIndex
module.exports = Queries