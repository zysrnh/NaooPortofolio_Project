import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\HeroProfileController::show
 * @see app/Http/Controllers/HeroProfileController.php:17
 * @route '/api/hero'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/hero',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HeroProfileController::show
 * @see app/Http/Controllers/HeroProfileController.php:17
 * @route '/api/hero'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HeroProfileController::show
 * @see app/Http/Controllers/HeroProfileController.php:17
 * @route '/api/hero'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HeroProfileController::show
 * @see app/Http/Controllers/HeroProfileController.php:17
 * @route '/api/hero'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HeroProfileController::show
 * @see app/Http/Controllers/HeroProfileController.php:17
 * @route '/api/hero'
 */
    const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HeroProfileController::show
 * @see app/Http/Controllers/HeroProfileController.php:17
 * @route '/api/hero'
 */
        showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HeroProfileController::show
 * @see app/Http/Controllers/HeroProfileController.php:17
 * @route '/api/hero'
 */
        showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\HeroProfileController::update
 * @see app/Http/Controllers/HeroProfileController.php:44
 * @route '/api/hero'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/hero',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\HeroProfileController::update
 * @see app/Http/Controllers/HeroProfileController.php:44
 * @route '/api/hero'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HeroProfileController::update
 * @see app/Http/Controllers/HeroProfileController.php:44
 * @route '/api/hero'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\HeroProfileController::update
 * @see app/Http/Controllers/HeroProfileController.php:44
 * @route '/api/hero'
 */
    const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HeroProfileController::update
 * @see app/Http/Controllers/HeroProfileController.php:44
 * @route '/api/hero'
 */
        updateForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\HeroProfileController::uploadPhoto
 * @see app/Http/Controllers/HeroProfileController.php:83
 * @route '/api/hero/photo'
 */
export const uploadPhoto = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadPhoto.url(options),
    method: 'post',
})

uploadPhoto.definition = {
    methods: ["post"],
    url: '/api/hero/photo',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HeroProfileController::uploadPhoto
 * @see app/Http/Controllers/HeroProfileController.php:83
 * @route '/api/hero/photo'
 */
uploadPhoto.url = (options?: RouteQueryOptions) => {
    return uploadPhoto.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HeroProfileController::uploadPhoto
 * @see app/Http/Controllers/HeroProfileController.php:83
 * @route '/api/hero/photo'
 */
uploadPhoto.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadPhoto.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\HeroProfileController::uploadPhoto
 * @see app/Http/Controllers/HeroProfileController.php:83
 * @route '/api/hero/photo'
 */
    const uploadPhotoForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: uploadPhoto.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HeroProfileController::uploadPhoto
 * @see app/Http/Controllers/HeroProfileController.php:83
 * @route '/api/hero/photo'
 */
        uploadPhotoForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: uploadPhoto.url(options),
            method: 'post',
        })
    
    uploadPhoto.form = uploadPhotoForm
const HeroProfileController = { show, update, uploadPhoto }

export default HeroProfileController