import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AboutProfileController::show
 * @see app/Http/Controllers/AboutProfileController.php:28
 * @route '/api/about'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/about',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AboutProfileController::show
 * @see app/Http/Controllers/AboutProfileController.php:28
 * @route '/api/about'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AboutProfileController::show
 * @see app/Http/Controllers/AboutProfileController.php:28
 * @route '/api/about'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AboutProfileController::show
 * @see app/Http/Controllers/AboutProfileController.php:28
 * @route '/api/about'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AboutProfileController::show
 * @see app/Http/Controllers/AboutProfileController.php:28
 * @route '/api/about'
 */
    const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AboutProfileController::show
 * @see app/Http/Controllers/AboutProfileController.php:28
 * @route '/api/about'
 */
        showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AboutProfileController::show
 * @see app/Http/Controllers/AboutProfileController.php:28
 * @route '/api/about'
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
* @see \App\Http\Controllers\AboutProfileController::featuredStacks
 * @see app/Http/Controllers/AboutProfileController.php:149
 * @route '/api/about/featured-stacks'
 */
export const featuredStacks = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: featuredStacks.url(options),
    method: 'get',
})

featuredStacks.definition = {
    methods: ["get","head"],
    url: '/api/about/featured-stacks',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AboutProfileController::featuredStacks
 * @see app/Http/Controllers/AboutProfileController.php:149
 * @route '/api/about/featured-stacks'
 */
featuredStacks.url = (options?: RouteQueryOptions) => {
    return featuredStacks.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AboutProfileController::featuredStacks
 * @see app/Http/Controllers/AboutProfileController.php:149
 * @route '/api/about/featured-stacks'
 */
featuredStacks.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: featuredStacks.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AboutProfileController::featuredStacks
 * @see app/Http/Controllers/AboutProfileController.php:149
 * @route '/api/about/featured-stacks'
 */
featuredStacks.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: featuredStacks.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AboutProfileController::featuredStacks
 * @see app/Http/Controllers/AboutProfileController.php:149
 * @route '/api/about/featured-stacks'
 */
    const featuredStacksForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: featuredStacks.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AboutProfileController::featuredStacks
 * @see app/Http/Controllers/AboutProfileController.php:149
 * @route '/api/about/featured-stacks'
 */
        featuredStacksForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: featuredStacks.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AboutProfileController::featuredStacks
 * @see app/Http/Controllers/AboutProfileController.php:149
 * @route '/api/about/featured-stacks'
 */
        featuredStacksForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: featuredStacks.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    featuredStacks.form = featuredStacksForm
/**
* @see \App\Http\Controllers\AboutProfileController::indexExperiences
 * @see app/Http/Controllers/AboutProfileController.php:213
 * @route '/api/about/experiences'
 */
export const indexExperiences = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexExperiences.url(options),
    method: 'get',
})

indexExperiences.definition = {
    methods: ["get","head"],
    url: '/api/about/experiences',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AboutProfileController::indexExperiences
 * @see app/Http/Controllers/AboutProfileController.php:213
 * @route '/api/about/experiences'
 */
indexExperiences.url = (options?: RouteQueryOptions) => {
    return indexExperiences.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AboutProfileController::indexExperiences
 * @see app/Http/Controllers/AboutProfileController.php:213
 * @route '/api/about/experiences'
 */
indexExperiences.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexExperiences.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AboutProfileController::indexExperiences
 * @see app/Http/Controllers/AboutProfileController.php:213
 * @route '/api/about/experiences'
 */
indexExperiences.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexExperiences.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AboutProfileController::indexExperiences
 * @see app/Http/Controllers/AboutProfileController.php:213
 * @route '/api/about/experiences'
 */
    const indexExperiencesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexExperiences.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AboutProfileController::indexExperiences
 * @see app/Http/Controllers/AboutProfileController.php:213
 * @route '/api/about/experiences'
 */
        indexExperiencesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexExperiences.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AboutProfileController::indexExperiences
 * @see app/Http/Controllers/AboutProfileController.php:213
 * @route '/api/about/experiences'
 */
        indexExperiencesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexExperiences.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexExperiences.form = indexExperiencesForm
/**
* @see \App\Http\Controllers\AboutProfileController::indexCaseStudies
 * @see app/Http/Controllers/AboutProfileController.php:294
 * @route '/api/about/case-studies'
 */
export const indexCaseStudies = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexCaseStudies.url(options),
    method: 'get',
})

