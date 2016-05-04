const variables = [
  { name:'SCHEME',                    as:'scheme' },
  { name:'LISTEN_PORT',               as:'listenPort',              integer:true },
  { name:'DOMAIN',                    as:'domain' },

  { name:'STATIC_PATH',               as:'staticPath' },

  { name:'SSL_CA_CERT_PATH',          as:'sslCACertPath' },
  { name:'SSL_CERT_PATH',             as:'sslCertPath' },
  { name:'SSL_KEY_PATH',              as:'sslKeyPath' },

  { name:'SESSION_SECRET',            as:'sessionSecret' },

  { name:'GOOGLE_CLIENT_ID',          as:'googleClientID' },
  { name:'GOOGLE_CLIENT_SECRET',      as:'googleClientSecret' },
  { name:'GOOGLE_CALLBACK_URL',       as:'googleCallbackURL' },

  { name:'INJECT_MIN_LATENCY',        as:'injectMinLatency',        integer:true},
  { name:'INJECT_MAX_LATENCY',        as:'injectMaxLatency',        integer:true},

  { name:'GENERATE_MIN_NAMESPACES',   as:'generateMinNamespaces',   integer:true },
  { name:'GENERATE_MAX_NAMESPACES',   as:'generateMaxNamespaces',   integer:true },
  { name:'GENERATE_MIN_REPOSITORIES', as:'generateMinRepositories', integer:true },
  { name:'GENERATE_MAX_REPOSITORIES', as:'generateMaxRepositories', integer:true }
];

const environment = {}, missing = [];

variables.forEach(v => {
  if (v.integer) {
    const parsed = parseInt(process.env[v.name]);
    environment[v.as] = Number.isFinite(parsed) && parsed;
  } else {
    environment[v.as] = process.env[v.name];
  }
  if (!environment[v.as]) missing.push(v.name);
});

if (missing.length) {
  console.log(`Missing configuration variables, ${missing.join()} unable to start.`);
  process.exit(1);
}

module.exports = environment;
