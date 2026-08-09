import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TechStackController::indexVisible
 * @see app/Http/Controllers/TechStackController.php:18
 * @route '/api/tech-stacks/visible'
 */
export const indexVisible = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexVisible.url(options),
    method: 'get',
})

indexVisible.definition = {
    methods: ["get","head"],
    url: '/api/tech-stacks/visible',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TechStackController::indexVisible
 * @see app/Http/Controllers/TechStackController.php:18
 * @route '/api/tech-stacks/visible'
 */
indexVisible.url = (options?: RouteQueryOptions) => {
    return indexVisible.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TechStackController::indexVisible
 * @see app/Http/Controllers/TechStackController.php:18
 * @route '/api/tech-stacks/visible'
 */
indexVisible.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexVisible.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TechStackController::indexVisible
 * @see app/Http/Controllers/TechStackController.php:18
 * @route '/api/tech-stacks/visible'
 */
indexVisible.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexVisible.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TechStackController::indexVisible
 * @see app/Http/Controllers/TechStackController.php:18
 * @route '/api/tech-stacks/visible'
 */
    const indexVisibleForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexVisible.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TechStackController::indexVisible
 * @see app/Http/Controllers/TechStackController.php:18
 * @route '/api/tech-stacks/visible'
 */
        indexVisibleForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexVisible.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TechStackController::indexVisible
 * @see app/Http/Controllers/TechStackController.php:18
 * @route '/api/tech-stacks/visible'
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
* @see \App\Http\Controllers\TechStackController::index
 * @see app/Http/Controllers/TechStackController.php:12
 * @route '/api/tech-stacks'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/tech-stacks',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TechStackController::index
 * @see app/Http/Controllers/TechStackController.php:12
 * @route '/api/tech-stacks'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TechStackController::index
 * @see app/Http/Controllers/TechStackController.php:12
 * @route '/api/tech-stacks'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TechStackController::index
 * @see app/Http/Controllers/TechStackController.php:12
 * @route '/api/tech-stacks'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TechStackController::index
 * @see app/Http/Controllers/TechStackController.php:12
 * @route '/api/tech-stacks'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TechStackController::index
 * @see app/Http/Controllers/TechStackController.php:12
 * @route '/api/tech-stacks'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TechStackController::index
 * @see app/Http/Controllers/TechStackController.php:12
 * @route '/api/tech-stacks'
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
* @see \App\Http\Controllers\TechStackController::uploadIcon
 * @see app/Http/Controllers/TechStackController.php:29
 * @route '/api/tech-stacks/upload-icon'
 */
export const uploadIcon = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadIcon.url(options),
    method: 'post',
})

uploadIcon.definition = {
    methods: ["post"],
    url: '/api/tech-stacks/upload-icon',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TechStackController::uploadIcon
 * @see app/Http/Controllers/TechStackController.php:29
 * @route '/api/tech-stacks/upload-icon'
 */
uploadIcon.url = (options?: RouteQueryOptions) => {
    return uploadIcon.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TechStackController::uploadIcon
 * @see app/Http/Controllers/TechStackController.php:29
 * @route '/api/tech-stacks/upload-icon'
 */
uploadIcon.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadIcon.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\TechStackController::uploadIcon
 * @see app/Http/Controllers/TechStackController.php:29
 * @route '/api/tech-stacks/upload-icon'
 */
    const uploadIconForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: uploadIcon.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TechStackController::uploadIcon
 * @see app/Http/Controllers/TechStackController.php:29
 * @route '/api/tech-stacks/upload-icon'
 */
        uploadIconForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: uploadIcon.url(options),
            method: 'post',
        })
    
    uploadIcon.form = uploadIconForm
/**
* @see \App\Http\Controllers\TechStackController::store
 * @see app/Http/Controllers/TechStackController.php:40
 * @route '/api/tech-stacks'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/tech-stacks',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TechStackController::store
 * @see app/Http/Controllers/TechStackController.php:40
 * @route '/api/tech-stacks'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TechStackController::store
 * @see app/Http/Controllers/TechStackController.php:40
 * @route '/api/tech-stacks'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\TechStackController::store
 * @see app/Http/Controllers/TechStackController.php:40
 * @route '/api/tech-stacks'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TechStackController::store
 * @see app/Http/Controllers/TechStackController.php:40
 * @route '/api/tech-stacks'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\TechStackController::update
 * @see app/Http/Controllers/TechStackController.php:55
 * @route '/api/tech-stacks/{techStack}'
 */