indexCaseStudies.definition = {
    methods: ["get","head"],
    url: '/api/about/case-studies',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AboutProfileController::indexCaseStudies
 * @see app/Http/Controllers/AboutProfileController.php:294
 * @route '/api/about/case-studies'
 */
indexCaseStudies.url = (options?: RouteQueryOptions) => {
    return indexCaseStudies.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AboutProfileController::indexCaseStudies
 * @see app/Http/Controllers/AboutProfileController.php:294
 * @route '/api/about/case-studies'
 */
indexCaseStudies.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexCaseStudies.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AboutProfileController::indexCaseStudies
 * @see app/Http/Controllers/AboutProfileController.php:294
 * @route '/api/about/case-studies'
 */
indexCaseStudies.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexCaseStudies.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AboutProfileController::indexCaseStudies
 * @see app/Http/Controllers/AboutProfileController.php:294
 * @route '/api/about/case-studies'
 */
    const indexCaseStudiesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexCaseStudies.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AboutProfileController::indexCaseStudies
 * @see app/Http/Controllers/AboutProfileController.php:294
 * @route '/api/about/case-studies'
 */
        indexCaseStudiesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexCaseStudies.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AboutProfileController::indexCaseStudies
 * @see app/Http/Controllers/AboutProfileController.php:294
 * @route '/api/about/case-studies'
 */
        indexCaseStudiesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexCaseStudies.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexCaseStudies.form = indexCaseStudiesForm
/**
* @see \App\Http\Controllers\AboutProfileController::getAvailability
 * @see app/Http/Controllers/AboutProfileController.php:170
 * @route '/api/about/availability'
 */
export const getAvailability = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAvailability.url(options),
    method: 'get',
})

getAvailability.definition = {
    methods: ["get","head"],
    url: '/api/about/availability',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AboutProfileController::getAvailability
 * @see app/Http/Controllers/AboutProfileController.php:170
 * @route '/api/about/availability'
 */
getAvailability.url = (options?: RouteQueryOptions) => {
    return getAvailability.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AboutProfileController::getAvailability
 * @see app/Http/Controllers/AboutProfileController.php:170
 * @route '/api/about/availability'
 */
getAvailability.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAvailability.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AboutProfileController::getAvailability
 * @see app/Http/Controllers/AboutProfileController.php:170
 * @route '/api/about/availability'
 */
getAvailability.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getAvailability.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AboutProfileController::getAvailability
 * @see app/Http/Controllers/AboutProfileController.php:170
 * @route '/api/about/availability'
 */
    const getAvailabilityForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getAvailability.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AboutProfileController::getAvailability
 * @see app/Http/Controllers/AboutProfileController.php:170
 * @route '/api/about/availability'
 */
        getAvailabilityForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getAvailability.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AboutProfileController::getAvailability
 * @see app/Http/Controllers/AboutProfileController.php:170
 * @route '/api/about/availability'
 */
        getAvailabilityForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getAvailability.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getAvailability.form = getAvailabilityForm
/**
* @see \App\Http\Controllers\AboutProfileController::getStats
 * @see app/Http/Controllers/AboutProfileController.php:114
 * @route '/api/about/stats'
 */
export const getStats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStats.url(options),
    method: 'get',
})

