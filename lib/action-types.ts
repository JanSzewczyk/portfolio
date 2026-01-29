/**
 * Success state returned by server actions
 * @template T - The type of data returned on success
 */
type ActionStateSuccess<T> = {
  /** Indicates the action completed successfully */
  success: true;
  /** The data returned by the action */
  data: T;
  /** Optional success message for user feedback */
  message?: string;
};

/**
 * Failure state returned by server actions
 */
type ActionStateFailed = {
  /** Indicates the action failed */
  success: false;
  /** Error message describing what went wrong */
  error: string;
  /** Field-specific validation errors for forms */
  fieldErrors?: Record<string, string[]>;
};

/**
 * Response type for actions that return data
 * @template T - The type of data returned on success (defaults to unknown)
 *
 * @example
 * ```typescript
 * export async function getUser(id: string): ActionResponse<User> {
 *   const [error, user] = await getUserById(id);
 *   if (error) return { success: false, error: error.message };
 *   return { success: true, data: user };
 * }
 * ```
 */
export type ActionResponse<T = unknown> = Promise<ActionStateSuccess<T> | ActionStateFailed>;

/**
 * Response type for actions that redirect on success
 * Uses `never` to indicate the function doesn't return on success
 *
 * @example
 * ```typescript
 * export async function createPost(data: FormData): RedirectAction {
 *   const [error, post] = await createPostInDb(data);
 *   if (error) return { success: false, error: error.message };
 *   redirect(`/posts/${post.id}`);
 * }
 * ```
 */
export type RedirectAction = Promise<never | ActionStateFailed>;

/**
 * Type guard for action success
 */
export function isActionSuccess<T>(result: Awaited<ActionResponse<T>>): result is ActionStateSuccess<T> {
  return result.success === true;
}

/**
 * Type guard for action failure
 */
export function isActionFailed(result: Awaited<ActionResponse<unknown>>): result is ActionStateFailed {
  return result.success === false;
}
