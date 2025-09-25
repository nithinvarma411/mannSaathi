import data from "../data/data.json"; // adjust path if needed

// Define the shape of your AISHE data
type Institution = {
  aishe_code: string;
  name: string;
  state: string;
  district: string;
};

// Preprocess: create a lookup map for O(1) access
const aisheMap: Record<string, Institution> = {};
(data as Institution[]).forEach((inst) => {
  aisheMap[inst.aishe_code.toUpperCase()] = inst;
});

// The main search function
export function getSearch() {
  return (aisheCode: string): Institution | null => {
    return aisheMap[aisheCode.toUpperCase()] || null;
  };
}