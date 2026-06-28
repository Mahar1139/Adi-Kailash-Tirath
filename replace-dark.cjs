const fs = require('fs');

function replaceInFile(file) {
    let content = fs.readFileSync(file, 'utf8');
    const oldContent = content;
    
    // zinc -> slate in dark mode
    content = content.replace(/dark:bg-zinc-950/g, 'dark:bg-[#0b1120]'); // a nice dark slate/navy
    content = content.replace(/dark:bg-zinc-900/g, 'dark:bg-[#0f172a]'); // slate-900
    content = content.replace(/dark:bg-zinc-800/g, 'dark:bg-[#1e293b]'); // slate-800
    
    content = content.replace(/dark:text-zinc-100/g, 'dark:text-slate-100');
    content = content.replace(/dark:text-zinc-300/g, 'dark:text-slate-300');
    content = content.replace(/dark:text-zinc-400/g, 'dark:text-slate-400');
    
    content = content.replace(/dark:border-zinc-800/g, 'dark:border-slate-800/60');
    content = content.replace(/dark:border-zinc-700/g, 'dark:border-slate-700/60');
    
    content = content.replace(/dark:via-zinc-950/g, 'dark:via-[#0b1120]');
    content = content.replace(/dark:via-zinc-900/g, 'dark:via-slate-900');
    content = content.replace(/dark:to-zinc-950/g, 'dark:to-[#0b1120]');
    
    content = content.replace(/dark:via-zinc-300/g, 'dark:via-slate-300');
    
    content = content.replace(/dark:hover:bg-zinc-800/g, 'dark:hover:bg-slate-800');
    content = content.replace(/dark:hover:bg-zinc-700/g, 'dark:hover:bg-slate-700');
    
    content = content.replace(/dark:from-sky-900\/10/g, 'dark:from-sky-900/20');
    content = content.replace(/dark:to-sky-900\/10/g, 'dark:to-sky-900/20');
    
    if (content !== oldContent) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
}

function walkUrl(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const path = dir + '/' + file;
        if (fs.statSync(path).isDirectory()) {
            walkUrl(path);
        } else if (path.endsWith('.tsx') || path.endsWith('.ts')) {
            replaceInFile(path);
        }
    }
}

walkUrl('src');
