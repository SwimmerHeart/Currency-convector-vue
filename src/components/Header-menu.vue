<template>
  <nav class="navbar has-background-info-light mb-5" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <h1 class="navbar-item header__title is-size-4">
        Конвектор валют на VUE
      </h1>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu ml-6">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">
          Конвектор валют
        </router-link>

        <router-link to="/exchange" class="navbar-item">
          Курсы валют
        </router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>