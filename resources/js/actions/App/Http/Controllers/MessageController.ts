import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MessageController::index
 * @see app/Http/Controllers/MessageController.php:50
 * @route '/api/mobile/messages'
 */
const indexcc3b150cf4701ee948b292624741f3dc = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexcc3b150cf4701ee948b292624741f3dc.url(options),
    method: 'get',
})

indexcc3b150cf4701ee948b292624741f3dc.definition = {
    methods: ["get","head"],
    url: '/api/mobile/messages',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MessageController::index
 * @see app/Http/Controllers/MessageController.php:50
 * @route '/api/mobile/messages'
 */
indexcc3b150cf4701ee948b292624741f3dc.url = (options?: RouteQueryOptions) => {
    return indexcc3b150cf4701ee948b292624741f3dc.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::index
 * @see app/Http/Controllers/MessageController.php:50
 * @route '/api/mobile/messages'
 */
indexcc3b150cf4701ee948b292624741f3dc.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexcc3b150cf4701ee948b292624741f3dc.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MessageController::index
 * @see app/Http/Controllers/MessageController.php:50
 * @route '/api/mobile/messages'
 */
indexcc3b150cf4701ee948b292624741f3dc.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexcc3b150cf4701ee948b292624741f3dc.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MessageController::index
 * @see app/Http/Controllers/MessageController.php:50
 * @route '/api/mobile/messages'
 */
    const indexcc3b150cf4701ee948b292624741f3dcForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexcc3b150cf4701ee948b292624741f3dc.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MessageController::index
 * @see app/Http/Controllers/MessageController.php:50
 * @route '/api/mobile/messages'
 */
        indexcc3b150cf4701ee948b292624741f3dcForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexcc3b150cf4701ee948b292624741f3dc.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MessageController::index
 * @see app/Http/Controllers/MessageController.php:50
 * @route '/api/mobile/messages'
 */
        indexcc3b150cf4701ee948b292624741f3dcForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexcc3b150cf4701ee948b292624741f3dc.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexcc3b150cf4701ee948b292624741f3dc.form = indexcc3b150cf4701ee948b292624741f3dcForm
    /**
* @see \App\Http\Controllers\MessageController::index
 * @see app/Http/Controllers/MessageController.php:50
 * @route '/api/messages'
 */
const indexbf9a5229c3a043b734128d86a1b15635 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexbf9a5229c3a043b734128d86a1b15635.url(options),
    method: 'get',
})

indexbf9a5229c3a043b734128d86a1b15635.definition = {
    methods: ["get","head"],
    url: '/api/messages',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MessageController::index
 * @see app/Http/Controllers/MessageController.php:50
 * @route '/api/messages'
 */
indexbf9a5229c3a043b734128d86a1b15635.url = (options?: RouteQueryOptions) => {
    return indexbf9a5229c3a043b734128d86a1b15635.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::index
 * @see app/Http/Controllers/MessageController.php:50
 * @route '/api/messages'
 */
indexbf9a5229c3a043b734128d86a1b15635.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexbf9a5229c3a043b734128d86a1b15635.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MessageController::index
 * @see app/Http/Controllers/MessageController.php:50
 * @route '/api/messages'
 */
indexbf9a5229c3a043b734128d86a1b15635.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexbf9a5229c3a043b734128d86a1b15635.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MessageController::index
 * @see app/Http/Controllers/MessageController.php:50
 * @route '/api/messages'
 */
    const indexbf9a5229c3a043b734128d86a1b15635Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexbf9a5229c3a043b734128d86a1b15635.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MessageController::index
 * @see app/Http/Controllers/MessageController.php:50
 * @route '/api/messages'
 */
        indexbf9a5229c3a043b734128d86a1b15635Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexbf9a5229c3a043b734128d86a1b15635.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MessageController::index
 * @see app/Http/Controllers/MessageController.php:50
 * @route '/api/messages'
 */
        indexbf9a5229c3a043b734128d86a1b15635Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexbf9a5229c3a043b734128d86a1b15635.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexbf9a5229c3a043b734128d86a1b15635.form = indexbf9a5229c3a043b734128d86a1b15635Form

export const index = {
    '/api/mobile/messages': indexcc3b150cf4701ee948b292624741f3dc,
    '/api/messages': indexbf9a5229c3a043b734128d86a1b15635,
}

/**
* @see \App\Http\Controllers\MessageController::reply
 * @see app/Http/Controllers/MessageController.php:111
 * @route '/api/mobile/messages/{message}/reply'
 */
const replybc4d21d27919bc7c829527d8890b2203 = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: replybc4d21d27919bc7c829527d8890b2203.url(args, options),
    method: 'post',
})

