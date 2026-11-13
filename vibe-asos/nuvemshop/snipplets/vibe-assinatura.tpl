{# Vibe a sós — componente isolado. Ajuste apenas os valores antes de integrar no tema. #}
{# c1 = original, c2 = maior, c3 = mais pétalas; paletas equivalentes às da prévia. #}
{% set vibe_modelo = 'c1' %}
{% set vibe_fundo = '#19494C' %}
{% set vibe_letras = '#F6E9D6' %}
{% set vibe_flor = '#D9AD65' %}
{% if vibe_modelo == 'c2' %}
  {% set vibe_arquivo_flor = 'images/flor-c-ampliada.png' %}
{% elseif vibe_modelo == 'c3' %}
  {% set vibe_arquivo_flor = 'images/flor-c-petalas.png' %}
{% else %}
  {% set vibe_arquivo_flor = 'images/flor-c-original.png' %}
{% endif %}
<div class="vibe-identidade" data-vibe-identidade style="--vibe-fundo:{{ vibe_fundo }};--vibe-letras:{{ vibe_letras }};--vibe-flores:{{ vibe_flor }};--vibe-img-letras:url('{{ 'images/letras-c.png' | static_url }}');--vibe-img-flor:url('{{ vibe_arquivo_flor | static_url }}');">
  <a class="vibe-identidade__link" href="/" aria-label="Vibe a sós — página inicial">
    <span class="vibe-identidade__letras" aria-hidden="true"></span>
    <span class="vibe-identidade__flor" aria-hidden="true"></span>
    <span class="vibe-identidade__luz" aria-hidden="true"></span>
    <span class="vibe-identidade__petala p1" aria-hidden="true"></span>
    <span class="vibe-identidade__petala p2" aria-hidden="true"></span>
    <span class="vibe-identidade__petala p3" aria-hidden="true"></span>
  </a>
</div>
