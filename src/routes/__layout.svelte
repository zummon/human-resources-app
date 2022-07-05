<script>
	import '../app.css';
</script>

<div class="flex flex-wrap justify-center print:hidden">
	<a class="inline-flex items-center px-3 rounded border-2 font-semibold shadow focus:border-orange-500 hover:border-orange-500 focus:text-orange-500 hover:text-orange-500" href="/">index</a>
	<a class="inline-flex items-center px-3 rounded border-2 font-semibold shadow focus:border-orange-500 hover:border-orange-500 focus:text-orange-500 hover:text-orange-500" href="/work-1">Work 1</a>
	<a class="inline-flex items-center px-3 rounded border-2 font-semibold shadow focus:border-orange-500 hover:border-orange-500 focus:text-orange-500 hover:text-orange-500" href="/api">
		api
	</a>
</div>
<div class="min-h-[32px]"></div>

<slot />
