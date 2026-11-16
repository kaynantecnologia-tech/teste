{# Vibe a sós — assinatura C animada + insígnia flutuante.
   Troque só os valores abaixo pelo código que a cliente escolheu no site de teste
   (ex.: C-02 · V03 · E01  →  modelo 'c2', cores da V03, efeito 'e1'). #}
{% set vibe_modelo = 'c1' %}            {# c1 = original · c2 = maior · c3 = aberta #}
{% set vibe_efeito = 'e1' %}            {# e1 clássico · e2 florescer · e3 traço vivo · e4 pétalas · e5 dourado #}
{% set vibe_fundo  = '#FFFFFF' %}
{% set vibe_letras = '#19494C' %}
{% set vibe_flor   = '#AC7358' %}
{% set vibe_brilho = '#F3D08A' %}
{% set vibe_insignia = true %}          {# false para esconder a bolinha flutuante #}
{% set vibe_whatsapp = '' %}            {# ex.: '5522999999999' — vazio = a bolinha só volta ao topo #}

{% if vibe_modelo == 'c2' %}{% set vibe_flor_img = 'images/flor-c-ampliada.png' %}
{% elseif vibe_modelo == 'c3' %}{% set vibe_flor_img = 'images/flor-c-petalas.png' %}
{% else %}{% set vibe_flor_img = 'images/flor-c-original.png' %}{% endif %}

<div class="vibe-cabecalho" style="background:{{ vibe_fundo }};display:flex;justify-content:center;padding:18px 12px">
  <a href="/" class="vs-logo" data-vibe-logo data-fx="{{ vibe_efeito }}" aria-label="Vibe a sós — página inicial"
     style="width:min(100%,440px);--vs-letra:{{ vibe_letras }};--vs-flor:{{ vibe_flor }};--vs-brilho:{{ vibe_brilho }};--m-letras:url('{{ 'images/letras-c.png' | static_url }}');--m-corpo:url('{{ ('images/corpo-' ~ vibe_modelo ~ '.png') | static_url }}');--m-semente:url('{{ ('images/seed-' ~ vibe_modelo ~ '.png') | static_url }}');--m-flor:url('{{ vibe_flor_img | static_url }}');">
    <span class="vs-l vs-halo"></span><span class="vs-l vs-letras"></span><span class="vs-l vs-corpo"></span><span class="vs-l vs-semente"></span><span class="vs-l vs-luz-l"></span><span class="vs-l vs-luz-f"></span>
    <i class="vs-p vs-p1"></i><i class="vs-p vs-p2"></i><i class="vs-p vs-p3"></i><i class="vs-p vs-p4"></i><i class="vs-p vs-p5"></i><i class="vs-p vs-p6"></i><i class="vs-p vs-p7"></i><i class="vs-p vs-p8"></i><i class="vs-p vs-p9"></i><i class="vs-p vs-p10"></i>
    <i class="vs-s vs-s1"></i><i class="vs-s vs-s2"></i><i class="vs-s vs-s3"></i><i class="vs-s vs-s4"></i><i class="vs-s vs-s5"></i>
  </a>
</div>

{% if vibe_insignia %}
<button type="button" class="vs-insignia" data-vibe-insignia data-whatsapp="{{ vibe_whatsapp }}" aria-label="Voltar ao início ou tirar dúvidas"
  style="--vs-flor:{{ vibe_flor }};--vs-brilho:{{ vibe_brilho }};--vs-fundo-insignia:#19494C;--m-icone:url('{{ 'images/lotus-icone.png' | static_url }}')"></button>
{% endif %}
