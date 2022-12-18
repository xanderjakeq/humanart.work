import type { PageServerLoad } from './$types';

import prisma, { getPortfoliosById, getAllTags } from '$lib/prisma';
import { getRandomIds } from '$lib/utils';

export const load: PageServerLoad = async () => {
    const tags = await getAllTags();

    const portfolioCount = await prisma.portfolio.count();

    const portfolios = await getPortfoliosById(
        getRandomIds(portfolioCount, Math.min(30, portfolioCount))
    );

    return {
        tags,
        portfolios
    };
};
