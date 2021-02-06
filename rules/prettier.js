const { hasAnyDep } = require('../lib/utils')
const { consoleConfig } = require('../lib/loggers')

const configs = ['prettier']

const optionalConfigs = [
  ['@typescript-eslint/eslint-plugin', 'prettier/@typescript-eslint'],
  'babel',
  'flowtype',
  'react',
  ['eslint-config-standard', 'prettier/standard'],
  'vue',
  'unicorn',
]

optionalConfigs.forEach((optConfig) => {
  const config =
    typeof optConfig === 'string'
      ? [`eslint-plugin-${optConfig}`, `prettier/${optConfig}`]
      : optConfig

  if (hasAnyDep(config[0])) configs.push(config[1])
})

if (!global.hasAdjunctPrettierLoaded) {
  configs.map((config) => consoleConfig(config))
  global.hasAdjunctPrettierLoaded = true
}

module.exports = {
  extends: configs,
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['**.md', '**.json'],
      rules: {
        'prettier/prettier': 'off',
      },
    },
  ],
}
