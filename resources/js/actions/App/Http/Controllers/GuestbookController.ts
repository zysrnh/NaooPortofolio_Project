import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\GuestbookController::index
 * @see app/Http/Controllers/GuestbookController.php:12
 * @route '/api/guestbook'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/guestbook',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\GuestbookController::index
 * @see app/Http/Controllers/GuestbookController.php:12
 * @route '/api/guestbook'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GuestbookController::index
 * @see app/Http/Controllers/GuestbookController.php:12
 * @route '/api/guestbook'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\GuestbookController::index
 * @see app/Http/Controllers/GuestbookController.php:12
 * @route '/api/guestbook'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\GuestbookController::index
 * @see app/Http/Controllers/GuestbookController.php:12
 * @route '/api/guestbook'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\GuestbookController::index
 * @see app/Http/Controllers/GuestbookController.php:12
 * @route '/api/guestbook'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\GuestbookController::index
 * @see app/Http/Controllers/GuestbookController.php:12
 * @route '/api/guestbook'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\GuestbookController::store
 * @see app/Http/Controllers/GuestbookController.php:22
 * @route '/api/guestbook'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/guestbook',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\GuestbookController::store
 * @see app/Http/Controllers/GuestbookController.php:22
 * @route '/api/guestbook'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GuestbookController::store
 * @see app/Http/Controllers/GuestbookController.php:22
 * @route '/api/guestbook'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\GuestbookController::store
 * @see app/Http/Controllers/GuestbookController.php:22
 * @route '/api/guestbook'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\GuestbookController::store
 * @see app/Http/Controllers/GuestbookController.php:22
 * @route '/api/guestbook'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\GuestbookController::adminIndex
 * @see app/Http/Controllers/GuestbookController.php:64
 * @route '/api/admin/guestbook'
 */
export const adminIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminIndex.url(options),
    method: 'get',
})

adminIndex.definition = {
    methods: ["get","head"],
    url: '/api/admin/guestbook',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\GuestbookController::adminIndex
 * @see app/Http/Controllers/GuestbookController.php:64
 * @route '/api/admin/guestbook'
 */
adminIndex.url = (options?: RouteQueryOptions) => {
    return adminIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GuestbookController::adminIndex
 * @see app/Http/Controllers/GuestbookController.php:64
 * @route '/api/admin/guestbook'
 */
adminIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminIndex.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\GuestbookController::adminIndex
 * @see app/Http/Controllers/GuestbookController.php:64
 * @route '/api/admin/guestbook'
 */
adminIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: adminIndex.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\GuestbookController::adminIndex
 * @see app/Http/Controllers/GuestbookController.php:64
 * @route '/api/admin/guestbook'
 */
    const adminIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: adminIndex.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\GuestbookController::adminIndex
 * @see app/Http/Controllers/GuestbookController.php:64
 * @route '/api/admin/guestbook'
 */
        adminIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: adminIndex.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\GuestbookController::adminIndex
 * @see app/Http/Controllers/GuestbookController.php:64
 * @route '/api/admin/guestbook'
 */
        adminIndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: adminIndex.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    adminIndex.form = adminIndexForm
/**
* @see \App\Http\Controllers\GuestbookController::toggleVisibility
 * @see app/Http/Controllers/GuestbookController.php:69
 * @route '/api/admin/guestbook/{guestbook}'
 */
export const toggleVisibility = (args: { guestbook: string | number | { id: string | number } } | [guestbook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleVisibility.url(args, options),
    method: 'patch',
})

toggleVisibility.definition = {
    methods: ["patch"],
    url: '/api/admin/guestbook/{guestbook}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\GuestbookController::toggleVisibility
 * @see app/Http/Controllers/GuestbookController.php:69
 * @route '/api/admin/guestbook/{guestbook}'
 */
toggleVisibility.url = (args: { guestbook: string | number | { id: string | number } } | [guestbook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { guestbook: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { guestbook: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    guestbook: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        guestbook: typeof args.guestbook === 'object'
                ? args.guestbook.id
                : args.guestbook,
                }

    return toggleVisibility.definition.url
            .replace('{guestbook}', parsedArgs.guestbook.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\GuestbookController::toggleVisibility
 * @see app/Http/Controllers/GuestbookController.php:69
 * @route '/api/admin/guestbook/{guestbook}'
 */
toggleVisibility.patch = (args: { guestbook: string | number | { id: string | number } } | [guestbook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleVisibility.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\GuestbookController::toggleVisibility
 * @see app/Http/Controllers/GuestbookController.php:69
 * @route '/api/admin/guestbook/{guestbook}'
 */
    const toggleVisibilityForm = (args: { guestbook: string | number | { id: string | number } } | [guestbook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleVisibility.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\GuestbookController::toggleVisibility
 * @see app/Http/Controllers/GuestbookController.php:69
 * @route '/api/admin/guestbook/{guestbook}'
 */
        toggleVisibilityForm.patch = (args: { guestbook: string | number | { id: string | number } } | [guestbook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleVisibility.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    toggleVisibility.form = toggleVisibilityForm
/**
* @see \App\Http\Controllers\GuestbookController::destroy
 * @see app/Http/Controllers/GuestbookController.php:75
 * @route '/api/admin/guestbook/{guestbook}'
 */
export const destroy = (args: { guestbook: string | number | { id: string | number } } | [guestbook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/admin/guestbook/{guestbook}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\GuestbookController::destroy
 * @see app/Http/Controllers/GuestbookController.php:75
 * @route '/api/admin/guestbook/{guestbook}'
 */
destroy.url = (args: { guestbook: string | number | { id: string | number } } | [guestbook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { guestbook: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { guestbook: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    guestbook: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        guestbook: typeof args.guestbook === 'object'
                ? args.guestbook.id
                : args.guestbook,
                }

    return destroy.definition.url
            .replace('{guestbook}', parsedArgs.guestbook.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\GuestbookController::destroy
 * @see app/Http/Controllers/GuestbookController.php:75
 * @route '/api/admin/guestbook/{guestbook}'
 */
destroy.delete = (args: { guestbook: string | number | { id: string | number } } | [guestbook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\GuestbookController::destroy
 * @see app/Http/Controllers/GuestbookController.php:75
 * @route '/api/admin/guestbook/{guestbook}'
 */
    const destroyForm = (args: { guestbook: string | number | { id: string | number } } | [guestbook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\GuestbookController::destroy
 * @see app/Http/Controllers/GuestbookController.php:75
 * @route '/api/admin/guestbook/{guestbook}'
 */
        destroyForm.delete = (args: { guestbook: string | number | { id: string | number } } | [guestbook: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const GuestbookController = { index, store, adminIndex, toggleVisibility, destroy }

export default GuestbookController