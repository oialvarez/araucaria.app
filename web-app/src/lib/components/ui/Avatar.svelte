<script lang="ts">
  import { getContext } from 'svelte';
  import { getInitials, getAvatarColor } from '$lib/utils';

  export let name: string;
  export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  export let color: string | null = null;

  const sizes = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl'
  } as const;

  // Generar color basado en el nombre si no se proporciona uno
  $: if (!color) {
    color = getAvatarColor(name);
  }
</script>

<div 
  class={`flex items-center justify-center rounded-full font-medium ${color} text-white ${sizes[size]}`}
  role="img"
  aria-label={`Avatar de ${name}`}
>
  {getInitials(name)}
</div>
