import { z } from 'zod';
import { fetch as ogFetch} from 'fetch-opengraph';

export const getRandomIds = (max: number, length: number): number[] => {
    const ids = [];

    for (let i = 0; i < length; i++) {
        ids.push(Math.ceil(Math.random() * max));
    }

    return ids;
};

const portfolioPost = z.object({
    portfolio: z.object({
        alias: z.string(),
        name: z.string(),
        url: z.string()
    }),
    tags: z.array(z.string()).max(3)
});

export const validators = {
    portfolioPost
}

export type OGData = {
    description?: string,
  'twitter:image:src'?: string,
  'twitter:card'?: string,
  'twitter:title'?: string,
  'twitter:description'?: string,
  'og:image'?: string,
  'og:type'?: string,
  'og:title'?: string,
  'og:url'?: string,
  'og:description'?: string,
  image?: string,
  url?: string
}

export const getMetaData = async (url: string): Promise<OGData> => {
    const data = await ogFetch(url);
    return data;
}
