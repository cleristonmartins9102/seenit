import { FieldAddChangeMonitor, FieldAddElement, FieldAddValidator, FieldDeleteValidator, FieldFocusOut, FieldGetError, FieldGetValue, FieldReset, FieldSetAutoComplete, FieldSetValue, FieldSetValueSilent, FieldToutched } from '@/domain/uteis/field'
import { Subscribe } from '@/domain/uteis/subscribe'
import { SubscribeFocusOut } from '@/domain/uteis/subscribe-focus-out'
import { Unsubscribe } from '@/domain/uteis/unsubscribe'

export type FieldControl = FieldFocusOut & FieldSetAutoComplete & FieldAddChangeMonitor & FieldReset & FieldGetError & FieldDeleteValidator & FieldAddValidator & FieldToutched & FieldAddElement<any> & FieldGetValue & FieldGetError & FieldSetValue & Subscribe & Unsubscribe & FieldSetValueSilent & SubscribeFocusOut
