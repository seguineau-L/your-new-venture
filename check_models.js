import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkPricing() {
  const { data, error } = await supabase
    .from("pricing")
    .select("generation, model")
    .eq("brand", "APPLE")
    .eq("category", "TELEPHONE");

  if (error) {
    console.error(error);
    return;
  }

  const existingModels = Array.from(new Set(data.map(d => d.model)));
  console.log("Existing models:", existingModels);
}

checkPricing();
