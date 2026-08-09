import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\UserChatController::users
 * @see app/Http/Controllers/UserChatController.php:13
 * @route '/api/mobile/user-chats/users'
 */
const users2ab1d0da5f3308a0ad2206abc05854a9 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users2ab1d0da5f3308a0ad2206abc05854a9.url(options),
    method: 'get',
})

users2ab1d0da5f3308a0ad2206abc05854a9.definition = {
    methods: ["get","head"],
    url: '/api/mobile/user-chats/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserChatController::users
 * @see app/Http/Controllers/UserChatController.php:13
 * @route '/api/mobile/user-chats/users'
 */
users2ab1d0da5f3308a0ad2206abc05854a9.url = (options?: RouteQueryOptions) => {
    return users2ab1d0da5f3308a0ad2206abc05854a9.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserChatController::users
 * @see app/Http/Controllers/UserChatController.php:13
 * @route '/api/mobile/user-chats/users'
 */
users2ab1d0da5f3308a0ad2206abc05854a9.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users2ab1d0da5f3308a0ad2206abc05854a9.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UserChatController::users
 * @see app/Http/Controllers/UserChatController.php:13
 * @route '/api/mobile/user-chats/users'
 */
users2ab1d0da5f3308a0ad2206abc05854a9.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: users2ab1d0da5f3308a0ad2206abc05854a9.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\UserChatController::users
 * @see app/Http/Controllers/UserChatController.php:13
 * @route '/api/mobile/user-chats/users'
 */
    const users2ab1d0da5f3308a0ad2206abc05854a9Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: users2ab1d0da5f3308a0ad2206abc05854a9.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\UserChatController::users
 * @see app/Http/Controllers/UserChatController.php:13
 * @route '/api/mobile/user-chats/users'
 */
        users2ab1d0da5f3308a0ad2206abc05854a9Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: users2ab1d0da5f3308a0ad2206abc05854a9.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\UserChatController::users
 * @see app/Http/Controllers/UserChatController.php:13
 * @route '/api/mobile/user-chats/users'
 */
        users2ab1d0da5f3308a0ad2206abc05854a9Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: users2ab1d0da5f3308a0ad2206abc05854a9.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    users2ab1d0da5f3308a0ad2206abc05854a9.form = users2ab1d0da5f3308a0ad2206abc05854a9Form
    /**
* @see \App\Http\Controllers\UserChatController::users
 * @see app/Http/Controllers/UserChatController.php:13
 * @route '/api/user-chats/users'
 */
const userse65e0a38a9c70d5ae04b6a0897cbdfe9 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: userse65e0a38a9c70d5ae04b6a0897cbdfe9.url(options),
    method: 'get',
})

