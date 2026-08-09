import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\VisitorController::track
 * @see app/Http/Controllers/VisitorController.php:97
 * @route '/api/track'
 */
export const track = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: track.url(options),
    method: 'post',
})

track.definition = {
    methods: ["post"],
    url: '/api/track',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VisitorController::track
 * @see app/Http/Controllers/VisitorController.php:97
 * @route '/api/track'
 */
track.url = (options?: RouteQueryOptions) => {
    return track.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VisitorController::track
 * @see app/Http/Controllers/VisitorController.php:97
 * @route '/api/track'
 */
track.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: track.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\VisitorController::track
 * @see app/Http/Controllers/VisitorController.php:97
 * @route '/api/track'
 */
    const trackForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: track.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\VisitorController::track
 * @see app/Http/Controllers/VisitorController.php:97
 * @route '/api/track'
 */
        trackForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: track.url(options),
            method: 'post',
        })
    
    track.form = trackForm
/**
* @see \App\Http\Controllers\VisitorController::stats
 * @see app/Http/Controllers/VisitorController.php:126
 * @route '/api/visitors/stats'
 */
export const stats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})

stats.definition = {
    methods: ["get","head"],
    url: '/api/visitors/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VisitorController::stats
 * @see app/Http/Controllers/VisitorController.php:126
 * @route '/api/visitors/stats'
 */
stats.url = (options?: RouteQueryOptions) => {
    return stats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VisitorController::stats
 * @see app/Http/Controllers/VisitorController.php:126
 * @route '/api/visitors/stats'
 */
stats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\VisitorController::stats
 * @see app/Http/Controllers/VisitorController.php:126
 * @route '/api/visitors/stats'
 */
stats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stats.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\VisitorController::stats
 * @see app/Http/Controllers/VisitorController.php:126
 * @route '/api/visitors/stats'
 */
    const statsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: stats.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\VisitorController::stats
 * @see app/Http/Controllers/VisitorController.php:126
 * @route '/api/visitors/stats'
 */
        statsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: stats.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\VisitorController::stats
 * @see app/Http/Controllers/VisitorController.php:126
 * @route '/api/visitors/stats'
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
* @see \App\Http\Controllers\VisitorController::clear
 * @see app/Http/Controllers/VisitorController.php:202
 * @route '/api/visitors/clear'
 */
export const clear = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: clear.url(options),
    method: 'delete',
})

clear.definition = {
    methods: ["delete"],
    url: '/api/visitors/clear',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\VisitorController::clear
 * @see app/Http/Controllers/VisitorController.php:202
 * @route '/api/visitors/clear'
 */
clear.url = (options?: RouteQueryOptions) => {
    return clear.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VisitorController::clear
 * @see app/Http/Controllers/VisitorController.php:202
 * @route '/api/visitors/clear'
 */
clear.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: clear.url(options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\VisitorController::clear
 * @see app/Http/Controllers/VisitorController.php:202
 * @route '/api/visitors/clear'
 */
    const clearForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: clear.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\VisitorController::clear
 * @see app/Http/Controllers/VisitorController.php:202
 * @route '/api/visitors/clear'
 */
        clearForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: clear.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    clear.form = clearForm
const VisitorController = { track, stats, clear }

export default VisitorController