import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProjectController::store
 * @see app/Http/Controllers/ProjectController.php:41
 * @route '/api/mobile/projects'
 */
const storeb1853781cfef11d0fd63b5b4325ffa76 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeb1853781cfef11d0fd63b5b4325ffa76.url(options),
    method: 'post',
})

storeb1853781cfef11d0fd63b5b4325ffa76.definition = {
    methods: ["post"],
    url: '/api/mobile/projects',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectController::store
 * @see app/Http/Controllers/ProjectController.php:41
 * @route '/api/mobile/projects'
 */
storeb1853781cfef11d0fd63b5b4325ffa76.url = (options?: RouteQueryOptions) => {
    return storeb1853781cfef11d0fd63b5b4325ffa76.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::store
 * @see app/Http/Controllers/ProjectController.php:41
 * @route '/api/mobile/projects'
 */
storeb1853781cfef11d0fd63b5b4325ffa76.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeb1853781cfef11d0fd63b5b4325ffa76.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ProjectController::store
 * @see app/Http/Controllers/ProjectController.php:41
 * @route '/api/mobile/projects'
 */
    const storeb1853781cfef11d0fd63b5b4325ffa76Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeb1853781cfef11d0fd63b5b4325ffa76.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProjectController::store
 * @see app/Http/Controllers/ProjectController.php:41
 * @route '/api/mobile/projects'
 */
        storeb1853781cfef11d0fd63b5b4325ffa76Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeb1853781cfef11d0fd63b5b4325ffa76.url(options),
            method: 'post',
        })
    
    storeb1853781cfef11d0fd63b5b4325ffa76.form = storeb1853781cfef11d0fd63b5b4325ffa76Form
    /**
* @see \App\Http\Controllers\ProjectController::store
 * @see app/Http/Controllers/ProjectController.php:41
 * @route '/api/admin/projects'
 */
const storefe982e4a9359a84a79d73bc68e136cd5 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storefe982e4a9359a84a79d73bc68e136cd5.url(options),
    method: 'post',
})

storefe982e4a9359a84a79d73bc68e136cd5.definition = {
    methods: ["post"],
    url: '/api/admin/projects',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectController::store
 * @see app/Http/Controllers/ProjectController.php:41
 * @route '/api/admin/projects'
 */
storefe982e4a9359a84a79d73bc68e136cd5.url = (options?: RouteQueryOptions) => {
    return storefe982e4a9359a84a79d73bc68e136cd5.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::store
 * @see app/Http/Controllers/ProjectController.php:41
 * @route '/api/admin/projects'
 */
storefe982e4a9359a84a79d73bc68e136cd5.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storefe982e4a9359a84a79d73bc68e136cd5.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ProjectController::store
 * @see app/Http/Controllers/ProjectController.php:41
 * @route '/api/admin/projects'
 */
    const storefe982e4a9359a84a79d73bc68e136cd5Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storefe982e4a9359a84a79d73bc68e136cd5.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProjectController::store
 * @see app/Http/Controllers/ProjectController.php:41
 * @route '/api/admin/projects'
 */
        storefe982e4a9359a84a79d73bc68e136cd5Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storefe982e4a9359a84a79d73bc68e136cd5.url(options),
            method: 'post',
        })
    
    storefe982e4a9359a84a79d73bc68e136cd5.form = storefe982e4a9359a84a79d73bc68e136cd5Form

export const store = {
    '/api/mobile/projects': storeb1853781cfef11d0fd63b5b4325ffa76,
    '/api/admin/projects': storefe982e4a9359a84a79d73bc68e136cd5,
}

/**
* @see \App\Http\Controllers\ProjectController::index
 * @see app/Http/Controllers/ProjectController.php:14
 * @route '/api/projects'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/projects',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectController::index
 * @see app/Http/Controllers/ProjectController.php:14
 * @route '/api/projects'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::index
 * @see app/Http/Controllers/ProjectController.php:14
 * @route '/api/projects'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProjectController::index
 * @see app/Http/Controllers/ProjectController.php:14
 * @route '/api/projects'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProjectController::index
 * @see app/Http/Controllers/ProjectController.php:14
 * @route '/api/projects'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ProjectController::index
 * @see app/Http/Controllers/ProjectController.php:14
 * @route '/api/projects'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ProjectController::index
 * @see app/Http/Controllers/ProjectController.php:14
 * @route '/api/projects'
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
* @see \App\Http\Controllers\ProjectController::show
 * @see app/Http/Controllers/ProjectController.php:25
 * @route '/api/projects/{slug}'
 */
export const show = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/projects/{slug}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectController::show
 * @see app/Http/Controllers/ProjectController.php:25
 * @route '/api/projects/{slug}'
 */
show.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slug: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    slug: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        slug: args.slug,
                }

    return show.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::show
 * @see app/Http/Controllers/ProjectController.php:25
 * @route '/api/projects/{slug}'
 */
show.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProjectController::show
 * @see app/Http/Controllers/ProjectController.php:25
 * @route '/api/projects/{slug}'
 */
show.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProjectController::show
 * @see app/Http/Controllers/ProjectController.php:25
 * @route '/api/projects/{slug}'
 */
    const showForm = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ProjectController::show
 * @see app/Http/Controllers/ProjectController.php:25
 * @route '/api/projects/{slug}'
 */
        showForm.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ProjectController::show
 * @see app/Http/Controllers/ProjectController.php:25
 * @route '/api/projects/{slug}'
 */
        showForm.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\ProjectController::adminIndex
 * @see app/Http/Controllers/ProjectController.php:33
 * @route '/api/admin/projects'
 */
export const adminIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminIndex.url(options),
    method: 'get',
})

