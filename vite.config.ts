import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import eslint from 'vite-eslint-plugin';

export default defineConfig({
  plugins: [
    react(),
    // viteTsconfigPaths(),
    dts({
      insertTypesEntry: true,
    }),
    // {
    //   // do not fail on serve (i.e. local development)
    //   ...eslint({ failOnWarning: false, failOnError: false }),
    //   apply: 'serve',
    //   enforce: 'post',
    // },
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'formBuilder',
      formats: ['es', 'umd'],
      fileName: (format) => `my-lib.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
