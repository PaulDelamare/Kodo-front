<script>
	import { page } from '$app/stores';
	import CoursPicto from '../Picto/CoursPicto.svelte';
	import HomePicto from '../Picto/HomePicto.svelte';
	import MessagePicto from '../Picto/MessagePicto.svelte';
	import ProfilPicto from '../Picto/ProfilPicto.svelte';
</script>

<ul class="w-full h-full border-t-2 flex justify-around items-center bg-surface-500 p-0 m-0 z-50">
	<li class="flex-1 flex flex-col items-center h-full relative">
		<a class="w-full h-full py-2 flex justify-center items-center flex-col" href="/kodo">
			<HomePicto classCustom="w-7 fill-tertiary-500" />
			<span class="text-[12px]">Accueil</span>

			{#if $page.url.pathname === '/kodo'}
				<div class=" absolute -bottom-3 w-full h-5 bg-primary-500 rounded-[100%]"></div>
			{/if}
		</a>
	</li>
    <li class="flex-1 flex flex-col items-center h-full relative">
        <a class="w-full h-full py-2 flex justify-center items-center flex-col" href="/kodo/cours">
            <CoursPicto classCustom="w-8 stroke-tertiary-500 w-full" />
            <span class="text-[12px]">Cours</span>

            {#if $page.url.pathname.startsWith('/kodo/cours')}
                <div class=" absolute -bottom-3 w-full h-5 bg-primary-500 rounded-[100%]"></div>
            {/if}
        </a>
    </li>
	<li class="flex-1 flex flex-col items-center h-full relative">
		<a class="w-full h-full py-2 flex justify-center items-center flex-col" href="/kodo/messages">
			<MessagePicto classCustom="!w-7 fill-tertiary-500 w-full" />
			<span class="text-[12px]">Messages</span>

			{#if $page.url.pathname.startsWith('/kodo/messages')}
				<div class=" absolute -bottom-3 w-full h-5 bg-primary-500 rounded-[100%]"></div>
			{/if}
		</a>
	</li>
	<li class="flex-1 flex flex-col items-center h-full relative">
		<a class="w-full h-full py-2 flex justify-center items-center flex-col" href="/kodo/profil">
			<ProfilPicto classCustom="!w-6 stroke-tertiary-500 w-full" />
			<span class="text-[12px]">Profil</span>

			{#if $page.url.pathname.startsWith('/kodo/profil')}
				<div class=" absolute -bottom-3 w-full h-5 bg-primary-500 rounded-[100%]"></div>
			{/if}
		</a>
	</li>
</ul>
