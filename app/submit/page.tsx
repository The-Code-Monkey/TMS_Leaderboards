import styles from "@/app/page.module.scss";
import Provider from '@/app/provider'
import Form from "@/app/submit/Form";

const Page = () => {
  return(
  <Provider>
    <div className={styles.container}>
      <main className={styles.main}>
        <Form />
      </main>
    </div>
  </Provider>
  )
}

export default Page;