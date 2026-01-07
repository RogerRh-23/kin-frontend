module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        overrides: [
            {
                exclude: /node_modules/,
                presets: [[
                    'babel-preset-expo',
                    { jsxImportSource: 'nativewind' }
                ], 'nativewind/babel'],
                plugins: [
                    [
                        'module-resolver',
                        {
                            root: ['.'],
                            alias: {
                                '@': '.',
                            },
                        },
                    ],
                    'react-native-reanimated/plugin',
                ],
            },
        ],
    };
};