export const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
export const PWD_REGEX = /^(?=.*\d)(?=.*[a-z]).{8,32}$/
export const USER_REGEX = /^[a-zA-Z]+(?:([',. -][a-zA-Z ])?[a-zA-Z])$/

type FieldValidator = (value?: string) => string

/**
* useValidators returns an object with utility functions for input validation.
@returns {Object} Object with utility functions for input validation.
*/
export const useValidators = () => {
    const required: FieldValidator = (value = '') => (value ? '' : 'Required')

    const validEmail: FieldValidator = (value = '') => {
        return value.match(EMAIL_REGEX) ? '' : 'You must enter a valid email.'
    }

    const validPassword: FieldValidator = (value = '') => {
        return value.match(PWD_REGEX) ? '' : 'You must enter a valid password.'
    }

    const validInput: FieldValidator = (value = '') => {
        return value.match(USER_REGEX) ? '' : 'You must enter a valid name.'
    }

    /**
  * Composes multiple validation functions into a single validation function.
  @param {...FieldValidator} validators
  @returns {FieldValidator}
  */
    const composeValidators =
        (...validators: FieldValidator[]) =>
            (value: string) =>
                validators.reduce((error, validator) => error || validator(value), '')

    return { required, validEmail, validPassword, validInput, composeValidators }
}