replybc4d21d27919bc7c829527d8890b2203.definition = {
    methods: ["post"],
    url: '/api/mobile/messages/{message}/reply',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MessageController::reply
 * @see app/Http/Controllers/MessageController.php:111
 * @route '/api/mobile/messages/{message}/reply'
 */
replybc4d21d27919bc7c829527d8890b2203.url = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { message: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { message: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    message: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        message: typeof args.message === 'object'
                ? args.message.id
                : args.message,
                }

    return replybc4d21d27919bc7c829527d8890b2203.definition.url
            .replace('{message}', parsedArgs.message.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::reply
 * @see app/Http/Controllers/MessageController.php:111
 * @route '/api/mobile/messages/{message}/reply'
 */
replybc4d21d27919bc7c829527d8890b2203.post = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: replybc4d21d27919bc7c829527d8890b2203.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MessageController::reply
 * @see app/Http/Controllers/MessageController.php:111
 * @route '/api/mobile/messages/{message}/reply'
 */
    const replybc4d21d27919bc7c829527d8890b2203Form = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: replybc4d21d27919bc7c829527d8890b2203.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MessageController::reply
 * @see app/Http/Controllers/MessageController.php:111
 * @route '/api/mobile/messages/{message}/reply'
 */
        replybc4d21d27919bc7c829527d8890b2203Form.post = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: replybc4d21d27919bc7c829527d8890b2203.url(args, options),
            method: 'post',
        })
    
    replybc4d21d27919bc7c829527d8890b2203.form = replybc4d21d27919bc7c829527d8890b2203Form
    /**
* @see \App\Http\Controllers\MessageController::reply
 * @see app/Http/Controllers/MessageController.php:111
 * @route '/api/messages/{message}/reply'
 */
const replyd3f8f2413048dbd1cdd58eb2bd9cc81f = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: replyd3f8f2413048dbd1cdd58eb2bd9cc81f.url(args, options),
    method: 'post',
})

replyd3f8f2413048dbd1cdd58eb2bd9cc81f.definition = {
    methods: ["post"],
    url: '/api/messages/{message}/reply',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MessageController::reply
 * @see app/Http/Controllers/MessageController.php:111
 * @route '/api/messages/{message}/reply'
 */
replyd3f8f2413048dbd1cdd58eb2bd9cc81f.url = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { message: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { message: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    message: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        message: typeof args.message === 'object'
                ? args.message.id
                : args.message,
                }

    return replyd3f8f2413048dbd1cdd58eb2bd9cc81f.definition.url
            .replace('{message}', parsedArgs.message.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::reply
 * @see app/Http/Controllers/MessageController.php:111
 * @route '/api/messages/{message}/reply'
 */
replyd3f8f2413048dbd1cdd58eb2bd9cc81f.post = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: replyd3f8f2413048dbd1cdd58eb2bd9cc81f.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MessageController::reply
 * @see app/Http/Controllers/MessageController.php:111
 * @route '/api/messages/{message}/reply'
 */
    const replyd3f8f2413048dbd1cdd58eb2bd9cc81fForm = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: replyd3f8f2413048dbd1cdd58eb2bd9cc81f.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MessageController::reply
 * @see app/Http/Controllers/MessageController.php:111
 * @route '/api/messages/{message}/reply'
 */
        replyd3f8f2413048dbd1cdd58eb2bd9cc81fForm.post = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: replyd3f8f2413048dbd1cdd58eb2bd9cc81f.url(args, options),
            method: 'post',
        })
    
    replyd3f8f2413048dbd1cdd58eb2bd9cc81f.form = replyd3f8f2413048dbd1cdd58eb2bd9cc81fForm

export const reply = {
    '/api/mobile/messages/{message}/reply': replybc4d21d27919bc7c829527d8890b2203,
    '/api/messages/{message}/reply': replyd3f8f2413048dbd1cdd58eb2bd9cc81f,
}

/**
* @see \App\Http\Controllers\MessageController::store
 * @see app/Http/Controllers/MessageController.php:18
 * @route '/api/messages'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/messages',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MessageController::store
 * @see app/Http/Controllers/MessageController.php:18
 * @route '/api/messages'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::store
 * @see app/Http/Controllers/MessageController.php:18
 * @route '/api/messages'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MessageController::store
 * @see app/Http/Controllers/MessageController.php:18
 * @route '/api/messages'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MessageController::store
 * @see app/Http/Controllers/MessageController.php:18
 * @route '/api/messages'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\MessageController::stats
 * @see app/Http/Controllers/MessageController.php:103
 * @route '/api/messages/stats'
 */
export const stats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})

