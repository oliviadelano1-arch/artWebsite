import { NextResponse } from "next/server";

const API_KEY = process.env.API_KEY;
const SHEET_ID =process.env.SHEET_ID;


const RANGE = "Sheet1!A:F"; // adjust to your sheet

export async function GET() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  // First row is headers
  const [headers, ...rows] = data.values;

  // Convert rows → objects
  const items = rows.map((row) => {
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = row[i] || "";
    });
    return obj;
  });

  // Format for your frontend
  const formatted = items.map((item) => ({
    id: item.id || item.name, // fallback
    name: item.name,
    mimeType: item.mimeType,
    url: `https://drive.google.com/uc?export=view&id=${item.id}`,
    category: item.category?.toLowerCase() || "all",
    type:item.type
  }));

  return NextResponse.json(formatted);
}



