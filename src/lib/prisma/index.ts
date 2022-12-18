import { PrismaClient } from '@prisma/client';

import { getMetaData } from '$lib/utils';

const prisma = new PrismaClient();

export default prisma;

export const getPortfoliosById = async (ids: number[]) => {
    const portfolios = await prisma.portfolio.findMany({
        include: {
            portfolio_tag: true
        },
        where: {
            id: {
                in: ids
            }
        },
        take: 50
    });

    const promises = portfolios.map(async (folio) => {
        const _folio = folio as typeof folio & {image?: string};
        const metaData = await getMetaData(folio.url);
        _folio.image = metaData.image;
        return _folio
    })

    return await Promise.all(promises);
};

export const getAllTags = async () => {
    const tags = await prisma.tag.findMany({
        select: {
            id: true,
            text: true
        }
    });
    return tags;
};
