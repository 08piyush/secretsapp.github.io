const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'public');
const viewsDir = path.join(__dirname, 'views');

const templates = [
  { name: 'home', data: { title: 'Home' } },
  { name: 'login', data: { title: 'Login' } },
  { name: 'register', data: { title: 'Register' } },
  { name: 'secrets', data: { title: 'Secrets' } },

  { name: 'submit', data: { title: 'Submit' } },

  { name: 'header', data: { title: 'Header' } },
  { name: 'footer', data: { title: 'Footer' } },

];

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

templates.forEach((template) => {
  const outputPath = path.join(outputDir, `${template.name}.html`);
  const templatePath = path.join(viewsDir, `${template.name}.ejs`);

  ejs.renderFile(templatePath, template.data, {}, (err, str) => {
    if (err) {
      console.error(err);
      return;
    }

    fs.writeFile(outputPath, str, (err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(`HTML file generated for ${template.name} successfully`);
    });
  });
});
