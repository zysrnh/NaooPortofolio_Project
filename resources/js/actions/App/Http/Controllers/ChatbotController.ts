import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ChatbotController::ask
 * @see app/Http/Controllers/ChatbotController.php:11
 * @route '/api/chatbot'
 */
export const ask = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ask.url(options),
    method: 'post',
})

ask.definition = {
    methods: ["post"],
    url: '/api/chatbot',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ChatbotController::ask
 * @see app/Http/Controllers/ChatbotController.php:11
 * @route '/api/chatbot'
 */
ask.url = (options?: RouteQueryOptions) => {
    return ask.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChatbotController::ask
 * @see app/Http/Controllers/ChatbotController.php:11
 * @route '/api/chatbot'
 */
ask.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ask.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ChatbotController::ask
 * @see app/Http/Controllers/ChatbotController.php:11
 * @route '/api/chatbot'
 */
    const askForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: ask.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ChatbotController::ask
 * @see app/Http/Controllers/ChatbotController.php:11
 * @route '/api/chatbot'
 */
        askForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: ask.url(options),
            method: 'post',
        })
    
    ask.form = askForm
const ChatbotController = { ask }

export default ChatbotController