/**
 * Check if a variable exists
 *
 * @param {unknown} valueToCheck - Variable to check
 * @returns {boolean}
 *
 * ```ts
 * if(doesExist(result.data)) { }
 * ```
 */
const doesExist = (valueToCheck: unknown): boolean =>
  !(typeof valueToCheck === "undefined" || valueToCheck == null);

/**
 * Generate an ID
 *
 * @param {number} idLength - Length of the id
 * @param {('numeric' | 'letters' | 'any')} [mode] - The useable characters
 * @returns {string}
 *
 * ```ts
 * project.id = generateId(10)
 * ```
 */
const generateId = (
  idLength: number,
  mode?: "numeric" | "letters" | "any"
): string => {
  let id = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  if (mode === "numeric") {
    possible = "0123456789";
  } else if (mode === "letters") {
    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  for (let index = 0; index < idLength; index++) {
    id += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return id;
};

export { doesExist, generateId };
