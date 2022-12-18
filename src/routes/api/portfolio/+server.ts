import type { z } from 'zod';
import type { RequestHandler } from './$types';

import prisma, { getPortfoliosById, getAllTags } from '$lib/prisma';
import { getRandomIds, validators } from '$lib/utils';

export const GET = (async () => {
    const portfolioCount = await prisma.portfolio.count();

    const portfolios = await getPortfoliosById(
        getRandomIds(portfolioCount, Math.min(30, portfolioCount))
    );

    return new Response(JSON.stringify(portfolios));
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
    const data = await request.json();

    try {
        validators.portfolioPost.parse(data);
    } catch (err) {
        return new Response(
            JSON.stringify({ message: 'request data kinda suss' }),
            {
                status: 400,
                statusText: JSON.stringify(err)
            }
        );
    }

    const { portfolio, tags: pTags } = data as z.infer<
        typeof validators.portfolioPost
    >;

    const tags = await getAllTags();

    const tagsMap = new Map(tags.map((tag) => [tag.text, tag.id]));

    const portfolio_tags = pTags
        .map((pTag) => tagsMap.get(pTag))
        .filter((id) => {
            return id;
        })
        .map((id) => {
            return {
                tagId: id || 0
            };
        });

    const newPortfolio = await prisma.portfolio.create({
        data: {
            ...portfolio,
            portfolio_tag: {
                create: portfolio_tags
            }
        }
    });

    return new Response(
        JSON.stringify({ message: 'added portfolio', portfolio: newPortfolio })
    );
}) satisfies RequestHandler;
