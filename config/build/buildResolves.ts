import webpack from 'webpack';
import { BuildOptions } from './types/config';
import path from 'path';

export function buildResolves({ paths }: BuildOptions): webpack.ResolveOptions {
  return {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    preferAbsolute: true,
    modules: [paths.src, 'node_modules'],
    mainFiles: ['index'],
    alias: {
      '@': path.resolve(__dirname, paths.src)
    },
  };
}
