module.exports = function (api) {
    api.cache(true);

    const presets = ["@babel/preset-env", "@babel/preset-typescript"];
    const ignore = ["**/__tests__", "**/*.test.ts", "!src/db/**"];

    return {
        presets,
        ignore
    };
}