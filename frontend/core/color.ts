/**
 * Tier color helpers (pure, no Steam/React imports; see ARCHITECTURE.md §1).
 * Used by the tier color editor: preset swatches + a hex text field (D-012).
 *
 * Canonical form used everywhere in the app and in saved files: "#rrggbb" (lowercase, 7 characters).
 */

/**
 * Checks whether `value` is already in canonical form.
 *
 * Rules:
 * - exactly 7 characters: "#" followed by 6 hex digits (0-9, a-f)
 * - lowercase only ("#FF0000" is NOT canonical; use {@link normalizeHexColor} for user input)
 * - no surrounding whitespace, no shorthand ("#f00"), no alpha ("#ff0000ff")
 *
 * @example isValidHexColor('#ff7f7f') // true
 * @example isValidHexColor('#FF7F7F') // false
 */
export function isValidHexColor(value: string): boolean {
	// TODO: return true only for canonical "#rrggbb". Hint: a regular expression anchored with ^ and $.
	throw new Error(`isValidHexColor is not implemented yet (value: ${value})`);
}

/**
 * Converts user input from the hex text field into canonical form, or returns `null` if it can't be
 * interpreted as a color.
 *
 * Accepts (case-insensitive, surrounding whitespace ignored):
 * - "#rrggbb" and "rrggbb"      → "#rrggbb"
 * - "#rgb" and "rgb" shorthand  → each digit doubled: "#f80" → "#ff8800"
 *
 * Rejects (returns null): empty input, wrong length, non-hex characters, alpha forms (#rgba / #rrggbbaa).
 *
 * @example normalizeHexColor(' #FF7F7F ') // '#ff7f7f'
 * @example normalizeHexColor('f80')       // '#ff8800'
 * @example normalizeHexColor('#12345')    // null
 */
export function normalizeHexColor(input: string): string | null {
	// TODO: trim, drop an optional leading "#", validate the remaining 3 or 6 hex digits,
	// expand 3-digit shorthand, lowercase, and return with "#". Return null for anything else.
	// Tip: the result must satisfy isValidHexColor().
	throw new Error(`normalizeHexColor is not implemented yet (input: ${input})`);
}
