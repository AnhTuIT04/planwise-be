const http = require('http');
const fs = require('fs');

http.get('http://localhost:8080/api-docs-json', (resp) => {
  let data = '';
  resp.on('data', (chunk) => {
    data += chunk;
  });
  resp.on('end', () => {
    const swagger = JSON.parse(data);
    const summary = {};
    let total = 0;
    
    Object.keys(swagger.paths).forEach(path => {
      Object.keys(swagger.paths[path]).forEach(method => {
        const op = swagger.paths[path][method];
        const group = op.tags ? op.tags[0] : 'Other';
        if (!summary[group]) summary[group] = [];
        summary[group].push({ method: method.toUpperCase(), path, summary: op.summary || 'No summary' });
        total++;
      });
    });
    
    let out = `Total APIs: ${total}\n`;
    Object.keys(summary).sort().forEach(group => {
      out += `\nGroup: ${group} (${summary[group].length} APIs)\n`;
      summary[group].forEach(api => {
        out += `  [${api.method}] ${api.path} - ${api.summary}\n`;
      });
    });
    fs.writeFileSync('c:/study/DATN/BE/scratch/api_summary_utf8.txt', out, 'utf8');
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
