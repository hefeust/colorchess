
import About from '@guides/About.md'
import QuickStart from '@guides/QuickStart.md'
import FR_Guide from '@guides/FR_Guide.md'
import ColoredGlimpse from '@guides/ColoredGlimpse.md'
import TechnicalDetails from '@guides/TechnicalDetails.md'
import CodeInDepth from '@guides/CodeInDepth.md'

const TOC = new Map()

// could it be an array to allow efficient page sorting ?
TOC.set('quick-start', QuickStart)
TOC.set('about', About)
TOC.set('guide-en-francais', FR_Guide)
TOC.set('technical-details', TechnicalDetails)
TOC.set('colored-glimpse', ColoredGlimpse)
TOC.set('code-in-depth', CodeInDepth)

// What if more than one level ?
export const get_component = (name) => TOC.get(name)

