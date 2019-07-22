const url =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=14937aa5ea5540489b08015ec2479053";

export async function getNews() {
  let result = await fetch(url).then(response => response.json());
  return result.articles;
}