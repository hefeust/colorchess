
import { create_trie } from '@toolkit'

const trie = create_trie({ debug: true })

console.log('### trie tree testing ###')

// nconsole.log(trie)

trie.attach('', '#init!', { data: '#init!' })
trie.attach('#init!', 'a', { data: '#init!/a' })
trie.attach('#init!', 'b', { data: '#init!/b' })
trie.attach('#init!', 'c', { data: '#init!/c' })

console.log('tire.subpaths', trie.subpaths('#init!'))
