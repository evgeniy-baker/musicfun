import { Header } from '@/common/components'
import { Routing } from '@/common/routing'
import s from './App.module.css'

export function App() {
  return (
    <>
      <Header />
      <div className={s.layout}>
        <Routing />
      </div>
    </>
  )
}
