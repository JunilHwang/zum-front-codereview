const { spawn } = require('child_process');

const frontend = spawn('yarn', ['workspace', 'frontend', 'dev']);
const backend = spawn('yarn', ['workspace', 'backend', 'dev']);

const log = label => type => data =>
  console[type](`[${label}]: ${String(data).trimEnd()}`);

const felog = log('fe');
const belog = log('be');

frontend.stdout.on('data', felog('log'));
backend.stdout.on('data', belog('log'));
frontend.stderr.on('data', felog('error'));
backend.stderr.on('data', belog('error'));
