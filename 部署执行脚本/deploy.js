const spawn = require('cross-spawn')

const run = (command, args = []) => new Promise((resolve, reject) => {
    console.log(`执行：${command + ' ' + args.join(' ')}`)
    const p = spawn(command, args, { stdio: 'inherit' })
    p.on('close', () => {
        console.log('执行结束')
        resolve()
    })
})
//
run('yarn', ['build'])
    .then(() => run('docker', ['build', '-t', 'demo:latest', '.']))
    .then(() => run('docker', ['push', 'demo:latest']))
    .then(() => run('ssh', [`hades@10.0.1.96`, 'sh', '/home/hades/FE/up.sh']))