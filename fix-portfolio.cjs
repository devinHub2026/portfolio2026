const fs = require('fs');
const filepath = '/src/components/Portfolio.tsx';
let content = fs.readFileSync(filepath, 'utf8');

// We find the sub-string starting with:
// '                        <span className="text-[10px] text-green-400 font-bold block mb-0.5">2. 极限定位控制与精细化管理</span>'
// And ending with:
// '                      <div className="bg-green-500/3 p-3 rounded-lg border border-green-500/10 hover:border-green-500/20 transition-all text-[10.5px]">\n                        <span className="text-[10px] text-green-400 font-bold block mb-0.5">3. 跨端口闭环协同</span>'

const startStr = '                        <span className="text-[10px] text-green-400 font-bold block mb-0.5">2. 极限定位控制与精细化管理</span>';
const endStr = '                      <div className="bg-green-500/3 p-3 rounded-lg border border-green-500/10 hover:border-green-500/20 transition-all text-[10.5px]">\n                        <span className="text-[10px] text-green-400 font-bold block mb-0.5">3. 跨端口闭环协同</span>';

const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
    const before = content.substring(0, startIndex);
    const after = content.substring(endIndex);
    const newContent = before + startStr + '\n                        <p className="text-gray-300 leading-relaxed font-light">\n                          在时间强力紧缩的前提下，以精细化制片管理对齐并极致控制预算。\n                        </p>\n                      </div>\n                      ' + after;
    fs.writeFileSync(filepath, newContent, 'utf8');
    console.log("Replacement succeeded!");
} else {
    console.log("Failed to locate start or end marker. startIndex: " + startIndex + ", endIndex: " + endIndex);
}
