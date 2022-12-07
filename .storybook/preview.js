import {MINIMAL_VIEWPORTS} from '@storybook/addon-viewport';

import 'animate.css'
import '@widget-js/vue3/dist/mingcute_icon/font/Mingcute.css';

const customViewports = {
  widget1x1: {
    name: '组件1x1',
    styles: {
      width: '76px',
      height: '76px',
    },
  },
  widget1x2: {
    name: '组件1x2',
    styles: {
      width: '76px',
      height: '188px',
    },
  },
  widget2x1: {
    name: '组件2x1',
    styles: {
      width: '188px',
      height: '76px',
    },
  },
  widget2x2: {
    name: '组件2x2',
    styles: {
      width: '188px',
      height: '188px',
    },
  },
  widget2x4: {
    name: '组件2x4',
    styles: {
      width: '188px',
      height: '412px',
    },
  },
  widget4x1: {
    name: '组件4x1',
    styles: {
      width: '412px',
      height: '76px',
    },
  },

  widget4x2: {
    name: '组件4x2',
    styles: {
      width: '412px',
      height: '188px',
    },
  },

  widget4x4: {
    name: '组件4x4',
    styles: {
      width: '412px',
      height: '412px',
    },
  },
  widget6x2: {
    name: '组件6x2',
    styles: {
      width: '600px',
      height: '188px',
    },
  },
};
export const parameters = {
  actions: {argTypesRegex: "^on[A-Z].*"},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
  viewport: {
    viewports: {
      ...MINIMAL_VIEWPORTS,
      ...customViewports,
    }
  },
}