export const update = (args: { techStack: number | { id: number } } | [techStack: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/tech-stacks/{techStack}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\TechStackController::update
 * @see app/Http/Controllers/TechStackController.php:55
 * @route '/api/tech-stacks/{techStack}'
 */
update.url = (args: { techStack: number | { id: number } } | [techStack: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { techStack: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { techStack: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    techStack: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        techStack: typeof args.techStack === 'object'
                ? args.techStack.id
                : args.techStack,
                }

    return update.definition.url
            .replace('{techStack}', parsedArgs.techStack.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TechStackController::update
 * @see app/Http/Controllers/TechStackController.php:55
 * @route '/api/tech-stacks/{techStack}'
 */
update.put = (args: { techStack: number | { id: number } } | [techStack: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\TechStackController::update
 * @see app/Http/Controllers/TechStackController.php:55
 * @route '/api/tech-stacks/{techStack}'
 */
    const updateForm = (args: { techStack: number | { id: number } } | [techStack: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TechStackController::update
 * @see app/Http/Controllers/TechStackController.php:55
 * @route '/api/tech-stacks/{techStack}'
 */
        updateForm.put = (args: { techStack: number | { id: number } } | [techStack: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\TechStackController::destroy
 * @see app/Http/Controllers/TechStackController.php:75
 * @route '/api/tech-stacks/{techStack}'
 */
export const destroy = (args: { techStack: number | { id: number } } | [techStack: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/tech-stacks/{techStack}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\TechStackController::destroy
 * @see app/Http/Controllers/TechStackController.php:75
 * @route '/api/tech-stacks/{techStack}'
 */
destroy.url = (args: { techStack: number | { id: number } } | [techStack: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { techStack: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { techStack: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    techStack: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        techStack: typeof args.techStack === 'object'
                ? args.techStack.id
                : args.techStack,
                }

    return destroy.definition.url
            .replace('{techStack}', parsedArgs.techStack.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TechStackController::destroy
 * @see app/Http/Controllers/TechStackController.php:75
 * @route '/api/tech-stacks/{techStack}'
 */
destroy.delete = (args: { techStack: number | { id: number } } | [techStack: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\TechStackController::destroy
 * @see app/Http/Controllers/TechStackController.php:75
 * @route '/api/tech-stacks/{techStack}'
 */
    const destroyForm = (args: { techStack: number | { id: number } } | [techStack: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TechStackController::destroy
 * @see app/Http/Controllers/TechStackController.php:75
 * @route '/api/tech-stacks/{techStack}'
 */
        destroyForm.delete = (args: { techStack: number | { id: number } } | [techStack: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\TechStackController::toggleVisibility
 * @see app/Http/Controllers/TechStackController.php:68
 * @route '/api/tech-stacks/{techStack}/toggle'
 */
export const toggleVisibility = (args: { techStack: number | { id: number } } | [techStack: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleVisibility.url(args, options),
    method: 'patch',
})

toggleVisibility.definition = {
    methods: ["patch"],
    url: '/api/tech-stacks/{techStack}/toggle',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\TechStackController::toggleVisibility
 * @see app/Http/Controllers/TechStackController.php:68
 * @route '/api/tech-stacks/{techStack}/toggle'
 */
toggleVisibility.url = (args: { techStack: number | { id: number } } | [techStack: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { techStack: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { techStack: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    techStack: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        techStack: typeof args.techStack === 'object'
                ? args.techStack.id
                : args.techStack,
                }

    return toggleVisibility.definition.url
            .replace('{techStack}', parsedArgs.techStack.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TechStackController::toggleVisibility
 * @see app/Http/Controllers/TechStackController.php:68
 * @route '/api/tech-stacks/{techStack}/toggle'
 */
toggleVisibility.patch = (args: { techStack: number | { id: number } } | [techStack: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleVisibility.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\TechStackController::toggleVisibility
 * @see app/Http/Controllers/TechStackController.php:68
 * @route '/api/tech-stacks/{techStack}/toggle'
 */
    const toggleVisibilityForm = (args: { techStack: number | { id: number } } | [techStack: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleVisibility.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TechStackController::toggleVisibility
 * @see app/Http/Controllers/TechStackController.php:68
 * @route '/api/tech-stacks/{techStack}/toggle'
 */
        toggleVisibilityForm.patch = (args: { techStack: number | { id: number } } | [techStack: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleVisibility.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    toggleVisibility.form = toggleVisibilityForm
const TechStackController = { indexVisible, index, uploadIcon, store, update, destroy, toggleVisibility }

export default TechStackController