import { NextResponse } from "next/server";
// https://drive.google.com/drive/folders/1Xi2NXdxSM1hs6awl4ufLICaQ38FWVReQ?usp=sharing
const FOLDER_ID ='1Xi2NXdxSM1hs6awl4ufLICaQ38FWVReQ'
// process.env.GDRIVE_FOLDER_ID;
const API_KEY ='AIzaSyB7jUZsygwC9tSZMf65ICQ8pkcGnPJSeM0'
// process.env.GDRIVE_API_KEY;

export async function GET() {
  const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType)`;

  const res = await fetch(url);
  const data = await res.json();

  const images = data.files.map(file => ({
    id: file.id,
    name: file.name,
    url: `https://drive.google.com/uc?export=view&id=${file.id}`
  }));

//   console.log(images)

  return NextResponse.json(images);
}
