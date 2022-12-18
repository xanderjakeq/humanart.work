<script lang="ts">
    import { page } from '$app/stores';
</script>

<svelte:head>
    <title>{$page.data.title || 'humanartwork'}</title>
</svelte:head>

<nav class="content-width">
    <a href="/">Home</a>
    <a href="/about">About</a>
</nav>

<main class="content-width">
    <slot />
</main>

<footer class="content-width">
    <p>by l-0-l.co</p>
    <div>
        <a href="https://github.com/xanderjakeq/humanart.work">github</a>
    </div>
</footer>

<style>
    nav,
    main,
    footer {
        height: 100%;
    }

    nav {
        display: flex;
        align-items: center;
        max-height: 50px;
    }

    nav > a {
        margin-right: 1rem;
    }

    footer * a {
        margin-right: 1rem;
    }

    .content-width {
        width: 100%;
        max-width: 500px;
        margin: auto;
    }
</style>
