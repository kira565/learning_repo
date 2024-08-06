# KEYMAPS

## INSERT Mode

Suggestion menu movings:
next item - `ctrl +j`,
prev item - `ctrl +pi`

## NORMAL Mode

### Moving

#### horizontal

`w`(start),`e`(end),`b`(prev start) - jump words

#### vertical

`[number]j or [number]k ` -up/down to [number] lines

### Editing

`ciw` - delete word and enter insert mode;

`cit` - delete everything between tags(e.g. `<span>[removing content]</span>`) and enter insert mode (VERY COOL FOR JSX/HTML, even if cursor on tag)

`ciq` - same! Delete everything between quotes (e.g. `"removing_content"`)

`cib` - same! but inside brackets `(content)`

`o` - new line down and `O` - new line up

`a` - insert mode after of cursor `A` - end of line

`i` - insert mode before cursor `I` - start of line

`u` - undo last change `ctrl + R` - redo

`~` - switch case to opposite

`%` - jump to matching () [] {} (means to the second one)

### LSP Keyboards

`gd` - go to definition

`gh` - HOVER like mouse hover

MARKERS (e.g. Error)
`[ + d` - prev marker

`] + d` - next marker

`*` - when cursor on word, will go to the next instance (`#` - for prev)

## EASY MOTIONS AND SEARCH

Simple search `/[word]` + `enter`, then `n` - next, `N` - prev

`<leader><leader> s <char>` - Search character
