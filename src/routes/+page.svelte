<script lang="ts">
    import type { PageData } from './$types';

    import { page } from '$app/stores';

    export let data: PageData;
    let { portfolios, tags } = data;

    const tagsMap = new Map();
    tags.forEach((tag) => tagsMap.set(tag.id, tag.text));

    //TODO: maybe
    //let artistString = '';
    //let timer: ReturnType<typeof setTimeout>;

    //const debounce = (v: string) => {
    //    clearTimeout(timer);
    //    timer = setTimeout(() => {
    //        artistString = v;
    //    }, 750);
    //};

    //const onKeyup = (event: Event) => {
    //    const { value } = event.target as HTMLInputElement;
    //    debounce(value);
    //};

    const loadMore = async () => {
        const res = await fetch(`${$page.url.origin}/api/portfolio`);
        const moreFolios = await res.json();

        portfolios = [
            ...new Map(
                portfolios.concat(moreFolios).map((p) => [p.url, p])
            ).values()
        ];
    };
</script>

<h1>human.art.work</h1>

<p>Discover portfolios of human artists.</p>

<p>
    <a
        href="https://www.gofundme.com/f/protecting-artists-from-ai-technologies"
        title="Concept Art Association"
    >
        CAA gofundme
    </a>
</p>

<h3 id="title">portfolios</h3>

<!--
<input placeholder="search artist" on:keyup={onKeyup} />
-->

<ul>
    {#each portfolios as portfolio (portfolio.id)}
        <li class="folio">
            <a alt="portfolio" title={portfolio.name} href={portfolio.url}>
                {#if portfolio.image}
                    <img alt="art" src={portfolio.image} />
                {:else}
                    <div class="art-placeholder" />
                {/if}
            </a>
            <a alt="portfolio" href={portfolio.url} class="alias"
                >{portfolio.alias}</a
            >
            <div>
                {#each portfolio.portfolio_tag as ptag (ptag.id)}
                    <a href="/tags/{tagsMap.get(ptag.tagId)}" class="tag">
                        #{tagsMap.get(ptag.tagId)}
                    </a>
                {/each}
            </div>
        </li>
    {/each}
</ul>

<button on:click={loadMore}>more</button>

<style>
    #title {
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid grey;
    }

    img {
        width: 100%;
    }

    .art-placeholder {
        width: 100%;
        height: 100px;
        background-color: grey;
        opacity: 0.2;
    }

    .alias {
        margin: 0.2rem 0;
        font-size: 1.3rem;
    }
    .tag {
        color: blue;
    }
    .tag:hover {
        color: orange;
    }

    .folio {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
    }
</style>
