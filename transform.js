import fs from "fs";
import yaml from "js-yaml";

// Read the YAML file
const yamlFile = fs.readFileSync("./swagger.yaml", "utf8");

// Parse the YAML content
const swaggerDocument = yaml.load(yamlFile);

// Export the parsed YAML content
export default swaggerDocument;
