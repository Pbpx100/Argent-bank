import style from './profile.module.css'
import { useGetProfileMutation } from '../../services/authApi'
import { useEffect } from 'react';
import { getMemoizedUser, setUserName } from '../../features/authSlice';
import { UserSchema } from '../../types/user.model';
import ProfileForm from '../../forms/profileForm/profileForms';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';


export default function Profile() {

    const dispatch = useAppDispatch();
    const { firstName, lastName } = useAppSelector(getMemoizedUser);
    const [getProfile, { data, isSuccess, error }] = useGetProfileMutation();

    useEffect(() => {
        getProfile('')
    }, [])

    useEffect(() => {
        if (isSuccess && data) {
            const parsedUser = UserSchema.safeParse(data.body)
            if (!parsedUser.success) {
                console.log('Error: ' + parsedUser.error.issues[0].code + ':',
                    parsedUser.error.issues[0].message,

                )
                return;
            }
            dispatch(setUserName({
                userName: data.body,
            }),
            )
        }
        if (error) {
            if ('status' in error) {
                const errMsg =
                    'error' in error ? error.error : JSON.stringify(error.data)
                console.log(errMsg)
            } else {
                console.log(error.message)
            }
        }

    }, [isSuccess, error])

    return (
        <main className={`${style.main} ${style.bgDark}`}>
            <div className={style.header}>
                <h1>
                    Welcome back
                    <br />
                    {`${firstName} ${lastName}!`}
                </h1>
                <ProfileForm />
            </div>
            <h2 className={style.srOnly}>Accounts</h2>
            <section className={style.account}>
                <div className={style.accountContentWrapper}>
                    <h3 className={style.accountTitle}>Argent Bank Checking (x8349)</h3>
                    <p className={style.accountAmount}>$2,082.79</p>
                    <p className={style.accountAmountDescription}>Available Balance</p>
                </div>
                <div className={`${style.accountAmountWrapper} ${style.cta}`}>
                    <button className={style.transactionButton}>
                        View transactions
                    </button>
                </div>
            </section>
            <section className={style.account}>
                <div className={style.accountContentWrapper}>
                    <h3 className={style.accountTitle}>Argent Bank Savings (x6712)</h3>
                    <p className={style.accountAmount}>$10,928.42</p>
                    <p className={style.accountAmountDescription}>Available Balance</p>
                </div>
                <div className={`${style.accountAmountWrapper} ${style.cta}`}>
                    <button className={style.transactionButton}>
                        View transactions
                    </button>
                </div>
            </section>
            <section className={style.account}>
                <div className={style.accountContentWrapper}>
                    <h3 className={style.accountTitle}>
                        Argent Bank Credit Card (x8349)
                    </h3>
                    <p className={style.accountAmount}>$184.30</p>
                    <p className={style.accountAmountDescription}>Current Balance</p>
                </div>
                <div className={`${style.accountAmountWrapper} ${style.cta}`}>
                    <button className={style.transactionButton}>
                        View transactions
                    </button>
                </div>
            </section>
        </main>
    )
}