getStats.definition = {
    methods: ["get","head"],
    url: '/api/about/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AboutProfileController::getStats
 * @see app/Http/Controllers/AboutProfileController.php:114
 * @route '/api/about/stats'
 */
getStats.url = (options?: RouteQueryOptions) => {
    return getStats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AboutProfileController::getStats
 * @see app/Http/Controllers/AboutProfileController.php:114
 * @route '/api/about/stats'
 */
getStats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStats.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AboutProfileController::getStats
 * @see app/Http/Controllers/AboutProfileController.php:114
 * @route '/api/about/stats'
 */
getStats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getStats.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AboutProfileController::getStats
 * @see app/Http/Controllers/AboutProfileController.php:114
 * @route '/api/about/stats'
 */
    const getStatsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getStats.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AboutProfileController::getStats
 * @see app/Http/Controllers/AboutProfileController.php:114
 * @route '/api/about/stats'
 */
        getStatsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getStats.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AboutProfileController::getStats
 * @see app/Http/Controllers/AboutProfileController.php:114
 * @route '/api/about/stats'
 */
        getStatsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getStats.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getStats.form = getStatsForm
/**
* @see \App\Http\Controllers\AboutProfileController::update
 * @see app/Http/Controllers/AboutProfileController.php:72
 * @route '/api/about'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/about',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\AboutProfileController::update
 * @see app/Http/Controllers/AboutProfileController.php:72
 * @route '/api/about'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AboutProfileController::update
 * @see app/Http/Controllers/AboutProfileController.php:72
 * @route '/api/about'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\AboutProfileController::update
 * @see app/Http/Controllers/AboutProfileController.php:72
 * @route '/api/about'
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
* @see \App\Http\Controllers\AboutProfileController::update
 * @see app/Http/Controllers/AboutProfileController.php:72
 * @route '/api/about'
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
* @see \App\Http\Controllers\AboutProfileController::storeExperience
 * @see app/Http/Controllers/AboutProfileController.php:220
 * @route '/api/about/experiences'
 */
export const storeExperience = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeExperience.url(options),
    method: 'post',
})

storeExperience.definition = {
    methods: ["post"],
    url: '/api/about/experiences',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AboutProfileController::storeExperience
 * @see app/Http/Controllers/AboutProfileController.php:220
 * @route '/api/about/experiences'
 */
storeExperience.url = (options?: RouteQueryOptions) => {
    return storeExperience.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AboutProfileController::storeExperience
 * @see app/Http/Controllers/AboutProfileController.php:220
 * @route '/api/about/experiences'
 */
storeExperience.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeExperience.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AboutProfileController::storeExperience
 * @see app/Http/Controllers/AboutProfileController.php:220
 * @route '/api/about/experiences'
 */
    const storeExperienceForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeExperience.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AboutProfileController::storeExperience
 * @see app/Http/Controllers/AboutProfileController.php:220
 * @route '/api/about/experiences'
 */
        storeExperienceForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeExperience.url(options),
            method: 'post',
        })
    
    storeExperience.form = storeExperienceForm
/**
* @see \App\Http\Controllers\AboutProfileController::updateExperience
 * @see app/Http/Controllers/AboutProfileController.php:250
 * @route '/api/about/experiences/{id}'
 */
export const updateExperience = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateExperience.url(args, options),
    method: 'put',
})

updateExperience.definition = {
    methods: ["put"],
    url: '/api/about/experiences/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\AboutProfileController::updateExperience
 * @see app/Http/Controllers/AboutProfileController.php:250
 * @route '/api/about/experiences/{id}'
 */
updateExperience.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return updateExperience.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AboutProfileController::updateExperience
 * @see app/Http/Controllers/AboutProfileController.php:250
 * @route '/api/about/experiences/{id}'
 */
updateExperience.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateExperience.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\AboutProfileController::updateExperience
 * @see app/Http/Controllers/AboutProfileController.php:250
 * @route '/api/about/experiences/{id}'
 */
    const updateExperienceForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateExperience.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AboutProfileController::updateExperience
 * @see app/Http/Controllers/AboutProfileController.php:250
 * @route '/api/about/experiences/{id}'
 */
        updateExperienceForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateExperience.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateExperience.form = updateExperienceForm
/**
* @see \App\Http\Controllers\AboutProfileController::destroyExperience
 * @see app/Http/Controllers/AboutProfileController.php:284
 * @route '/api/about/experiences/{id}'
 */
export const destroyExperience = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyExperience.url(args, options),
    method: 'delete',
})

