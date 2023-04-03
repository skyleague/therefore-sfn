import { baseInOutState } from './base.schema.js'

import { $array, $const, $object, $optional, $ref, $string, $unknown } from '@skyleague/therefore'

// @todo: define conditions and choices
const choices = $object({ Next: $string }, { name: 'choices', indexSignature: $unknown() })

export const choiceState = $object({
    Type: $const('Choice'),
    ...baseInOutState,
    Choices: $array($ref(choices), { minItems: 1 }),
    Default: $optional($string()),
})