adminIndex.definition = {
    methods: ["get","head"],
    url: '/api/admin/projects',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectController::adminIndex
 * @see app/Http/Controllers/ProjectController.php:33
 * @route '/api/admin/projects'
 */
adminIndex.url = (options?: RouteQueryOptions) => {
    return adminIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::adminIndex
 * @see app/Http/Controllers/ProjectController.php:33
 * @route '/api/admin/projects'
 */
adminIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminIndex.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProjectController::adminIndex
 * @see app/Http/Controllers/ProjectController.php:33
 * @route '/api/admin/projects'
 */
adminIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: adminIndex.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProjectController::adminIndex
 * @see app/Http/Controllers/ProjectController.php:33
 * @route '/api/admin/projects'
 */
    const adminIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: adminIndex.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ProjectController::adminIndex
 * @see app/Http/Controllers/ProjectController.php:33
 * @route '/api/admin/projects'
 */
        adminIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: adminIndex.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ProjectController::adminIndex
 * @see app/Http/Controllers/ProjectController.php:33
 * @route '/api/admin/projects'
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
* @see \App\Http\Controllers\ProjectController::uploadImage
 * @see app/Http/Controllers/ProjectController.php:139
 * @route '/api/admin/projects/upload-image'
 */
export const uploadImage = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadImage.url(options),
    method: 'post',
})

uploadImage.definition = {
    methods: ["post"],
    url: '/api/admin/projects/upload-image',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectController::uploadImage
 * @see app/Http/Controllers/ProjectController.php:139
 * @route '/api/admin/projects/upload-image'
 */
uploadImage.url = (options?: RouteQueryOptions) => {
    return uploadImage.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::uploadImage
 * @see app/Http/Controllers/ProjectController.php:139
 * @route '/api/admin/projects/upload-image'
 */
uploadImage.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadImage.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ProjectController::uploadImage
 * @see app/Http/Controllers/ProjectController.php:139
 * @route '/api/admin/projects/upload-image'
 */
    const uploadImageForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: uploadImage.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProjectController::uploadImage
 * @see app/Http/Controllers/ProjectController.php:139
 * @route '/api/admin/projects/upload-image'
 */
        uploadImageForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: uploadImage.url(options),
            method: 'post',
        })
    
    uploadImage.form = uploadImageForm
/**
* @see \App\Http\Controllers\ProjectController::update
 * @see app/Http/Controllers/ProjectController.php:86
 * @route '/api/admin/projects/{project}'
 */
export const update = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/admin/projects/{project}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\ProjectController::update
 * @see app/Http/Controllers/ProjectController.php:86
 * @route '/api/admin/projects/{project}'
 */
update.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { project: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    project: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        project: typeof args.project === 'object'
                ? args.project.id
                : args.project,
                }

    return update.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::update
 * @see app/Http/Controllers/ProjectController.php:86
 * @route '/api/admin/projects/{project}'
 */
update.put = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\ProjectController::update
 * @see app/Http/Controllers/ProjectController.php:86
 * @route '/api/admin/projects/{project}'
 */
    const updateForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProjectController::update
 * @see app/Http/Controllers/ProjectController.php:86
 * @route '/api/admin/projects/{project}'
 */
        updateForm.put = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\ProjectController::destroy
 * @see app/Http/Controllers/ProjectController.php:127
 * @route '/api/admin/projects/{project}'
 */
export const destroy = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/admin/projects/{project}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ProjectController::destroy
 * @see app/Http/Controllers/ProjectController.php:127
 * @route '/api/admin/projects/{project}'
 */
destroy.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { project: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    project: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        project: typeof args.project === 'object'
                ? args.project.id
                : args.project,
                }

    return destroy.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::destroy
 * @see app/Http/Controllers/ProjectController.php:127
 * @route '/api/admin/projects/{project}'
 */
destroy.delete = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ProjectController::destroy
 * @see app/Http/Controllers/ProjectController.php:127
 * @route '/api/admin/projects/{project}'
 */
    const destroyForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProjectController::destroy
 * @see app/Http/Controllers/ProjectController.php:127
 * @route '/api/admin/projects/{project}'
 */
        destroyForm.delete = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\ProjectController::toggleVisibility
 * @see app/Http/Controllers/ProjectController.php:133
 * @route '/api/admin/projects/{project}/toggle'
 */
export const toggleVisibility = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleVisibility.url(args, options),
    method: 'patch',
})

toggleVisibility.definition = {
    methods: ["patch"],
    url: '/api/admin/projects/{project}/toggle',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\ProjectController::toggleVisibility
 * @see app/Http/Controllers/ProjectController.php:133
 * @route '/api/admin/projects/{project}/toggle'
 */
toggleVisibility.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { project: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    project: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        project: typeof args.project === 'object'
                ? args.project.id
                : args.project,
                }

    return toggleVisibility.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::toggleVisibility
 * @see app/Http/Controllers/ProjectController.php:133
 * @route '/api/admin/projects/{project}/toggle'
 */
toggleVisibility.patch = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleVisibility.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\ProjectController::toggleVisibility
 * @see app/Http/Controllers/ProjectController.php:133
 * @route '/api/admin/projects/{project}/toggle'
 */
    const toggleVisibilityForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleVisibility.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProjectController::toggleVisibility
 * @see app/Http/Controllers/ProjectController.php:133
 * @route '/api/admin/projects/{project}/toggle'
 */
        toggleVisibilityForm.patch = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleVisibility.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    toggleVisibility.form = toggleVisibilityForm
const ProjectController = { store, index, show, adminIndex, uploadImage, update, destroy, toggleVisibility }

export default ProjectController