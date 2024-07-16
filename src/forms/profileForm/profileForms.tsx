import { useUpdateProfileMutation } from '../../services/authApi.ts'
import { useState, useEffect, useRef } from 'react'
import { editUserName, getMemoizedUser } from '../../features/authSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { Field, Form } from 'react-final-form'
import { useValidators } from '../validators/validators.ts'
import type { UserType } from '../../types/user.model.ts'
import styles from './profileForm.module.css'

/**
 * Profile Form component to handle user name update
 *
 * @returns {JSX.Element} form component
 */
const ProfileForm = () => {
    /**
     * State variable to show/hide edit name form
     */
    const [isUserEditingShown, setIsUserEditingShown] = useState(false)

    /**
     * Store dispatch hook to dispatch actions to the store
     */
    const dispatch = useAppDispatch()

    /**
     * Mutation hook to update user name
     */
    const [updateProfile] = useUpdateProfileMutation()

    /**
     * Store hook to retrieve user data from the store
     */
    const { firstName, lastName } = useAppSelector(getMemoizedUser)

    /**
     * Ref hook to the first name form input
     */
    const userRef = useRef<HTMLInputElement>(null)

    /**
     * Validators hook to validate form inputs
     */
    const { validInput } = useValidators()

    /**
     * Use effect hook to set focus on input field
     */
    useEffect(() => userRef.current?.focus(), [isUserEditingShown])

    /**
     * Handles user edit validation and dispatches action to update user name in store
     * @param {UserType} editedUserName - new user name
     * @returns {Promise<void>}
     */
    const handleUserEditValidation = async (
        editedUserName: UserType,
    ): Promise<void> => {
        await updateProfile(editedUserName)
        dispatch(
            editUserName({
                userName: editedUserName,
            }),
        )
        setIsUserEditingShown(false)
    }

    /**
     * Handles show/hide edit form event
     */
    const handleUserEdit = () => setIsUserEditingShown(true)

    return (
        <>
            {!isUserEditingShown && (
                <button className={styles.editButton} onClick={handleUserEdit}>
                    Edit Name
                </button>
            )}
            {isUserEditingShown && (
                <Form
                    onSubmit={handleUserEditValidation}
                    render={({ handleSubmit, form, pristine }) => (
                        <form onSubmit={handleSubmit}>
                            <div className={styles.inputWrapper}>
                                <Field
                                    name="firstName"
                                    validate={validInput}
                                    initialValue={firstName ?? ''}
                                    render={({ input, meta }) => (
                                        <div className={styles.inputWrapper}>
                                            <input type="text" ref={userRef} {...input} />
                                            {meta.error && meta.touched && (
                                                <span style={{ color: 'red' }}>{meta.error}</span>
                                            )}
                                        </div>
                                    )}
                                />
                                <Field
                                    name="lastName"
                                    validate={validInput}
                                    initialValue={lastName ?? ''}
                                    render={({ input, meta }) => (
                                        <div className={styles.inputWrapper}>
                                            <input type="text" {...input} />
                                            {meta.error && meta.touched && (
                                                <span style={{ color: 'red' }}>{meta.error}</span>
                                            )}
                                        </div>
                                    )}
                                />
                            </div>
                            <div className={styles.inputWrapper}>
                                <button className={styles.editButton} disabled={pristine}>
                                    Save
                                </button>
                                <button
                                    className={styles.editButton}
                                    onClick={() => form.reset()}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                />
            )}
        </>
    )
}

export default ProfileForm