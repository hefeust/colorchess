
import { Renderer } from 'svelte-preprocess-markdown'

const renderer = Renderer()

renderer.heading = function(text, level) {
    if(level === 1) return '<h1 class="title is-3">' + text + '</h1>'
    if(level === 2) return '<h2 class="subtitle is-4">' + text + '</h2>'
    if(level === 3) return '<h3 class="subtitle is-5">' + text + '</h3>'

    return text
}

renderer.paragraph = function(text) {
    return '<p class="content is-medium">' + text + '</p>'
}

renderer.link = function(href, title, text) {
    const attr_href = 'href="' + href + '"'
    const attr_title = 'title="' + title + '"'

    const attr_onclick = ''

    return ['<a', attr_href, attr_title, '>', text, '</a>'].join(' ')
}

renderer.image = (src, alt) => {
    return '<figure class="image is-rounded is-sqaure">'
        + '<img src="' + src +'" alt="' + alt + '" />'
        + '</figure>'
}

export const markdown_options = { renderer }

