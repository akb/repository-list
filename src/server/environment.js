const variables = [
  { name:'SCHEME',               as:'scheme' },
  { name:'DOMAIN',               as:'domain' },
  { name:'STATIC_PATH',          as:'staticPath',       default:'public' },
  { name:'LISTEN_PORT',          as:'listenPort',       default:7812 },
  { name:'INJECT_MIN_LATENCY',   as:'injectMinLatency', default:100 },
  { name:'INJECT_MAX_LATENCY',   as:'injectMaxLatency', default:1000 },
  { name:'SESSION_SECRET',       as:'sessionSecret' },
  { name:'GOOGLE_CLIENT_ID',     as:'googleClientID' },
  { name:'GOOGLE_CLIENT_SECRET', as:'googleClientSecret' },
  { name:'GOOGLE_CALLBACK_URL',  as:'googleCallbackURL' },
  { name:'SSL_CA_CERT_PATH',     as:'sslCACertPath' },
  { name:'SSL_CERT_PATH',        as:'sslCertPath' },
  { name:'SSL_KEY_PATH',         as:'sslKeyPath' }
];

const environment = {}, missing = [];

variables.forEach(v => {
  environment[v.as] = process.env[v.name] || v.default;
  if (!environment[v.as]) missing.push(v.name);
});

if (missing.length) {
  console.log(`Missing configuration variables, ${missing.join()} unable to start.`);
  process.exit(1);
}

module.exports = environment;
