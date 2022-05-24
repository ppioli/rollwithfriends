import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import BaseMap from "../components/map/BaseMap";
import ReactResizeDetector, {useResizeDetector} from 'react-resize-detector';

export default function Home() {
    const { ref, width, height } = useResizeDetector();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
            <div className={"flex items-stretch"} style={{width: "100vw", maxWidth:"100vw", height: "100vh", maxHeight: "100vh", overflow: "hidden"}}>
                <div ref={ref} className={'w-full'}>
                    <BaseMap width={width} height={height}/>

                </div>
                <div className={"w-96"}>
                    Asdf
                </div>

            </div>
      </main>

    </div>
  )
}