stats.definition = {
    methods: ["get","head"],
    url: '/api/messages/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MessageController::stats
 * @see app/Http/Controllers/MessageController.php:103
 * @route '/api/messages/stats'
 */
stats.url = (options?: RouteQueryOptions) => {
    return stats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::stats
 * @see app/Http/Controllers/MessageController.php:103
 * @route '/api/messages/stats'
 */
stats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MessageController::stats
 * @see app/Http/Controllers/MessageController.php:103
 * @route '/api/messages/stats'
 */
stats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stats.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\MessageController::stats
 * @see app/Http/Controllers/MessageController.php:103
 * @route '/api/messages/stats'
 */
    const statsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: stats.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\MessageController::stats
 * @see app/Http/Controllers/MessageController.php:103
 * @route '/api/messages/stats'
 */
        statsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: stats.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\MessageController::stats
 * @see app/Http/Controllers/MessageController.php:103
 * @route '/api/messages/stats'
 */
        statsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: stats.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    stats.form = statsForm
/**
* @see \App\Http\Controllers\MessageController::markAllRead
 * @see app/Http/Controllers/MessageController.php:79
 * @route '/api/messages/read-all'
 */
export const markAllRead = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: markAllRead.url(options),
    method: 'patch',
})

markAllRead.definition = {
    methods: ["patch"],
    url: '/api/messages/read-all',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\MessageController::markAllRead
 * @see app/Http/Controllers/MessageController.php:79
 * @route '/api/messages/read-all'
 */
markAllRead.url = (options?: RouteQueryOptions) => {
    return markAllRead.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::markAllRead
 * @see app/Http/Controllers/MessageController.php:79
 * @route '/api/messages/read-all'
 */
markAllRead.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: markAllRead.url(options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\MessageController::markAllRead
 * @see app/Http/Controllers/MessageController.php:79
 * @route '/api/messages/read-all'
 */
    const markAllReadForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: markAllRead.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MessageController::markAllRead
 * @see app/Http/Controllers/MessageController.php:79
 * @route '/api/messages/read-all'
 */
        markAllReadForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: markAllRead.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    markAllRead.form = markAllReadForm
/**
* @see \App\Http\Controllers\MessageController::markRead
 * @see app/Http/Controllers/MessageController.php:65
 * @route '/api/messages/{message}/read'
 */
export const markRead = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: markRead.url(args, options),
    method: 'patch',
})

markRead.definition = {
    methods: ["patch"],
    url: '/api/messages/{message}/read',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\MessageController::markRead
 * @see app/Http/Controllers/MessageController.php:65
 * @route '/api/messages/{message}/read'
 */
markRead.url = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { message: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { message: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    message: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        message: typeof args.message === 'object'
                ? args.message.id
                : args.message,
                }

    return markRead.definition.url
            .replace('{message}', parsedArgs.message.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::markRead
 * @see app/Http/Controllers/MessageController.php:65
 * @route '/api/messages/{message}/read'
 */
markRead.patch = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: markRead.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\MessageController::markRead
 * @see app/Http/Controllers/MessageController.php:65
 * @route '/api/messages/{message}/read'
 */
    const markReadForm = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: markRead.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MessageController::markRead
 * @see app/Http/Controllers/MessageController.php:65
 * @route '/api/messages/{message}/read'
 */
        markReadForm.patch = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: markRead.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    markRead.form = markReadForm
/**
* @see \App\Http\Controllers\MessageController::destroy
 * @see app/Http/Controllers/MessageController.php:93
 * @route '/api/messages/{message}'
 */
export const destroy = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/messages/{message}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MessageController::destroy
 * @see app/Http/Controllers/MessageController.php:93
 * @route '/api/messages/{message}'
 */
destroy.url = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { message: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { message: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    message: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        message: typeof args.message === 'object'
                ? args.message.id
                : args.message,
                }

    return destroy.definition.url
            .replace('{message}', parsedArgs.message.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MessageController::destroy
 * @see app/Http/Controllers/MessageController.php:93
 * @route '/api/messages/{message}'
 */
destroy.delete = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\MessageController::destroy
 * @see app/Http/Controllers/MessageController.php:93
 * @route '/api/messages/{message}'
 */
    const destroyForm = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MessageController::destroy
 * @see app/Http/Controllers/MessageController.php:93
 * @route '/api/messages/{message}'
 */
        destroyForm.delete = (args: { message: number | { id: number } } | [message: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const MessageController = { index, reply, store, stats, markAllRead, markRead, destroy }

export default MessageController