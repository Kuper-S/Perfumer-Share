// config-overrides.js
export default function override(config, env) {
    // New config, e.g. config.plugins.push...
    // console.log(JSON.stringify(config.resolve.fallback))
     config.resolve.fallback = {
         crypto: false,
         util: false,
         stream: false,
         ...config.resolve.fallback
     };
     config.ignoreWarnings = [/Failed to parse source map/];  
     return config
 }