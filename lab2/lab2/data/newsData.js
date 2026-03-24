export const newsData = Array.from({ length: 20 }, (_, i) => ({
  id: String(i),
  title: `News ${i + 1}`,
  description: `Description for news ${i + 1}`,
  image: 'https://via.placeholder.com/150'
}));