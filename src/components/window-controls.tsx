import { BrowserWindowApi } from '@widget-js/core'
import { Minus, Square, X } from 'lucide-react'

export function WindowControls() {
  async function toggleMaximize() {
    if (await BrowserWindowApi.isMaximized()) {
      BrowserWindowApi.unmaximize()
    }
    else {
      BrowserWindowApi.maximize()
    }
  }
  return (
    <div className="flex items-center gap-2 fixed top-4 right-4 z-50">
      <button
        onClick={() => BrowserWindowApi.minimize()}
        className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white transition-colors shadow-sm"
        title="Minimize"
      >
        <Minus className="h-2 w-2" />
      </button>
      <button
        onClick={toggleMaximize}
        className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-green-500 hover:bg-green-600 text-white transition-colors shadow-sm"
        title="Maximize"
      >
        <Square className="h-2 w-2" />
      </button>
      <button
        onClick={() => BrowserWindowApi.close()}
        className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors shadow-sm"
        title="Close"
      >
        <X className="h-2 w-2" />
      </button>
    </div>
  )
}
