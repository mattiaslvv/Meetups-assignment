<template>
  <div>
    <form>
      <div class="form-username">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Username..."
          name="username"
          v-model="username"
        />
      </div>
      <div class="form-password">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password..."
          name="password"
          v-model="password"
        />
      </div>
      <button
        @click.prevent="
          loginThisUser({ username: username, password: password })
        "
      >
        Login
      </button>
    </form>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';
export default {
  name: 'LoginForm',
  computed: {
    ...mapFields(['loginForm.username', 'loginForm.password']),
  },
  methods: {
    ...mapActions(['loginThisUser']),
  },
};
</script>
