const toDelta = require('./toDelta')

test('converts text with emphasis and strong', () => {
  const input = 'Hello *w**or**ld*'
  const expected = [
    { insert: 'Hello ' },
    { insert: 'w', attributes: { italic: true } },
    { insert: 'or', attributes: { bold: true, italic: true } },
    { insert: 'ld', attributes: { italic: true } },
    { insert: '\n' },
  ]

  var result = toDelta(input)

  expect(result).toMatchObject(expected)
})

test('converts text with strong and emphasis', () => {
  const input = 'Hello **w*or*ld**'
  const expected = [
    { insert: 'Hello ' },
    { insert: 'w', attributes: { bold: true } },
    { insert: 'or', attributes: { bold: true, italic: true } },
    { insert: 'ld', attributes: { bold: true } },
    { insert: '\n' },
  ]

  var result = toDelta(input)

  expect(result).toMatchObject(expected)
})

test('converts text with strong link', () => {
  const input = 'Hello **[world](url)**'
  const expected = [
    { insert: 'Hello ' },
    { insert: 'world', attributes: { link: 'url', bold: true } },
    { insert: '\n' },
  ]

  var result = toDelta(input)

  expect(result).toMatchObject(expected)
})

test('converts text block quote', () => {
  const input = '> line *1*\n>\n> line 2\n'
  const expected = [
    { insert: 'line ' },
    { insert: '1', attributes: { italic: true } },
    { insert: '\n', attributes: { blockquote: true } },
    { insert: 'line 2' },
    { insert: '\n', attributes: { blockquote: true } },
  ]

  var result = toDelta(input)

  expect(result).toMatchObject(expected)
})

test('converts text code block', () => {
  const input = '```\nline 1\nline 2\n```\n\n'
  const expected = [
    { insert: 'line 1\nline 2\n', attributes: { 'code-block': true } },
  ]

  var result = toDelta(input)

  expect(result).toMatchObject(expected)
})
