<template>
  <footer class="footer px-4">
    <b-row align-v="center" class="justify-content-lg-between">
      <b-col lg="6">
        <div class="copyright text-center text-lg-left text-muted">
          © {{year}} <a href="/" class="font-weight-bold ml-1">Lariat Hub Team</a>
        </div>
      </b-col>
      <b-col lg="6">
        <b-nav align="center" class="nav-footer justify-content-lg-end">
          <b-nav-item href="/">
            Lariat Hub
          </b-nav-item>
          <b-nav-item href="//presentation">
           About Us
          </b-nav-item>
          <b-nav-item href="http://blog.creative-tim.com">
            Blog
          </b-nav-item>
          <b-nav-item href="//license">
            License
          </b-nav-item>
        </b-nav>
      </b-col>
    </b-row>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
