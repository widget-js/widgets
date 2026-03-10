import consola from 'consola'
import { useTranslation } from 'react-i18next'
import { RouterProvider } from 'react-router-dom'
import { useAppLanguage } from './hooks/use-app-language'
import { router } from './router'
import '@widget-js/react/style.css'
import './app.css'

function App() {
  const { i18n } = useTranslation()
  useAppLanguage({
    onLoad: (lang) => {
      consola.log('App language loaded:', lang)
      i18n.changeLanguage(lang)
    },
    onChange: (lang) => {
      consola.log('App language onChange:', lang)
      i18n.changeLanguage(lang)
    },
  })

  return (
    <RouterProvider router={router} />
  )
}

export default App
