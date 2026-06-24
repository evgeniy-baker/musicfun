import { Header } from '@/common/components'
import { Routing } from '@/common/routing'
import s from './App.module.css'
import { ToastContainer } from 'react-toastify'
import { useGlobalLoading } from '@/common/hoocks'
import { LinearProgress } from '@/common/components/LinearProgress/LinearProgress.tsx'

export function App() {
  const isGlobalLoading = useGlobalLoading()

  return (
    <>
      <Header />
      {isGlobalLoading && <LinearProgress />}

      <div className={s.layout}>
        <Routing />
      </div>
      <ToastContainer />
    </>
  )
}
