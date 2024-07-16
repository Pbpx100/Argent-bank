import styles from './error.module.css'
export default function Error404() {
    return (
        <>
            <main className={`${styles.main} ${styles.bgDark}`}>
                <section className={styles.errorContent}>
                    <h1>Error404</h1>
                </section>
            </main >
        </>
    )
}