userse65e0a38a9c70d5ae04b6a0897cbdfe9.definition = {
    methods: ["get","head"],
    url: '/api/user-chats/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserChatController::users
 * @see app/Http/Controllers/UserChatController.php:13
 * @route '/api/user-chats/users'
 */
userse65e0a38a9c70d5ae04b6a0897cbdfe9.url = (options?: RouteQueryOptions) => {
    return userse65e0a38a9c70d5ae04b6a0897cbdfe9.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserChatController::users
 * @see app/Http/Controllers/UserChatController.php:13
 * @route '/api/user-chats/users'
 */
userse65e0a38a9c70d5ae04b6a0897cbdfe9.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: userse65e0a38a9c70d5ae04b6a0897cbdfe9.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UserChatController::users
 * @see app/Http/Controllers/UserChatController.php:13
 * @route '/api/user-chats/users'
 */
userse65e0a38a9c70d5ae04b6a0897cbdfe9.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: userse65e0a38a9c70d5ae04b6a0897cbdfe9.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\UserChatController::users
 * @see app/Http/Controllers/UserChatController.php:13
 * @route '/api/user-chats/users'
 */
    const userse65e0a38a9c70d5ae04b6a0897cbdfe9Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: userse65e0a38a9c70d5ae04b6a0897cbdfe9.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\UserChatController::users
 * @see app/Http/Controllers/UserChatController.php:13
 * @route '/api/user-chats/users'
 */
        userse65e0a38a9c70d5ae04b6a0897cbdfe9Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: userse65e0a38a9c70d5ae04b6a0897cbdfe9.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\UserChatController::users
 * @see app/Http/Controllers/UserChatController.php:13
 * @route '/api/user-chats/users'
 */
        userse65e0a38a9c70d5ae04b6a0897cbdfe9Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: userse65e0a38a9c70d5ae04b6a0897cbdfe9.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    userse65e0a38a9c70d5ae04b6a0897cbdfe9.form = userse65e0a38a9c70d5ae04b6a0897cbdfe9Form

export const users = {
    '/api/mobile/user-chats/users': users2ab1d0da5f3308a0ad2206abc05854a9,
    '/api/user-chats/users': userse65e0a38a9c70d5ae04b6a0897cbdfe9,
}

/**
* @see \App\Http\Controllers\UserChatController::index
 * @see app/Http/Controllers/UserChatController.php:27
 * @route '/api/mobile/user-chats/{receiverId}'
 */
const index806bf528ea2b1bf93755b7079ec50f96 = (args: { receiverId: string | number } | [receiverId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index806bf528ea2b1bf93755b7079ec50f96.url(args, options),
    method: 'get',
})

index806bf528ea2b1bf93755b7079ec50f96.definition = {
    methods: ["get","head"],
    url: '/api/mobile/user-chats/{receiverId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserChatController::index
 * @see app/Http/Controllers/UserChatController.php:27
 * @route '/api/mobile/user-chats/{receiverId}'
 */
index806bf528ea2b1bf93755b7079ec50f96.url = (args: { receiverId: string | number } | [receiverId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { receiverId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    receiverId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        receiverId: args.receiverId,
                }

    return index806bf528ea2b1bf93755b7079ec50f96.definition.url
            .replace('{receiverId}', parsedArgs.receiverId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserChatController::index
 * @see app/Http/Controllers/UserChatController.php:27
 * @route '/api/mobile/user-chats/{receiverId}'
 */
index806bf528ea2b1bf93755b7079ec50f96.get = (args: { receiverId: string | number } | [receiverId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index806bf528ea2b1bf93755b7079ec50f96.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UserChatController::index
 * @see app/Http/Controllers/UserChatController.php:27
 * @route '/api/mobile/user-chats/{receiverId}'
 */
index806bf528ea2b1bf93755b7079ec50f96.head = (args: { receiverId: string | number } | [receiverId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index806bf528ea2b1bf93755b7079ec50f96.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\UserChatController::index
 * @see app/Http/Controllers/UserChatController.php:27
 * @route '/api/mobile/user-chats/{receiverId}'
 */
    const index806bf528ea2b1bf93755b7079ec50f96Form = (args: { receiverId: string | number } | [receiverId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index806bf528ea2b1bf93755b7079ec50f96.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\UserChatController::index
 * @see app/Http/Controllers/UserChatController.php:27
 * @route '/api/mobile/user-chats/{receiverId}'
 */
        index806bf528ea2b1bf93755b7079ec50f96Form.get = (args: { receiverId: string | number } | [receiverId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index806bf528ea2b1bf93755b7079ec50f96.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\UserChatController::index
 * @see app/Http/Controllers/UserChatController.php:27
 * @route '/api/mobile/user-chats/{receiverId}'
 */
        index806bf528ea2b1bf93755b7079ec50f96Form.head = (args: { receiverId: string | number } | [receiverId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index806bf528ea2b1bf93755b7079ec50f96.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index806bf528ea2b1bf93755b7079ec50f96.form = index806bf528ea2b1bf93755b7079ec50f96Form
    /**
* @see \App\Http\Controllers\UserChatController::index
 * @see app/Http/Controllers/UserChatController.php:27
 * @route '/api/user-chats/{receiverId}'
 */
const index7739bcac76644e06d939e219acab085a = (args: { receiverId: string | number } | [receiverId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index7739bcac76644e06d939e219acab085a.url(args, options),
    method: 'get',
})

index7739bcac76644e06d939e219acab085a.definition = {
    methods: ["get","head"],
    url: '/api/user-chats/{receiverId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserChatController::index
 * @see app/Http/Controllers/UserChatController.php:27
 * @route '/api/user-chats/{receiverId}'
 */
index7739bcac76644e06d939e219acab085a.url = (args: { receiverId: string | number } | [receiverId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { receiverId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    receiverId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        receiverId: args.receiverId,
                }

    return index7739bcac76644e06d939e219acab085a.definition.url
            .replace('{receiverId}', parsedArgs.receiverId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserChatController::index
 * @see app/Http/Controllers/UserChatController.php:27
 * @route '/api/user-chats/{receiverId}'
 */
index7739bcac76644e06d939e219acab085a.get = (args: { receiverId: string | number } | [receiverId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index7739bcac76644e06d939e219acab085a.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UserChatController::index
 * @see app/Http/Controllers/UserChatController.php:27
 * @route '/api/user-chats/{receiverId}'
 */
index7739bcac76644e06d939e219acab085a.head = (args: { receiverId: string | number } | [receiverId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index7739bcac76644e06d939e219acab085a.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\UserChatController::index
 * @see app/Http/Controllers/UserChatController.php:27
 * @route '/api/user-chats/{receiverId}'
 */
    const index7739bcac76644e06d939e219acab085aForm = (args: { receiverId: string | number } | [receiverId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index7739bcac76644e06d939e219acab085a.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\UserChatController::index
 * @see app/Http/Controllers/UserChatController.php:27
 * @route '/api/user-chats/{receiverId}'
 */
        index7739bcac76644e06d939e219acab085aForm.get = (args: { receiverId: string | number } | [receiverId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index7739bcac76644e06d939e219acab085a.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\UserChatController::index
 * @see app/Http/Controllers/UserChatController.php:27
 * @route '/api/user-chats/{receiverId}'
 */
        index7739bcac76644e06d939e219acab085aForm.head = (args: { receiverId: string | number } | [receiverId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index7739bcac76644e06d939e219acab085a.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index7739bcac76644e06d939e219acab085a.form = index7739bcac76644e06d939e219acab085aForm

export const index = {
    '/api/mobile/user-chats/{receiverId}': index806bf528ea2b1bf93755b7079ec50f96,
    '/api/user-chats/{receiverId}': index7739bcac76644e06d939e219acab085a,
}

/**
* @see \App\Http\Controllers\UserChatController::store
 * @see app/Http/Controllers/UserChatController.php:51
 * @route '/api/mobile/user-chats'
 */
const storefd3c5078265832a53d9d982960a3491e = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storefd3c5078265832a53d9d982960a3491e.url(options),
    method: 'post',
})

storefd3c5078265832a53d9d982960a3491e.definition = {
    methods: ["post"],
    url: '/api/mobile/user-chats',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UserChatController::store
 * @see app/Http/Controllers/UserChatController.php:51
 * @route '/api/mobile/user-chats'
 */
storefd3c5078265832a53d9d982960a3491e.url = (options?: RouteQueryOptions) => {
    return storefd3c5078265832a53d9d982960a3491e.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserChatController::store
 * @see app/Http/Controllers/UserChatController.php:51
 * @route '/api/mobile/user-chats'
 */
storefd3c5078265832a53d9d982960a3491e.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storefd3c5078265832a53d9d982960a3491e.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\UserChatController::store
 * @see app/Http/Controllers/UserChatController.php:51
 * @route '/api/mobile/user-chats'
 */
    const storefd3c5078265832a53d9d982960a3491eForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storefd3c5078265832a53d9d982960a3491e.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\UserChatController::store
 * @see app/Http/Controllers/UserChatController.php:51
 * @route '/api/mobile/user-chats'
 */
        storefd3c5078265832a53d9d982960a3491eForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storefd3c5078265832a53d9d982960a3491e.url(options),
            method: 'post',
        })
    
    storefd3c5078265832a53d9d982960a3491e.form = storefd3c5078265832a53d9d982960a3491eForm
    /**
* @see \App\Http\Controllers\UserChatController::store
 * @see app/Http/Controllers/UserChatController.php:51
 * @route '/api/user-chats'
 */
const store6dab69043e21056af7470dcda966c578 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store6dab69043e21056af7470dcda966c578.url(options),
    method: 'post',
})

store6dab69043e21056af7470dcda966c578.definition = {
    methods: ["post"],
    url: '/api/user-chats',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UserChatController::store
 * @see app/Http/Controllers/UserChatController.php:51
 * @route '/api/user-chats'
 */
store6dab69043e21056af7470dcda966c578.url = (options?: RouteQueryOptions) => {
    return store6dab69043e21056af7470dcda966c578.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserChatController::store
 * @see app/Http/Controllers/UserChatController.php:51
 * @route '/api/user-chats'
 */
store6dab69043e21056af7470dcda966c578.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store6dab69043e21056af7470dcda966c578.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\UserChatController::store
 * @see app/Http/Controllers/UserChatController.php:51
 * @route '/api/user-chats'
 */
    const store6dab69043e21056af7470dcda966c578Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store6dab69043e21056af7470dcda966c578.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\UserChatController::store
 * @see app/Http/Controllers/UserChatController.php:51
 * @route '/api/user-chats'
 */
        store6dab69043e21056af7470dcda966c578Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store6dab69043e21056af7470dcda966c578.url(options),
            method: 'post',
        })
    
    store6dab69043e21056af7470dcda966c578.form = store6dab69043e21056af7470dcda966c578Form

export const store = {
    '/api/mobile/user-chats': storefd3c5078265832a53d9d982960a3491e,
    '/api/user-chats': store6dab69043e21056af7470dcda966c578,
}

/**
* @see \App\Http\Controllers\UserChatController::unreadCount
 * @see app/Http/Controllers/UserChatController.php:100
 * @route '/api/user-chats/unread-count'
 */
export const unreadCount = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: unreadCount.url(options),
    method: 'get',
})

unreadCount.definition = {
    methods: ["get","head"],
    url: '/api/user-chats/unread-count',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\UserChatController::unreadCount
 * @see app/Http/Controllers/UserChatController.php:100
 * @route '/api/user-chats/unread-count'
 */
unreadCount.url = (options?: RouteQueryOptions) => {
    return unreadCount.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserChatController::unreadCount
 * @see app/Http/Controllers/UserChatController.php:100
 * @route '/api/user-chats/unread-count'
 */
unreadCount.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: unreadCount.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\UserChatController::unreadCount
 * @see app/Http/Controllers/UserChatController.php:100
 * @route '/api/user-chats/unread-count'
 */
unreadCount.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: unreadCount.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\UserChatController::unreadCount
 * @see app/Http/Controllers/UserChatController.php:100
 * @route '/api/user-chats/unread-count'
 */
    const unreadCountForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: unreadCount.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\UserChatController::unreadCount
 * @see app/Http/Controllers/UserChatController.php:100
 * @route '/api/user-chats/unread-count'
 */
        unreadCountForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: unreadCount.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\UserChatController::unreadCount
 * @see app/Http/Controllers/UserChatController.php:100
 * @route '/api/user-chats/unread-count'
 */
        unreadCountForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: unreadCount.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    unreadCount.form = unreadCountForm
const UserChatController = { users, index, store, unreadCount }

export default UserChatController