destroyExperience.definition = {
    methods: ["delete"],
    url: '/api/about/experiences/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\AboutProfileController::destroyExperience
 * @see app/Http/Controllers/AboutProfileController.php:284
 * @route '/api/about/experiences/{id}'
 */
destroyExperience.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return destroyExperience.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AboutProfileController::destroyExperience
 * @see app/Http/Controllers/AboutProfileController.php:284
 * @route '/api/about/experiences/{id}'
 */
destroyExperience.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyExperience.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\AboutProfileController::destroyExperience
 * @see app/Http/Controllers/AboutProfileController.php:284
 * @route '/api/about/experiences/{id}'
 */
    const destroyExperienceForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyExperience.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AboutProfileController::destroyExperience
 * @see app/Http/Controllers/AboutProfileController.php:284
 * @route '/api/about/experiences/{id}'
 */
        destroyExperienceForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyExperience.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyExperience.form = destroyExperienceForm
/**
* @see \App\Http\Controllers\AboutProfileController::storeCaseStudy
 * @see app/Http/Controllers/AboutProfileController.php:299
 * @route '/api/about/case-studies'
 */
export const storeCaseStudy = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeCaseStudy.url(options),
    method: 'post',
})

storeCaseStudy.definition = {
    methods: ["post"],
    url: '/api/about/case-studies',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AboutProfileController::storeCaseStudy
 * @see app/Http/Controllers/AboutProfileController.php:299
 * @route '/api/about/case-studies'
 */
storeCaseStudy.url = (options?: RouteQueryOptions) => {
    return storeCaseStudy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AboutProfileController::storeCaseStudy
 * @see app/Http/Controllers/AboutProfileController.php:299
 * @route '/api/about/case-studies'
 */
storeCaseStudy.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeCaseStudy.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AboutProfileController::storeCaseStudy
 * @see app/Http/Controllers/AboutProfileController.php:299
 * @route '/api/about/case-studies'
 */
    const storeCaseStudyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeCaseStudy.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AboutProfileController::storeCaseStudy
 * @see app/Http/Controllers/AboutProfileController.php:299
 * @route '/api/about/case-studies'
 */
        storeCaseStudyForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeCaseStudy.url(options),
            method: 'post',
        })
    
    storeCaseStudy.form = storeCaseStudyForm
/**
* @see \App\Http\Controllers\AboutProfileController::updateCaseStudy
 * @see app/Http/Controllers/AboutProfileController.php:318
 * @route '/api/about/case-studies/{id}'
 */
export const updateCaseStudy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateCaseStudy.url(args, options),
    method: 'put',
})

updateCaseStudy.definition = {
    methods: ["put"],
    url: '/api/about/case-studies/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\AboutProfileController::updateCaseStudy
 * @see app/Http/Controllers/AboutProfileController.php:318
 * @route '/api/about/case-studies/{id}'
 */
updateCaseStudy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return updateCaseStudy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AboutProfileController::updateCaseStudy
 * @see app/Http/Controllers/AboutProfileController.php:318
 * @route '/api/about/case-studies/{id}'
 */
updateCaseStudy.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateCaseStudy.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\AboutProfileController::updateCaseStudy
 * @see app/Http/Controllers/AboutProfileController.php:318
 * @route '/api/about/case-studies/{id}'
 */
    const updateCaseStudyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateCaseStudy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AboutProfileController::updateCaseStudy
 * @see app/Http/Controllers/AboutProfileController.php:318
 * @route '/api/about/case-studies/{id}'
 */
        updateCaseStudyForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateCaseStudy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateCaseStudy.form = updateCaseStudyForm
/**
* @see \App\Http\Controllers\AboutProfileController::destroyCaseStudy
 * @see app/Http/Controllers/AboutProfileController.php:341
 * @route '/api/about/case-studies/{id}'
 */
export const destroyCaseStudy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyCaseStudy.url(args, options),
    method: 'delete',
})

