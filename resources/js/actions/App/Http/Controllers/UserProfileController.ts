import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\UserProfileController::update
 * @see app/Http/Controllers/UserProfileController.php:12
 * @route '/api/user/profile-update'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/api/user/profile-update',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\UserProfileController::update
 * @see app/Http/Controllers/UserProfileController.php:12
 * @route '/api/user/profile-update'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\UserProfileController::update
 * @see app/Http/Controllers/UserProfileController.php:12
 * @route '/api/user/profile-update'
 */
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\UserProfileController::update
 * @see app/Http/Controllers/UserProfileController.php:12
 * @route '/api/user/profile-update'
 */
    const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\UserProfileController::update
 * @see app/Http/Controllers/UserProfileController.php:12
 * @route '/api/user/profile-update'
 */
        updateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(options),
            method: 'post',
        })
    
    update.form = updateForm
const UserProfileController = { update }

export default UserProfileController