import path from 'path';
import webpack, { RuleSetRule } from 'webpack';

import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { buildSvgLoader } from '../build/loaders/buildSvgLoader';

export default ({ config }: {config: webpack.Configuration}) => {
  config.resolve?.modules?.push(path.resolve(__dirname, '..', '..', 'src', 'src'));
  config.resolve?.extensions?.push('.ts', '.tsx', '.js');
  if (config.resolve?.alias) {
    config.resolve.alias = {
      '@app': path.resolve(__dirname, '..', '..', 'src', 'app'),
      '@pages': path.resolve(__dirname, '..', '..', 'src', 'pages'),
      '@widgets': path.resolve(__dirname, '..', '..', 'src', 'widgets'),
      '@entities': path.resolve(__dirname, '..', '..', 'src', 'entities'),
      '@shared': path.resolve(__dirname, '..', '..', 'src', 'shared'),
    };
  }

  config.module?.rules?.push(buildCssLoader(true));

  config.module!.rules = config.module!.rules!.map((rule) => {
    rule = rule as RuleSetRule;
    if (/svg/.test(rule.test as string)) {
      return { ...rule, exclude: /\.svg$/i };
    }
    return rule;
  });

  config.module?.rules?.push(buildSvgLoader());

  return config;
};
