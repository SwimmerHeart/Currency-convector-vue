<template>
  <nav class="navbar has-background-info-light" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <h1 class="navbar-item header__title">
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

  <!--<script>-->
  <!--export default {-->
  <!--  name: 'HeaderMenu',-->
  <!--  components: {-->
  <!--    HeaderMenu,-->
  <!--  }-->
  <!--}-->
  <!--</script>-->
<style scoped>
.navbar{
  margin-bottom: 2rem;
}
.header__title{
  font-weight: bold;
  font-size: 1.5rem;
}

</style>