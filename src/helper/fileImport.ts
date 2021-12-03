import fs from 'fs';


export const parseInput = (input) => {
    try {
        const data = fs.readFileSync(input, 'utf-8');
        const lines = data.split(/\r?\n/);
        return lines
    } catch(e) {
        console.log('Error:', e.stack)
    }
}