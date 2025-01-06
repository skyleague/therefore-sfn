import { baseInOutState } from './base.schema.js'

import { $const, $intersection, $object, $record, $ref, $string, $unknown } from '@skyleague/therefore'

// @todo: define conditions and choices
export const choices = $intersection([$record($unknown), $object({ Next: $string })])

export const choiceState = baseInOutState.extend({
    Type: $const('Choice'),
    Choices: $ref(choices).array({ minItems: 1 }),
    Default: $string().optional(),
})
