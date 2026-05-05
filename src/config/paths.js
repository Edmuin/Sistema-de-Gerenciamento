import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "../..");

dotenv.config({ path: path.join(ROOT, ".env") });

export const PATHS = {
  root: ROOT,
  public: path.join(ROOT, process.env.PUBLIC_PATH),
  views: path.join(ROOT, process.env.VIEWS_PATH),
};
