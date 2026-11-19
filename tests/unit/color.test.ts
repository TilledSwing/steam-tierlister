import { describe, expect, it } from 'vitest';
import { isValidHexColor, normalizeHexColor } from '../../frontend/core/color';

describe('isValidHexColor', () => {
	it.each(['#000000', '#ffffff', '#ff7f7f', '#1a2b3c'])('accepts canonical %s', (value) => {
		expect(isValidHexColor(value)).toBe(true);
	});

	it.each([
		['uppercase', '#FF7F7F'],
		['mixed case', '#Ff7f7F'],
		['missing #', 'ff7f7f'],
		['shorthand', '#f80'],
		['alpha', '#ff7f7fff'],
		['too short', '#12345'],
		['non-hex characters', '#gg0000'],
		['surrounding whitespace', ' #ff7f7f'],
		['trailing newline', '#ff7f7f\n'],
		['empty', ''],
	])('rejects %s (%j)', (_label, value) => {
		expect(isValidHexColor(value)).toBe(false);
	});
});

describe('normalizeHexColor', () => {
	it.each([
		['#ff7f7f', '#ff7f7f'],
		['#FF7F7F', '#ff7f7f'],
		['ff7f7f', '#ff7f7f'],
		['  #Ff7F7f  ', '#ff7f7f'],
		['#f80', '#ff8800'],
		['F80', '#ff8800'],
		['#000', '#000000'],
	])('normalizes %j to %j', (input, expected) => {
		expect(normalizeHexColor(input)).toBe(expected);
	});

	it.each([
		['empty', ''],
		['only #', '#'],
		['whitespace only', '   '],
		['5 digits', '#12345'],
		['4 digits (rgba shorthand)', '#f80a'],
		['8 digits (alpha)', '#ff7f7fff'],
		['non-hex', '#zz0000'],
		['double #', '##ff7f7f'],
		['inner space', '#ff 7f7f'],
	])('rejects %s (%j)', (_label, input) => {
		expect(normalizeHexColor(input)).toBeNull();
	});

	it('always returns a value that isValidHexColor accepts', () => {
		for (const input of ['#ABC', 'abcdef', ' #123456 ']) {
			const result = normalizeHexColor(input);
			expect(result).not.toBeNull();
			expect(isValidHexColor(result as string)).toBe(true);
		}
	});
});
