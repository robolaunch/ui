const { exec } = require("child_process");

const command = `sudo npx @openapitools/openapi-generator-cli generate -i ${process.env.REACT_APP_BACKEND_URL}/q/openapi?format=json -g typescript-axios -o src/api/openapi/`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`ERROR: ${error}`);
    return;
  }
  console.log(`${stdout}`);
  stderr && console.error(`STD ERROR: ${stderr}`);
});
