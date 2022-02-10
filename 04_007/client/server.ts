const { exec, ExecException } = require('child_process');

exec('npx webpack', (error: typeof ExecException | null, stdout: string, stderr: string) => {
  console.log('\x1b[33m', stdout);
  console.error('\x1b[33m', stderr);

  if (error) {
    //console.error(error);
    console.log('\x1b[31m', '**************************');
    console.log('\x1b[31m', '******   ERROR!!!   ******');
    console.log('\x1b[31m', '**************************');
  }
});
console.log('\x1b[0m', '==========================================================');
console.log('\x1b[0m', '         zum-coding-repo compiler: Compiling...');
console.log('\x1b[0m', '==========================================================');
