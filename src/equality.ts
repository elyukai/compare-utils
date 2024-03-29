/**
 * A function that compares two values for equality.
 */
export type Equality<T> = (a: T, b: T) => boolean

/**
 * Build an equality function for values that are nested inside other values.
 * The nested value is getting extracted by the provided accessor function and
 * then compared using the provided equality function.
 */
export const equalityAt =
  <T, U>(accessor: (value: T) => U, equality: Equality<U>): Equality<T> =>
  (a, b) =>
    equality(accessor(a), accessor(b))

/**
 * Checks two values for value equality. This is a deep equality check that
 * works for all types, including objects and arrays. For objects, it only
 * compares all enumerable keys, no other properties or the prototype chain.
 */
export const deepEqual = <T>(a: T, b: T): boolean => {
  if (a === b) {
    return true
  }

  if (typeof a === "object" && typeof b === "object" && a !== null && b !== null) {
    const keys = Object.keys(a)
    if (keys.length !== Object.keys(b).length) {
      return false
    }
    return keys.every(
      key => key in b && deepEqual(a[key as keyof typeof a], b[key as keyof typeof b]),
    )
  }

  return false
}
