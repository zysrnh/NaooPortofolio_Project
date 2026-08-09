import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ContactController::index
 * @see app/Http/Controllers/ContactController.php:15
 * @route '/api/contact'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/contact',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ContactController::index
 * @see app/Http/Controllers/ContactController.php:15
 * @route '/api/contact'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactController::index
 * @see app/Http/Controllers/ContactController.php:15
 * @route '/api/contact'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ContactController::index
 * @see app/Http/Controllers/ContactController.php:15
 * @route '/api/contact'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ContactController::index
 * @see app/Http/Controllers/ContactController.php:15
 * @route '/api/contact'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ContactController::index
 * @see app/Http/Controllers/ContactController.php:15
 * @route '/api/contact'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ContactController::index
 * @see app/Http/Controllers/ContactController.php:15
 * @route '/api/contact'
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
* @see \App\Http\Controllers\ContactController::indexVisible
 * @see app/Http/Controllers/ContactController.php:26
 * @route '/api/contact/visible'
 */
export const indexVisible = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexVisible.url(options),
    method: 'get',
})

indexVisible.definition = {
    methods: ["get","head"],
    url: '/api/contact/visible',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ContactController::indexVisible
 * @see app/Http/Controllers/ContactController.php:26
 * @route '/api/contact/visible'
 */
indexVisible.url = (options?: RouteQueryOptions) => {
    return indexVisible.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactController::indexVisible
 * @see app/Http/Controllers/ContactController.php:26
 * @route '/api/contact/visible'
 */
indexVisible.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexVisible.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ContactController::indexVisible
 * @see app/Http/Controllers/ContactController.php:26
 * @route '/api/contact/visible'
 */
indexVisible.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexVisible.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ContactController::indexVisible
 * @see app/Http/Controllers/ContactController.php:26
 * @route '/api/contact/visible'
 */
    const indexVisibleForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexVisible.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ContactController::indexVisible
 * @see app/Http/Controllers/ContactController.php:26
 * @route '/api/contact/visible'
 */
        indexVisibleForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexVisible.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ContactController::indexVisible
 * @see app/Http/Controllers/ContactController.php:26
 * @route '/api/contact/visible'
 */
        indexVisibleForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexVisible.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexVisible.form = indexVisibleForm
/**
* @see \App\Http\Controllers\ContactController::bulkUpdate
 * @see app/Http/Controllers/ContactController.php:38
 * @route '/api/contact'
 */
export const bulkUpdate = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: bulkUpdate.url(options),
    method: 'put',
})

bulkUpdate.definition = {
    methods: ["put"],
    url: '/api/contact',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\ContactController::bulkUpdate
 * @see app/Http/Controllers/ContactController.php:38
 * @route '/api/contact'
 */
bulkUpdate.url = (options?: RouteQueryOptions) => {
    return bulkUpdate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactController::bulkUpdate
 * @see app/Http/Controllers/ContactController.php:38
 * @route '/api/contact'
 */
bulkUpdate.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: bulkUpdate.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\ContactController::bulkUpdate
 * @see app/Http/Controllers/ContactController.php:38
 * @route '/api/contact'
 */
    const bulkUpdateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: bulkUpdate.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ContactController::bulkUpdate
 * @see app/Http/Controllers/ContactController.php:38
 * @route '/api/contact'
 */
        bulkUpdateForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: bulkUpdate.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    bulkUpdate.form = bulkUpdateForm
const ContactController = { index, indexVisible, bulkUpdate }

export default ContactController