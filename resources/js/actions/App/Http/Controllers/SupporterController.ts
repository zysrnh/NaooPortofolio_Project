import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SupporterController::index
 * @see app/Http/Controllers/SupporterController.php:11
 * @route '/api/supporters'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/supporters',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SupporterController::index
 * @see app/Http/Controllers/SupporterController.php:11
 * @route '/api/supporters'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SupporterController::index
 * @see app/Http/Controllers/SupporterController.php:11
 * @route '/api/supporters'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SupporterController::index
 * @see app/Http/Controllers/SupporterController.php:11
 * @route '/api/supporters'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SupporterController::index
 * @see app/Http/Controllers/SupporterController.php:11
 * @route '/api/supporters'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SupporterController::index
 * @see app/Http/Controllers/SupporterController.php:11
 * @route '/api/supporters'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SupporterController::index
 * @see app/Http/Controllers/SupporterController.php:11
 * @route '/api/supporters'
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
* @see \App\Http\Controllers\SupporterController::adminIndex
 * @see app/Http/Controllers/SupporterController.php:16
 * @route '/api/admin/supporters'
 */
export const adminIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminIndex.url(options),
    method: 'get',
})

adminIndex.definition = {
    methods: ["get","head"],
    url: '/api/admin/supporters',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SupporterController::adminIndex
 * @see app/Http/Controllers/SupporterController.php:16
 * @route '/api/admin/supporters'
 */
adminIndex.url = (options?: RouteQueryOptions) => {
    return adminIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SupporterController::adminIndex
 * @see app/Http/Controllers/SupporterController.php:16
 * @route '/api/admin/supporters'
 */
adminIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminIndex.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SupporterController::adminIndex
 * @see app/Http/Controllers/SupporterController.php:16
 * @route '/api/admin/supporters'
 */
adminIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: adminIndex.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SupporterController::adminIndex
 * @see app/Http/Controllers/SupporterController.php:16
 * @route '/api/admin/supporters'
 */
    const adminIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: adminIndex.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SupporterController::adminIndex
 * @see app/Http/Controllers/SupporterController.php:16
 * @route '/api/admin/supporters'
 */
        adminIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: adminIndex.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SupporterController::adminIndex
 * @see app/Http/Controllers/SupporterController.php:16
 * @route '/api/admin/supporters'
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
* @see \App\Http\Controllers\SupporterController::store
 * @see app/Http/Controllers/SupporterController.php:21
 * @route '/api/admin/supporters'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/admin/supporters',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SupporterController::store
 * @see app/Http/Controllers/SupporterController.php:21
 * @route '/api/admin/supporters'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SupporterController::store
 * @see app/Http/Controllers/SupporterController.php:21
 * @route '/api/admin/supporters'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SupporterController::store
 * @see app/Http/Controllers/SupporterController.php:21
 * @route '/api/admin/supporters'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SupporterController::store
 * @see app/Http/Controllers/SupporterController.php:21
 * @route '/api/admin/supporters'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\SupporterController::update
 * @see app/Http/Controllers/SupporterController.php:46
 * @route '/api/admin/supporters/{supporter}'
 */
export const update = (args: { supporter: number | { id: number } } | [supporter: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/api/admin/supporters/{supporter}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SupporterController::update
 * @see app/Http/Controllers/SupporterController.php:46
 * @route '/api/admin/supporters/{supporter}'
 */
update.url = (args: { supporter: number | { id: number } } | [supporter: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { supporter: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { supporter: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    supporter: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        supporter: typeof args.supporter === 'object'
                ? args.supporter.id
                : args.supporter,
                }

    return update.definition.url
            .replace('{supporter}', parsedArgs.supporter.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SupporterController::update
 * @see app/Http/Controllers/SupporterController.php:46
 * @route '/api/admin/supporters/{supporter}'
 */
update.post = (args: { supporter: number | { id: number } } | [supporter: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SupporterController::update
 * @see app/Http/Controllers/SupporterController.php:46
 * @route '/api/admin/supporters/{supporter}'
 */
    const updateForm = (args: { supporter: number | { id: number } } | [supporter: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SupporterController::update
 * @see app/Http/Controllers/SupporterController.php:46
 * @route '/api/admin/supporters/{supporter}'
 */
        updateForm.post = (args: { supporter: number | { id: number } } | [supporter: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\SupporterController::destroy
 * @see app/Http/Controllers/SupporterController.php:79
 * @route '/api/admin/supporters/{supporter}'
 */
export const destroy = (args: { supporter: number | { id: number } } | [supporter: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/admin/supporters/{supporter}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SupporterController::destroy
 * @see app/Http/Controllers/SupporterController.php:79
 * @route '/api/admin/supporters/{supporter}'
 */
destroy.url = (args: { supporter: number | { id: number } } | [supporter: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { supporter: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { supporter: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    supporter: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        supporter: typeof args.supporter === 'object'
                ? args.supporter.id
                : args.supporter,
                }

    return destroy.definition.url
            .replace('{supporter}', parsedArgs.supporter.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SupporterController::destroy
 * @see app/Http/Controllers/SupporterController.php:79
 * @route '/api/admin/supporters/{supporter}'
 */
destroy.delete = (args: { supporter: number | { id: number } } | [supporter: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\SupporterController::destroy
 * @see app/Http/Controllers/SupporterController.php:79
 * @route '/api/admin/supporters/{supporter}'
 */
    const destroyForm = (args: { supporter: number | { id: number } } | [supporter: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SupporterController::destroy
 * @see app/Http/Controllers/SupporterController.php:79
 * @route '/api/admin/supporters/{supporter}'
 */
        destroyForm.delete = (args: { supporter: number | { id: number } } | [supporter: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const SupporterController = { index, adminIndex, store, update, destroy }

export default SupporterController