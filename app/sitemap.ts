import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://copaquiz.com';

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/quizzes/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/trivia/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/personalidade/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/quiz/simulador/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/quem-e/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/sobre-o-copaquiz/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/termos/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/privacidade/`,
      lastModified: new Date(),
    },
  ];
}
