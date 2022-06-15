import minimist from 'minimist';
import {execa} from 'execa';
import terminate from 'terminate';

const argv = minimist(process.argv.slice(2));

const file = argv._[0] || 'src/01.simple-deploy/app.ts';

;(async () => {
    const childProcess = execa(`npx esno ${file}`);
    childProcess.stderr?.pipe(process.stdout);
    childProcess.stdout?.pipe(process.stdout);
    process.stdin.resume();
    function exit(){
        if (process.pid) {
            terminate(process.pid, 'SIGINT');
        }       
        process.stdin.end();
    }
    process.on('exit', exit);
    process.on('SIGINT', exit);
})();