destroyCaseStudy.definition = {
    methods: ["delete"],
    url: '/api/about/case-studies/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\AboutProfileController::destroyCaseStudy
 * @see app/Http/Controllers/AboutProfileController.php:341
 * @route '/api/about/case-studies/{id}'
 */
destroyCaseStudy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return destroyCaseStudy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AboutProfileController::destroyCaseStudy
 * @see app/Http/Controllers/AboutProfileController.php:341
 * @route '/api/about/case-studies/{id}'
 */
destroyCaseStudy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyCaseStudy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\AboutProfileController::destroyCaseStudy
 * @see app/Http/Controllers/AboutProfileController.php:341
 * @route '/api/about/case-studies/{id}'
 */
    const destroyCaseStudyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyCaseStudy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AboutProfileController::destroyCaseStudy
 * @see app/Http/Controllers/AboutProfileController.php:341
 * @route '/api/about/case-studies/{id}'
 */
        destroyCaseStudyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyCaseStudy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyCaseStudy.form = destroyCaseStudyForm
/**
* @see \App\Http\Controllers\AboutProfileController::updateAvailability
 * @see app/Http/Controllers/AboutProfileController.php:183
 * @route '/api/about/availability'
 */
export const updateAvailability = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateAvailability.url(options),
    method: 'put',
})

updateAvailability.definition = {
    methods: ["put"],
    url: '/api/about/availability',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\AboutProfileController::updateAvailability
 * @see app/Http/Controllers/AboutProfileController.php:183
 * @route '/api/about/availability'
 */
updateAvailability.url = (options?: RouteQueryOptions) => {
    return updateAvailability.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AboutProfileController::updateAvailability
 * @see app/Http/Controllers/AboutProfileController.php:183
 * @route '/api/about/availability'
 */
updateAvailability.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateAvailability.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\AboutProfileController::updateAvailability
 * @see app/Http/Controllers/AboutProfileController.php:183
 * @route '/api/about/availability'
 */
    const updateAvailabilityForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateAvailability.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AboutProfileController::updateAvailability
 * @see app/Http/Controllers/AboutProfileController.php:183
 * @route '/api/about/availability'
 */
        updateAvailabilityForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateAvailability.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateAvailability.form = updateAvailabilityForm
/**
* @see \App\Http\Controllers\AboutProfileController::updateStats
 * @see app/Http/Controllers/AboutProfileController.php:125
 * @route '/api/about/stats'
 */
export const updateStats = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateStats.url(options),
    method: 'put',
})

updateStats.definition = {
    methods: ["put"],
    url: '/api/about/stats',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\AboutProfileController::updateStats
 * @see app/Http/Controllers/AboutProfileController.php:125
 * @route '/api/about/stats'
 */
updateStats.url = (options?: RouteQueryOptions) => {
    return updateStats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AboutProfileController::updateStats
 * @see app/Http/Controllers/AboutProfileController.php:125
 * @route '/api/about/stats'
 */
updateStats.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateStats.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\AboutProfileController::updateStats
 * @see app/Http/Controllers/AboutProfileController.php:125
 * @route '/api/about/stats'
 */
    const updateStatsForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateStats.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AboutProfileController::updateStats
 * @see app/Http/Controllers/AboutProfileController.php:125
 * @route '/api/about/stats'
 */
        updateStatsForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateStats.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateStats.form = updateStatsForm
const AboutProfileController = { show, featuredStacks, indexExperiences, indexCaseStudies, getAvailability, getStats, update, storeExperience, updateExperience, destroyExperience, storeCaseStudy, updateCaseStudy, destroyCaseStudy, updateAvailability, updateStats }

export default AboutProfileController